import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ActionItem } from './lib/gemini';
import { extractActionItems } from './lib/gemini';
import { ruleBasedExtraction, generateRuleBasedSummary } from './lib/ruleEngine';
import { ZerionMeetingRoom } from './components/video/MeetingRoom';

// Import Extracted Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { ExtractorView } from './components/views/ExtractorView';
import { SettingsView } from './components/views/SettingsView';
import { BackEndWorksView } from './components/views/BackEndWorksView';
import { HowToUseView } from './components/views/HowToUseView';
import { HistoryView } from './components/views/HistoryView';
import { ContactView } from './components/views/ContactView';
import CinematicLoader from './components/views/CinematicLoader';
import { LoginView } from './components/auth/LoginView';
import { SignupView } from './components/auth/SignupView';
import { useAuth } from './context/AuthContext';

// --- MAIN APP ---

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [redirectView, setRedirectView] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  
  // Initialize API Key from localStorage, env, or default fallback
  const [apiKey, setApiKey] = useState(
    localStorage.getItem('zerion_temp_key') || 
    import.meta.env.VITE_GEMINI_API_KEY || 
    ''
  );
  
  const [useMockMode, setUseMockMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [customModel, setCustomModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ActionItem[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // VideoSDK State
  const [videoToken, setVideoToken] = useState(
    localStorage.getItem('zerion_video_token') ||
    import.meta.env.VITE_VIDEOSDK_TOKEN || 
    ''
  );
  const [meetingId, setMeetingId] = useState(import.meta.env.VITE_VIDEOSDK_MEETING_ID || '');

  const { isAuthenticated, user, updateUser } = useAuth() as any;

  // Handle protected routes
  const handleSetActiveView = (view: string) => {
    const protectedViews = ['history', 'meeting'];
    const adminViews = ['meeting', 'backend'];
    const isAdmin = user?.email === 'admin@zerion-ai.com';

    if (adminViews.includes(view) && !isAdmin) {
      setActiveView('home');
      return;
    }

    if (protectedViews.includes(view) && !isAuthenticated) {
      setRedirectView(view);
      setActiveView('login');
    } else {
      setActiveView(view);
    }
  };

  // Sync API Key with User Profile when logged in
  useEffect(() => {
    if (isAuthenticated && user?.apiKeys?.gemini) {
      setApiKey(user.apiKeys.gemini);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Force scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) setTranscript(event.target.result as string);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const saved = localStorage.getItem('zerion_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleProcess = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setError(null);
    try {
      let finalItems: ActionItem[] = [];
      let finalSummary: string = "";
      const modelToUse = selectedModel === 'custom' ? customModel : selectedModel;

      if (selectedModel === 'rule-engine') {
        finalItems = ruleBasedExtraction(transcript);
        finalSummary = generateRuleBasedSummary(transcript);
        await new Promise(r => setTimeout(r, 800));
      } else {
        const keyToUse = useMockMode ? undefined : apiKey;
        const result = await extractActionItems(transcript, keyToUse, modelToUse);
        finalItems = result.actionItems;
        finalSummary = result.summary;
      }

      setResults(finalItems);
      setSummary(finalSummary);

      if (isAuthenticated) {
        const newEntry = {
          transcript: transcript.substring(0, 500),
          items: finalItems,
          timestamp: new Date().toISOString()
        };
        const newHistory = [newEntry, ...history].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem('zerion_history', JSON.stringify(newHistory));
      }
    } catch (err: any) {
      if (err?.message?.includes('429')) setError('Rate Limit Reached. Try again in 60s.');
      else setError(err?.message || 'AI Error. Check settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <AnimatePresence>
        {showSplash && <CinematicLoader onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <Navbar activeView={activeView} setActiveView={handleSetActiveView} theme={theme} />
          <main style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
            <AnimatePresence mode="wait">
              {activeView === 'home' && <HomeView key="home" onStart={() => handleSetActiveView('tool')} theme={theme} />}
              {activeView === 'guide' && <HowToUseView key="guide" />}
              {activeView === 'backend' && <BackEndWorksView key="backend" />}
              {activeView === 'login' && <LoginView key="login" onSwitchToSignup={() => setActiveView('signup')} onSuccess={() => { setActiveView(redirectView || 'home'); setRedirectView(null); }} />}
              {activeView === 'signup' && <SignupView key="signup" onSwitchToLogin={() => setActiveView('login')} onSuccess={() => { setActiveView(redirectView || 'home'); setRedirectView(null); }} />}
              {activeView === 'tool' && (
                <ExtractorView
                  key="tool"
                  transcript={transcript}
                  setTranscript={setTranscript}
                  onProcess={handleProcess}
                  loading={loading}
                  results={results}
                  error={error}
                  onFileUpload={handleFileUpload}
                  summary={summary}
                  theme={theme}
                />
              )}
              {activeView === 'history' && (
                <HistoryView key="history" history={history} onClear={() => { setHistory([]); localStorage.removeItem('zerion_history'); }} onRevisit={(item) => { setTranscript(item.transcript); setResults(item.items); setActiveView('tool'); }} />
              )}
              {activeView === 'contact' && <ContactView key="contact" />}
              {activeView === 'settings' && (
                <SettingsView
                  key="settings"
                  apiKey={apiKey}
                  setApiKey={setApiKey}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  useMockMode={useMockMode}
                  setUseMockMode={setUseMockMode}
                  customModel={customModel}
                  setCustomModel={setCustomModel}
                  theme={theme}
                  setTheme={setTheme}
                  videoToken={videoToken}
                  setVideoToken={setVideoToken}
                  meetingId={meetingId}
                  setMeetingId={setMeetingId}
                  onUpdateGeminiKey={() => {
                    if (isAuthenticated) {
                      const apiKeys = { ...user?.apiKeys, gemini: apiKey };
                      updateUser({ apiKeys });
                    }
                    localStorage.setItem('zerion_temp_key', apiKey);
                    alert("Gemini API Key updated successfully!");
                  } }
                  onUpdateVideoToken={() => {
                    localStorage.setItem('zerion_video_token', videoToken);
                    alert("VideoSDK Token updated successfully!");
                  } }
                />
              )}
              {activeView === 'meeting' && (
                <ZerionMeetingRoom
                  key="meeting"
                  token={videoToken}
                  meetingId={meetingId}
                  setMeetingId={setMeetingId}
                  onLeave={() => setActiveView('home')}
                  userName={user?.username}
                  onEndWithTranscript={(text) => {
                    setTranscript(text);
                    setActiveView('tool');
                    setTimeout(() => {
                      const btn = document.querySelector('.btn-primary') as HTMLButtonElement;
                      if (btn) btn.click();
                    }, 100);
                  }}
                />
              )}
            </AnimatePresence>
          </main>
          <Footer theme={theme} setActiveView={handleSetActiveView} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
