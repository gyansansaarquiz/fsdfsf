import React, { useState } from 'react';
import { 
  Play, 
  Layers, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowLeft,
  Check,
  Zap
} from 'lucide-react';
import { CategoryId, Difficulty, QuizSettings } from '../types/quiz';
import { CATEGORIES } from '../data/defaultQuestions';
import { toNepaliNumber } from '../utils/storage';

interface QuizSetupProps {
  initialPlayerName: string;
  initialCategoryId?: CategoryId;
  totalAvailableQuestions: number;
  onStart: (settings: QuizSettings) => void;
  onBack: () => void;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({
  initialPlayerName,
  initialCategoryId,
  totalAvailableQuestions,
  onStart,
  onBack
}) => {
  const [playerName, setPlayerName] = useState(initialPlayerName || '');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(initialCategoryId || 'all');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timePerQuestion, setTimePerQuestion] = useState<number>(30); // 15 or 30
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const questionOptions = [5, 10, 20, 50];

  const handleLaunch = () => {
    if (!playerName.trim()) {
      setErrorMsg('कृपया आफ्नो नाम लेख्नुहोस्!');
      return;
    }
    setErrorMsg('');
    localStorage.setItem('gyan_sansar_player_name', playerName.trim());

    onStart({
      playerName: playerName.trim(),
      categoryId: selectedCategory,
      difficulty,
      questionCount,
      timePerQuestion,
      soundEnabled
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm font-semibold p-2 rounded-lg hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>गृहपृष्ठमा फर्कनुहोस्</span>
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
          क्विज सेटिङहरू (Quiz Customization)
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
        
        {/* Step 1: Player Name */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-200">
            १. खेलाडीको नाम (Player Name) <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="आफ्नो नाम यहाँ प्रविष्ट गर्नुहोस्..."
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition text-base font-semibold ${
              errorMsg ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-red-500 focus:ring-red-500/30'
            }`}
          />
          {errorMsg && (
            <p className="text-red-400 text-xs font-semibold">{errorMsg}</p>
          )}
        </div>

        {/* Step 2: Choose Subject */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-200">
            २. विषय छनोट (Select Category)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {/* All Categories Option */}
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                selectedCategory === 'all'
                  ? 'bg-red-600/20 border-red-500 text-white shadow-md shadow-red-500/20'
                  : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="text-2xl mb-1">🌟</div>
              <div className="font-bold text-xs sm:text-sm">सबै विषयहरू</div>
              <div className="text-[10px] text-slate-400 mt-0.5">मिश्रित प्रश्नहरू</div>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  selectedCategory === cat.id
                    ? 'bg-red-600/20 border-red-500 text-white shadow-md shadow-red-500/20'
                    : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="font-bold text-xs sm:text-sm truncate">{cat.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{cat.nameEn}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Difficulty Level */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-200">
            ३. कठिनाइ स्तर (Difficulty Level)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'all', label: 'सबै स्तर (मिश्रित)', desc: 'सजिलो, मध्यम र कठिन', color: 'border-slate-700' },
              { id: 'easy', label: 'सजिलो (Easy)', desc: '+१० अंक प्रति प्रश्न', color: 'border-emerald-500/50 text-emerald-400' },
              { id: 'medium', label: 'मध्यम (Medium)', desc: '+२० अंक प्रति प्रश्न', color: 'border-amber-500/50 text-amber-400' },
              { id: 'hard', label: 'कठिन (Hard)', desc: '+३० अंक प्रति प्रश्न', color: 'border-rose-500/50 text-rose-400' }
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setDifficulty(lvl.id as Difficulty | 'all')}
                className={`p-3.5 rounded-xl border text-left transition ${
                  difficulty === lvl.id
                    ? 'bg-slate-800 border-red-500 ring-2 ring-red-500/30 text-white'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-sm">{lvl.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{lvl.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Question Count & Timer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Question Count */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-200">
              ४. प्रश्न संख्या (Questions Count)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {questionOptions.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`py-3 px-2 rounded-xl border text-center font-bold text-sm transition ${
                    questionCount === count
                      ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-600/30'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {toNepaliNumber(count)} प्रश्न
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              कुल उपलब्ध प्रश्नहरू: {toNepaliNumber(totalAvailableQuestions)} वटा
            </p>
          </div>

          {/* Timer Per Question */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-200">
              ५. समय सीमा (Timer Per Question)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { time: 15, label: '१५ सेकेन्ड (द्रुत)', desc: 'फास्ट र रोमाञ्चक' },
                { time: 30, label: '३० सेकेन्ड (मानक)', desc: 'सोचेर उत्तर दिन' }
              ].map((t) => (
                <button
                  key={t.time}
                  type="button"
                  onClick={() => setTimePerQuestion(t.time)}
                  className={`py-2.5 px-3 rounded-xl border text-center transition ${
                    timePerQuestion === t.time
                      ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-sm">{t.label}</div>
                  <div className="text-[11px] opacity-80">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sound toggle checkbox */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
          <div className="flex items-center gap-3">
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
            <div>
              <div className="text-sm font-bold text-slate-200">ध्वनि प्रभावहरू (Audio Effects)</div>
              <div className="text-xs text-slate-400">सही, गलत र टाइमरका आवाजहरू बजाउनुहोस्</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              soundEnabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>तयारी: </span>
            <span className="font-semibold text-slate-200">{toNepaliNumber(questionCount)} प्रश्न</span> | 
            <span className="font-semibold text-slate-200"> {toNepaliNumber(timePerQuestion)} सेकेन्ड/प्रश्न</span> | 
            <span className="font-semibold text-amber-400"> सही उत्तरमा तत्काल अंक!</span>
          </div>

          <button
            type="button"
            onClick={handleLaunch}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-lg shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>Start Quiz (क्विज सुरु गर्नुहोस्)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
