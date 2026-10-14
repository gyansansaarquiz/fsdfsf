import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Radio, 
  Users, 
  Trophy, 
  Clock, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Crown, 
  RotateCcw,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';
import { Question, LiveCompetitor, LeaderboardEntry } from '../types/quiz';
import { playSound } from '../utils/audio';
import { toNepaliNumber, addLeaderboardEntry } from '../utils/storage';

interface LiveQuizProps {
  questions: Question[];
  playerName: string;
  soundEnabled: boolean;
  onFinishLiveQuiz: () => void;
  onGoHome: () => void;
}

const BOT_NAMES = [
  { name: 'आयुश शर्मा', avatar: '👨‍🎓', accuracy: 0.85 },
  { name: 'सुनिता गुरुङ', avatar: '👩‍🏫', accuracy: 0.88 },
  { name: 'प्रशान्त अधिकारी', avatar: '👨‍💻', accuracy: 0.8 },
  { name: 'सङ्गीता श्रेष्ठ', avatar: '👩‍🔬', accuracy: 0.75 },
  { name: 'रोशन थापा', avatar: '🧑‍💼', accuracy: 0.72 },
  { name: 'पूजा खड्का', avatar: '👩‍⚕️', accuracy: 0.78 },
  { name: 'बिपिन पोखरेल', avatar: '👨‍🎤', accuracy: 0.68 },
  { name: 'मनिषा दाहाल', avatar: '👩‍🎨', accuracy: 0.7 }
];

