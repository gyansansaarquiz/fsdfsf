/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { QuizSetup } from './components/QuizSetup';
import { QuizPlay } from './components/QuizPlay';
import { QuizResult } from './components/QuizResult';
import { LiveQuiz } from './components/LiveQuiz';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminPanel } from './components/AdminPanel';
import { RulesModal } from './components/RulesModal';
import { CertificateModal } from './components/CertificateModal';

import { Question, QuizSettings, UserAnswer, LeaderboardEntry, CategoryId } from './types/quiz';
import { 
  getStoredQuestions, 
  saveQuestions, 
  resetQuestionsToDefault, 
  getLeaderboard, 
  clearLeaderboard,
  toNepaliNumber 
} from './utils/storage';
import { CATEGORIES } from './data/defaultQuestions';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    'home' | 'quiz-setup' | 'quiz-play' | 'quiz-result' | 'live-quiz' | 'leaderboard' | 'admin'
  >('home');

  // App-wide Sound effect preference
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('gyan_sansar_sound_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  // Questions and Leaderboard data state
  const [questions, setQuestions] = useState<Question[]>(() => getStoredQuestions());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => getLeaderboard());

  // Active quiz state
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    playerName: localStorage.getItem('gyan_sansar_player_name') || 'खेलाडी',
    categoryId: 'all',
    difficulty: 'all',
    questionCount: 10,
    timePerQuestion: 30,
    soundEnabled: true
  });

  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<{
    userAnswers: UserAnswer[];
    totalScore: number;
    totalTimeSeconds: number;
  } | null>(null);

  // Modals state
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('gyan_sansar_sound_enabled', String(next));
      return next;
    });
  };

  // Sync questions updates
  const handleSaveQuestions = (updated: Question[]) => {
    setQuestions(updated);
    saveQuestions(updated);
  };

  const handleResetQuestions = () => {
    const defaults = resetQuestionsToDefault();
    setQuestions(defaults);
  };

  const handleClearLeaderboard = () => {
    clearLeaderboard();
    setLeaderboard([]);
  };

  // Launch Solo Quiz
  const handleStartSoloQuiz = (settings: QuizSettings) => {
    setQuizSettings(settings);

    // Filter questions based on category and difficulty
    let pool = [...questions];

    if (settings.categoryId !== 'all') {
      pool = pool.filter((q) => q.categoryId === settings.categoryId);
    }

    if (settings.difficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty === settings.difficulty);
    }

    // If pool is smaller than requested, fallback to all questions in that category
    if (pool.length < 5) {
      pool = settings.categoryId !== 'all' 
        ? questions.filter((q) => q.categoryId === settings.categoryId)
        : [...questions];
    }

    // Shuffle
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(settings.questionCount, shuffled.length));

    setActiveQuestions(selected);
    setActiveTab('quiz-play');
  };

  // Start from Home with direct category or default setup
  const handleHomeStartQuiz = (playerName: string, categoryId?: CategoryId) => {
    setQuizSettings((prev) => ({
      ...prev,
      playerName,
      categoryId: categoryId || 'all'
    }));
    setActiveTab('quiz-setup');
  };

  // Start Live Quiz Tournament from Home or Nav
  const handleStartLiveQuiz = (playerName: string) => {
    setQuizSettings((prev) => ({
      ...prev,
      playerName: playerName || prev.playerName
    }));
    setActiveTab('live-quiz');
  };

  // Quiz Finished
  const handleQuizComplete = (answers: UserAnswer[], score: number, timeSec: number) => {
    setQuizResult({
      userAnswers: answers,
      totalScore: score,
      totalTimeSeconds: timeSec
    });
    // refresh leaderboard state
    setLeaderboard(getLeaderboard());
    setActiveTab('quiz-result');
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    handleStartSoloQuiz(quizSettings);
  };

  const categoryNameDisplay = () => {
    if (quizSettings.categoryId === 'all') return 'मिश्रित सामान्य ज्ञान';
    const cat = CATEGORIES.find((c) => c.id === quizSettings.categoryId);
    return cat ? cat.name : 'सामान्य ज्ञान';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'leaderboard') {
            setLeaderboard(getLeaderboard());
          }
        }}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        onOpenRules={() => setIsRulesOpen(true)}
        inQuiz={activeTab === 'quiz-play'}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* 1. Home View */}
        {activeTab === 'home' && (
          <HomeHero
            onStartQuiz={handleHomeStartQuiz}
            onStartLiveQuiz={handleStartLiveQuiz}
            onViewLeaderboard={() => {
              setLeaderboard(getLeaderboard());
              setActiveTab('leaderboard');
            }}
            topWinners={leaderboard}
            totalQuestionsCount={questions.length}
          />
        )}

        {/* 2. Quiz Setup / Customization */}
        {activeTab === 'quiz-setup' && (
          <QuizSetup
            initialPlayerName={quizSettings.playerName}
            initialCategoryId={quizSettings.categoryId !== 'all' ? quizSettings.categoryId : undefined}
            totalAvailableQuestions={questions.length}
            onStart={handleStartSoloQuiz}
            onBack={() => setActiveTab('home')}
          />
        )}

        {/* 3. Quiz Play Interface */}
        {activeTab === 'quiz-play' && (
          <QuizPlay
            questions={activeQuestions}
            settings={{ ...quizSettings, soundEnabled }}
            onComplete={handleQuizComplete}
            onQuit={() => setActiveTab('home')}
          />
        )}

        {/* 4. Quiz Result & Social Share */}
        {activeTab === 'quiz-result' && quizResult && (
          <QuizResult
            questions={activeQuestions}
            userAnswers={quizResult.userAnswers}
            totalScore={quizResult.totalScore}
            totalTimeSeconds={quizResult.totalTimeSeconds}
            settings={quizSettings}
            onRestart={handleRestartQuiz}
            onGoHome={() => setActiveTab('home')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onViewLeaderboard={() => {
              setLeaderboard(getLeaderboard());
              setActiveTab('leaderboard');
            }}
          />
        )}

        {/* 5. Live Quiz Tournament */}
        {activeTab === 'live-quiz' && (
          <LiveQuiz
            questions={questions}
            playerName={quizSettings.playerName}
            soundEnabled={soundEnabled}
            onFinishLiveQuiz={() => {
              setLeaderboard(getLeaderboard());
              setActiveTab('leaderboard');
            }}
            onGoHome={() => setActiveTab('home')}
          />
        )}

        {/* 6. Leaderboard View */}
        {activeTab === 'leaderboard' && (
          <LeaderboardView
            entries={leaderboard}
            onStartQuiz={() => setActiveTab('quiz-setup')}
          />
        )}

        {/* 7. Admin Panel */}
        {activeTab === 'admin' && (
          <AdminPanel
            questions={questions}
            onSaveQuestions={handleSaveQuestions}
            onResetQuestions={handleResetQuestions}
            leaderboardEntries={leaderboard}
            onClearLeaderboard={handleClearLeaderboard}
          />
        )}

      </main>

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* Certificate Modal */}
      {quizResult && (
        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          playerName={quizSettings.playerName}
          score={quizResult.totalScore}
          percentage={Math.round(
            (quizResult.userAnswers.filter((a) => a.isCorrect).length / activeQuestions.length) * 100
          )}
          categoryName={categoryNameDisplay()}
          totalQuestions={activeQuestions.length}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/70 text-slate-400 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-red-600 text-white font-bold flex items-center justify-center text-xs">
              ज्ञान
            </span>
            <span className="font-bold text-white">ज्ञान संसार Quiz प्रतियोगिता</span>
            <span>&copy; २०८१. सर्वाधिकार सुरक्षित।</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setIsRulesOpen(true)}
              className="hover:text-amber-400 transition"
            >
              नियमहरू
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setLeaderboard(getLeaderboard());
                setActiveTab('leaderboard');
              }}
              className="hover:text-amber-400 transition"
            >
              लिडरबोर्ड
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('admin')}
              className="hover:text-indigo-400 transition"
            >
              प्रशासक प्यानल
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
