import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ClipboardList, FileUp, Mic, Zap, Send, AlertCircle, FileText, LayoutDashboard, Download, FileJson, User, Clock, Sparkles, Calendar, Link2, Milestone } from 'lucide-react';

interface ExtractorViewProps {
  transcript: string;
  setTranscript: (v: string) => void;
  onProcess: () => void;
  loading: boolean;
  results: any[];
  error: string | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  summary: string;
  theme: string;
}

export const ExtractorView = ({ transcript, setTranscript, onProcess, loading, results, error, onFileUpload, summary }: ExtractorViewProps) => {
  const [showTips, setShowTips] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results.length]);

  const exportToCSV = () => {
    const headers = ["Task", "Owner", "Deadline", "Priority", "Status"];
    const rows = results.map((item: any) => [
      `"${item.task}"`,
      `"${item.owner}"`,
      `"${item.deadline}"`,
      `"${item.priority || 'Medium'}"`,
      '"Pending"'
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map((e: any) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "zerion_action_items.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="container view-section" style={{ maxWidth: '1400px', width: '100%', padding: '2rem 1rem' }}>
      {/* Tool Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>Meeting <span className="gradient-text">Studio</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>Transform your raw transcripts into actionable intelligence instantly.</p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 'clamp(2rem, 5vw, 4rem)', 
        alignItems: 'stretch' 
      }}>

        {/* Input Studio - Now Full Width */}
        <div className="glass-panel" style={{ padding: '2.5rem', border: 'none', background: 'var(--card-bg)', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(255, 140, 0, 0.1)', padding: '10px', borderRadius: '12px' }}>
                <ClipboardList size={22} className="text-primary" />
              </div>
              Input Source
            </h3>
            
            {/* Hoverable Pro Tips */}
            <div style={{ position: 'relative' }}>
              <motion.div
                onMouseEnter={() => setShowTips?.(true)}
                onMouseLeave={() => setShowTips?.(false)}
                className="btn btn-outline"
                style={{ 
                  padding: '0.6rem 1.2rem', 
                  fontSize: '0.85rem', 
                  borderRadius: '12px', 
                  cursor: 'help',
                  gap: '8px'
                }}
              >
                <Sparkles size={16} className="text-primary" />
                Pro Tips
              </motion.div>

              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      top: '120%',
                      right: 0,
                      width: '320px',
                      background: 'var(--background)', // Solid opaque background
                      border: '1px solid var(--primary)', // More prominent border
                      borderRadius: '20px',
                      padding: '1.5rem',
                      zIndex: 1000,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                      backdropFilter: 'none' // Remove blur since it's opaque
                    }}
                  >
                    <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} /> Extraction Tips
                    </h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', listStyleType: 'disc' }}>
                      <li>Ensure transcript includes speaker names for better ownership detection.</li>
                      <li>Mention dates clearly (e.g., "by next Friday").</li>
                      <li>For best results, keep each block under 5000 characters.</li>
                      <li>Use the Gemini 2.5 Flash model for highest accuracy.</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <label className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', cursor: 'pointer', fontSize: '0.85rem', padding: '1.2rem' }}>
              <FileUp size={18} /> Upload .txt
              <input type="file" accept=".txt" hidden onChange={onFileUpload} />
            </label>
            <label className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', cursor: 'pointer', fontSize: '0.85rem', padding: '1.2rem' }}>
              <Mic size={18} /> Audio Input
            </label>
          </div>

          <textarea
            className="input-field"
            style={{ minHeight: '350px', fontSize: '0.95rem', lineHeight: '1.6' }}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting notes, Zoom transcripts, or upload a text file..."
          />

          <div style={{ marginTop: '2.5rem' }}>
            <button className="btn btn-primary" style={{ width: '100%', padding: '1.4rem', fontSize: '1.1rem' }} onClick={onProcess} disabled={loading || !transcript.trim()}>
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                  <Zap size={22} />
                </motion.div>
              ) : (
                <>Begin Intelligence Extraction <Send size={20} /></>
              )}
            </button>
          </div>
          {error && <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,68,68,0.1)', borderRadius: '12px', color: '#ff4444', display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.9rem' }}><AlertCircle size={18} />{error}</div>}
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div 
              ref={resultsRef}
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="flex-column" 
              style={{ gap: '4rem', width: '100%', marginTop: '2rem' }}
            >
              {/* Summary Card */}
              <div className="glass-panel" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary)', background: 'linear-gradient(90deg, rgba(255,140,0,0.03), transparent)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255, 140, 0, 0.1)', padding: '12px', borderRadius: '14px', display: 'flex' }}>
                    <FileText size={24} className="text-primary" />
                  </div>
                  <h3 style={{ margin: 0 }}>Executive Summary</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem', fontStyle: 'italic' }}>
                  "{summary}"
                </p>
              </div>

              {/* Action Items Dashboard */}
              <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', margin: 0 }}>
                    <div style={{ background: 'rgba(255, 140, 0, 0.15)', padding: '12px', borderRadius: '14px', display: 'flex' }}>
                      <LayoutDashboard size={24} style={{ color: 'var(--primary)' }} />
                    </div>
                    Task Breakdown
                  </h2>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }} onClick={exportToCSV}>
                      <Download size={16} /> CSV
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }} onClick={() => navigator.clipboard.writeText(JSON.stringify(results, null, 2))}>
                      <FileJson size={16} /> JSON
                    </button>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                  gap: '1.5rem',
                  marginTop: '1rem'
                }}>
                  {results.map((item: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -5, background: 'rgba(255,255,255,0.04)', borderColor: 'var(--primary)' }}
                      style={{ 
                        background: 'rgba(255,255,255,0.02)', 
                        padding: '1.8rem', 
                        borderRadius: '24px', 
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem',
                        position: 'relative',
                        transition: 'background 0.3s ease, border-color 0.3s ease'
                      }}
                    >
                      {/* Priority Tag */}
                      <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem' }}>
                        <span style={{
                          background: item.priority === 'High' ? 'rgba(255, 68, 68, 0.1)' : 'rgba(255, 140, 0, 0.1)',
                          color: item.priority === 'High' ? '#ff4444' : 'var(--primary)',
                          padding: '4px 12px',
                          borderRadius: '30px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          border: `1px solid ${item.priority === 'High' ? 'rgba(255, 68, 68, 0.2)' : 'rgba(255, 140, 0, 0.2)'}`
                        }}>
                          {item.priority || 'Scheduled'}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ marginTop: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                          {item.task}
                        </h4>
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.8rem', 
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border-subtle)'
                      }}>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.8rem' }}>
                          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px' }}>
                            <User size={14} className="text-primary" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Owner</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{item.owner}</span>
                          </div>
                        </div>

                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.8rem' }}>
                          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px' }}>
                            <Clock size={14} className="text-primary" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Deadline</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{item.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="glass-panel" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.05), transparent)', border: '1px solid rgba(255, 140, 0, 0.2)', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ background: 'rgba(255, 140, 0, 0.1)', padding: '14px', borderRadius: '16px' }}>
                    <Sparkles size={28} style={{ color: 'var(--secondary)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem' }}>Ecosystem Connect</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Push your intelligence data to the tools you use every day.</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <motion.button whileHover={{ scale: 1.02 }} className="btn btn-outline" style={{ padding: '1.8rem', justifyContent: 'center', background: 'var(--card-bg)' }}>
                    <Calendar size={20} /> Add to Google Calendar
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} className="btn btn-outline" style={{ padding: '1.8rem', justifyContent: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <Link2 size={20} /> Delegate via Slack
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} className="btn btn-outline" style={{ padding: '1.8rem', justifyContent: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <Milestone size={20} /> Synchronize with Jira
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
