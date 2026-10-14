import React, { useState } from 'react';
import { 
  Play, 
  Radio, 
  Trophy, 
  Clock, 
  Sparkles, 
  Award, 
  Users, 
  ArrowRight, 
  Flame, 
  BookOpenCheck,
  CheckCircle2
} from 'lucide-react';
import { Category, CategoryId, LeaderboardEntry } from '../types/quiz';
import { CATEGORIES } from '../data/defaultQuestions';
import { toNepaliNumber } from '../utils/storage';

interface HomeHeroProps {
  onStartQuiz: (playerName: string, categoryId?: CategoryId) => void;
  onStartLiveQuiz: (playerName: string) => void;
  onViewLeaderboard: () => void;
  topWinners: LeaderboardEntry[];
  totalQuestionsCount: number;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartQuiz,
  onStartLiveQuiz,
  onViewLeaderboard,
  topWinners,
  totalQuestionsCount
}) => {
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('gyan_sansar_player_name') || '';
  });
  const [nameError, setNameError] = useState('');

  const validateName = (): boolean => {
    if (!playerName.trim()) {
      setNameError('कृपया क्विज सुरु गर्नुअघि आफ्नो नाम लेख्नुहोस्!');
      return false;
    }
    setNameError('');
    localStorage.setItem('gyan_sansar_player_name', playerName.trim());
    return true;
  };

  const handleStartSolo = (catId?: CategoryId) => {
    if (validateName()) {
      onStartQuiz(playerName.trim(), catId);
    }
  };

  const handleStartLive = () => {
    if (validateName()) {
      onStartLiveQuiz(playerName.trim());
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/90 via-slate-900/90 to-slate-950 border border-slate-700/60 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Glow ambient spots */}
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold animate-pulse">
            <Flame className="w-4 h-4 text-red-500 fill-red-500" />
            <span>नेपालको नं. १ बौद्धिक अनलाइन क्विज प्रतियोगिता</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            ज्ञान संसार <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">Quiz प्रतियोगिता</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            नेपालको सामान्य ज्ञान, इतिहास, भूगोल, विज्ञान, खेलकुद र समसामयिक विषयहरूमा आफ्नो ज्ञान जाँच्नुहोस्, तुरुन्तै अंक प्राप्त गर्नुहोस् र लिडरबोर्डको शीर्ष स्थान ओगट्नुहोस्!
          </p>

          {/* Quick Player Input Box */}
          <div className="max-w-lg mx-auto bg-slate-800/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-700 shadow-xl space-y-4">
            <div className="text-left">
              <label className="block text-sm font-bold text-slate-200 mb-1">
                खेलाडीको नाम (Player Name):
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  if (nameError) setNameError('');
                }}
                placeholder="उदा. रोशन शर्मा, पूजा खड्का..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition text-base font-medium ${
                  nameError 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:border-red-500 focus:ring-red-500/30'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStartSolo();
                }}
              />
              {nameError && (
                <p className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <span>⚠️</span> {nameError}
                </p>
              )}
            </div>

            {/* Launch Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => handleStartSolo()}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              >
                <Play className="w-5 h-5 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
                <span>एकल क्विज खेल्नुहोस्</span>
              </button>

              <button
                onClick={handleStartLive}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              >
                <Radio className="w-5 h-5 text-red-950 animate-pulse" />
                <span>लाइभ प्रतियोगिता (Live)</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400">
                {toNepaliNumber(totalQuestionsCount)}+
              </div>
              <div className="text-xs text-slate-400">गुणस्तरीय प्रश्नहरू</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">
                {toNepaliNumber(CATEGORIES.length)}
              </div>
              <div className="text-xs text-slate-400">प्रमुख विषयहरू</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-center">
              <div className="text-xl sm:text-2xl font-black text-sky-400">
                {toNepaliNumber(15)} / {toNepaliNumber(30)} सेकेन्ड
              </div>
              <div className="text-xs text-slate-400">समय सीमा (Timer)</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-center">
              <div className="text-xl sm:text-2xl font-black text-rose-400">
                १००%
              </div>
              <div className="text-xs text-slate-400">नेपाली युनिकोड</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-850/60 bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">वास्तविक लिडरबोर्ड र र्‍याङ्किङ</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            प्रत्येक खेलको अंक, सही र गलत उत्तर तथा कुल समयको आधारमा निष्पक्ष लिडरबोर्ड तयार हुन्छ। कम समयमा उत्तर मिलाउने खेलाडीलाई उच्च प्राथमिकता दिइन्छ।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">लाइभ काउन्टडाउन र लाइफलाइन</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            १५ वा ३० सेकेन्डको अन्तरक्रियात्मक काउन्टडाउन, अडियो इफेक्ट्स, ५०:५० विकल्प, र सङ्केत (Hint) लाइफलाइनले प्रतियोगितालाई अझ रोमाञ्चक बनाउँछ।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">छोटो व्याख्या र प्रमाणपत्र</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            उत्तर छान्ने बित्तिकै सही उत्तर र तथ्यगत नेपाली व्याख्या देखाउँछ। क्विज सकिएपछि आफ्नो नाम अंकित सुन्दर डिजिटल प्रमाणपत्र सुरक्षित तथा सेयर गर्न सकिन्छ।
          </p>
        </div>
      </section>

      {/* 9 Quiz Categories Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              क्विजका विषयहरू (Quiz Categories)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              आफ्नो मनपर्ने विषय छनोट गर्नुहोस् र तुरुन्तै प्रतियोगिता सुरु गर्नुहोस्:
            </p>
          </div>
          <button
            onClick={() => handleStartSolo()}
            className="text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition"
          >
            <span>सबै विषयहरू एकैसाथ खेल्नुहोस्</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleStartSolo(cat.id)}
              className="group p-5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-red-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-red-500/5 flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-700/80">
                  {cat.icon}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${cat.badgeBg}`}>
                  {cat.nameEn}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white border-t border-slate-700/40">
                <span>क्विज सुरु गर्नुहोस्</span>
                <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top 3 Champions Highlight Box */}
      {topWinners.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  ज्ञान संसारका शीर्ष खेलाडीहरू (Top Champions)
                </h2>
                <p className="text-xs text-slate-400">हालसम्म उच्च अंक प्राप्त गरी अग्रस्थानमा रहेका खेलाडीहरू</p>
              </div>
            </div>
            <button
              onClick={onViewLeaderboard}
              className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              पूर्ण लिडरबोर्ड हेर्नुहोस् &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topWinners.slice(0, 3).map((winner, idx) => {
              const medals = ['🥇 १ औं स्थान', '🥈 २ औं स्थान', '🥉 ३ औं स्थान'];
              const borders = [
                'border-amber-400/50 bg-amber-500/5',
                'border-slate-400/40 bg-slate-400/5',
                'border-amber-700/40 bg-amber-700/5'
              ];
              return (
                <div
                  key={winner.id}
                  className={`p-4 rounded-2xl border ${borders[idx]} flex items-center gap-4 relative overflow-hidden`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center font-black text-xl text-amber-400 border border-slate-700">
                    {idx === 0 ? '🏆' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-amber-400">
                      {medals[idx]}
                    </span>
                    <h3 className="font-bold text-white text-base truncate max-w-[150px]">
                      {winner.playerName}
                    </h3>
                    <div className="text-xs text-slate-300 font-semibold">
                      अंक: <span className="text-emerald-400 font-extrabold">{toNepaliNumber(winner.score)}</span> | शुद्धता: {toNepaliNumber(winner.percentage)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};
