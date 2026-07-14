import React, { useState, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Trash2, Edit2, Check, AlertCircle } from 'lucide-react';
import { Habit, HabitRecord, WellnessRecord, ThemeColors, ThemeType } from '../types';

interface SpreadsheetViewProps {
  habits: Habit[];
  records: HabitRecord;
  wellness: WellnessRecord;
  onToggleRecord: (habitId: string, year: number, month: number, day: number) => void;
  onUpdateWellness: (year: number, month: number, day: number, type: 'mood' | 'sleep', value: number | null) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number; // 0-indexed (0 = Jan, 11 = Dec)
  setSelectedMonth: (month: number) => void;
  colors: ThemeColors;
  theme: ThemeType;
}

export default function SpreadsheetView({
  habits,
  records,
  wellness,
  onToggleRecord,
  onUpdateWellness,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  colors,
  theme
}: SpreadsheetViewProps) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate current streak backward from today
  const getStreak = (habitId: string) => {
    let streak = 0;
    const today = new Date();
    const tempDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const getTodayKey = `${habitId}-${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;
    const todayCompleted = records[getTodayKey] === true;

    if (todayCompleted) {
      streak = 1;
      while (true) {
        tempDate.setDate(tempDate.getDate() - 1);
        const key = `${habitId}-${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;
        if (records[key] === true) {
          streak++;
        } else {
          break;
        }
      }
    } else {
      // Check yesterday
      tempDate.setDate(tempDate.getDate() - 1);
      const yesterdayKey = `${habitId}-${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;
      const yesterdayCompleted = records[yesterdayKey] === true;

      if (yesterdayCompleted) {
        streak = 1;
        while (true) {
          tempDate.setDate(tempDate.getDate() - 1);
          const key = `${habitId}-${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;
          if (records[key] === true) {
            streak++;
          } else {
            break;
          }
        }
      }
    }
    return streak;
  };

  // Helper to get number of days in the selected month
  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedYear, selectedMonth]);

  // Generate weekday names for the days of the selected month
  const calendarDays = useMemo(() => {
    const days = [];
    const weekdayAbbrs = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(selectedYear, selectedMonth, d);
      const dayOfWeek = date.getDay();
      days.push({
        dayNumber: d,
        weekday: weekdayAbbrs[dayOfWeek]
      });
    }
    return days;
  }, [selectedYear, selectedMonth, daysInMonth]);

  // Group calendar days into Week 1, Week 2, Week 3, Week 4, Week 5
  const weeks = useMemo(() => {
    const weekGroups: { name: string; cols: typeof calendarDays }[] = [
      { name: 'Week 1', cols: [] },
      { name: 'Week 2', cols: [] },
      { name: 'Week 3', cols: [] },
      { name: 'Week 4', cols: [] },
      { name: 'Week 5', cols: [] }
    ];

    calendarDays.forEach((day) => {
      const d = day.dayNumber;
      if (d <= 7) {
        weekGroups[0].cols.push(day);
      } else if (d <= 14) {
        weekGroups[1].cols.push(day);
      } else if (d <= 21) {
        weekGroups[2].cols.push(day);
      } else if (d <= 28) {
        weekGroups[3].cols.push(day);
      } else {
        weekGroups[4].cols.push(day);
      }
    });

    // Filter out empty week groups (e.g. if Feb has exactly 28 days, Week 5 is empty)
    return weekGroups.filter((w) => w.cols.length > 0);
  }, [calendarDays]);

  const getRecordKey = (habitId: string, day: number) => {
    return `${habitId}-${selectedYear}-${selectedMonth + 1}-${day}`;
  };

  const getWellnessKey = (day: number) => {
    return `${selectedYear}-${selectedMonth + 1}-${day}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Spreadsheet Controls */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border text-left ${colors.secondaryBg} ${colors.border}`}>
        <div className="space-y-1">
          <span className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'geometric-balance' ? 'text-indigo-600' : 'text-emerald-500'}`}>Spreadsheet Matrix</span>
          <h3 className={`text-lg font-bold flex items-center gap-1.5 ${colors.textPrimary}`}>
            <Calendar className={`w-5 h-5 ${theme === 'geometric-balance' ? 'text-indigo-600' : 'text-emerald-500'}`} />
            Active Sheet: {months[selectedMonth]} {selectedYear}
          </h3>
        </div>

        {/* Year and Quick Controls */}
        <div className="flex items-center gap-3">
          {/* Year select */}
          <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded border text-xs ${colors.secondaryBg} ${colors.border} ${colors.textPrimary}`}>
            <span className={`${theme === 'geometric-balance' ? 'text-slate-400' : 'text-zinc-500'} font-mono`}>Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent border-none focus:outline-none cursor-pointer font-bold pr-4"
            >
              <option value={2026} className={`${theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}`}>2026</option>
              <option value={2027} className={`${theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}`}>2027</option>
              <option value={2028} className={`${theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}`}>2028</option>
            </select>
          </div>

          <div className={`flex items-center rounded border ${colors.secondaryBg} ${colors.border}`}>
            <button
              onClick={() => setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1)}
              className={`p-1.5 transition cursor-pointer ${theme === 'geometric-balance' ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
              title="Prev Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className={`h-4 w-px ${theme === 'geometric-balance' ? 'bg-slate-200' : 'bg-zinc-800'}`} />
            <button
              onClick={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)}
              className={`p-1.5 transition cursor-pointer ${theme === 'geometric-balance' ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Datagrid Container */}
      <div className={`rounded-2xl border overflow-hidden shadow-xl ${colors.gridBg} ${colors.border}`}>
        <div className="overflow-x-auto select-none">
          <table className="w-full border-collapse">
            <thead>
              {/* Week Spanning Headers */}
              <tr className={`border-b text-[10px] font-mono tracking-wider font-bold ${colors.gridHeaderBg} ${colors.border} ${colors.textSecondary}`}>
                <th className={`p-3 border-r ${colors.border} min-w-[200px] text-left`}>HABITS & ROUTINES</th>
                {weeks.map((week, index) => (
                  <th
                    key={index}
                    colSpan={week.cols.length}
                    className={`p-1.5 text-center border-r ${colors.border} ${theme === 'geometric-balance' ? 'bg-slate-100/80 text-slate-800 font-bold' : 'bg-zinc-900 text-white'} text-xs`}
                  >
                    {week.name}
                  </th>
                ))}
              </tr>

              {/* Day-of-week letter headers */}
              <tr className={`border-b text-[10px] font-mono ${colors.gridHeaderBg} ${colors.border} ${colors.textSecondary}`}>
                <th className={`p-2 border-r ${colors.border} text-left`}>DAYS</th>
                {calendarDays.map((day) => (
                  <th
                    key={day.dayNumber}
                    className={`p-1.5 text-center border-r w-8 ${colors.border}`}
                  >
                    {day.weekday}
                  </th>
                ))}
              </tr>

              {/* Day numbers */}
              <tr className={`border-b text-xs font-mono ${colors.gridHeaderBg} ${colors.border} ${colors.textPrimary}`}>
                <th className={`p-2 border-r ${colors.border} text-left`}>DATE</th>
                {calendarDays.map((day) => (
                  <th
                    key={day.dayNumber}
                    className={`p-1.5 text-center border-r w-8 font-bold ${colors.border}`}
                  >
                    {day.dayNumber}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={`divide-y ${colors.border}`}>
              {/* Habits Rows */}
              {habits.map((habit) => {
                // Decide cell styling based on category for 'geometric-balance'
                let firstColStyle = `p-3 border-r ${colors.border} font-semibold text-xs flex items-center gap-2 ${colors.textPrimary}`;
                if (theme === 'geometric-balance') {
                  if (habit.category === 'health') {
                    firstColStyle = `p-3 border-r ${colors.border} font-medium text-xs flex items-center gap-2 text-emerald-600 bg-emerald-50/30`;
                  } else if (habit.category === 'mind' || habit.category === 'work') {
                    firstColStyle = `p-3 border-r ${colors.border} font-medium text-xs flex items-center gap-2 text-indigo-600 bg-indigo-50/30`;
                  } else {
                    firstColStyle = `p-3 border-r ${colors.border} font-medium text-xs flex items-center gap-2 text-orange-600 bg-orange-50/30`;
                  }
                }

                return (
                  <tr
                    key={habit.id}
                    className={`transition-colors group text-left ${theme === 'geometric-balance' ? 'hover:bg-slate-50' : 'hover:bg-zinc-900/40'}`}
                  >
                    <td className={firstColStyle}>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-sm p-1 rounded-md border shrink-0 ${theme === 'geometric-balance' ? 'bg-slate-100 border-slate-200/50' : 'bg-zinc-900 border-zinc-800'}`}>{habit.emoji}</span>
                        <div className="flex flex-col min-w-0 leading-tight text-left">
                          <span className="truncate max-w-[150px] font-semibold text-xs text-slate-700 dark:text-zinc-100">{habit.name}</span>
                          {(() => {
                            const streakVal = getStreak(habit.id);
                            return streakVal > 0 ? (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-500 font-mono mt-0.5 animate-pulse">
                                🔥 {streakVal}d streak
                              </span>
                            ) : (
                              <span className={`text-[9px] font-mono mt-0.5 ${theme === 'geometric-balance' ? 'text-slate-400' : 'text-zinc-500'}`}>
                                0d streak
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </td>

                    {calendarDays.map((day) => {
                      const recKey = getRecordKey(habit.id, day.dayNumber);
                      const isCompleted = records[recKey] === true;

                      // Checkbox visual styling
                      let checkboxClass = '';
                      if (isCompleted) {
                        if (theme === 'geometric-balance') {
                          if (habit.category === 'health') {
                            checkboxClass = 'bg-emerald-500 border-emerald-500 text-white shadow-sm';
                          } else if (habit.category === 'mind' || habit.category === 'work') {
                            checkboxClass = 'bg-indigo-500 border-indigo-500 text-white shadow-sm';
                          } else {
                            checkboxClass = 'bg-orange-500 border-orange-500 text-white shadow-sm';
                          }
                        } else {
                          checkboxClass = `${colors.progressColor} text-white border-transparent`;
                        }
                      } else {
                        if (theme === 'geometric-balance') {
                          checkboxClass = 'border-2 border-slate-200 bg-white hover:border-slate-300';
                        } else {
                          checkboxClass = 'border-zinc-700 bg-zinc-900 hover:border-zinc-500';
                        }
                      }

                      return (
                        <td
                          key={day.dayNumber}
                          className={`p-1.5 text-center border-r w-8 transition-colors ${colors.border} ${
                            isCompleted && theme === 'geometric-balance' ? 'bg-slate-50/50' : isCompleted ? 'bg-[#10b981]/5' : ''
                          }`}
                        >
                          <button
                            onClick={() => onToggleRecord(habit.id, selectedYear, selectedMonth + 1, day.dayNumber)}
                            className={`w-6 h-6 rounded flex items-center justify-center transition cursor-pointer mx-auto ${checkboxClass}`}
                          >
                            {isCompleted && (
                              <span className="text-[11px] font-extrabold">✓</span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Spacing divider cell to align stats */}
              <tr className={`${colors.gridHeaderBg} text-left`}>
                <td
                  colSpan={daysInMonth + 1}
                  className={`p-2 border-t border-b ${colors.border} text-[10px] font-mono tracking-widest ${colors.textSecondary} font-bold uppercase pl-4`}
                >
                  Overall Wellness logging
                </td>
              </tr>

              {/* Mood row at bottom */}
              <tr className={`text-left ${theme === 'geometric-balance' ? 'hover:bg-slate-50' : 'hover:bg-zinc-900/40'}`}>
                <td className="p-3 border-r font-semibold text-xs flex items-center gap-2 text-slate-700 dark:text-white">
                  <span className={`text-sm p-1 rounded-md border ${theme === 'geometric-balance' ? 'bg-slate-100 border-slate-200/50' : 'bg-zinc-900 border-zinc-800'}`}>🟢</span>
                  <span>Daily Mood</span>
                </td>

                {calendarDays.map((day) => {
                  const key = getWellnessKey(day.dayNumber);
                  const activeMood = wellness[key]?.mood;

                  return (
                    <td
                      key={day.dayNumber}
                      className={`p-1 border-r w-8 text-center ${colors.border}`}
                    >
                      <select
                        value={activeMood || ''}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          onUpdateWellness(selectedYear, selectedMonth + 1, day.dayNumber, 'mood', val);
                        }}
                        className={`text-[10px] font-bold border rounded p-1 w-7 focus:outline-none focus:border-emerald-500 cursor-pointer text-center appearance-none ${
                          theme === 'geometric-balance'
                            ? 'bg-white border-slate-200 text-emerald-600'
                            : 'bg-zinc-900 border-zinc-800 text-emerald-400'
                        }`}
                      >
                        <option value="">-</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>

              {/* Sleep Hours row at bottom */}
              <tr className={`text-left ${theme === 'geometric-balance' ? 'hover:bg-slate-50' : 'hover:bg-zinc-900/40'}`}>
                <td className="p-3 border-r font-semibold text-xs flex items-center gap-2 text-slate-700 dark:text-white">
                  <span className={`text-sm p-1 rounded-md border ${theme === 'geometric-balance' ? 'bg-slate-100 border-slate-200/50' : 'bg-zinc-900 border-zinc-800'}`}>💤</span>
                  <span>Sleep Hours</span>
                </td>

                {calendarDays.map((day) => {
                  const key = getWellnessKey(day.dayNumber);
                  const activeSleep = wellness[key]?.sleep;

                  return (
                    <td
                      key={day.dayNumber}
                      className={`p-1 border-r w-8 text-center ${colors.border}`}
                    >
                      <select
                        value={activeSleep || ''}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          onUpdateWellness(selectedYear, selectedMonth + 1, day.dayNumber, 'sleep', val);
                        }}
                        className={`text-[10px] font-bold border rounded p-1 w-7 focus:outline-none focus:border-indigo-500 cursor-pointer text-center appearance-none ${
                          theme === 'geometric-balance'
                            ? 'bg-white border-slate-200 text-indigo-600'
                            : 'bg-zinc-900 border-zinc-800 text-blue-400'
                        }`}
                      >
                        <option value="">-</option>
                        {[...Array(15)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Horizontal Monthly Tabs (Excel Spreadsheet Style) */}
        <div className={`border-t flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide py-1.5 px-3 ${colors.secondaryBg} ${colors.border}`}>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 border-r mr-2 ${colors.border} ${colors.textSecondary}`}>
              Monthly Sheets
            </span>
            {months.map((m, idx) => {
              const isActive = selectedMonth === idx;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(idx)}
                  className={`text-[11px] font-medium py-1 px-3.5 rounded-md cursor-pointer transition flex items-center gap-1.5 border ${
                    isActive
                      ? theme === 'geometric-balance'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-600 font-bold shadow-sm'
                        : 'bg-[#1a1a1a] border-[#10b981] text-[#10b981] font-bold shadow-md'
                      : theme === 'geometric-balance'
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-zinc-900/30 hover:bg-zinc-800 border-zinc-800/60 text-zinc-400'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? (theme === 'geometric-balance' ? 'bg-indigo-600' : 'bg-[#10b981]') : 'bg-transparent'}`} />
                  <span>{m.substring(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
