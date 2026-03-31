import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Key, Sparkles, Info, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignupViewProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const SignupView = ({ onSuccess, onSwitchToLogin }: SignupViewProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showApiInfo, setShowApiInfo] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    gemini: '',
    openai: '',
    anthropic: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleApiKeyChange = (key: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await signup(username, email, password, apiKeys);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Error during signup');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.95 }}
      className="container flex-center"
      style={{ minHeight: '90vh', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div className="glass-card" style={{ 
        width: '100%', 
        maxWidth: '550px', 
        padding: '3rem', 
        borderRadius: '32px',
        background: 'var(--card-bg)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--accent-gradient)', 
            borderRadius: '18px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <UserPlus size={30} color="white" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Join <span className="gradient-text">Zerion</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>Transform your meetings with AI intelligence</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '0.8rem 0.8rem 0.8rem 2.8rem', 
                    borderRadius: '12px', 
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '0.8rem 0.8rem 0.8rem 2.8rem', 
                    borderRadius: '12px', 
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                placeholder="Minimum 8 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem 0.8rem 0.8rem 2.8rem', 
                  borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '1rem', justifyContent: 'flex-start' }}>
              <Key size={18} className="text-primary" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Integration <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-secondary)' }}>(Optional)</span></h3>
              <div 
                style={{ cursor: 'help', color: 'var(--text-secondary)', marginLeft: '4px' }}
                onMouseEnter={() => setShowApiInfo(true)}
                onMouseLeave={() => setShowApiInfo(false)}
              >
                <Info size={16} />
              </div>
            </div>

            <AnimatePresence>
              {showApiInfo && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)', 
                    background: 'rgba(255, 140, 0, 0.05)', 
                    padding: '0.8rem', 
                    borderRadius: '10px',
                    borderLeft: '3px solid var(--primary)',
                    lineHeight: 1.5,
                    overflow: 'hidden'
                  }}
                >
                  Your API keys are stored securely and used directly to process transcripts. Zerion never shares your keys.
                </motion.div>
              )}
            </AnimatePresence>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { id: 'gemini', label: 'Google Gemini Key', placeholder: 'Enter Gemini key...', link: 'https://aistudio.google.com/app/apikey' },
                { id: 'openai', label: 'OpenAI API Key', placeholder: 'Enter OpenAI key...', link: 'https://platform.openai.com/api-keys' },
                { id: 'anthropic', label: 'Anthropic API Key', placeholder: 'Enter Anthropic key...', link: 'https://console.anthropic.com/settings/keys' },
              ].map((api) => (
                <div key={api.id} className="input-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{api.label}</label>
                    <a 
                      href={api.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ fontSize: '0.7rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      Get Key <ExternalLink size={10} />
                    </a>
                  </div>
                  <input 
                    type="password" 
                    placeholder={api.placeholder}
                    value={apiKeys[api.id as keyof typeof apiKeys]}
                    onChange={(e) => handleApiKeyChange(api.id, e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.7rem 1rem', 
                      borderRadius: '10px', 
                      background: 'transparent',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {error && <p style={{ color: '#ff4b2b', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
          >
            {loading ? 'Creating Account...' : 'Get Started Free'}
            <Sparkles size={18} />
          </motion.button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Already have an account? {' '}
            <span 
              onClick={onSwitchToLogin}
              style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', borderBottom: '1px solid transparent' }}
              onMouseOver={(e) => e.currentTarget.style.borderBottom = '1px solid var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
