import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Plus, CheckCircle, Code, GraduationCap, Award, Compass, Sparkles, BookOpen } from 'lucide-react';
import { DsaModule, ThemeColors, ThemeType } from '../types';

interface DsaTrackerViewProps {
  modules: DsaModule[];
  onToggleModule: (id: string) => void;
  onAddModule: (newModule: Omit<DsaModule, 'id' | 'completed'>) => void;
  colors?: ThemeColors;
  theme?: ThemeType;
}

export default function DsaTrackerView({ modules, onToggleModule, onAddModule, colors, theme }: DsaTrackerViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

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

  // Form states for custom modules
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState('Arrays & Hashing');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [newDetails, setNewDetails] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    onAddModule({
      category: newCategory,
      topic: newTopic,
      difficulty: newDifficulty,
      details: newDetails || 'Study this problem and solve it on LeetCode.',
      leetcodeUrl: newUrl || 'https://leetcode.com/problemset/all/'
    });

    // Reset form
    setNewTopic('');
    setNewDetails('');
    setNewUrl('');
    setShowAddForm(false);
  };

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(modules.map((m) => m.category)))];

  // Filtering modules
  const filteredModules = modules.filter((m) => {
    const matchesSearch =
      m.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || m.difficulty === difficultyFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'Completed') matchesStatus = m.completed;
    if (statusFilter === 'Pending') matchesStatus = !m.completed;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  // Calculate statistics
  const totalCount = modules.length;
  const completedCount = modules.filter((m) => m.completed).length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const easyTotal = modules.filter((m) => m.difficulty === 'Easy').length;
  const easyDone = modules.filter((m) => m.difficulty === 'Easy' && m.completed).length;
  const medTotal = modules.filter((m) => m.difficulty === 'Medium').length;
  const medDone = modules.filter((m) => m.difficulty === 'Medium' && m.completed).length;
  const hardTotal = modules.filter((m) => m.difficulty === 'Hard').length;
  const hardDone = modules.filter((m) => m.difficulty === 'Hard' && m.completed).length;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 text-left">
      {/* Header section with Stats Card */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className={`flex-1 p-5 rounded-2xl border flex flex-col justify-between ${
          theme === 'geometric-balance'
            ? 'bg-gradient-to-br from-indigo-50/50 via-white to-slate-50/50 border-indigo-100 shadow-sm'
            : 'bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-950 border-indigo-900/30'
        }`}>
          <div className="space-y-1.5">
            <div className={`flex items-center gap-2 ${theme === 'geometric-balance' ? 'text-indigo-600' : 'text-indigo-400'}`}>
              <GraduationCap className="w-6 h-6" />
              <span className="text-xs uppercase font-bold tracking-widest">Core DSA Curriculum</span>
            </div>
            <h2 className={`text-xl md:text-2xl font-bold ${activeColors.textPrimary}`}>Algorithms & Data Structures Tracker</h2>
            <p className={`text-xs max-w-xl ${activeColors.textSecondary}`}>
              Track your algorithmic mastery systematically. Click LeetCode links to solve the problem, read the guidelines, and toggle completion status as you learn.
            </p>
          </div>

          {/* Overall Progress bar */}
          <div className="mt-5 space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className={`font-mono ${activeColors.textSecondary}`}>CURRICULUM COMPLETION</span>
              <span className={`font-mono font-bold text-sm ${theme === 'geometric-balance' ? 'text-indigo-600' : 'text-indigo-400'}`}>{completionRate}%</span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${
              theme === 'geometric-balance' ? 'bg-slate-100 border-slate-200' : 'bg-zinc-800 border-zinc-700/50'
            }`}>
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  theme === 'geometric-balance'
                    ? 'bg-gradient-to-r from-indigo-600 to-emerald-500'
                    : 'bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400'
                }`}
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className={`flex justify-between text-[10px] font-mono pt-1 ${activeColors.textSecondary}`}>
              <span>{completedCount} SOLVED</span>
              <span>{totalCount - completedCount} REMAINING</span>
            </div>
          </div>
        </div>

        {/* Small bento counts */}
        <div className="grid grid-cols-3 gap-3 lg:w-[320px]">
          <div className={`border rounded-xl p-4 flex flex-col justify-between ${activeColors.cardBg} ${activeColors.border}`}>
            <span className="text-[10px] uppercase font-bold tracking-wider text-green-500 dark:text-green-400">Easy</span>
            <div className="mt-2">
              <span className={`text-2xl font-extrabold ${activeColors.textPrimary}`}>{easyDone}</span>
              <span className={`text-xs ${activeColors.textSecondary}`}>/{easyTotal}</span>
            </div>
            <span className={`text-[9px] font-mono mt-1 ${activeColors.textSecondary}`}>
              {easyTotal > 0 ? Math.round((easyDone / easyTotal) * 100) : 0}% Done
            </span>
          </div>

          <div className={`border rounded-xl p-4 flex flex-col justify-between ${activeColors.cardBg} ${activeColors.border}`}>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500">Medium</span>
            <div className="mt-2">
              <span className={`text-2xl font-extrabold ${activeColors.textPrimary}`}>{medDone}</span>
              <span className={`text-xs ${activeColors.textSecondary}`}>/{medTotal}</span>
            </div>
            <span className={`text-[9px] font-mono mt-1 ${activeColors.textSecondary}`}>
              {medTotal > 0 ? Math.round((medDone / medTotal) * 100) : 0}% Done
            </span>
          </div>

          <div className={`border rounded-xl p-4 flex flex-col justify-between ${activeColors.cardBg} ${activeColors.border}`}>
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500">Hard</span>
            <div className="mt-2">
              <span className={`text-2xl font-extrabold ${activeColors.textPrimary}`}>{hardDone}</span>
              <span className={`text-xs ${activeColors.textSecondary}`}>/{hardTotal}</span>
            </div>
            <span className={`text-[9px] font-mono mt-1 ${activeColors.textSecondary}`}>
              {hardTotal > 0 ? Math.round((hardDone / hardTotal) * 100) : 0}% Done
            </span>
          </div>
        </div>
      </div>

      {/* Control bar / Filters */}
      <div className={`flex flex-col md:flex-row gap-3 items-center justify-between p-4 rounded-xl border ${activeColors.secondaryBg} ${activeColors.border}`}>
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search topics or concepts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full text-xs p-2.5 pl-9 rounded border focus:outline-none focus:border-indigo-500 ${
              theme === 'geometric-balance'
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-zinc-950 border-zinc-800 text-white'
            }`}
          />
        </div>

        {/* Filter selectors */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded border ${
            theme === 'geometric-balance' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
          }`}>
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`text-xs bg-transparent border-none focus:outline-none cursor-pointer p-1 ${
                theme === 'geometric-balance' ? 'text-slate-700' : 'text-zinc-300'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className={`flex items-center gap-1.5 px-2 py-1 rounded border ${
            theme === 'geometric-balance' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
          }`}>
            <Award className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className={`text-xs bg-transparent border-none focus:outline-none cursor-pointer p-1 ${
                theme === 'geometric-balance' ? 'text-slate-700' : 'text-zinc-300'
              }`}
            >
              <option value="All" className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>All Levels</option>
              <option value="Easy" className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Easy</option>
              <option value="Medium" className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Medium</option>
              <option value="Hard" className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Hard</option>
            </select>
          </div>

          <div className={`flex items-center gap-1.5 px-2 py-1 rounded border ${
            theme === 'geometric-balance' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
          }`}>
            <CheckCircle className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`text-xs bg-transparent border-none focus:outline-none cursor-pointer p-1 ${
                theme === 'geometric-balance' ? 'text-slate-700' : 'text-zinc-300'
              }`}
            >
              <option value="All" className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>All Status</option>
              <option value="Completed" className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Completed</option>
              <option value="Pending" className={theme === 'geometric-balance' ? 'bg-white text-slate-800' : 'bg-zinc-950 text-white'}>Pending</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded flex items-center gap-1.5 cursor-pointer transition ml-auto md:ml-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Module</span>
          </button>
        </div>
      </div>

      {/* Add Custom Module Form */}
      {showAddForm && (
        <form onSubmit={handleFormSubmit} className={`p-5 rounded-xl border space-y-4 animate-fadeIn ${activeColors.cardBg} ${activeColors.border}`}>
          <div className={`flex items-center justify-between border-b pb-2 ${activeColors.border}`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
              <Code className="w-3.5 h-3.5" /> Add New Leetcode Topic
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Topic Name</label>
              <input
                type="text"
                required
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="e.g. Reverse Linked List"
                className={`w-full text-xs p-2.5 rounded border focus:outline-none focus:border-indigo-500 ${
                  theme === 'geometric-balance' ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-950 border-zinc-800 text-white'
                }`}
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className={`w-full text-xs p-2.5 rounded border focus:outline-none focus:border-indigo-500 cursor-pointer ${
                  theme === 'geometric-balance' ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-950 border-zinc-800 text-white'
                }`}
              >
                <option value="Arrays & Hashing">Arrays & Hashing</option>
                <option value="Two Pointers">Two Pointers</option>
                <option value="Sliding Window">Sliding Window</option>
                <option value="Stack">Stack</option>
                <option value="Binary Search">Binary Search</option>
                <option value="Linked List">Linked List</option>
                <option value="Trees">Trees</option>
                <option value="Backtracking">Backtracking</option>
                <option value="Graphs">Graphs</option>
                <option value="1-D Dynamic Programming">1-D Dynamic Programming</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Difficulty</label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value as any)}
                className={`w-full text-xs p-2.5 rounded border focus:outline-none focus:border-indigo-500 cursor-pointer ${
                  theme === 'geometric-balance' ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-950 border-zinc-800 text-white'
                }`}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">LeetCode URL</label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://leetcode.com/problems/..."
                className={`w-full text-xs p-2.5 rounded border focus:outline-none focus:border-indigo-500 ${
                  theme === 'geometric-balance' ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-950 border-zinc-800 text-white'
                }`}
              />
            </div>

            <div className="md:col-span-12">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Study Guide / Key Note</label>
              <textarea
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                placeholder="Explain the logic in 1 sentence. E.g. Keep a hash map to look up targets in O(1) time."
                rows={2}
                className={`w-full text-xs p-2.5 rounded border focus:outline-none focus:border-indigo-500 ${
                  theme === 'geometric-balance' ? 'bg-white border-slate-200 text-slate-800' : 'bg-zinc-950 border-zinc-800 text-white'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer transition"
          >
            Add Topic to Sheet
          </button>
        </form>
      )}

      {/* Grid Sheet */}
      <div className={`rounded-2xl border overflow-hidden shadow-xl ${activeColors.gridBg} ${activeColors.border}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`border-b text-[11px] uppercase tracking-wider font-mono font-bold text-left ${activeColors.gridHeaderBg} ${activeColors.textSecondary} ${activeColors.border}`}>
                <th className="p-3.5 pl-5 w-12">STATUS</th>
                <th className="p-3.5 min-w-[160px]">TOPIC / QUESTION</th>
                <th className="p-3.5 min-w-[140px]">CATEGORY</th>
                <th className="p-3.5 w-24">DIFFICULTY</th>
                <th className="p-3.5 min-w-[280px]">WHAT TO STUDY & KEY STRATEGY</th>
                <th className="p-3.5 w-28 text-center">SOLVE NOW</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'geometric-balance' ? 'divide-slate-100' : 'divide-zinc-800/60'}`}>
              {filteredModules.length === 0 ? (
                <tr>
                  <td colSpan={6} className={`p-10 text-center font-mono text-xs ${activeColors.textSecondary}`}>
                    No matching modules found. Try broadening your filters or add a new topic!
                  </td>
                </tr>
              ) : (
                filteredModules.map((m) => (
                  <tr
                    key={m.id}
                    className={`transition-colors text-xs ${activeColors.border} ${
                      theme === 'geometric-balance' ? 'hover:bg-slate-50' : 'hover:bg-zinc-900/40'
                    } ${
                      m.completed && theme === 'geometric-balance' ? 'bg-indigo-50/30' : m.completed ? 'bg-indigo-950/5' : ''
                    }`}
                  >
                    {/* Completion Status Checkbox */}
                    <td className="p-3.5 pl-5 text-center">
                      <button
                        onClick={() => onToggleModule(m.id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition cursor-pointer ${
                          m.completed
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : theme === 'geometric-balance'
                            ? 'border-2 border-slate-200 bg-white hover:border-slate-300'
                            : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900'
                        }`}
                      >
                        {m.completed && <span className="text-[10px] font-extrabold">✓</span>}
                      </button>
                    </td>

                    {/* Topic */}
                    <td className={`p-3.5 font-bold ${activeColors.textPrimary}`}>
                      <span className={m.completed ? 'line-through text-zinc-500' : ''}>
                        {m.topic}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        theme === 'geometric-balance'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700/50'
                      }`}>
                        {m.category}
                      </span>
                    </td>

                    {/* Difficulty */}
                    <td className="p-3.5 font-semibold">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          m.difficulty === 'Easy'
                            ? theme === 'geometric-balance'
                              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                              : 'text-green-400 bg-green-500/10 border border-green-500/20'
                            : m.difficulty === 'Medium'
                            ? theme === 'geometric-balance'
                              ? 'text-amber-700 bg-amber-50 border border-amber-200'
                              : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                            : theme === 'geometric-balance'
                            ? 'text-rose-700 bg-rose-50 border border-rose-200'
                            : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                        }`}
                      >
                        {m.difficulty}
                      </span>
                    </td>

                    {/* Study Details */}
                    <td className={`p-3.5 leading-relaxed text-[11px] ${activeColors.textSecondary}`}>
                      {m.details}
                    </td>

                    {/* LeetCode Link */}
                    <td className="p-3.5 text-center">
                      <a
                        href={m.leetcodeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded transition text-[10px] font-mono cursor-pointer border ${
                          theme === 'geometric-balance'
                            ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                            : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white'
                        }`}
                      >
                        <ExternalLink className="w-3 h-3 text-indigo-400" />
                        <span>LeetCode</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
