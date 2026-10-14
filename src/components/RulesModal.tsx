import React from 'react';
import { X, BookOpen, Clock, Award, HelpCircle, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { toNepaliNumber } from '../utils/storage';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">क्विज प्रतियोगिताका नियम तथा अंक प्रणाली</h2>
              <p className="text-xs text-slate-400">ज्ञान संसार Quiz Competition Guidelines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* Rule 1: Scoring */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>१. अंक प्रणाली (Scoring Rules)</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>सजिलो प्रश्न (Easy):</strong> प्रत्येक सही उत्तरमा +१० अंक।</li>
              <li><strong>मध्यम प्रश्न (Medium):</strong> प्रत्येक सही उत्तरमा +२० अंक।</li>
              <li><strong>कठिन प्रश्न (Hard):</strong> प्रत्येक सही उत्तरमा +३० अंक।</li>
              <li><strong>गलत उत्तर:</strong> कुनै पनि नकारात्मक अंक (Negative Marking) काटिने छैन। शून्य अंक प्राप्त हुनेछ।</li>
              <li><strong>लगातार सही उत्तर (Streak):</strong> लगातार २ वा सोभन्दा बढी सही उत्तर दिएमा थप बोनस अंक प्राप्त हुनेछ।</li>
            </ul>
          </div>

          {/* Rule 2: Timer */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>२. समय सीमा (Timer)</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>प्रयोगकर्ताले १५ सेकेन्ड (द्रुत) वा ३० सेकेन्ड (मानक) को समय चयन गर्न सक्नेछन्।</li>
              <li>समय समाप्त हुनुअघि उत्तर नदिएमा प्रश्न स्वतः गलत (Timeout) मानिनेछ र अर्को प्रश्नमा जान सकिनेछ।</li>
            </ul>
          </div>

          {/* Rule 3: Lifelines */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>३. उपलब्ध लाइफलाइनहरू (Lifelines)</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>५०:५०:</strong> कम्प्युटरले २ वटा गलत विकल्प स्वतः हटाउनेछ।</li>
              <li><strong>सङ्केत (Hint):</strong> प्रश्नसँग सम्बन्धित महत्वपूर्ण नेपाली सङ्केत देखिनेछ।</li>
              <li><strong>+१५ सेकेन्ड:</strong> हालको प्रश्नमा थप १५ सेकेन्डको समय थपिनेछ।</li>
            </ul>
          </div>

          {/* Rule 4: Leaderboard Tie-breaker */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>४. लिडरबोर्ड र टाई-ब्रेकर (Tie-Breaker Priority)</span>
            </h3>
            <p className="text-slate-300">
              यदि दुई वा सोभन्दा बढी खेलाडीहरूको अंक बराबर भएमा, <strong>कम समय (Least Time Taken)</strong> मा प्रतियोगिता पूरा गर्ने खेलाडीलाई प्राथमिकता दिई उच्च Rank प्रदान गरिन्छ।
            </p>
          </div>

        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition"
          >
            बुझेँ (I Understand)
          </button>
        </div>

      </div>
    </div>
  );
};
