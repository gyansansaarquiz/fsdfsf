import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Flame, 
  Award, 
  Lightbulb, 
  Zap, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { Question, QuizSettings, UserAnswer } from '../types/quiz';
import { playSound } from '../utils/audio';
import { toNepaliNumber } from '../utils/storage';
import { CATEGORIES } from '../data/defaultQuestions';

interface QuizPlayProps {
  questions: Question[];
  settings: QuizSettings;
  onComplete: (userAnswers: UserAnswer[], totalScore: number, totalTimeSeconds: number) => void;
  onQuit: () => void;
}

export const QuizPlay: React.FC<QuizPlayProps> = ({
  questions,
  settings,
  onComplete,
  onQuit
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswer>>({});
  const [timeLeft, setTimeLeft] = useState<number>(settings.timePerQuestion);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);

  // Lifelines state
  const [lifeline50Used, setLifeline50Used] = useState<boolean>(false);
  const [lifelineHintUsed, setLifelineHintUsed] = useState<boolean>(false);
  const [lifelineTimeUsed, setLifelineTimeUsed] = useState<boolean>(false);
  
  // Per question state
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Ref to track total time taken across the quiz
  const startTimeRef = useRef<number>(Date.now());
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<any>(null);

  const currentQ = questions[currentIndex];
  const currentAnswer = userAnswers[currentIndex];
  const isAnswered = currentAnswer !== undefined;

  const getPointsForDifficulty = (diff: string): number => {
    switch (diff) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return 10;
    }
  };

  // Reset timer & lifelines when changing questions
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
    setHiddenOptions([]);
    setShowHint(false);

    // If already answered, stop timer
    if (userAnswers[currentIndex]) {
      setTimerActive(false);
      setTimeLeft(0);
    } else {
      setTimeLeft(settings.timePerQuestion);
      setTimerActive(true);
    }
  }, [currentIndex]);

  // Timer countdown hook
  useEffect(() => {
    if (!timerActive || isAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }

        // Sound cues
        if (prev <= 5 && prev > 1) {
          playSound('urgent', settings.soundEnabled);
        } else if (prev > 5 && prev % 5 === 0) {
          playSound('tick', settings.soundEnabled);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, isAnswered, currentIndex]);

  // Handle timeout if player does not answer in time
  const handleTimeOut = () => {
    setTimerActive(false);
    playSound('wrong', settings.soundEnabled);

    const timeTaken = settings.timePerQuestion;
    const answerRecord: UserAnswer = {
      questionId: currentQ.id,
      selectedOption: null,
      isCorrect: false,
      timeTaken
    };

    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: answerRecord
    }));
    setStreak(0);
  };

  // Handle option selection
  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return; // cannot change once answered

    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const timeTaken = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    const isCorrect = optionIndex === currentQ.correctAnswer;

    if (isCorrect) {
      const basePoints = getPointsForDifficulty(currentQ.difficulty);
      // Speed bonus: answering in first 5 seconds adds bonus
      const speedBonus = timeLeft > (settings.timePerQuestion - 5) ? 5 : 0;
      const streakBonus = streak >= 2 ? 5 : 0;
      const earned = basePoints + speedBonus + streakBonus;

      setTotalScore((prev) => prev + earned);
      setStreak((prev) => prev + 1);
      playSound('correct', settings.soundEnabled);
    } else {
      setStreak(0);
      playSound('wrong', settings.soundEnabled);
    }

    const answerRecord: UserAnswer = {
      questionId: currentQ.id,
      selectedOption: optionIndex,
      isCorrect,
      timeTaken
    };

    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: answerRecord
    }));
  };

  // Next Question or Finish
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all questions!
      finishQuiz();
    }
  };

  // Previous Question
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = () => {
    const totalTimeSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    const answerList: UserAnswer[] = questions.map((q, idx) => {
      return userAnswers[idx] || {
        questionId: q.id,
        selectedOption: null,
        isCorrect: false,
        timeTaken: settings.timePerQuestion
      };
    });

    onComplete(answerList, totalScore, totalTimeSeconds);
  };

  // Lifeline 1: 50:50
  const useLifeline50 = () => {
    if (lifeline50Used || isAnswered) return;
    playSound('lifeline', settings.soundEnabled);
    setLifeline50Used(true);

    const wrongIndexes = [0, 1, 2, 3].filter((idx) => idx !== currentQ.correctAnswer);
    // Shuffle and pick 2 wrong options to hide
    const toHide = wrongIndexes.sort(() => 0.5 - Math.random()).slice(0, 2);
    setHiddenOptions(toHide);
  };

  // Lifeline 2: Hint
  const useLifelineHint = () => {
    if (lifelineHintUsed || isAnswered) return;
    playSound('lifeline', settings.soundEnabled);
    setLifelineHintUsed(true);
    setShowHint(true);
  };

  // Lifeline 3: Extra +15 seconds
  const useLifelineTime = () => {
    if (lifelineTimeUsed || isAnswered) return;
    playSound('lifeline', settings.soundEnabled);
    setLifelineTimeUsed(true);
    setTimeLeft((prev) => prev + 15);
  };

  // Category info
  const catInfo = CATEGORIES.find((c) => c.id === currentQ.categoryId);

  // Timer visual progress
  const timerPercent = Math.max(0, Math.min(100, (timeLeft / settings.timePerQuestion) * 100));
  const isUrgent = timeLeft <= 5 && timerActive;

  const totalAnsweredCount = Object.keys(userAnswers).length;
  const remainingCount = questions.length - totalAnsweredCount;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Header Bar: Player, Streak, Score & Quit */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-md">
            {settings.playerName.charAt(0) || 'ख'}
          </div>
          <div>
            <div className="font-bold text-white text-sm sm:text-base">{settings.playerName}</div>
            <div className="text-xs text-slate-400">
              {catInfo?.name || 'मिश्रित सामान्य ज्ञान'}
            </div>
          </div>
        </div>

        {/* Streak & Current Score */}
        <div className="flex items-center gap-4">
          {streak >= 2 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold animate-bounce">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>{toNepaliNumber(streak)} लगातार सही!</span>
            </div>
          )}

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-right">
            <div className="text-[10px] text-slate-400 font-medium">कुल प्राप्त अंक</div>
            <div className="text-lg font-black text-amber-400">{toNepaliNumber(totalScore)}</div>
          </div>

          <button
            onClick={() => {
              if (confirm('के तपाईं क्विज समाप्त गर्न चाहनुहुन्छ?')) {
                finishQuiz();
              }
            }}
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            क्विज अन्त्य गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Progress & Question Counter */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-white bg-red-600/30 border border-red-500/40 px-3 py-1 rounded-full">
              प्रश्न: {toNepaliNumber(currentIndex + 1)} / {toNepaliNumber(questions.length)}
            </span>
            <span className="text-xs text-slate-400">
              (बाँकी: {toNepaliNumber(remainingCount)})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
              currentQ.difficulty === 'easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : currentQ.difficulty === 'medium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {currentQ.difficulty === 'easy' ? 'सजिलो (+१०)' : currentQ.difficulty === 'medium' ? 'मध्यम (+२०)' : 'कठिन (+३०)'}
            </span>
          </div>
        </div>

        {/* Timer Bar & Countdown Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-500 animate-spin' : 'text-amber-400'}`} />
              <span>समय बाँकी (Timer)</span>
            </div>
            <div className={`text-base font-black tracking-wider ${
              isUrgent ? 'text-red-500 animate-pulse text-lg' : timeLeft <= 10 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {toNepaliNumber(timeLeft)} सेकेन्ड
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isUrgent 
                  ? 'bg-gradient-to-r from-red-600 to-rose-500' 
                  : timeLeft <= 10 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
              }`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>

        {/* Lifelines Bar */}
        <div className="flex items-center justify-end gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400 mr-1 hidden sm:inline">लाइफलाइनहरू:</span>
          
          <button
            type="button"
            disabled={lifeline50Used || isAnswered}
            onClick={useLifeline50}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
              lifeline50Used
                ? 'opacity-40 bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>५०:५० (दुई विकल्प हटाउने)</span>
          </button>

          <button
            type="button"
            disabled={lifelineHintUsed || isAnswered || !currentQ.hint}
            onClick={useLifelineHint}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
              lifelineHintUsed || !currentQ.hint
                ? 'opacity-40 bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                : 'bg-amber-600/20 text-amber-300 border-amber-500/40 hover:bg-amber-600/30'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>सङ्केत (Hint)</span>
          </button>

          <button
            type="button"
            disabled={lifelineTimeUsed || isAnswered}
            onClick={useLifelineTime}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
              lifelineTimeUsed
                ? 'opacity-40 bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-600/30'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>+१५ सेकेन्ड</span>
          </button>
        </div>

        {/* Revealed Hint Box if used */}
        {showHint && currentQ.hint && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">सङ्केत (Hint): </span>
              <span>{currentQ.hint}</span>
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="py-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed tracking-wide">
            {toNepaliNumber(currentIndex + 1)}. {currentQ.question}
          </h2>
        </div>

        {/* Four Options (A, B, C, D) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const nepaliLetter = ['(क)', '(ख)', '(ग)', '(घ)'][idx];
            const isHidden = hiddenOptions.includes(idx);

            if (isHidden) {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/40 text-slate-600 opacity-40 cursor-not-allowed flex items-center gap-3"
                >
                  <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs">
                    {letter}
                  </span>
                  <span className="line-through text-sm">विकल्प हटाइयो</span>
                </div>
              );
            }

            // Styling based on state
            let buttonStyle = 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-slate-500';
            let badgeStyle = 'bg-slate-700 text-slate-300';
            let statusIcon = null;

            if (isAnswered) {
              if (idx === currentQ.correctAnswer) {
                // Correct answer is always highlighted green
                buttonStyle = 'bg-emerald-600/25 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                badgeStyle = 'bg-emerald-500 text-slate-950 font-bold';
                statusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
              } else if (currentAnswer.selectedOption === idx) {
                // User picked wrong option
                buttonStyle = 'bg-rose-600/25 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                badgeStyle = 'bg-rose-500 text-white font-bold';
                statusIcon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
              } else {
                buttonStyle = 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-50';
                badgeStyle = 'bg-slate-800 text-slate-600';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between gap-3 group ${buttonStyle} ${
                  !isAnswered ? 'active:scale-98 cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${badgeStyle}`}>
                    {letter}
                  </span>
                  <span className="text-base sm:text-lg font-semibold">
                    <span className="text-xs text-slate-400 font-normal mr-1.5">{nepaliLetter}</span>
                    {option}
                  </span>
                </div>
                {statusIcon}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Card after answering */}
        {isAnswered && (
          <div className={`p-4 sm:p-5 rounded-2xl border animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-2 ${
            currentAnswer.isCorrect 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100' 
              : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              {currentAnswer.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300">उत्कृष्ट! सही उत्तर हो।</span>
                </>
              ) : currentAnswer.selectedOption === null ? (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-amber-300">समय सकियो! सही उत्तर: विकल्प {['A', 'B', 'C', 'D'][currentQ.correctAnswer]} ({currentQ.options[currentQ.correctAnswer]}) हो।</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="text-rose-300">गलत उत्तर! सही उत्तर: विकल्प {['A', 'B', 'C', 'D'][currentQ.correctAnswer]} ({currentQ.options[currentQ.correctAnswer]}) हो।</span>
                </>
              )}
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7 border-t border-slate-700/40 pt-2">
              <span className="font-bold text-white">व्याख्या (Explanation): </span>
              {currentQ.explanation}
            </div>
          </div>
        )}

        {/* Navigation Buttons: Previous / Next Question */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
              currentIndex === 0
                ? 'opacity-40 bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>अघिल्लो प्रश्न (Previous)</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-lg ${
              isAnswered
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <span>
              {currentIndex === questions.length - 1
                ? 'नतिजा हेर्नुहोस् (Finish)'
                : 'अर्को प्रश्न (Next)'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Question Jump Grid Tray */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
        <div className="text-xs font-bold text-slate-400 mb-3 flex items-center justify-between">
          <span>प्रश्नहरूको सूची (Questions Overview):</span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> सही</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> गलत</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> बाँकी</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const ans = userAnswers[idx];
            let dotBg = 'bg-slate-800 text-slate-400 border-slate-700';

            if (ans !== undefined) {
              dotBg = ans.isCorrect
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-rose-600 text-white border-rose-400';
            } else if (idx === currentIndex) {
              dotBg = 'bg-amber-500 text-slate-950 border-amber-300 font-black ring-2 ring-amber-400/50';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold border flex items-center justify-center transition-transform hover:scale-105 ${dotBg}`}
              >
                {toNepaliNumber(idx + 1)}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