export const LiveQuiz: React.FC<LiveQuizProps> = ({
  questions,
  playerName,
  soundEnabled,
  onFinishLiveQuiz,
  onGoHome
}) => {
  // Stage: 'lobby' | 'countdown' | 'question' | 'round-summary' | 'podium'
  const [stage, setStage] = useState<'lobby' | 'countdown' | 'question' | 'round-summary' | 'podium'>('lobby');
  const [lobbyCountdown, setLobbyCountdown] = useState<number>(5);
  
  // Game state
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [liveQuestions] = useState<Question[]>(() => {
    // Pick 8 random questions for fast live battle
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  });

  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [userSelected, setUserSelected] = useState<number | null>(null);
  const [isRoundLocked, setIsRoundLocked] = useState<boolean>(false);
  
  // Competitors
  const [competitors, setCompetitors] = useState<LiveCompetitor[]>([]);
  const [userScore, setUserScore] = useState<number>(0);
  const [userStreak, setUserStreak] = useState<number>(0);
  const [userCorrectCount, setUserCorrectCount] = useState<number>(0);

  const roundTimerRef = useRef<any>(null);
  const roundStartTimeRef = useRef<number>(Date.now());
  const tournamentStartTimeRef = useRef<number>(Date.now());

  // Initialize lobby with simulated live competitors
  useEffect(() => {
    const initialBots: LiveCompetitor[] = BOT_NAMES.map((b, i) => ({
      id: `bot-${i}`,
      name: b.name,
      avatar: b.avatar,
      score: 0,
      streak: 0,
      lastAnswerCorrect: null,
      lastAnswerTime: 0,
      accuracyRate: b.accuracy
    }));
    setCompetitors(initialBots);
  }, []);

  // Lobby countdown to launch
  useEffect(() => {
    if (stage !== 'lobby') return;
    const interval = setInterval(() => {
      setLobbyCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          startRound(0);
          return 0;
        }
        playSound('tick', soundEnabled);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  // Start question round
  const startRound = (roundIdx: number) => {
    setCurrentRound(roundIdx);
    setTimeLeft(15);
    setUserSelected(null);
    setIsRoundLocked(false);
    setStage('question');
    roundStartTimeRef.current = Date.now();
  };

  // Question timer effect
  useEffect(() => {
    if (stage !== 'question' || isRoundLocked) return;

    roundTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(roundTimerRef.current);
          handleRoundTimeout();
          return 0;
        }
        if (prev <= 5) {
          playSound('urgent', soundEnabled);
        } else if (prev % 4 === 0) {
          playSound('tick', soundEnabled);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    };
  }, [stage, isRoundLocked, currentRound]);

  // Round timeout handler
  const handleRoundTimeout = () => {
    setIsRoundLocked(true);
    playSound('wrong', soundEnabled);
    setUserStreak(0);
    resolveRoundAnswers(null, 15);
  };

  // User selected an option
  const handleAnswerSelect = (optionIdx: number) => {
    if (isRoundLocked || userSelected !== null) return;

    if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    setUserSelected(optionIdx);
    setIsRoundLocked(true);

    const timeSpent = Math.max(1, Math.round((Date.now() - roundStartTimeRef.current) / 1000));
    const currentQ = liveQuestions[currentRound];
    const isCorrect = optionIdx === currentQ.correctAnswer;

    if (isCorrect) {
      playSound('correct', soundEnabled);
      // Speed multiplier: faster answer gives up to 50 bonus pts
      const speedBonus = Math.max(0, (15 - timeSpent) * 4);
      const earned = 100 + speedBonus + userStreak * 10;
      setUserScore((prev) => prev + earned);
      setUserStreak((prev) => prev + 1);
      setUserCorrectCount((prev) => prev + 1);
    } else {
      playSound('wrong', soundEnabled);
      setUserStreak(0);
    }

    resolveRoundAnswers(optionIdx, timeSpent);
  };

  // Simulate bots answering and proceed to summary
  const resolveRoundAnswers = (userChoice: number | null, userTime: number) => {
    const currentQ = liveQuestions[currentRound];

    // Update bots
    setCompetitors((prevBots) => {
      return prevBots.map((bot) => {
        const isBotCorrect = Math.random() < bot.accuracyRate;
        const botTime = Math.floor(Math.random() * 9) + 2; // 2 to 10 seconds
        let botPoints = 0;
        let newStreak = bot.streak;

        if (isBotCorrect) {
          const speedBonus = Math.max(0, (15 - botTime) * 4);
          botPoints = 100 + speedBonus + bot.streak * 10;
          newStreak += 1;
        } else {
          newStreak = 0;
        }

        return {
          ...bot,
          score: bot.score + botPoints,
          streak: newStreak,
          lastAnswerCorrect: isBotCorrect,
          lastAnswerTime: botTime
        };
      });
    });

    // Pause briefly to show answer, then transition to round-summary
    setTimeout(() => {
      setStage('round-summary');
    }, 2000);
  };

  // Move from round-summary to next question or podium
  const handleProceedNext = () => {
    if (currentRound < liveQuestions.length - 1) {
      startRound(currentRound + 1);
    } else {
      // Grand Finale Podium!
      setStage('podium');
      playSound('victory', soundEnabled);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      // Save live game to leaderboard
      const totalTime = Math.max(1, Math.round((Date.now() - tournamentStartTimeRef.current) / 1000));
      const percentage = Math.round((userCorrectCount / liveQuestions.length) * 100);
      addLeaderboardEntry({
        playerName: playerName || 'खेलाडी',
        score: userScore,
        totalQuestions: liveQuestions.length,
        correctAnswers: userCorrectCount,
        wrongAnswers: liveQuestions.length - userCorrectCount,
        percentage,
        totalTimeSeconds: totalTime,
        categoryName: 'प्रत्यक्ष लाइभ क्विज (Live Tournament)',
        difficulty: 'मिश्रित',
        date: new Date().toISOString().slice(0, 10),
        isLiveQuiz: true
      });
    }
  };

  // Sort overall leaderboard right now
  const allCurrentPlayers = [
    { id: 'user', name: `${playerName || 'तपाईं'} (तपाईं)`, avatar: '🌟', score: userScore, isUser: true, streak: userStreak },
    ...competitors.map((c) => ({ id: c.id, name: c.name, avatar: c.avatar, score: c.score, isUser: false, streak: c.streak }))
  ].sort((a, b) => b.score - a.score);

  const userRank = allCurrentPlayers.findIndex((p) => p.isUser) + 1;
  const currentQ = liveQuestions[currentRound];

  // 1. Lobby Stage
  if (stage === 'lobby') {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-8 animate-in fade-in">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-sm animate-pulse">
            <Radio className="w-4 h-4 text-red-500" />
            <span>प्रत्यक्ष लाइभ म्याच लबी (Live Match Lobby)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            प्रतियोगिता कोठा: <span className="text-amber-400 font-mono">#GS-२०८१</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
            सबै अनलाइन सहभागीहरू कोठामा जोडिँदै छन्। काउन्टडाउन समाप्त भएपछि प्रतिस्पर्धा स्वतः सुरु हुनेछ!
          </p>

          {/* Big countdown indicator */}
          <div className="py-2">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-red-500/30 animate-bounce">
              {toNepaliNumber(lobbyCountdown)}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-bold">सेकेन्डमा खेल सुरु हुँदैछ...</div>
          </div>

          {/* Connected players roster */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>सामेल भएका खेलाडीहरू ({toNepaliNumber(competitors.length + 1)})</span>
              </span>
              <span className="text-emerald-400 font-mono">● LIVE CONNECTED</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* User badge */}
              <div className="p-3 rounded-xl bg-red-600/20 border border-red-500/50 flex items-center gap-2.5 shadow-md">
                <span className="text-xl">🌟</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-white truncate">{playerName || 'तपाईं'}</div>
                  <div className="text-[10px] text-amber-300 font-bold">तपाईं (You)</div>
                </div>
              </div>

              {competitors.map((bot) => (
                <div key={bot.id} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5">
                  <span className="text-xl">{bot.avatar}</span>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-slate-200 truncate">{bot.name}</div>
                    <div className="text-[10px] text-slate-400">प्रतिस्पर्धी</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => startRound(0)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-extrabold text-base shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition cursor-pointer"
          >
            तुरुन्तै लाइभ सुरु गर्नुहोस् (Skip Countdown)
          </button>
        </div>
      </div>
    );
  }

  // 2. Podium / Grand Finale Stage
  if (stage === 'podium') {
    const top3 = allCurrentPlayers.slice(0, 3);
    const userIsTop3 = userRank <= 3;

    return (
      <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in fade-in">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-extrabold text-sm">
            <Crown className="w-5 h-5 text-amber-400" />
            <span>प्रतियोगिताको नतिजा (Live Tournament Results)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            विजयी खेलाडीहरूको मञ्च (Winners Podium)
          </h1>

          {/* Podium Visual Layout */}
          <div className="flex items-end justify-center gap-3 sm:gap-6 pt-6 pb-4">
            
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex flex-col items-center flex-1 max-w-[150px]">
                <div className="text-3xl mb-1">{top3[1].avatar}</div>
                <div className="text-xs sm:text-sm font-bold text-white truncate w-full">{top3[1].name}</div>
                <div className="text-xs text-amber-400 font-extrabold">{toNepaliNumber(top3[1].score)} अंक</div>
                <div className="w-full h-32 rounded-t-2xl bg-gradient-to-t from-slate-800 to-slate-700 border-t-4 border-slate-400 flex flex-col items-center justify-center mt-2 shadow-lg">
                  <span className="text-2xl font-black text-slate-300">२</span>
                  <span className="text-[10px] text-slate-400 font-bold">दोस्रो</span>
                </div>
              </div>
            )}

            {/* 1st Place (Champion) */}
            {top3[0] && (
              <div className="flex flex-col items-center flex-1 max-w-[170px] -mt-6">
                <Crown className="w-8 h-8 text-amber-400 animate-bounce mb-1" />
                <div className="text-4xl mb-1">{top3[0].avatar}</div>
                <div className="text-sm sm:text-base font-extrabold text-amber-300 truncate w-full">{top3[0].name}</div>
                <div className="text-sm text-emerald-400 font-black">{toNepaliNumber(top3[0].score)} अंक</div>
                <div className="w-full h-44 rounded-t-2xl bg-gradient-to-t from-amber-600 to-amber-500 border-t-4 border-yellow-300 flex flex-col items-center justify-center mt-2 shadow-2xl shadow-amber-500/30">
                  <span className="text-4xl font-black text-slate-950">१</span>
                  <span className="text-xs text-slate-950 font-black">प्रथम विजेता</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex flex-col items-center flex-1 max-w-[150px]">
                <div className="text-3xl mb-1">{top3[2].avatar}</div>
                <div className="text-xs sm:text-sm font-bold text-white truncate w-full">{top3[2].name}</div>
                <div className="text-xs text-amber-400 font-extrabold">{toNepaliNumber(top3[2].score)} अंक</div>
                <div className="w-full h-24 rounded-t-2xl bg-gradient-to-t from-slate-800 to-amber-900/60 border-t-4 border-amber-700 flex flex-col items-center justify-center mt-2 shadow-lg">
                  <span className="text-2xl font-black text-amber-400">३</span>
                  <span className="text-[10px] text-amber-500 font-bold">तेस्रो</span>
                </div>
              </div>
            )}

          </div>

          {/* User's final standing banner */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-lg mx-auto flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs text-slate-400 font-semibold">तपाईंको अन्तिम नतिजा:</div>
              <div className="text-lg font-black text-white">
                स्थान: <span className="text-amber-400">{toNepaliNumber(userRank)} औं</span> | कुल अंक: <span className="text-emerald-400">{toNepaliNumber(userScore)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">सही उत्तर:</div>
              <div className="text-base font-bold text-slate-200">
                {toNepaliNumber(userCorrectCount)} / {toNepaliNumber(liveQuestions.length)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setStage('lobby');
                setLobbyCountdown(5);
                setUserScore(0);
                setUserCorrectCount(0);
                setUserStreak(0);
              }}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-sm shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>नयाँ म्याच खेल्नुहोस्</span>
            </button>

            <button
              onClick={onFinishLiveQuiz}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>लिडरबोर्ड हेर्नुहोस्</span>
            </button>

            <button
              onClick={onGoHome}
              className="py-3 px-5 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700 transition"
            >
              गृहपृष्ठ
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 3. Round Summary Stage (Live Standings between rounds)
  if (stage === 'round-summary') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 py-6 animate-in fade-in">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-center">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-bold text-slate-400">
              राउण्ड {toNepaliNumber(currentRound + 1)} / {toNepaliNumber(liveQuestions.length)} समाप्त
            </div>
            <div className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              तपाईंको स्थान: {toNepaliNumber(userRank)} औं
            </div>
          </div>

          <h2 className="text-2xl font-black text-white">
            राउण्ड समाप्तिपछिको स्थिति (Live Standings)
          </h2>

          {/* Standings List */}
          <div className="space-y-2 max-w-lg mx-auto text-left">
            {allCurrentPlayers.slice(0, 6).map((player, idx) => (
              <div
                key={player.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  player.isUser
                    ? 'bg-red-600/20 border-red-500 ring-2 ring-red-500/30 text-white shadow-md'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    idx === 0 ? 'bg-amber-500 text-slate-950 font-black' : idx === 1 ? 'bg-slate-400 text-slate-950 font-bold' : idx === 2 ? 'bg-amber-700 text-white font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {toNepaliNumber(idx + 1)}
                  </span>
                  <span className="text-xl">{player.avatar}</span>
                  <span className="font-bold text-sm truncate max-w-[140px]">{player.name}</span>
                </div>

                <div className="font-black text-base text-amber-400">
                  {toNepaliNumber(player.score)} अंक
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleProceedNext}
            className="w-full max-w-lg mx-auto py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-extrabold text-base shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {currentRound < liveQuestions.length - 1
                ? `अर्को राउण्डमा जानुहोस् (राउण्ड ${toNepaliNumber(currentRound + 2)})`
                : 'अन्तिम नतिजा हेर्नुहोस् (Podium)'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    );
  }

  // 4. Question Stage (Live Question & Options)
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Live Header Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-black text-red-400 tracking-wider">LIVE ROUND</span>
          <span className="text-xs text-slate-400 font-semibold ml-2">
            राउण्ड {toNepaliNumber(currentRound + 1)} / {toNepaliNumber(liveQuestions.length)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-slate-300">
            तपाईंको स्थान: <span className="text-amber-400 font-black text-sm">{toNepaliNumber(userRank)} औं</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-black text-sm">
            {toNepaliNumber(userScore)} अंक
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Timer Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400">समय बाँकी</span>
            <span className={`text-lg font-black ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>
              {toNepaliNumber(timeLeft)}s
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl font-black text-white leading-relaxed">
          {toNepaliNumber(currentRound + 1)}. {currentQ.question}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentQ.options.map((opt, idx) => {
            let style = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';
            let icon = null;

            if (isRoundLocked) {
              if (idx === currentQ.correctAnswer) {
                style = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
              } else if (userSelected === idx) {
                style = 'bg-rose-600/30 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                icon = <XCircle className="w-5 h-5 text-rose-400" />;
              } else {
                style = 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-40';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isRoundLocked}
                onClick={() => handleAnswerSelect(idx)}
                className={`p-4 rounded-2xl border text-left font-semibold text-base flex items-center justify-between transition-all ${style} ${
                  !isRoundLocked ? 'hover:scale-[1.01] active:scale-98 cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-700/80 flex items-center justify-center font-bold text-xs">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span>{opt}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Quick Explanation */}
        {isRoundLocked && (
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 animate-in fade-in">
            <span className="font-bold text-amber-400">तथ्यगत जानकारी: </span>
            {currentQ.explanation}
          </div>
        )}

      </div>

    </div>
  );
};
