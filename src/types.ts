export interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: 'health' | 'mind' | 'work' | 'routine' | 'social' | 'custom';
  color: string; // Tailwind color class prefix or custom hex
}

export interface DayData {
  completed: boolean;
}

// Maps `${habitId}-${year}-${month}-${day}` -> boolean
export interface HabitRecord {
  [key: string]: boolean;
}

// Maps `${year}-${month}-${day}` -> { mood: number; sleep: number }
export interface WellnessRecord {
  [key: string]: {
    mood: number | null; // 1 to 10
    sleep: number | null; // Hours
  };
}

export interface DsaModule {
  id: string;
  category: string; // e.g., "Arrays & Hashing", "Two Pointers", "Trees"
  topic: string; // e.g., "Contains Duplicate", "Reverse Linked List"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  details: string; // What to study
  leetcodeUrl: string; // LeetCode link
  completed: boolean;
}

export type ThemeType = 'excel-dark' | 'excel-green' | 'ocean-blue' | 'coral-sunset' | 'sakura-pink' | 'classic-light' | 'geometric-balance';

export interface ThemeColors {
  primaryBg: string;
  secondaryBg: string;
  accentColor: string;
  accentText: string;
  border: string;
  gridHeaderBg: string;
  gridBg: string;
  gridActiveBg: string;
  textPrimary: string;
  textSecondary: string;
  progressColor: string;
  cardBg: string;
}

export interface AppData {
  habits: Habit[];
  records: HabitRecord;
  wellness: WellnessRecord;
  dsaModules: DsaModule[];
  theme: ThemeType;
}
