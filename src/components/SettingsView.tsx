import React, { useState } from 'react';
import { Settings, Plus, Trash2, Download, Upload, Bell, Palette, Info, Check, Sparkles, FileText, Smartphone } from 'lucide-react';
import { Habit, ThemeType, AppData, ThemeColors } from '../types';
import { THEME_PALETTES } from '../defaultData';

interface SettingsViewProps {
  habits: Habit[];
  onAddHabit: (name: string, emoji: string, category: string, color: string) => void;
  onDeleteHabit: (id: string) => void;
  currentTheme: ThemeType;
  onChangeTheme: (theme: ThemeType) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onImportJson: (data: AppData) => void;
  onTestNotification: () => void;
  colors?: ThemeColors;
}

export default function SettingsView({
  habits,
  onAddHabit,
  onDeleteHabit,
  currentTheme,
  onChangeTheme,
  onExportCsv,
  onExportJson,
  onImportJson,
  onTestNotification,
  colors
}: SettingsViewProps) {
  // New habit form state
  const [habitName, setHabitName] = useState('');
  const [habitEmoji, setHabitEmoji] = useState('🎯');
  const [habitCategory, setHabitCategory] = useState<'health' | 'mind' | 'work' | 'routine' | 'social' | 'custom'>('custom');
  
  const [notificationEnabled, setNotificationEnabled] = useState(() => {
    return localStorage.getItem('notifications_enabled') === 'true';
  });
  const [reminderTime, setReminderTime] = useState(() => {
    return localStorage.getItem('notifications_reminder_time') || '20:00';
  });

  const activeColors = colors || THEME_PALETTES[currentTheme];

  const handleAddHabitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    // Pick dynamic colors depending on category
    const categoryColors: Record<string, string> = {
      health: '#10B981', // emerald
      mind: '#EC4899', // pink
      work: '#06B6D4', // cyan
      routine: '#8B5CF6', // violet
      social: '#EAB308', // yellow
      custom: '#F59E0B' // amber
    };

    onAddHabit(habitName, habitEmoji, habitCategory, categoryColors[habitCategory] || '#10b981');
    setHabitName('');
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target?.result as string);
          if (parsedData && parsedData.habits && parsedData.records) {
            onImportJson(parsedData);
            alert('Backup database imported successfully!');
          } else {
            alert('Invalid backup structure. Please provide a valid JSON file exported from this app.');
          }
        } catch (error) {
          alert('Failed to parse the backup file. Ensure the file is not corrupted.');
        }
      };
    }
  };

  const handleToggleNotifications = () => {
    const nextVal = !notificationEnabled;
    setNotificationEnabled(nextVal);
    localStorage.setItem('notifications_enabled', String(nextVal));

    if (nextVal) {
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          } else {
            alert('Please allow notification permission in your browser settings to receive reminders.');
          }
        });
      } else {
        alert('This browser does not support web push notifications.');
      }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setReminderTime(newTime);
    localStorage.setItem('notifications_reminder_time', newTime);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 text-left">
      <div className={`border-b pb-4 ${activeColors.border}`}>
        <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${activeColors.textPrimary}`}>
          <Settings className="w-6 h-6 text-indigo-500" />
          Settings & Preferences
        </h2>
        <p className={`text-sm mt-1 ${activeColors.textSecondary}`}>
          Customize sheet themes, manage your custom habit lists, configure push reminders, and backup data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Habit List Editor */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`rounded-xl p-5 space-y-4 border ${activeColors.cardBg} ${activeColors.border}`}>
            <h3 className={`font-bold flex items-center gap-2 ${activeColors.textPrimary}`}>
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Manage Habit List
            </h3>
            
            <form onSubmit={handleAddHabitSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Habit Name</label>
                <input
                  type="text"
                  required
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="e.g. Read 15 Pages"
                  className={`w-full text-xs p-2.5 rounded border focus:outline-none focus:border-indigo-500 ${
                    currentTheme === 'geometric-balance'
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Emoji</label>
                <input
                  type="text"
                  required
                  value={habitEmoji}
                  onChange={(e) => setHabitEmoji(e.target.value)}
                  placeholder="📖"
                  className={`w-full text-xs p-2.5 rounded text-center border focus:outline-none focus:border-indigo-500 ${
                    currentTheme === 'geometric-balance'
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Category</label>
                <select
                  value={habitCategory}
                  onChange={(e) => setHabitCategory(e.target.value as any)}
                  className={`w-full text-xs p-2.5 rounded border focus:outline-none focus:border-indigo-500 cursor-pointer ${
                    currentTheme === 'geometric-balance'
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <option value="health" className={currentTheme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Health 💪</option>
                  <option value="mind" className={currentTheme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Mind 🧘</option>
                  <option value="work" className={currentTheme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Work 🎯</option>
                  <option value="routine" className={currentTheme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Routine ⏰</option>
                  <option value="social" className={currentTheme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Social 🌿</option>
                  <option value="custom" className={currentTheme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Other 📈</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </form>

            {/* List of active habits */}
            <div className={`max-h-[300px] overflow-y-auto divide-y pr-1.5 space-y-1 ${
              currentTheme === 'geometric-balance' ? 'divide-slate-100' : 'divide-zinc-800/60'
            }`}>
              {habits.map((h) => (
                <div key={h.id} className="flex items-center justify-between py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{h.emoji}</span>
                    <span className={`font-semibold ${activeColors.textPrimary}`}>{h.name}</span>
                    <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded tracking-wider ${
                      currentTheme === 'geometric-balance'
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {h.category}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteHabit(h.id)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded transition cursor-pointer"
                    title="Delete habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Themes, Backups, and Notifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Palette Selector */}
          <div className={`rounded-xl p-5 space-y-4 border ${activeColors.cardBg} ${activeColors.border}`}>
            <h3 className={`font-bold flex items-center gap-2 ${activeColors.textPrimary}`}>
              <Palette className="w-4 h-4 text-indigo-500" />
              Theme Engine
            </h3>
            <p className={`text-xs ${activeColors.textSecondary}`}>
              Pick a styled color theme matching custom Excel templates.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {Object.keys(THEME_PALETTES).map((themeKey) => {
                const isActive = currentTheme === themeKey;
                const config = THEME_PALETTES[themeKey as ThemeType];
                return (
                  <button
                    key={themeKey}
                    onClick={() => onChangeTheme(themeKey as ThemeType)}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition flex items-center justify-between ${
                      isActive
                        ? currentTheme === 'geometric-balance'
                          ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700'
                          : 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : `border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 ${activeColors.border}`
                    }`}
                  >
                    <span className={`capitalize ${activeColors.textPrimary}`}>{themeKey.replace('-', ' ')}</span>
                    <div className="flex gap-1">
                      <div className={`w-3.5 h-3.5 rounded-full ${config.progressColor}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications setup */}
          <div className={`rounded-xl p-5 space-y-4 border ${activeColors.cardBg} ${activeColors.border}`}>
            <h3 className={`font-bold flex items-center gap-2 ${activeColors.textPrimary}`}>
              <Bell className="w-4 h-4 text-indigo-500" />
              Push Notifications
            </h3>
            <p className={`text-xs ${activeColors.textSecondary}`}>
              Receive smart browser prompts to remember to study DSA and complete daily trackers.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${activeColors.textPrimary}`}>Enable Reminders</span>
                <button
                  onClick={handleToggleNotifications}
                  className={`w-10 h-5.5 rounded-full p-1 cursor-pointer transition duration-300 ${
                    notificationEnabled
                      ? currentTheme === 'geometric-balance'
                        ? 'bg-indigo-600 flex justify-end'
                        : 'bg-emerald-500 flex justify-end'
                      : 'bg-gray-200 dark:bg-zinc-800 flex justify-start'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {notificationEnabled && (
                <div className="space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${activeColors.textSecondary}`}>Daily Reminder Time</span>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={handleTimeChange}
                      className={`text-xs p-1.5 rounded border focus:outline-none ${
                        currentTheme === 'geometric-balance'
                          ? 'bg-slate-50 border-slate-200 text-slate-800'
                          : 'bg-zinc-950 border-zinc-800 text-white'
                      }`}
                    />
                  </div>

                  <button
                    onClick={onTestNotification}
                    className={`w-full py-1.5 border rounded text-xs font-medium cursor-pointer transition ${
                      currentTheme === 'geometric-balance'
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    Test Push Notification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Backups / CSV Export */}
          <div className={`rounded-xl p-5 space-y-4 border ${activeColors.cardBg} ${activeColors.border}`}>
            <h3 className={`font-bold flex items-center gap-2 ${activeColors.textPrimary}`}>
              <Download className="w-4 h-4 text-indigo-500" />
              Data Import / Export
            </h3>
            <p className={`text-xs ${activeColors.textSecondary}`}>
              Keep full portable backups. Save data in CSV format for analysis in Microsoft Excel or Google Sheets.
            </p>

            <div className="space-y-2">
              <button
                onClick={onExportCsv}
                className={`w-full py-2 rounded text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition ${
                  currentTheme === 'geometric-balance'
                    ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100'
                    : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Export as CSV for Excel</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onExportJson}
                  className={`py-2 border rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                    currentTheme === 'geometric-balance'
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup JSON</span>
                </button>

                <label className={`py-2 border rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition text-center ${
                  currentTheme === 'geometric-balance'
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                }`}>
                  <Upload className="w-3.5 h-3.5 inline" />
                  <span>Restore JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleJsonUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
