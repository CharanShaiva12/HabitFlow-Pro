import React, { useMemo } from 'react';
import { Award, CheckSquare, RefreshCw, Star, TrendingUp, Heart, BatteryCharging, Zap } from 'lucide-react';
import { Habit, HabitRecord, WellnessRecord, ThemeColors, ThemeType } from '../types';

interface DashboardViewProps {
  habits: Habit[];
  records: HabitRecord;
  wellness: WellnessRecord;
  selectedYear: number;
  selectedMonth: number;
  colors?: ThemeColors;
  theme?: ThemeType;
}

export default function DashboardView({
  habits,
  records,
  wellness,
  selectedYear,
  selectedMonth,
  colors,
  theme
}: DashboardViewProps) {
  // Safe default colors if not provided
  const activeColors = colors || {
    primaryBg: 'bg-zinc-950',
    secondaryBg: 'bg-zinc-900',
    accentColor: 'border-emerald-500 text-emerald-500',
    accentText: 'text-emerald-500',
    border: 'border-zinc-800',
    gridHeaderBg: 'bg-[#252526]',
    gridBg: 'bg-[#1e1e1e]',
    gridActiveBg: 'bg-[#2d2d30]',
    textPrimary: 'text-[#e1e1e6]',
    textSecondary: 'text-[#8e8e93]',
    progressColor: 'bg-emerald-500',
    cardBg: 'bg-zinc-900/50'
  } as ThemeColors;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedYear, selectedMonth]);

  // Key map helper
  const getRecordKey = (habitId: string, day: number) => {
    return `${habitId}-${selectedYear}-${selectedMonth + 1}-${day}`;
  };

  const getWellnessKey = (day: number) => {
    return `${selectedYear}-${selectedMonth + 1}-${day}`;
  };

  // 1. Calculate General Overall Metrics
  const metrics = useMemo(() => {
    if (habits.length === 0) return { totalGoal: 0, completed: 0, left: 0, rate: 0 };
    
    let totalGoal = habits.length * daysInMonth;
    let completed = 0;

    habits.forEach((habit) => {
      for (let d = 1; d <= daysInMonth; d++) {
        const key = getRecordKey(habit.id, d);
        if (records[key] === true) {
          completed++;
        }
      }
    });

    const left = totalGoal - completed;
    const rate = totalGoal > 0 ? Math.round((completed / totalGoal) * 100) : 0;

    return { totalGoal, completed, left, rate };
  }, [habits, records, daysInMonth, selectedYear, selectedMonth]);

  // 2. Calculate Daily Completion Percentages (for Daily Progress chart)
  const dailyProgress = useMemo(() => {
    const list = [];
    for (let d = 1; d <= daysInMonth; d++) {
      let completedOnDay = 0;
      habits.forEach((habit) => {
        const key = getRecordKey(habit.id, d);
        if (records[key] === true) {
          completedOnDay++;
        }
      });
      const percent = habits.length > 0 ? Math.round((completedOnDay / habits.length) * 100) : 0;
      
      // Get weekday abbreviation
      const date = new Date(selectedYear, selectedMonth, d);
      const weekdayAbbrs = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      const dayName = weekdayAbbrs[date.getDay()];

      list.push({
        dayNumber: d,
        dayName,
        percent
      });
    }
    return list;
  }, [habits, records, daysInMonth, selectedYear, selectedMonth]);

  // 3. Calculate Weekly Progress averages
  const weeklyProgress = useMemo(() => {
    const weeks = [
      { name: 'week 1', days: [1, 2, 3, 4, 5, 6, 7] },
      { name: 'week 2', days: [8, 9, 10, 11, 12, 13, 14] },
      { name: 'week 3', days: [15, 16, 17, 18, 19, 20, 21] },
      { name: 'week 4', days: [22, 23, 24, 25, 26, 27, 28] },
      { name: 'week 5', days: [] as number[] }
    ];

    for (let d = 29; d <= daysInMonth; d++) {
      weeks[4].days.push(d);
    }

    return weeks.map((w) => {
      let totalCells = habits.length * w.days.length;
      let completedCells = 0;

      if (totalCells === 0) return { name: w.name, percent: 0 };

      habits.forEach((habit) => {
        w.days.forEach((d) => {
          const key = getRecordKey(habit.id, d);
          if (records[key] === true) {
            completedCells++;
          }
        });
      });

      return {
        name: w.name,
        percent: Math.round((completedCells / totalCells) * 100)
      };
    });
  }, [habits, records, daysInMonth, selectedYear, selectedMonth]);

  // 4. Calculate Habit Specific Statistics (for Analysis Table)
  const habitAnalysis = useMemo(() => {
    return habits.map((habit) => {
      let actual = 0;
      for (let d = 1; d <= daysInMonth; d++) {
        const key = getRecordKey(habit.id, d);
        if (records[key] === true) {
          actual++;
        }
      }
      const left = daysInMonth - actual;
      const pct = Math.round((actual / daysInMonth) * 100);

      return {
        ...habit,
        goal: daysInMonth,
        actual,
        left,
        percent: pct
      };
    }).sort((a, b) => b.percent - a.percent); // Sort highest completion first for TOP habits ranking!
  }, [habits, records, daysInMonth, selectedYear, selectedMonth]);

  // Top 10 Habits list
  const topTenHabits = useMemo(() => {
    return habitAnalysis.slice(0, 10);
  }, [habitAnalysis]);

  // Calculate SVGs dimension helper for lines
  const wellnessTimeline = useMemo(() => {
    const list = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const key = getWellnessKey(d);
      const dayWellness = wellness[key] || { mood: null, sleep: null };
      list.push({
        day: d,
        mood: dayWellness.mood || 0,
        sleep: dayWellness.sleep || 0
      });
    }
    return list;
  }, [wellness, daysInMonth, selectedYear, selectedMonth]);

  // SVG drawing dimensions for line charts
  const svgWidth = 800;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 25;

  const getCoordinates = (dayIndex: number, val: number, maxVal: number) => {
    const x = paddingX + (dayIndex / (daysInMonth - 1)) * (svgWidth - paddingX * 2);
    // Invert Y coordinate so higher values are drawn higher up
    const y = svgHeight - paddingY - (val / maxVal) * (svgHeight - paddingY * 2);
    return { x, y };
  };

  // Generate SVG paths for Sleep & Mood
  const moodPath = useMemo(() => {
    if (daysInMonth < 2) return '';
    let path = '';
    wellnessTimeline.forEach((pt, idx) => {
      const { x, y } = getCoordinates(idx, pt.mood, 10);
      if (idx === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    return path;
  }, [wellnessTimeline, daysInMonth]);

  const sleepPath = useMemo(() => {
    if (daysInMonth < 2) return '';
    let path = '';
    wellnessTimeline.forEach((pt, idx) => {
      const { x, y } = getCoordinates(idx, pt.sleep, 15); // Assume max sleep hours is 15
      if (idx === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    return path;
  }, [wellnessTimeline, daysInMonth]);

  return (
    <div className="space-y-6 text-left">
      {/* Top Section: Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Daily Progress Bar Chart */}
        <div className={`lg:col-span-8 border rounded-2xl p-5 space-y-4 ${activeColors.cardBg} ${activeColors.border}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-bold font-mono uppercase tracking-widest ${activeColors.textSecondary}`}>Daily Progress</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded border ${
              theme === 'geometric-balance'
                ? 'bg-indigo-50 border-indigo-100 text-indigo-600'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              {months[selectedMonth]} {selectedYear}
            </span>
          </div>

          <div className={`h-[200px] flex items-end justify-between gap-1 pt-4 border-b select-none pb-1 overflow-x-auto ${activeColors.border}`}>
            {dailyProgress.map((dp) => (
              <div key={dp.dayNumber} className="flex-1 flex flex-col items-center group min-w-[14px]">
                {/* Hover Tooltip */}
                <div className={`absolute transform -translate-y-12 text-[9px] font-mono px-1.5 py-0.5 rounded border opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none whitespace-nowrap z-10 shadow-md ${
                  theme === 'geometric-balance' ? 'bg-slate-800 text-white border-slate-700' : 'bg-zinc-950 text-white border-zinc-700'
                }`}>
                  Day {dp.dayNumber}: {dp.percent}%
                </div>

                {/* Progress bar container */}
                <div className={`w-full rounded h-[140px] flex items-end ${
                  theme === 'geometric-balance' ? 'bg-slate-100' : 'bg-zinc-800/40'
                }`}>
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      theme === 'geometric-balance'
                        ? 'bg-indigo-600 group-hover:bg-indigo-500'
                        : 'bg-emerald-500 group-hover:bg-emerald-400'
                    }`}
                    style={{ height: `${dp.percent}%` }}
                  />
                </div>

                {/* Day labels */}
                <span className={`text-[9px] font-mono mt-1.5 leading-none ${activeColors.textSecondary}`}>
                  {dp.dayName}
                </span>
                <span className={`text-[8px] font-mono scale-90 ${activeColors.textSecondary}`}>
                  {dp.dayNumber}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Progress Bar Chart */}
        <div className={`lg:col-span-4 border rounded-2xl p-5 flex flex-col justify-between space-y-4 ${activeColors.cardBg} ${activeColors.border}`}>
          <h3 className={`text-xs font-bold font-mono uppercase tracking-widest ${activeColors.textSecondary}`}>Weekly Progress</h3>

          <div className={`flex-1 h-[140px] flex items-end justify-around pt-4 border-b select-none pb-1 ${activeColors.border}`}>
            {weeklyProgress.map((wp) => (
              <div key={wp.name} className="flex flex-col items-center group w-12">
                <div className={`absolute transform -translate-y-12 text-[9px] font-mono px-1.5 py-0.5 rounded border opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none whitespace-nowrap z-10 shadow-md ${
                  theme === 'geometric-balance' ? 'bg-slate-800 text-white border-slate-700' : 'bg-zinc-950 text-white border-zinc-700'
                }`}>
                  Avg: {wp.percent}%
                </div>

                <div className={`w-6 rounded h-[120px] flex items-end ${
                  theme === 'geometric-balance' ? 'bg-slate-100' : 'bg-zinc-800/40'
                }`}>
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      theme === 'geometric-balance'
                        ? 'bg-indigo-600 group-hover:bg-indigo-500'
                        : 'bg-blue-500 group-hover:bg-blue-400'
                    }`}
                    style={{ height: `${wp.percent}%` }}
                  />
                </div>

                <span className={`text-[10px] font-mono mt-2 leading-none uppercase scale-90 ${activeColors.textPrimary}`}>
                  {wp.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section: Metrics Bento and Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Overall Stats gauge & Goal tracking */}
        <div className={`lg:col-span-4 border rounded-2xl p-5 flex flex-col justify-between gap-5 ${activeColors.cardBg} ${activeColors.border}`}>
          <div>
            <h3 className={`text-xs font-bold font-mono uppercase tracking-widest ${activeColors.textSecondary}`}>Overall Stats</h3>
            <p className={`text-[11px] mt-0.5 ${activeColors.textSecondary}`}>Summary of habits across the whole month sheet.</p>
          </div>

          {/* SVG Progress Circle Gauge */}
          <div className="flex items-center justify-center relative py-2">
            <svg className="w-36 h-36" viewBox="0 0 100 100">
              {/* Backing Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={theme === 'geometric-balance' ? "#f1f5f9" : "#1c1c1e"}
                strokeWidth="8"
              />
              {/* Highlight Progress */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={theme === 'geometric-balance' ? "#4f46e5" : "#10b981"}
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * metrics.rate) / 100}
                strokeLinecap="round"
                className="transition-all duration-500 origin-center -rotate-90"
              />
            </svg>
            {/* Center percentage text */}
            <div className="absolute text-center">
              <span className={`text-3xl font-extrabold leading-none font-mono ${activeColors.textPrimary}`}>{metrics.rate}%</span>
              <span className={`block text-[10px] font-mono uppercase tracking-widest mt-0.5 ${activeColors.textSecondary}`}>Completed</span>
            </div>
          </div>

          {/* Metric Details Cards */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className={`p-2.5 rounded-lg border ${theme === 'geometric-balance' ? 'bg-slate-50/50 border-slate-200' : 'bg-zinc-950 border-zinc-800/80'}`}>
              <span className={`block text-[9px] uppercase font-bold mb-1 ${activeColors.textSecondary}`}>Goal</span>
              <span className={`text-sm font-bold ${activeColors.textPrimary}`}>{metrics.totalGoal}</span>
            </div>
            <div className={`p-2.5 rounded-lg border ${theme === 'geometric-balance' ? 'bg-emerald-50/30 border-emerald-100' : 'bg-zinc-950 border-zinc-800/80'}`}>
              <span className={`block text-[9px] uppercase font-bold mb-1 ${theme === 'geometric-balance' ? 'text-emerald-600' : 'text-zinc-500'}`}>Done</span>
              <span className={`text-sm font-bold ${theme === 'geometric-balance' ? 'text-emerald-600' : 'text-emerald-400'}`}>{metrics.completed}</span>
            </div>
            <div className={`p-2.5 rounded-lg border ${theme === 'geometric-balance' ? 'bg-rose-50/30 border-rose-100' : 'bg-zinc-950 border-zinc-800/80'}`}>
              <span className={`block text-[9px] uppercase font-bold mb-1 ${theme === 'geometric-balance' ? 'text-rose-600' : 'text-zinc-500'}`}>Left</span>
              <span className={`text-sm font-bold ${theme === 'geometric-balance' ? 'text-rose-600' : 'text-rose-400'}`}>{metrics.left}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Analysis Table Grid with Progress Bars */}
        <div className={`lg:col-span-8 border rounded-2xl p-5 flex flex-col justify-between space-y-4 ${activeColors.cardBg} ${activeColors.border}`}>
          <div className={`flex items-center justify-between border-b pb-2 ${activeColors.border}`}>
            <h3 className={`text-xs font-bold font-mono uppercase tracking-widest ${activeColors.textSecondary}`}>Habit Analysis Sheet</h3>
            <span className={`text-[10px] font-mono ${activeColors.textSecondary}`}>Monthly Performance</span>
          </div>

          <div className="overflow-x-auto flex-1 max-h-[300px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`border-b text-[9px] font-mono uppercase tracking-widest text-left ${activeColors.border} ${activeColors.textSecondary}`}>
                  <th className="pb-2">Habit Name</th>
                  <th className="pb-2 text-center w-12">Goal</th>
                  <th className="pb-2 text-center w-12">Actual</th>
                  <th className="pb-2 text-center w-12">Left</th>
                  <th className="pb-2 min-w-[120px] pl-4">Progress Bar</th>
                  <th className="pb-2 text-right w-12">%</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'geometric-balance' ? 'divide-slate-100' : 'divide-zinc-800/40'}`}>
                {habitAnalysis.map((ha) => (
                  <tr key={ha.id} className={`text-xs ${theme === 'geometric-balance' ? 'hover:bg-slate-50' : 'hover:bg-zinc-950/20'}`}>
                    <td className={`py-2.5 font-bold flex items-center gap-1.5 ${activeColors.textPrimary}`}>
                      <span>{ha.emoji}</span>
                      <span className="truncate max-w-[140px]">{ha.name}</span>
                    </td>
                    <td className={`py-2.5 text-center font-mono ${activeColors.textSecondary}`}>{ha.goal}</td>
                    <td className="py-2.5 text-center font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{ha.actual}</td>
                    <td className="py-2.5 text-center font-mono text-rose-500">{ha.left}</td>
                    <td className="py-2.5 pl-4">
                      {/* Horizontal progress bar color-coded based on category */}
                      <div className={`w-full h-2 rounded-full overflow-hidden p-0.5 border ${theme === 'geometric-balance' ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-zinc-800/60'}`}>
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${ha.percent}%`,
                            backgroundColor: ha.category === 'health' ? '#10b981' : ha.category === 'mind' || ha.category === 'work' ? '#4f46e5' : ha.color || '#f97316'
                          }}
                        />
                      </div>
                    </td>
                    <td className={`py-2.5 text-right font-mono font-bold ${activeColors.textPrimary}`}>{ha.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Wellness & Top Habits section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Overall Wellness Line Graph (Mood & Sleep) */}
        <div className={`lg:col-span-8 border rounded-2xl p-5 space-y-4 flex flex-col justify-between ${activeColors.cardBg} ${activeColors.border}`}>
          <div className={`flex items-center justify-between border-b pb-2 ${activeColors.border}`}>
            <div>
              <h3 className={`text-xs font-bold font-mono uppercase tracking-widest ${activeColors.textSecondary}`}>Overall Wellness Trends</h3>
              <p className={`text-[10px] mt-0.5 ${activeColors.textSecondary}`}>Correlation between your daily mood ratings and sleep duration.</p>
            </div>
            
            {/* Color key */}
            <div className={`flex items-center gap-3 text-[10px] font-mono ${activeColors.textSecondary}`}>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span>Mood (1-10)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                <span>Sleep (hrs)</span>
              </div>
            </div>
          </div>

          {/* Custom SVG Line graph */}
          <div className="pt-2">
            <svg className="w-full h-[180px]" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = paddingY + ratio * (svgHeight - paddingY * 2);
                return (
                  <line
                    key={ratio}
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke={theme === 'geometric-balance' ? "#e2e8f0" : "#1c1c1e"}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* DRAW LINES */}
              {moodPath && (
                <path
                  d={moodPath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {sleepPath && (
                <path
                  d={sleepPath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Dots on line vertices */}
              {wellnessTimeline.map((pt, idx) => {
                const moodCoord = getCoordinates(idx, pt.mood, 10);
                const sleepCoord = getCoordinates(idx, pt.sleep, 15);
                
                return (
                  <g key={pt.day}>
                    {pt.mood > 0 && (
                      <circle
                        cx={moodCoord.x}
                        cy={moodCoord.y}
                        r="3.5"
                        fill="#10b981"
                        className="hover:r-5 transition-all"
                      />
                    )}
                    {pt.sleep > 0 && (
                      <circle
                        cx={sleepCoord.x}
                        cy={sleepCoord.y}
                        r="3.5"
                        fill="#3b82f6"
                        className="hover:r-5 transition-all"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* X Axis days marking */}
            <div className={`flex justify-between text-[9px] font-mono px-8 pt-1 ${activeColors.textSecondary}`}>
              <span>Day 1</span>
              <span>Day {Math.round(daysInMonth / 2)}</span>
              <span>Day {daysInMonth}</span>
            </div>
          </div>
        </div>

        {/* Top 10 Habits Streaks / Leaderboard */}
        <div className={`lg:col-span-4 border rounded-2xl p-5 flex flex-col justify-between gap-4 ${activeColors.cardBg} ${activeColors.border}`}>
          <h3 className={`text-xs font-bold font-mono uppercase tracking-widest ${activeColors.textSecondary}`}>TOP 10 HABITS</h3>
          
          <div className="flex-1 space-y-2">
            {topTenHabits.map((h, index) => (
              <div key={h.id} className={`flex items-center justify-between text-xs py-1 border-b last:border-0 ${theme === 'geometric-balance' ? 'border-slate-100' : 'border-zinc-800/50'}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[10px] font-bold w-4 ${activeColors.textSecondary}`}>
                    {index + 1}
                  </span>
                  <span className="text-sm">{h.emoji}</span>
                  <span className={`font-bold truncate max-w-[140px] ${activeColors.textPrimary}`}>{h.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-mono ${activeColors.textSecondary}`}>{h.actual} days</span>
                  <span className={`font-bold font-mono px-1.5 py-0.5 rounded text-[10px] ${
                    theme === 'geometric-balance'
                      ? 'text-emerald-600 bg-emerald-50 border border-emerald-200'
                      : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  }`}>
                    {h.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
