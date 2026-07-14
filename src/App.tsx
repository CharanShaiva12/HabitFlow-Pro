import React, { useState, useEffect } from 'react';
import { LayoutGrid, BarChart3, GraduationCap, Cloud, Settings, BookOpen, Layers, User, CalendarDays, Laptop } from 'lucide-react';
import { Habit, HabitRecord, WellnessRecord, DsaModule, ThemeType, AppData } from './types';
import { DEFAULT_HABITS, DEFAULT_DSA_MODULES, THEME_PALETTES } from './defaultData';

// Modular View Imports
import SpreadsheetView from './components/SpreadsheetView';
import DashboardView from './components/DashboardView';
import DsaTrackerView from './components/DsaTrackerView';
import CloudSyncView from './components/CloudSyncView';
import SettingsView from './components/SettingsView';
import BeginnersGuide from './components/BeginnersGuide';

export default function App() {
  // State Initialization with local persistence
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habit_tracker_habits');
    return saved ? JSON.parse(saved) : DEFAULT_HABITS;
  });

  const [records, setRecords] = useState<HabitRecord>(() => {
    const saved = localStorage.getItem('habit_tracker_records');
    return saved ? JSON.parse(saved) : {};
  });

  const [wellness, setWellness] = useState<WellnessRecord>(() => {
    const saved = localStorage.getItem('habit_tracker_wellness');
    return saved ? JSON.parse(saved) : {};
  });

  const [dsaModules, setDsaModules] = useState<DsaModule[]>(() => {
    const saved = localStorage.getItem('habit_tracker_dsa_modules');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as DsaModule[];
        // Merge default list to incorporate all new curated items while retaining completed states
        const merged = DEFAULT_DSA_MODULES.map((defMod) => {
          const userMod = parsed.find(
            (m) => m.leetcodeUrl === defMod.leetcodeUrl || m.topic.toLowerCase() === defMod.topic.toLowerCase()
          );
          return userMod ? { ...defMod, completed: userMod.completed } : defMod;
        });
        // Retain custom topics added by the user
        const customMods = parsed.filter((m) => m.id.startsWith('custom-'));
        return [...merged, ...customMods];
      } catch (e) {
        console.error('Error parsing saved dsa modules:', e);
        return DEFAULT_DSA_MODULES;
      }
    }
    return DEFAULT_DSA_MODULES;
  });

  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('habit_tracker_theme');
    return (saved as ThemeType) || 'geometric-balance';
  });

  // Active view tabs: 'spreadsheet' | 'dashboard' | 'dsa' | 'cloud' | 'settings' | 'guide'
  const [activeTab, setActiveTab] = useState<string>('spreadsheet');

  // Currently selected Year & Month (for sheet rendering)
const [selectedMonth, setSelectedMonth] = useState(0);
const [selectedYear, setSelectedYear] = useState(0);

