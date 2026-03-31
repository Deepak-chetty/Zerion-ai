import { Logo } from './Logo';

interface FooterProps {
  theme: string;
  setActiveView: (view: string) => void;
}

export const Footer = ({ theme, setActiveView }: FooterProps) => {
  return (
    <footer className="container footer" style={{ padding: '4rem 0 2rem', borderTop: '1px solid var(--glass-border)', opacity: 0.6, textAlign: 'center' }}>
      <div className="flex-center" style={{ gap: '2rem', marginBottom: '1.5rem' }}>
        <Logo size={28} className="text-primary" theme={theme} />
        <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
          <span onClick={() => setActiveView('home')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>Home</span>
          <span onClick={() => setActiveView('tool')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>Tool</span>
          <span onClick={() => setActiveView('contact')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>Contact</span>
        </nav>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>© 2026 Zerion AI System • Powered by Google Gemini</p>
    </footer>
  );
};
