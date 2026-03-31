import { motion } from 'framer-motion';

export const CompatibilitySection = ({ theme }: { theme: string }) => {
  const platforms = [
    { 
      name: 'Zoom', 
      color: '#2D8CFF', 
      desc: 'Seamlessly capture high-fidelity meeting audio and video for automated transcription.',
      link: 'https://zoom.us'
    },
    { 
      name: 'Google Meet', 
      color: '#00AC47', 
      desc: 'Native integration with Google Workspace to process your collaborative sessions.',
      link: 'https://meet.google.com'
    },
    { 
      name: 'MS Teams', 
      color: '#464EB8', 
      desc: 'Enterprise-grade syncing for Microsoft Teams meetings with deep analysis.',
      link: 'https://teams.microsoft.com'
    },
    { 
      name: 'Discord', 
      color: '#5865F2', 
      desc: 'Optimized support for community calls and server-based group discussions.',
      link: 'https://discord.com'
    }
  ];

  return (
    <section className="container" style={{ margin: 'clamp(4rem, 10vw, 8rem) auto' }}>
      <div className="glass-panel" style={{ 
        padding: 'clamp(2rem, 8vw, 5rem) 1.5rem', 
        borderRadius: 'clamp(24px, 5vw, 50px)',
        textAlign: 'center',
        background: theme === 'dark' ? 'rgba(5, 5, 5, 0.4)' : '#f9fafb',
        border: '1px solid var(--border-subtle)',
      }}>
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
             Compatible <span className="gradient-text">with</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Zerion works where you work. Connect your favorite platforms and let AI handle the rest.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card"
              style={{
                padding: '3rem 2rem',
                borderRadius: '32px',
                border: `1px solid ${p.color}25`,
                background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: `0 12px 35px rgba(0,0,0,0.08)`,
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '5px', 
                background: p.color 
              }} />
              
              <h4 style={{ 
                fontWeight: 800, 
                fontSize: '1.6rem', 
                color: theme === 'dark' ? '#fff' : '#000',
                letterSpacing: '-0.01em'
              }}>
                {p.name}
              </h4>
              
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)', 
                lineHeight: 1.6,
                minHeight: '4.8rem'
              }}>
                {p.desc}
              </p>
              
              <a 
                href={p.link} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  padding: '0.8rem 1.5rem',
                  borderRadius: '14px',
                  background: `${p.color}15`,
                  color: p.color,
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  border: `1px solid ${p.color}30`,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = p.color;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = `${p.color}15`;
                  e.currentTarget.style.color = p.color;
                }}
              >
                Launch Platform
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