useEffect(() => {
  const now = new Date();

  setSelectedMonth(now.getMonth());
  setSelectedYear(now.getFullYear());

  console.log("Current Month:", now.getMonth());
  console.log("Current Year:", now.getFullYear());
}, []);
  // Auto-Save listeners
  useEffect(() => {
    localStorage.setItem('habit_tracker_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habit_tracker_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('habit_tracker_wellness', JSON.stringify(wellness));
  }, [wellness]);

  useEffect(() => {
    localStorage.setItem('habit_tracker_dsa_modules', JSON.stringify(dsaModules));
  }, [dsaModules]);

  useEffect(() => {
    localStorage.setItem('habit_tracker_theme', theme);
  }, [theme]);

  // Sync state back to our Cloud Simulator if auto-sync is enabled
  useEffect(() => {
    const isAutoSync = localStorage.getItem('sync_auto_enabled') === 'true';
    const email = localStorage.getItem('sync_user_email');
    if (isAutoSync && email) {
      const payload: AppData = { habits, records, wellness, dsaModules, theme };
      localStorage.setItem(`cloud_data_backup_${email}`, JSON.stringify(payload));
      console.log('[Cloud Sync Engine] Backed up state upstream.');
    }
  }, [habits, records, wellness, dsaModules, theme]);

  // Core Mutation Handlers
  const handleToggleRecord = (habitId: string, year: number, month: number, day: number) => {
    const key = `${habitId}-${year}-${month}-${day}`;
    setRecords((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleUpdateWellness = (
    year: number,
    month: number,
    day: number,
    type: 'mood' | 'sleep',
    value: number | null
  ) => {
    const key = `${year}-${month}-${day}`;
    setWellness((prev) => {
      const current = prev[key] || { mood: null, sleep: null };
      return {
        ...prev,
        [key]: {
          ...current,
          [type]: value
        }
      };
    });
  };

  const handleToggleDsaModule = (id: string) => {
    setDsaModules((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, completed: !mod.completed } : mod))
    );
  };

  const handleAddDsaModule = (newMod: Omit<DsaModule, 'id' | 'completed'>) => {
    const moduleWithId: DsaModule = {
      ...newMod,
      id: 'custom-dsa-' + Date.now(),
      completed: false
    };
    setDsaModules((prev) => [...prev, moduleWithId]);
  };

  const handleAddHabit = (name: string, emoji: string, category: string, color: string) => {
    const newHabit: Habit = {
      id: 'custom-habit-' + Date.now(),
      name,
      emoji: emoji || '🎯',
      category: category as any,
      color
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const handleImportJson = (data: AppData) => {
    if (data.habits) setHabits(data.habits);
    if (data.records) setRecords(data.records);
    if (data.wellness) setWellness(data.wellness);
    if (data.dsaModules) setDsaModules(data.dsaModules);
    if (data.theme) setTheme(data.theme);
  };

  // CSV Generator for Quarterly Excel Analysis
  const handleExportCsv = () => {
    const headers = ['Date', 'Day', 'Habit/Metric Name', 'Category', 'Status/Value'];
    const rows = [headers];

    // Generate for all days in the current month
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dateObj = new Date(selectedYear, selectedMonth, d);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = daysOfWeek[dateObj.getDay()];

      // Write habit rows
      habits.forEach((habit) => {
        const recKey = `${habit.id}-${selectedYear}-${selectedMonth + 1}-${d}`;
        const isCompleted = records[recKey] === true;
        rows.push([
          dateString,
          dayName,
          habit.name,
          habit.category,
          isCompleted ? 'COMPLETED' : 'PENDING'
        ]);
      });

      // Write Mood and Sleep rows
      const wellnessKey = `${selectedYear}-${selectedMonth + 1}-${d}`;
      const dayWellness = wellness[wellnessKey];
      
      rows.push([
        dateString,
        dayName,
        'Mood Index',
        'wellness',
        dayWellness?.mood ? String(dayWellness.mood) : 'Unlogged'
      ]);

      rows.push([
        dateString,
        dayName,
        'Sleep Duration',
        'wellness',
        dayWellness?.sleep ? `${dayWellness.sleep} hours` : 'Unlogged'
      ]);
    }

    // Convert to CSV text
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodedUri);
    downloadAnchor.setAttribute('download', `HabitSheet_${months[selectedMonth]}_${selectedYear}_Export.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const handleExportJson = () => {
    const payload: AppData = { habits, records, wellness, dsaModules, theme };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `Spreadsheet_HabitTracker_Backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const handleTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Habit Sheet Tracker', {
        body: 'Friendly reminder to practice DSA and complete your checklist goals for today! 📈',
        icon: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200'
      });
    } else {
      alert('Notification alert: Remember to study binary trees and log your wellness scores today! (Enable notifications in Settings to receive this as a native prompt).');
    }
  };

  // Get current active theme config
  const colors = THEME_PALETTES[theme];

  return (
    <div className="w-full h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-800">
      {/* Left Navigation Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-700 shrink-0 select-none">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold text-white">H</div>
            <h1 className="text-lg font-bold text-white tracking-tight">HabitFlow Pro</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Daily Tracker / Spreadsheet */}
          <div
            onClick={() => setActiveTab('spreadsheet')}
            className={`${
              activeTab === 'spreadsheet'
                ? 'bg-slate-800 text-white font-medium'
                : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
            } p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === 'spreadsheet' ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
            <span className="text-sm">Daily Tracker</span>
          </div>

          {/* DSA Learning */}
          <div
            onClick={() => setActiveTab('dsa')}
            className={`${
              activeTab === 'dsa'
                ? 'bg-slate-800 text-white font-medium'
                : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
            } p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === 'dsa' ? 'bg-indigo-500' : 'bg-slate-600'}`}></div>
            <span className="text-sm">DSA Learning</span>
          </div>

          {/* Analytics Dashboard */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className={`${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-white font-medium'
                : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
            } p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === 'dashboard' ? 'bg-amber-400' : 'bg-slate-600'}`}></div>
            <span className="text-sm">Analytics Dashboard</span>
          </div>

          {/* Cloud Storage / Sync */}
          <div
            onClick={() => setActiveTab('cloud')}
            className={`${
              activeTab === 'cloud'
                ? 'bg-slate-800 text-white font-medium'
                : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
            } p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === 'cloud' ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
            <span className="text-sm">Cloud Storage</span>
          </div>

          {/* Settings */}
          <div
            onClick={() => setActiveTab('settings')}
            className={`${
              activeTab === 'settings'
                ? 'bg-slate-800 text-white font-medium'
                : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
            } p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === 'settings' ? 'bg-indigo-600' : 'bg-slate-600'}`}></div>
            <span className="text-sm">Settings</span>
          </div>

          {/* Beginners Guide */}
          <div
            onClick={() => setActiveTab('guide')}
            className={`${
              activeTab === 'guide'
                ? 'bg-slate-800 text-white font-medium'
                : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
            } p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === 'guide' ? 'bg-indigo-600' : 'bg-slate-600'}`}></div>
            <span className="text-sm">Beginners Guide</span>
          </div>
        </nav>

        {/* Sidebar Footer with Export Button */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleExportCsv}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-colors mb-2 cursor-pointer"
          >
            Export CSV
          </button>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-500 font-bold px-1">
            <span>Cloud Sync: Active</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981]"></div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Utility Header */}
        <header className="h-14 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <span
              onClick={() => setActiveTab('spreadsheet')}
              className={`text-sm font-semibold py-4 cursor-pointer transition border-b-2 ${
                activeTab === 'spreadsheet'
                  ? 'border-indigo-600 text-slate-900 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Habits.xlsx
            </span>
            <span
              onClick={() => setActiveTab('guide')}
              className={`text-sm font-semibold py-4 cursor-pointer transition border-b-2 ${
                activeTab === 'guide'
                  ? 'border-indigo-600 text-slate-900 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Schedule.xlsx
            </span>
            <span
              onClick={() => setActiveTab('dsa')}
              className={`text-sm font-semibold py-4 cursor-pointer transition border-b-2 ${
                activeTab === 'dsa'
                  ? 'border-indigo-600 text-slate-900 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              DSA_Roadmap.csv
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold">
                CS
              </div>
              <span className="text-xs font-medium text-slate-700 hidden sm:inline">charanshaiva08@gmail.com</span>
            </div>
          </div>
        </header>

        {/* View Panel Viewport */}
        <div className={`flex-1 overflow-y-auto p-6 ${colors.primaryBg} ${colors.textPrimary}`}>
          {activeTab === 'spreadsheet' && (
            <SpreadsheetView
              habits={habits}
              records={records}
              wellness={wellness}
              onToggleRecord={handleToggleRecord}
              onUpdateWellness={handleUpdateWellness}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              colors={colors}
              theme={theme}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              habits={habits}
              records={records}
              wellness={wellness}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              colors={colors}
              theme={theme}
            />
          )}

          {activeTab === 'dsa' && (
            <DsaTrackerView
              modules={dsaModules}
              onToggleModule={handleToggleDsaModule}
              onAddModule={handleAddDsaModule}
              colors={colors}
              theme={theme}
            />
          )}

          {activeTab === 'cloud' && (
            <CloudSyncView
              appData={{ habits, records, wellness, dsaModules, theme }}
              onImportData={handleImportJson}
              colors={colors}
              theme={theme}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              habits={habits}
              onAddHabit={handleAddHabit}
              onDeleteHabit={handleDeleteHabit}
              currentTheme={theme}
              onChangeTheme={setTheme}
              onExportCsv={handleExportCsv}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
              onTestNotification={handleTestNotification}
              colors={colors}
            />
          )}

          {activeTab === 'guide' && <BeginnersGuide colors={colors} theme={theme} />}
        </div>

        {/* Bottom Excel-Style Bar */}
        <footer className="h-8 bg-slate-100 border-t border-slate-200 flex items-center px-4 text-[11px] text-slate-500 shrink-0 select-none">
          <div className="flex border-r border-slate-300 pr-4 mr-4 gap-4">
            <span className="flex items-center gap-1 font-bold text-slate-700">
              <span className="text-slate-400">📁</span> Ready
            </span>
            <span className="flex items-center gap-1">
              <span className="text-slate-400">🔔</span> Reminders ON
            </span>
          </div>
          <div className="flex gap-6 items-center flex-1">
            <span>Rows: {habits.length + 2}</span>
            <span>Sheet 1 of 6</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Zoom</span>
            <div className="w-24 bg-slate-200 h-1 rounded-full">
              <div className="w-1/2 h-full bg-slate-400 rounded-full"></div>
            </div>
            <span className="font-bold">100%</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
