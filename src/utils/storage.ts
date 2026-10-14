import { Question, LeaderboardEntry } from '../types/quiz';
import { DEFAULT_QUESTIONS, DEMO_LEADERBOARD_ENTRIES } from '../data/defaultQuestions';

const QUESTIONS_KEY = 'gyan_sansar_questions_v1';
const LEADERBOARD_KEY = 'gyan_sansar_leaderboard_v1';
const ADMIN_PIN_KEY = 'gyan_sansar_admin_pin_v1';
const DEFAULT_PIN = '1234';

export const getStoredQuestions = (): Question[] => {
  try {
    const raw = localStorage.getItem(QUESTIONS_KEY);
    if (!raw) {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(DEFAULT_QUESTIONS));
      return DEFAULT_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_QUESTIONS;
  } catch (e) {
    console.error('Failed to load questions from storage:', e);
    return DEFAULT_QUESTIONS;
  }
};

export const saveQuestions = (questions: Question[]): void => {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save questions to storage:', e);
  }
};

export const resetQuestionsToDefault = (): Question[] => {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(DEFAULT_QUESTIONS));
    return DEFAULT_QUESTIONS;
  } catch (e) {
    console.error('Failed to reset questions:', e);
    return DEFAULT_QUESTIONS;
  }
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(DEMO_LEADERBOARD_ENTRIES));
      return DEMO_LEADERBOARD_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    const list: LeaderboardEntry[] = Array.isArray(parsed) ? parsed : DEMO_LEADERBOARD_ENTRIES;
    
    // Sort logic: Score descending; on tie, totalTimeSeconds ascending (lower time = higher rank)
    return list.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.totalTimeSeconds - b.totalTimeSeconds;
    });
  } catch (e) {
    console.error('Failed to load leaderboard:', e);
    return DEMO_LEADERBOARD_ENTRIES;
  }
};

export const addLeaderboardEntry = (entry: Omit<LeaderboardEntry, 'id'>): LeaderboardEntry[] => {
  try {
    const current = getLeaderboard();
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: 'entry-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6)
    };
    const updated = [newEntry, ...current];
    // Keep sorted
    updated.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.totalTimeSeconds - b.totalTimeSeconds;
    });
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save to leaderboard:', e);
    return getLeaderboard();
  }
};

export const clearLeaderboard = (): void => {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify([]));
  } catch (e) {
    console.error('Failed to clear leaderboard:', e);
  }
};

export const getAdminPin = (): string => {
  try {
    const pin = localStorage.getItem(ADMIN_PIN_KEY);
    return pin || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
};

export const setAdminPin = (newPin: string): boolean => {
  try {
    localStorage.setItem(ADMIN_PIN_KEY, newPin);
    return true;
  } catch {
    return false;
  }
};

// Nepali Number Formatter (e.g. 12 -> १२)
export const toNepaliNumber = (num: number | string): string => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/\d/g, (d) => nepaliDigits[parseInt(d, 10)]);
};
