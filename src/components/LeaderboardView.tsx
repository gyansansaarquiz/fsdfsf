import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Clock, 
  Search, 
  Award, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Flame,
  Radio,
  ArrowUpDown
} from 'lucide-react';
import { LeaderboardEntry } from '../types/quiz';
import { toNepaliNumber } from '../utils/storage';
import { CATEGORIES } from '../data/defaultQuestions';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  onStartQuiz: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries,
  onStartQuiz
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter entries
  const filtered = entries.filter((item) => {
    const matchesName = item.playerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.categoryName === categoryFilter;
    return matchesName && matchesCategory;
  });

  // Top 3 Podium Winners
  const top3 = entries.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Title Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 shadow-2xl text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>राष्ट्रिय वरियता तालिका (Official Leaderboard)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white">
          ज्ञान संसार <span className="text-amber-400">लिडरबोर्ड</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          सबैभन्दा धेरै अंक ल्याउने शीर्ष खेलाडीहरूको सूची। समान अंक भएमा कम समयमा पूरा गर्ने खेलाडीले उच्च Rank प्राप्त गर्दछन्।
        </p>

        <div className="pt-2">
          <button
            onClick={onStartQuiz}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg shadow-red-500/20 transition cursor-pointer"
          >
            आफ्नो Rank बनाउन क्विज सुरु गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Top 3 Visual Podium */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          
          {/* 2nd place */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-lg flex flex-col items-center text-center space-y-2 order-2 sm:order-1 sm:mt-6">
            <span className="text-3xl">🥈</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              दोस्रो स्थान (Rank 2)
            </span>
            <h3 className="font-bold text-white text-lg truncate w-full">{top3[1].playerName}</h3>
            <div className="text-2xl font-black text-slate-200">{toNepaliNumber(top3[1].score)} अंक</div>
            <div className="text-xs text-slate-400">
              समय: {toNepaliNumber(top3[1].totalTimeSeconds)} सेकेन्ड | शुद्धता: {toNepaliNumber(top3[1].percentage)}%
            </div>
            <div className="text-[11px] text-amber-400/90 font-medium truncate w-full pt-1 border-t border-slate-800">
              {top3[1].categoryName}
            </div>
          </div>

          {/* 1st place (Gold Champion) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/10 flex flex-col items-center text-center space-y-2 order-1 sm:order-2 sm:-mt-2 relative">
            <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
              विजेता (Champion)
            </div>
            <span className="text-4xl pt-1">🏆</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              प्रथम स्थान (Rank 1)
            </span>
            <h3 className="font-extrabold text-white text-xl truncate w-full">{top3[0].playerName}</h3>
            <div className="text-3xl font-black text-amber-400">{toNepaliNumber(top3[0].score)} अंक</div>
            <div className="text-xs text-slate-300 font-semibold">
              समय: {toNepaliNumber(top3[0].totalTimeSeconds)} सेकेन्ड | शुद्धता: {toNepaliNumber(top3[0].percentage)}%
            </div>
            <div className="text-xs text-amber-300 font-bold truncate w-full pt-1 border-t border-slate-800">
              {top3[0].categoryName}
            </div>
          </div>

          {/* 3rd place */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-amber-900/60 shadow-lg flex flex-col items-center text-center space-y-2 order-3 sm:order-3 sm:mt-10">
            <span className="text-3xl">🥉</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-900/30 text-amber-400 border border-amber-800/50">
              तेस्रो स्थान (Rank 3)
            </span>
            <h3 className="font-bold text-white text-lg truncate w-full">{top3[2].playerName}</h3>
            <div className="text-2xl font-black text-amber-500">{toNepaliNumber(top3[2].score)} अंक</div>
            <div className="text-xs text-slate-400">
              समय: {toNepaliNumber(top3[2].totalTimeSeconds)} सेकेन्ड | शुद्धता: {toNepaliNumber(top3[2].percentage)}%
            </div>
            <div className="text-[11px] text-amber-400/90 font-medium truncate w-full pt-1 border-t border-slate-800">
              {top3[2].categoryName}
            </div>
          </div>

        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="खेलाडीको नाम खोज्नुहोस्..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-400"
          >
            <option value="all">सबै विषयहरू</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
            <option value="प्रत्यक्ष लाइभ क्विज (Live Tournament)">प्रत्यक्ष लाइभ क्विज</option>
          </select>
        </div>

      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>शीर्ष खेलाडीहरूको पूर्ण विवरण (Top Rankings)</span>
          </h2>
          <span className="text-xs text-slate-400 font-semibold">
            कुल रेकर्ड: {toNepaliNumber(filtered.length)}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <div className="text-3xl">🔍</div>
            <div className="font-bold text-white">कुनै रेकर्ड फेला परेन</div>
            <div className="text-xs">कृपया अन्य नाम वा विषय चयन गरी खोज्नुहोस्।</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-800/80 text-slate-300 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Rank</th>
                  <th className="py-3.5 px-4">खेलाडीको नाम</th>
                  <th className="py-3.5 px-4 text-center">अंक (Score)</th>
                  <th className="py-3.5 px-4 text-center">समय (Time)</th>
                  <th className="py-3.5 px-4 text-center">शुद्धता</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">विषय</th>
                  <th className="py-3.5 px-4 text-right hidden sm:table-cell">मिति</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                {filtered.map((item, idx) => {
                  const rank = idx + 1;
                  const isTop1 = rank === 1;
                  const isTop2 = rank === 2;
                  const isTop3 = rank === 3;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-800/50 transition-colors ${
                        isTop1 ? 'bg-amber-500/5' : isTop2 ? 'bg-slate-400/5' : isTop3 ? 'bg-amber-700/5' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          {isTop1 ? (
                            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow">
                              १
                            </span>
                          ) : isTop2 ? (
                            <span className="w-7 h-7 rounded-lg bg-slate-300 text-slate-950 flex items-center justify-center font-black text-xs shadow">
                              २
                            </span>
                          ) : isTop3 ? (
                            <span className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center font-black text-xs shadow">
                              ३
                            </span>
                          ) : (
                            <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs">
                              {toNepaliNumber(rank)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Player Name */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                          <span>{item.playerName}</span>
                          {item.isLiveQuiz && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                              LIVE
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-black text-amber-400 text-base">
                          {toNepaliNumber(item.score)}
                        </span>
                      </td>

                      {/* Time (Tie-breaker criterion!) */}
                      <td className="py-4 px-4 text-center text-slate-300 font-mono text-xs">
                        <div className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{toNepaliNumber(item.totalTimeSeconds)} से.</span>
                        </div>
                      </td>

                      {/* Accuracy */}
                      <td className="py-4 px-4 text-center font-bold text-emerald-400">
                        {toNepaliNumber(item.percentage)}%
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 hidden md:table-cell text-xs text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                          {item.categoryName}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-right text-xs text-slate-400 hidden sm:table-cell">
                        {item.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
