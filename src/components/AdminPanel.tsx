import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Check, 
  RotateCcw, 
  Download, 
  Upload, 
  Users, 
  HelpCircle, 
  Search, 
  Filter,
  KeyRound,
  LogOut,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { Question, CategoryId, Difficulty, LeaderboardEntry } from '../types/quiz';
import { CATEGORIES } from '../data/defaultQuestions';
import { toNepaliNumber, getAdminPin, setAdminPin } from '../utils/storage';

interface AdminPanelProps {
  questions: Question[];
  onSaveQuestions: (updated: Question[]) => void;
  onResetQuestions: () => void;
  leaderboardEntries: LeaderboardEntry[];
  onClearLeaderboard: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  questions,
  onSaveQuestions,
  onResetQuestions,
  leaderboardEntries,
  onClearLeaderboard
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gyan_sansar_admin_authed') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [showPinChange, setShowPinChange] = useState<boolean>(false);
  const [newPinInput, setNewPinInput] = useState<string>('');

  // Active view inside admin: 'questions' | 'submissions'
  const [adminTab, setAdminTab] = useState<'questions' | 'submissions'>('questions');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  // Question editing / creation modal
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formOptA, setFormOptA] = useState<string>('');
  const [formOptB, setFormOptB] = useState<string>('');
  const [formOptC, setFormOptC] = useState<string>('');
  const [formOptD, setFormOptD] = useState<string>('');
  const [formCorrect, setFormCorrect] = useState<0 | 1 | 2 | 3>(0);
  const [formCategory, setFormCategory] = useState<CategoryId>('nepal-gk');
  const [formDifficulty, setFormDifficulty] = useState<Difficulty>('medium');
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formHint, setFormHint] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getAdminPin();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('gyan_sansar_admin_authed', 'true');
      setAuthError('');
      setPinInput('');
    } else {
      setAuthError('गलत पिन (PIN) नम्बर! कृपया पुनः प्रयास गर्नुहोस्। (डिफल्ट पिन: 1234)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('gyan_sansar_admin_authed');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length < 4) {
      alert('नयाँ पिन कम्तीमा ४ अंकको हुनुपर्छ!');
      return;
    }
    setAdminPin(newPinInput.trim());
    alert('प्रशासक पिन सफलतापूर्वक परिवर्तन गरियो!');
    setShowPinChange(false);
    setNewPinInput('');
  };

  // Open modal to add new question
  const openAddModal = () => {
    setEditingId(null);
    setFormQuestion('');
    setFormOptA('');
    setFormOptB('');
    setFormOptC('');
    setFormOptD('');
    setFormCorrect(0);
    setFormCategory('nepal-gk');
    setFormDifficulty('medium');
    setFormExplanation('');
    setFormHint('');
    setFormError('');
    setIsEditing(true);
  };

  // Open modal to edit existing question
  const openEditModal = (q: Question) => {
    setEditingId(q.id);
    setFormQuestion(q.question);
    setFormOptA(q.options[0]);
    setFormOptB(q.options[1]);
    setFormOptC(q.options[2]);
    setFormOptD(q.options[3]);
    setFormCorrect(q.correctAnswer);
    setFormCategory(q.categoryId);
    setFormDifficulty(q.difficulty);
    setFormExplanation(q.explanation);
    setFormHint(q.hint || '');
    setFormError('');
    setIsEditing(true);
  };

  // Save question handler
  const handleSaveQuestion = () => {
    if (!formQuestion.trim()) {
      setFormError('कृपया प्रश्न प्रविष्ट गर्नुहोस्!');
      return;
    }
    if (!formOptA.trim() || !formOptB.trim() || !formOptC.trim() || !formOptD.trim()) {
      setFormError('कृपया चारवटै विकल्प (A, B, C, D) पूरा भर्नुहोस्!');
      return;
    }
    if (!formExplanation.trim()) {
      setFormError('कृपया प्रश्नको तथ्यगत नेपाली व्याख्या प्रविष्ट गर्नुहोस्!');
      return;
    }

    if (editingId) {
      // Edit existing
      const updated = questions.map((q) => {
        if (q.id === editingId) {
          return {
            ...q,
            question: formQuestion.trim(),
            options: [formOptA.trim(), formOptB.trim(), formOptC.trim(), formOptD.trim()] as [string, string, string, string],
            correctAnswer: formCorrect,
            categoryId: formCategory,
            difficulty: formDifficulty,
            explanation: formExplanation.trim(),
            hint: formHint.trim() || undefined
          };
        }
        return q;
      });
      onSaveQuestions(updated);
    } else {
      // Add new
      const newQ: Question = {
        id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        question: formQuestion.trim(),
        options: [formOptA.trim(), formOptB.trim(), formOptC.trim(), formOptD.trim()],
        correctAnswer: formCorrect,
        categoryId: formCategory,
        difficulty: formDifficulty,
        explanation: formExplanation.trim(),
        hint: formHint.trim() || undefined,
        createdAt: new Date().toISOString()
      };
      onSaveQuestions([newQ, ...questions]);
    }

    setIsEditing(false);
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    if (confirm('के तपाईं निश्चित हुनुहुन्छ कि यो प्रश्न मेटाउन चाहनुहुन्छ?')) {
      const updated = questions.filter((q) => q.id !== id);
      onSaveQuestions(updated);
    }
  };

  // Export questions to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gyan_sansar_quiz_questions_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import questions from JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].question && parsed[0].options) {
          onSaveQuestions(parsed);
          alert(`सफलतापूर्वक ${parsed.length} वटा प्रश्नहरू आयात गरियो!`);
        } else {
          alert('फाइल ढाँचा मिलेन। कृपया मान्य JSON फाइल अपलोड गर्नुहोस्।');
        }
      } catch (err) {
        alert('JSON पढ्न सकिएन। कृपया फाइल जाँच गर्नुहोस्।');
      }
    };
    reader.readAsText(file);
  };

  // Filter questions for display
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCat === 'all' || q.categoryId === selectedCat;
    return matchesSearch && matchesCategory;
  });

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">प्रशासक लगइन (Admin Login)</h1>
          <p className="text-xs text-slate-400">
            प्रशासक प्यानल सुरक्षित पहुँचका लागि कृपया आफ्नो गोप्य PIN नम्बर प्रविष्ट गर्नुहोस्।
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              प्रशासक पिन (Admin PIN):
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                if (authError) setAuthError('');
              }}
              placeholder="४ वा ६ अंकको पिन..."
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-center tracking-widest font-mono text-lg focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            {authError && (
              <p className="text-rose-400 text-xs mt-1.5 font-semibold text-center">{authError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            लगइन गर्नुहोस् (Enter Panel)
          </button>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-center text-xs text-slate-400">
            <span className="font-semibold text-slate-300">डिफल्ट सुरक्षा पिन: </span>
            <span className="font-mono text-amber-400 font-bold">1234</span>
          </div>
        </form>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Top Banner & Control Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">प्रशासक नियन्त्रण प्यानल</h1>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                AUTHENTICATED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              प्रश्न व्यवस्थापन, प्रयोगकर्ता नतिजा तथा प्रणाली सेटिङहरू
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowPinChange(!showPinChange)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition"
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>पिन परिवर्तन</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600/30 text-xs font-bold text-rose-300 flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>लगआउट</span>
          </button>
        </div>
      </div>

      {/* Change PIN Box if toggled */}
      {showPinChange && (
        <form onSubmit={handleChangePin} className="p-4 rounded-2xl bg-slate-850 bg-slate-800/80 border border-amber-500/40 flex items-center gap-3 max-w-md animate-in fade-in">
          <input
            type="password"
            value={newPinInput}
            onChange={(e) => setNewPinInput(e.target.value)}
            placeholder="नयाँ पिन (उदा. 5678)"
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs flex-1 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            सुरक्षित गर्नुहोस्
          </button>
          <button
            type="button"
            onClick={() => setShowPinChange(false)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Overview Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">कुल प्रश्नहरू</div>
          <div className="text-2xl font-black text-indigo-400 mt-1">
            {toNepaliNumber(questions.length)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">कुल खेलिएका खेलहरू</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {toNepaliNumber(leaderboardEntries.length)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">सक्रिय विषयहरू</div>
          <div className="text-2xl font-black text-amber-400 mt-1">
            {toNepaliNumber(CATEGORIES.length)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">उच्चतम स्कोर</div>
          <div className="text-2xl font-black text-rose-400 mt-1">
            {toNepaliNumber(leaderboardEntries[0]?.score || 0)}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setAdminTab('questions')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${
            adminTab === 'questions'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>प्रश्नहरूको सूची र व्यवस्थापन ({toNepaliNumber(questions.length)})</span>
        </button>

        <button
          onClick={() => setAdminTab('submissions')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${
            adminTab === 'submissions'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>खेलाडीका नतिजाहरू ({toNepaliNumber(leaderboardEntries.length)})</span>
        </button>
      </div>

      {/* 1. Questions Management Tab */}
      {adminTab === 'questions' && (
        <div className="space-y-6">
          
          {/* Action Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search and Category filter */}
            <div className="flex items-center gap-2 w-full md:w-auto flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="प्रश्न वा व्याख्या खोज्नुहोस्..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
              >
                <option value="all">सबै विषयहरू</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Buttons: Add Question, Export JSON, Import JSON, Reset */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
              <button
                onClick={openAddModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>नयाँ प्रश्न थप्नुहोस्</span>
              </button>

              <button
                onClick={handleExportJSON}
                title="JSON फाइल डाउनलोड गर्नुहोस्"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <label
                title="JSON फाइलबाट प्रश्नहरू आयात गर्नुहोस्"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  if (confirm('के तपाईं सबै प्रश्नहरू प्रारम्भिक डिफल्ट डेमोमा रिसेट गर्न चाहनुहुन्छ?')) {
                    onResetQuestions();
                  }
                }}
                title="डिफल्ट प्रश्नहरूमा फर्काउनुहोस्"
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-rose-400 border border-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center text-slate-400 bg-slate-900 rounded-3xl border border-slate-800">
                कुनै प्रश्न फेला परेन।
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const cat = CATEGORIES.find((c) => c.id === q.categoryId);
                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3 shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                            #{toNepaliNumber(idx + 1)}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                            {cat?.name || q.categoryId}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                            q.difficulty === 'easy'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : q.difficulty === 'medium'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}>
                            {q.difficulty === 'easy' ? 'सजिलो' : q.difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base sm:text-lg">
                          {q.question}
                        </h3>
                      </div>

                      {/* Edit & Delete Action Buttons */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openEditModal(q)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-400 border border-slate-700 transition"
                          title="सम्पादन गर्नुहोस् (Edit)"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-rose-400 border border-slate-700 transition"
                          title="मेटाउनुहोस् (Delete)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* 4 Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === q.correctAnswer;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-xl border flex items-center justify-between ${
                              isCorrect
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-bold'
                                : 'bg-slate-800/40 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold">
                                {['A', 'B', 'C', 'D'][oIdx]}
                              </span>
                              <span>{opt}</span>
                            </span>
                            {isCorrect && (
                              <span className="text-[10px] text-emerald-400 font-black">✓ सही उत्तर</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                      <span className="font-bold text-amber-400">व्याख्या: </span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* 2. Player Submissions Tab */}
      {adminTab === 'submissions' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">खेलाडीको नतिजा इतिहास (Player Results)</h3>
              <p className="text-xs text-slate-400">हालसम्म खेलाडीहरूले प्राप्त गरेका अंकहरूको सूची</p>
            </div>
            <button
              onClick={() => {
                if (confirm('के तपाईं निश्चित हुनुहुन्छ कि सबै नतिजाहरू हटाउन चाहनुहुन्छ?')) {
                  onClearLeaderboard();
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-600/30 transition"
            >
              लिडरबोर्ड खाली गर्नुहोस्
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-800 text-slate-300 text-xs uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">खेलाडीको नाम</th>
                    <th className="py-3 px-4">विषय</th>
                    <th className="py-3 px-4 text-center">अंक</th>
                    <th className="py-3 px-4 text-center">समय</th>
                    <th className="py-3 px-4 text-center">सही / कुल</th>
                    <th className="py-3 px-4 text-right">मिति</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {leaderboardEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white">{entry.playerName}</td>
                      <td className="py-3 px-4 text-slate-400">{entry.categoryName}</td>
                      <td className="py-3 px-4 text-center font-black text-amber-400">{toNepaliNumber(entry.score)}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{toNepaliNumber(entry.totalTimeSeconds)}s</td>
                      <td className="py-3 px-4 text-center text-emerald-400 font-semibold">
                        {toNepaliNumber(entry.correctAnswers)} / {toNepaliNumber(entry.totalQuestions)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Question Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl font-black text-white">
                {editingId ? 'प्रश्न सम्पादन गर्नुहोस् (Edit Question)' : 'नयाँ प्रश्न थप्नुहोस् (Add New Question)'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                ⚠️ {formError}
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* Question Text */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  प्रश्नको व्यहोरा (Question Text in Nepali) <span className="text-red-400">*</span>:
                </label>
                <textarea
                  rows={3}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="उदा. नेपालको पहिलो प्रधानमन्त्री को हुन्?"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-300">
                  चारवटा विकल्पहरू र सही उत्तर चयन (4 Options & Correct Answer) <span className="text-red-400">*</span>:
                </label>
                
                {[
                  { label: 'विकल्प A', value: formOptA, set: setFormOptA, idx: 0 },
                  { label: 'विकल्प B', value: formOptB, set: setFormOptB, idx: 1 },
                  { label: 'विकल्प C', value: formOptC, set: setFormOptC, idx: 2 },
                  { label: 'विकल्प D', value: formOptD, set: setFormOptD, idx: 3 }
                ].map((item) => (
                  <div key={item.idx} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormCorrect(item.idx as 0 | 1 | 2 | 3)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition shrink-0 ${
                        formCorrect === item.idx
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {formCorrect === item.idx ? '✓ सही' : item.label}
                    </button>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => item.set(e.target.value)}
                      placeholder={`${item.label} को उत्तर...`}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>

              {/* Category and Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    विषय (Category):
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryId)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    कठिनाइ स्तर (Difficulty):
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as Difficulty)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none"
                  >
                    <option value="easy">सजिलो (Easy - १० अंक)</option>
                    <option value="medium">मध्यम (Medium - २० अंक)</option>
                    <option value="hard">कठिन (Hard - ३० अंक)</option>
                  </select>
                </div>
              </div>

              {/* Nepali Explanation */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  तथ्यगत नेपाली व्याख्या (Explanation) <span className="text-red-400">*</span>:
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="उत्तर मिलाएपछि खेलाडीलाई देखाइने जानकारी..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* Hint */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  सङ्केत (Optional Hint for Lifeline):
                </label>
                <input
                  type="text"
                  value={formHint}
                  onChange={(e) => setFormHint(e.target.value)}
                  placeholder="खेलाडीलाई लाइफलाइन प्रयोग गर्दा दिइने सङ्केत..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                type="button"
                onClick={handleSaveQuestion}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>सुरक्षित गर्नुहोस् (Save)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
