import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, Zap, BarChart3, Shield, Mail, Video } from 'lucide-react';

interface SettingsViewProps {
  apiKey: string;
  setApiKey: (v: string) => void;
  selectedModel: string;
  setSelectedModel: (v: string) => void;
  useMockMode: boolean;
  setUseMockMode: (v: boolean) => void;
  customModel: string;
  setCustomModel: (v: string) => void;
  theme: string;
  setTheme: (v: 'dark' | 'light') => void;
  videoToken: string;
  setVideoToken: (v: string) => void;
  meetingId: string;
  setMeetingId: (v: string) => void;
  onUpdateGeminiKey?: () => void;
  onUpdateVideoToken?: () => void;
}

export const SettingsView = ({
  apiKey,
  setApiKey,
  selectedModel,
  setSelectedModel,
  useMockMode,
  setUseMockMode,
  customModel,
  setCustomModel,
  theme,
  setTheme,
  videoToken,
  setVideoToken,
  meetingId,
  setMeetingId,
  onUpdateGeminiKey,
  onUpdateVideoToken
}: SettingsViewProps) => {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!videoToken) {
      alert("Please enter your VideoSDK Token first!");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
          authorization: videoToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const { roomId } = await res.json();
      if (roomId) {
        setMeetingId(roomId);
      } else {
        alert("Failed to generate Room ID. Check your token.");
      }
    } catch (e) {
      console.error(e);
      alert("Error generating room. Is your token valid?");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container view-section" style={{ maxWidth: '800px' }}>
      <div className="glass-panel" style={{ padding: '2rem', margin: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div className="flex-center" style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(255, 140, 0, 0.1)', color: 'var(--primary)' }}>
            <Settings size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>Configuration Studio</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tailor the AI experience to your project needs.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Theme Section */}
          <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                {theme === 'dark' ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
                Appearance Mode
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Switch between Dark and Light aesthetics.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Simulation Section */}
          <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Zap size={18} className="text-primary" />
                Simulation Mode
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Use mock data instead of real AI calls.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={useMockMode}
                onChange={(e) => setUseMockMode(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Model Section */}
          <div className="glass-card">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <BarChart3 size={18} className="text-primary" />
              AI Model Engine
            </h4>
            <select
              className="input-field"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (AI Engine)</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              <option value="rule-engine">Phase 1: Rule Engine (Pattern-based)</option>
              <option value="custom">Custom Implementation ID</option>
            </select>
            {selectedModel === 'custom' && (
              <input
                className="input-field"
                style={{ marginTop: '1rem' }}
                placeholder="Enter Custom Model ID"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
              />
            )}
          </div>

          {/* API Credentials */}
          <div className="glass-card">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Shield size={18} className="text-primary" />
              Security Credentials
            </h4>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="password"
                  className="input-field"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="VITE_GEMINI_API_KEY"
                />
                <div style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>
                  <Mail size={18} />
                </div>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ padding: '0 1.5rem', justifyContent: 'center' }}
                onClick={onUpdateGeminiKey}
              >
                Update
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.8rem', paddingLeft: '0.5rem' }}>
              * Your key is only used locally for processing transcripts.
            </p>
          </div>

          {/* VideoSDK Section */}
          <div className="glass-card">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Video size={18} className="text-primary" />
              Video Meeting Configuration
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input
                  className="input-field"
                  style={{ flex: 1 }}
                  value={videoToken}
                  onChange={(e) => setVideoToken(e.target.value)}
                  placeholder="VideoSDK Developer Token"
                  type="password"
                />
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '0 1.5rem', justifyContent: 'center' }}
                  onClick={onUpdateVideoToken}
                >
                  Update
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <input
                   className="input-field"
                   style={{ flex: '1 1 200px' }}
                   value={meetingId}
                   onChange={(e) => setMeetingId(e.target.value)}
                   placeholder="Room ID (e.g. xyz-abc-123)"
                />
                <button
                  className="btn btn-primary"
                  style={{ flex: '1 1 120px', padding: '0 1.5rem', whiteSpace: 'nowrap', justifyContent: 'center' }}
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? "..." : "Generate"}
                </button>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.8rem', paddingLeft: '0.5rem' }}>
              Get your token from <a href="https://videosdk.live" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>VideoSDK Dashboard</a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
