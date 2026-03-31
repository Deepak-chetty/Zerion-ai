import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginViewProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

export const LoginView = ({ onSuccess, onSwitchToSignup }: LoginViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.95 }}
      className="container flex-center"
      style={{ minHeight: '70vh', flexDirection: 'column' }}
    >
      <div className="glass-card" style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '3rem', 
        borderRadius: '32px',
        background: 'var(--card-bg)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
        marginTop: '5rem'
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
            <LogIn size={30} color="white" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Welcome <span className="gradient-text">Back</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to access your meeting intelligence</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  borderRadius: '14px', 
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  borderRadius: '14px', 
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          {error && <p style={{ color: '#ff4b2b', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1.1rem', marginTop: '1rem' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={18} />
          </motion.button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Don't have an account? {' '}
            <span 
              onClick={onSwitchToSignup}
              style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', borderBottom: '1px solid transparent' }}
              onMouseOver={(e) => e.currentTarget.style.borderBottom = '1px solid var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
            >
              Sign up free
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
