import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Share2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  Eye, 
  Download, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Question, QuizSettings, UserAnswer } from '../types/quiz';
import { toNepaliNumber, addLeaderboardEntry } from '../utils/storage';
import { playSound } from '../utils/audio';
import { CATEGORIES } from '../data/defaultQuestions';

interface QuizResultProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  totalScore: number;
  totalTimeSeconds: number;
  settings: QuizSettings;
  onRestart: () => void;
  onGoHome: () => void;
  onOpenCertificate: () => void;
  onViewLeaderboard: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  questions,
  userAnswers,
  totalScore,
  totalTimeSeconds,
  settings,
  onRestart,
  onGoHome,
  onOpenCertificate,
  onViewLeaderboard
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');

  const totalQuestions = questions.length;
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Trigger confetti and victory fanfare
  useEffect(() => {
    playSound('victory', settings.soundEnabled);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    } catch (e) {
      // ignore if canvas not supported
    }

    // Save to leaderboard
    const cat = CATEGORIES.find((c) => c.id === settings.categoryId);
    const nepaliDate = new Date().toISOString().slice(0, 10);

    addLeaderboardEntry({
      playerName: settings.playerName,
      score: totalScore,
      totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      percentage,
      totalTimeSeconds,
      categoryName: cat ? cat.name : 'मिश्रित सामान्य ज्ञान',
      difficulty: settings.difficulty === 'all' ? 'मिश्रित' : settings.difficulty === 'easy' ? 'सजिलो' : settings.difficulty === 'medium' ? 'मध्यम' : 'कठिन',
      date: nepaliDate
    });
  }, []);

  // Performance message
  const getPerformanceRemark = () => {
    if (percentage >= 90) return { title: 'असाधारण र उत्कृष्ट प्रदर्शन!', badge: '🏆 च्याम्पियन', color: 'text-amber-400' };
    if (percentage >= 70) return { title: 'धेरै राम्रो नतिजा!', badge: '🌟 प्रतिभाशाली', color: 'text-emerald-400' };
    if (percentage >= 50) return { title: 'सन्तोषजनक नतिजा!', badge: '👍 राम्रो प्रयास', color: 'text-sky-400' };
    return { title: 'अझै धेरै अभ्यास आवश्यक छ!', badge: '📚 निरन्तर प्रयास', color: 'text-orange-400' };
  };

  const remark = getPerformanceRemark();

  // Social sharing logic
  const shareText = `🇳🇵 ज्ञान संसार Quiz प्रतियोगितामा मैले ${toNepaliNumber(totalQuestions)} मध्ये ${toNepaliNumber(correctCount)} प्रश्नको सही उत्तर दिई ${toNepaliNumber(totalScore)} अंक (${toNepaliNumber(percentage)}%) प्राप्त गरेँ! \n\nके तपाईं मलाई जित्न सक्नुहुन्छ? अहिल्यै खेल्नुहोस्: ${window.location.origin}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareViaWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  // Filtered review questions
  const filteredQuestions = questions.filter((_, idx) => {
    const ans = userAnswers[idx];
    if (reviewFilter === 'correct') return ans?.isCorrect;
    if (reviewFilter === 'wrong') return !ans?.isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Result Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/80 p-6 sm:p-10 shadow-2xl text-center space-y-6">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{remark.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            बधाई छ, <span className="text-amber-400">{settings.playerName}</span>!
          </h1>
          <p className={`text-base sm:text-lg font-bold ${remark.color}`}>
            {remark.title}
          </p>
        </div>

        {/* Big Percentage & Score Circle */}
        <div className="relative z-10 flex flex-col items-center justify-center py-2">
          <div className="w-40 h-40 rounded-full border-4 border-amber-500/60 bg-gradient-to-tr from-slate-900 to-slate-800 shadow-2xl flex flex-col items-center justify-center relative">
            <span className="text-4xl sm:text-5xl font-black text-amber-400">
              {toNepaliNumber(percentage)}%
            </span>
            <span className="text-xs text-slate-400 font-semibold mt-1">
              प्राप्त प्रतिशत
            </span>
          </div>
          <div className="mt-3 text-lg font-black text-white">
            कुल अंक: <span className="text-amber-400 text-2xl">{toNepaliNumber(totalScore)}</span>
          </div>
        </div>

        {/* 4 Key Stat Badges */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold">सही उत्तर</span>
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {toNepaliNumber(correctCount)}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-rose-400 mb-1">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-bold">गलत उत्तर</span>
            </div>
            <div className="text-2xl font-black text-rose-300">
              {toNepaliNumber(wrongCount)}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-sky-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold">कुल समय</span>
            </div>
            <div className="text-2xl font-black text-sky-300">
              {toNepaliNumber(totalTimeSeconds)} से.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-bold">कुल प्रश्न</span>
            </div>
            <div className="text-2xl font-black text-amber-300">
              {toNepaliNumber(totalQuestions)}
            </div>
          </div>

        </div>

        {/* Action Buttons: Restart, Certificate, Leaderboard */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800">
          
          <button
            onClick={onRestart}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Quiz (पुनः खेल्नुहोस्)</span>
          </button>

          <button
            onClick={onOpenCertificate}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>प्रमाणपत्र हेर्नुहोस् (Certificate)</span>
          </button>

          <button
            onClick={onViewLeaderboard}
            className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition flex items-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>लिडरबोर्ड हेर्नुहोस्</span>
          </button>

          <button
            onClick={onGoHome}
            className="py-3 px-5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700/80 transition"
          >
            गृहपृष्ठ फर्कनुहोस्
          </button>

        </div>

        {/* Social Media Share Section */}
        <div className="relative z-10 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-200">
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>आफ्नो नतिजा साथीहरूसँग सेयर गर्नुहोस्:</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <button
              onClick={shareViaWhatsApp}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow"
            >
              <span>WhatsApp</span>
            </button>

            <button
              onClick={shareViaFacebook}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow"
            >
              <span>Facebook</span>
            </button>

            <button
              onClick={shareViaTwitter}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow"
            >
              <span>Twitter / X</span>
            </button>

            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition flex items-center gap-1.5 border border-slate-600"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'कपी गरियो!' : 'नतिजा कपी गर्नुहोस्'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Answer Review Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              <span>उत्तरहरूको समीक्षा तथा व्याख्या (Review Answers)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              प्रत्येक प्रश्नको सही उत्तर र विस्तृत नेपाली तथ्यगत व्याख्या पढ्नुहोस्।
            </p>
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                reviewFilter === 'all' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              सबै ({toNepaliNumber(totalQuestions)})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                reviewFilter === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              सही ({toNepaliNumber(correctCount)})
            </button>
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                reviewFilter === 'wrong' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              गलत ({toNepaliNumber(wrongCount)})
            </button>
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const originalIndex = questions.findIndex((orig) => orig.id === q.id);
            const ans = userAnswers[originalIndex];
            const isCorrect = ans?.isCorrect;
            const userPick = ans?.selectedOption;

            return (
              <div
                key={q.id}
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                  isCorrect
                    ? 'bg-slate-800/40 border-emerald-500/30'
                    : 'bg-slate-800/40 border-rose-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-bold text-base sm:text-lg text-white">
                    {toNepaliNumber(originalIndex + 1)}. {q.question}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 ${
                    isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {isCorrect ? '✓ सही' : '✗ गलत'}
                  </span>
                </div>

                {/* Options Review Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {q.options.map((opt, oIdx) => {
                    const isRightAnswer = oIdx === q.correctAnswer;
                    const isUserChoice = userPick === oIdx;

                    let optBg = 'bg-slate-850 bg-slate-900/60 border-slate-800 text-slate-300';
                    if (isRightAnswer) {
                      optBg = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-bold';
                    } else if (isUserChoice && !isCorrect) {
                      optBg = 'bg-rose-950/40 border-rose-500/60 text-rose-200 line-through';
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${optBg}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-xs">
                            {['A', 'B', 'C', 'D'][oIdx]}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isRightAnswer && (
                          <span className="text-[11px] font-bold text-emerald-400">सही उत्तर</span>
                        )}
                        {isUserChoice && !isCorrect && (
                          <span className="text-[11px] font-bold text-rose-400">तपाईंको छनोट</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Nepali Explanation */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400">व्याख्या: </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
