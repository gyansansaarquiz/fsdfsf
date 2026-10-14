import React, { useState } from 'react';
import { 
  Trophy, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  Home, 
  BookOpen, 
  Menu, 
  X,
  Radio
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'quiz-setup' | 'quiz-play' | 'quiz-result' | 'live-quiz' | 'leaderboard' | 'admin';
  setActiveTab: (tab: 'home' | 'quiz-setup' | 'live-quiz' | 'leaderboard' | 'admin') => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  onOpenRules: () => void;
  inQuiz?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  toggleSound,
  onOpenRules,
  inQuiz = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'quiz-setup' | 'live-quiz' | 'leaderboard' | 'admin') => {
    if (inQuiz) {
      if (!confirm('के तपाईं हालको क्विज छोड्न चाहनुहुन्छ? तपाईंको हालको प्रगति सुरक्षित हुने छैन।')) {
        return;
      }
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Name */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left transition-transform hover:scale-[1.02]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-crimson-600 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/20 text-white font-extrabold text-xl sm:text-2xl border border-red-400/30">
              <span>ज्ञान</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                  ज्ञान संसार
                </span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  QUIZ
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                राष्ट्रिय स्तरको नेपाली अनलाइन प्रतियोगिता
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>गृहपृष्ठ</span>
            </button>

            <button
              onClick={() => handleNavClick('quiz-setup')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'quiz-setup' || activeTab === 'quiz-play' || activeTab === 'quiz-result'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>क्विज सुरु</span>
            </button>

            <button
              onClick={() => handleNavClick('live-quiz')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 relative ${
                activeTab === 'live-quiz'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <span>लाइभ क्विज</span>
            </button>

            <button
              onClick={() => handleNavClick('leaderboard')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'leaderboard'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>लिडरबोर्ड</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>प्रशासक (Admin)</span>
            </button>
          </nav>

          {/* Action Utilities (Rules, Audio, Mobile Hamburger) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRules}
              title="क्विजका नियमहरू"
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition border border-slate-700 hidden sm:flex items-center gap-1.5 text-xs font-semibold"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>नियमहरू</span>
            </button>

            <button
              onClick={toggleSound}
              title={soundEnabled ? 'ध्वनि बन्द गर्नुहोस्' : 'ध्वनि चालु गर्नुहोस्'}
              className={`p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                soundEnabled
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">ध्वनि अन</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">ध्वनि अफ</span>
                </>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 border-t border-slate-800 space-y-2 bg-slate-900/95 animate-in fade-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === 'home' ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>गृहपृष्ठ (Home)</span>
            </button>

            <button
              onClick={() => handleNavClick('quiz-setup')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === 'quiz-setup' || activeTab === 'quiz-play' || activeTab === 'quiz-result'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>एकल क्विज खेल्नुहोस्</span>
            </button>

            <button
              onClick={() => handleNavClick('live-quiz')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === 'live-quiz'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Radio className="w-4 h-4 text-red-400" />
              <div className="flex items-center gap-2">
                <span>लाइभ प्रतियोगिता (Live Quiz)</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500 text-white">LIVE</span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('leaderboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === 'leaderboard'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>लिडरबोर्ड (शीर्ष १० खेलाडी)</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>प्रशासक प्यानल (Admin Panel)</span>
            </button>

            <button
              onClick={() => {
                onOpenRules();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-800"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>नियम तथा अंक प्रणाली</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
