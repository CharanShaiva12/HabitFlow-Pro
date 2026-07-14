import React from 'react';
import { BookOpen, Folder, Play, RefreshCw, Shield, Layout, Sparkles } from 'lucide-react';
import { ThemeColors, ThemeType } from '../types';

interface BeginnersGuideProps {
  colors?: ThemeColors;
  theme?: ThemeType;
}

export default function BeginnersGuide({ colors, theme }: BeginnersGuideProps) {
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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 text-left">
      <div className={`border-b pb-4 ${activeColors.border}`}>
        <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${activeColors.textPrimary}`}>
          <BookOpen className="w-6 h-6 text-indigo-500" />
          Beginner's Guide: Start Tracking Your Habits
        </h2>
        <p className={`text-sm mt-1 ${activeColors.textSecondary}`}>
          Everything you need to know to run, modify, and master this spreadsheet tracker with zero coding experience.
        </p>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-5 rounded-xl border space-y-3 ${activeColors.cardBg} ${activeColors.border}`}>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
            <Layout className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className={`font-semibold ${activeColors.textPrimary}`}>1. Understanding the Grid</h3>
          <p className={`text-xs leading-relaxed ${activeColors.textSecondary}`}>
            The app works like a dynamic Excel spreadsheet. Select a month using the tabs at the bottom.
            Simply check/uncheck cells to log your daily habits. At the bottom of the table, use the drop-downs
            to record your <strong>Mood (1-10)</strong> and <strong>Hours of Sleep</strong> for each day.
          </p>
        </div>

        <div className={`p-5 rounded-xl border space-y-3 ${activeColors.cardBg} ${activeColors.border}`}>
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className={`font-semibold ${activeColors.textPrimary}`}>2. Auto-Save & Offline Mode</h3>
          <p className={`text-xs leading-relaxed ${activeColors.textSecondary}`}>
            Your data is automatically saved inside your browser's memory <strong>(LocalStorage)</strong>.
            This means you can close the browser or use it without internet access (offline). Your progress is
            100% safe and will load instantly whenever you return.
          </p>
        </div>

        <div className={`p-5 rounded-xl border space-y-3 ${activeColors.cardBg} ${activeColors.border}`}>
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center">
            <Folder className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className={`font-semibold ${activeColors.textPrimary}`}>3. Running Locally (Your PC)</h3>
          <p className={`text-xs leading-relaxed ${activeColors.textSecondary}`}>
            To run this on your computer, do <strong>NOT</strong> double-click the <code>index.html</code> file (it will show a blank screen because modern browsers block ES modules on local <code>file://</code> paths due to security policies). Instead:
            <span className="block mt-1.5 pl-2 border-l-2 border-purple-500 space-y-1">
              <span>1. Install <strong>Node.js</strong> from nodejs.org.</span>
              <br />
              <span>2. Extract the downloaded zip folder.</span>
              <br />
              <span>3. Open PowerShell or Command Prompt inside that folder.</span>
              <br />
              <span>4. Run these two commands <strong>separately</strong> (one after another) to avoid the PowerShell <code>&amp;&amp;</code> separator error:</span>
            </span>
            <code className={`block mt-2 p-1.5 text-[11px] rounded font-mono ${
              theme === 'geometric-balance' ? 'bg-slate-100 text-indigo-600' : 'bg-zinc-800 text-pink-500'
            }`}>
              npm install
              <br />
              npm run dev
            </code>
            <span className="block mt-1.5 text-[10px] opacity-80">
              This starts a local development server. Open the link shown in your terminal (usually <strong>http://localhost:3000</strong>) to view your app!
            </span>
          </p>
        </div>

        <div className={`p-5 rounded-xl border space-y-3 ${activeColors.cardBg} ${activeColors.border}`}>
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className={`font-semibold ${activeColors.textPrimary}`}>4. Multi-Device Sync & Backups</h3>
          <p className={`text-xs leading-relaxed ${activeColors.textSecondary}`}>
            Want to sync your progress between your phone and laptop? Go to the <strong>Settings</strong> tab,
            click <strong>Export Data (JSON)</strong>, and save the file. To sync onto another device, open the
            app there, go to Settings, and choose <strong>Import Backup</strong>. Alternatively, you can use our 
            <strong>Cloud Storage</strong> tab to secure it with a password!
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <h3 className={`text-lg font-bold flex items-center gap-2 ${activeColors.textPrimary}`}>
          <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
          Quick Tracking Tips
        </h3>
        
        <div className="space-y-3">
          <details className={`group rounded-lg p-3 cursor-pointer border ${
            theme === 'geometric-balance' ? 'bg-slate-50 border-slate-100' : 'bg-zinc-900/40 border-zinc-800'
          }`}>
            <summary className={`font-medium text-sm flex justify-between items-center ${activeColors.textPrimary}`}>
              How do I add a new habit or delete existing ones?
              <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className={`text-xs mt-2 pl-2 border-l-2 border-indigo-500 leading-relaxed ${activeColors.textSecondary}`}>
              Navigate to the <strong>Settings</strong> tab. Under "Manage Habits," you can type in any new habit name, select an emoji, assign a category (which controls the color of its progress bars), and click "Add". You can also delete habits you no longer want to track.
            </p>
          </details>

          <details className={`group rounded-lg p-3 cursor-pointer border ${
            theme === 'geometric-balance' ? 'bg-slate-50 border-slate-100' : 'bg-zinc-900/40 border-zinc-800'
          }`}>
            <summary className={`font-medium text-sm flex justify-between items-center ${activeColors.textPrimary}`}>
              What is the DSA Learning section for?
              <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className={`text-xs mt-2 pl-2 border-l-2 border-indigo-500 leading-relaxed ${activeColors.textSecondary}`}>
              This is a built-in curriculum specifically for practicing Data Structures & Algorithms. If you are learning to code, you can track your progress through popular study modules (Arrays, Linked Lists, Stack, DFS, etc.). Each topic has a direct link to practice on LeetCode. Simply toggle the "Completion Status" switch when you successfully solve the problem!
            </p>
          </details>

          <details className={`group rounded-lg p-3 cursor-pointer border ${
            theme === 'geometric-balance' ? 'bg-slate-50 border-slate-100' : 'bg-zinc-900/40 border-zinc-800'
          }`}>
            <summary className={`font-medium text-sm flex justify-between items-center ${activeColors.textPrimary}`}>
              How do I export data to open in Excel or Google Sheets?
              <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className={`text-xs mt-2 pl-2 border-l-2 border-indigo-500 leading-relaxed ${activeColors.textSecondary}`}>
              In the <strong>Settings</strong> tab, click the <strong>Export as CSV</strong> button. This will download a <code>.csv</code> spreadsheet file containing all your logged days, checked habits, mood scores, and hours of sleep. You can double-click this file to open it in Microsoft Excel, Apple Numbers, or import it directly into Google Sheets!
            </p>
          </details>

          <details className={`group rounded-lg p-3 cursor-pointer border ${
            theme === 'geometric-balance' ? 'bg-slate-50 border-slate-100' : 'bg-zinc-900/40 border-zinc-800'
          }`}>
            <summary className={`font-medium text-sm flex justify-between items-center ${activeColors.textPrimary}`}>
              How do push notifications work?
              <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className={`text-xs mt-2 pl-2 border-l-2 border-indigo-500 leading-relaxed ${activeColors.textSecondary}`}>
              When you enable reminders in the Settings, the app will ask for permission to send you browser notifications. Once allowed, you will receive friendly local reminders even if you are offline or have the tab running in the background. You can click "Test Push Notification" in the Settings tab to test it instantly!
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
