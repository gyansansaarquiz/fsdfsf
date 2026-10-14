export type Difficulty = 'easy' | 'medium' | 'hard';

export type CategoryId = 
  | 'nepal-gk'
  | 'history-geography'
  | 'science-tech'
  | 'sports'
  | 'world-gk'
  | 'computer-internet'
  | 'math'
  | 'nepali-language'
  | 'current-affairs';

export interface Category {
  id: CategoryId;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  color: string;
  badgeBg: string;
}

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string]; // [A, B, C, D]
  correctAnswer: 0 | 1 | 2 | 3; // Index 0-3
  categoryId: CategoryId;
  difficulty: Difficulty;
  explanation: string;
  hint?: string;
  createdAt?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number | null; // null if timed out/skipped
  isCorrect: boolean;
  timeTaken: number; // in seconds
}

export interface QuizSettings {
  playerName: string;
  categoryId: CategoryId | 'all';
  difficulty: Difficulty | 'all';
  questionCount: number; // 5, 10, 20, 50
  timePerQuestion: number; // 15 or 30 seconds
  soundEnabled: boolean;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  totalTimeSeconds: number; // for tie-breaking: lower time = higher rank
  categoryName: string;
  difficulty: string;
  date: string;
  isLiveQuiz?: boolean;
}

export interface LiveCompetitor {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  lastAnswerCorrect: boolean | null;
  lastAnswerTime: number;
  accuracyRate: number; // simulated accuracy
}
