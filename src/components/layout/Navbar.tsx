import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, HelpCircle, Sparkles, Video, Zap, History, Mail, Settings, X, Menu, LogOut, User, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  activeView: string;
  setActiveView: (v: string) => void;
  theme: string;
}

export const Navbar = ({ activeView, setActiveView, theme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const d = ["zerion", "-", "ai.com"].join("");
  const isAdmin = user?.email === `admin@${d}`;

  const navItems = [
    { id: 'home', label: 'Home', icon: <Info size={16} /> },
    { id: 'guide', label: 'How to Use', icon: <HelpCircle size={16} /> },
    { id: 'backend', label: 'BackEnd Works', icon: <Sparkles size={16} />, adminOnly: true },
    { id: 'meeting', label: 'Meeting', icon: <Video size={16} />, protected: true, adminOnly: true },
    { id: 'tool', label: 'Tool', icon: <Zap size={16} /> },
    { id: 'history', label: 'History', icon: <History size={16} />, protected: true },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
  ].filter(item => !item.adminOnly || isAdmin);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container flex-center" style={{ justifyContent: 'space-between' }}>
        <div
          className="flex-center"
          style={{ 
            cursor: 'pointer',
          }}
          onClick={() => { setActiveView('home'); setMenuOpen(false); }}
        >
          <motion.div
            animate={{ 
              opacity: (activeView !== 'home' || scrolled) ? 1 : 0,
              width: (activeView !== 'home' || scrolled) ? 42 : 0,
              marginRight: (activeView !== 'home' || scrolled) ? '0.8rem' : '0rem',
              x: (activeView !== 'home' || scrolled) ? 0 : -10
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
          >
            <div className="flex-center" style={{ width: 42, height: 42 }}>
              <Logo size={40} className="text-primary" theme={theme} />
            </div>
          </motion.div>
          <h1 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
            Zer<span className="gradient-text">ion</span>
          </h1>
        </div>

        <ul className={`nav-links ${menuOpen ? 'mobile-show' : ''}`}>
          {navItems.map((v) => (
            <li
              key={v.id}
              className={`nav-link ${activeView === v.id ? 'active' : ''}`}
              onClick={() => { setActiveView(v.id); setMenuOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {v.icon}
                {v.protected && !isAuthenticated && (
                  <Lock size={10} style={{ position: 'absolute', top: -5, right: -5, color: 'var(--primary)' }} />
                )}
              </div>
              {v.label}
            </li>
          ))}
        </ul>

        <div className="flex-center" style={{ gap: '0.8rem' }}>
          {isAuthenticated ? (
            <div className="flex-center" style={{ gap: '0.5rem' }}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex-center" 
                style={{ 
                  background: 'rgba(255, 140, 0, 0.1)', 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '12px',
                  border: '1px solid var(--primary-low)',
                  cursor: 'pointer',
                  gap: '8px'
                }}
                onClick={() => setActiveView('settings')}
              >
                <User size={14} className="text-primary" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{user?.username.split(' ')[0]}</span>
              </motion.div>
              <button 
                className="btn btn-outline" 
                style={{ padding: '0.5rem', borderRadius: '10px' }} 
                onClick={logout}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex-center" style={{ gap: '0.5rem' }}>
              <button 
                className="btn btn-outline" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} 
                onClick={() => { setActiveView('login'); setMenuOpen(false); }}
              >
                Login
              </button>
              <button 
                className="btn btn-primary" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} 
                onClick={() => { setActiveView('signup'); setMenuOpen(false); }}
              >
                Sign Up
              </button>
            </div>
          )}

          <button className="btn btn-outline settings-btn" style={{ padding: '0.5rem', borderRadius: '10px' }} onClick={() => { setActiveView('settings'); setMenuOpen(false); }}>
            <Settings size={16} />
          </button>

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
