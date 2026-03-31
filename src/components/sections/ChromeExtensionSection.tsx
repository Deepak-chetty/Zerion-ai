import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Chrome } from 'lucide-react';

export const ChromeExtensionSection = ({ theme }: { theme: string }) => {
  const features = [
    { title: 'Real-time Overlay', desc: 'See transcriptions and action items live during your meetings.' },
    { title: 'Cross-Platform', desc: 'Works seamlessly with browser versions of Zoom, Meet, and Teams.' },
    { title: 'Instant Sync', desc: 'One-click processing that sends data directly to your Zerion studio.' }
  ];

  return (
    <section className="container" style={{ margin: 'clamp(5rem, 12vw, 10rem) auto' }}>
      <div className="glass-panel" style={{ 
        padding: 'clamp(2rem, 8vw, 5rem) clamp(1.5rem, 5vw, 4rem)', 
        borderRadius: 'clamp(24px, 5vw, 50px)',
        background: theme === 'dark' ? 'rgba(10, 10, 10, 0.5)' : '#ffffff',
        border: '1px solid var(--border-subtle)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Visual Mockup Side */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            background: 'var(--accent-gradient)',
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: '24px',
            padding: '2px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              background: theme === 'dark' ? '#0a0a0a' : '#fff',
              width: '100%',
              height: '100%',
              borderRadius: '22px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Mock browser UI */}
              <div style={{ height: '40px', background: 'rgba(128,128,128,0.1)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '8px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ width: '60%', height: '20px', background: 'rgba(128,128,128,0.1)', marginBottom: '1rem', borderRadius: '4px' }} />
                <div style={{ width: '100%', height: '100px', background: 'rgba(128,128,128,0.05)', borderRadius: '12px' }} />
              </div>
              
              {/* Floating Extension Popup */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '180px',
                  background: 'var(--accent-gradient)',
                  padding: '1px',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  zIndex: 20
                }}
              >
                <div style={{ background: '#111', borderRadius: '15px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                     <div style={{ width: 24, height: 24, borderRadius: '6px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Zap size={14} color="white" />
                     </div>
                     <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>Zerion AI</div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                    Capturing high-fidelity transcript...
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
           initial={{ x: 50, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255, 140, 0, 0.1)', color: 'var(--primary)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '1px' }}>
             BROWSER EXTENSION
          </div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
             Capture Meetings <span className="gradient-text">Natively.</span>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
             {features.map((f) => (
                <div key={f.title} style={{ display: 'flex', gap: '1.2rem' }}>
                   <div style={{ color: 'var(--primary)', marginTop: '4px' }}>
                     <CheckCircle2 size={24} />
                   </div>
                   <div>
                     <h4 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.4rem' }}>{f.title}</h4>
                     <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.desc}</p>
                   </div>
                </div>
             ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            style={{ 
              padding: '0.8rem 1.8rem', 
              fontSize: '1rem', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              boxShadow: '0 15px 35px rgba(255, 140, 0, 0.25)' 
            }}
          >
            <Chrome size={20} />
            Add to Chrome — Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
