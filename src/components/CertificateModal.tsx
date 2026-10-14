import React from 'react';
import { X, Award, Printer, Download, Share2, Sparkles, CheckCircle } from 'lucide-react';
import { toNepaliNumber } from '../utils/storage';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  score: number;
  percentage: number;
  categoryName: string;
  totalQuestions: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  playerName,
  score,
  percentage,
  categoryName,
  totalQuestions
}) => {
  if (!isOpen) return null;

  const nepaliDate = new Date().toLocaleDateString('ne-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">डिजिटल सम्मान प्रमाणपत्र (Certificate of Excellence)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Certificate Canvas */}
        <div 
          id="certificate-print-area"
          className="relative bg-gradient-to-b from-amber-50/95 via-amber-100/90 to-yellow-50/95 text-slate-900 p-8 sm:p-12 rounded-2xl border-8 border-double border-amber-600 shadow-2xl space-y-6 text-center select-none"
        >
          {/* Subtle ornate corners */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-800" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-800" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-800" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-800" />

          {/* Header */}
          <div className="space-y-1">
            <div className="text-3xl">🇳🇵</div>
            <div className="text-xs uppercase tracking-widest font-bold text-amber-800">
              ज्ञान संसार राष्ट्रिय अनलाइन Quiz प्रतियोगिता
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-950 font-serif tracking-tight">
              उत्कृष्टताको प्रमाणपत्र
            </h1>
            <div className="text-xs font-semibold text-amber-800 italic">
              CERTIFICATE OF MERIT & ACHIEVEMENT
            </div>
          </div>

          <div className="w-24 h-0.5 bg-amber-600 mx-auto" />

          {/* Recipient Details */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-700">
              यो प्रमाणपत्र ससम्मान प्रदान गरिएको छ:
            </p>
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-900 font-serif underline decoration-amber-500 underline-offset-8">
              {playerName || 'प्रतिस्पर्धी'}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto pt-2 leading-relaxed">
              जसले <strong>ज्ञान संसार Quiz प्रतियोगिता</strong> अन्तर्गत आयोजित <strong>"{categoryName}"</strong> विषयको प्रतियोगितामा सक्रिय सहभागिता जनाई कुल <strong>{toNepaliNumber(score)} अंक</strong> र <strong>{toNepaliNumber(percentage)}% शुद्धता</strong> प्राप्त गर्न सफल हुनुभएको छ।
            </p>
          </div>

          {/* Metrics summary in certificate */}
          <div className="flex items-center justify-center gap-6 py-2 text-xs font-bold text-amber-950">
            <div className="px-3 py-1 rounded bg-amber-200/80 border border-amber-400">
              कुल प्रश्न: {toNepaliNumber(totalQuestions)}
            </div>
            <div className="px-3 py-1 rounded bg-amber-200/80 border border-amber-400">
              प्राप्त अंक: {toNepaliNumber(score)}
            </div>
            <div className="px-3 py-1 rounded bg-amber-200/80 border border-amber-400">
              नतिजा: {percentage >= 50 ? 'सफल (PASSED)' : 'सहभागी (PARTICIPATED)'}
            </div>
          </div>

          {/* Footer with Signatures & Seal */}
          <div className="pt-6 flex items-end justify-between border-t border-amber-300 text-left text-xs text-slate-800">
            <div>
              <div className="font-serif italic text-amber-900 font-bold text-sm">ज्ञान संसार मूल्याङ्कन समिति</div>
              <div className="w-36 h-0.5 bg-slate-600 mt-1 mb-0.5" />
              <div className="text-[11px] text-slate-600">प्रतियोगिता संयोजक</div>
              <div className="text-[10px] text-slate-500 mt-1">जारी मिति: {nepaliDate}</div>
            </div>

            {/* Official Seal badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-amber-800 flex flex-col items-center justify-center text-amber-900 font-bold text-[9px] sm:text-[10px] leading-tight rotate-12">
              <span>★ ज्ञान संसार ★</span>
              <span className="font-black text-amber-700">SEAL</span>
              <span>२०८१</span>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-amber-900 font-bold text-sm">प्रमाणित रेकर्ड</div>
              <div className="w-36 h-0.5 bg-slate-600 mt-1 mb-0.5 ml-auto" />
              <div className="text-[11px] text-slate-600">डिजिटल प्रमाणिकरण कोड</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">GS-{Date.now().toString().slice(-6)}</div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिन्ट / PDF डाउनलोड गर्नुहोस्</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
          >
            बन्द गर्नुहोस्
          </button>
        </div>

      </div>
    </div>
  );
};
