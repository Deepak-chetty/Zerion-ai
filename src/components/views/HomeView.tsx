import { motion } from 'framer-motion';
import { ChevronRight, Shield, Zap, BarChart3, Video, User, Clock, Calendar, Mic } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { CompatibilitySection } from '../sections/CompatibilitySection';
import { ChromeExtensionSection } from '../sections/ChromeExtensionSection';

interface HomeViewProps {
  onStart: () => void;
  theme: string;
}

export const HomeView = ({ onStart, theme }: HomeViewProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <header className="hero container" style={{ position: 'relative', overflow: 'visible', paddingTop: 'clamp(2rem, 8vw, 6rem)' }}>
      {/* Scattered Decorative Background Icons */}
      {[
        { Icon: Video, top: '10%', left: '5%', size: 30, delay: 0 },
        { Icon: User, top: '25%', left: '85%', size: 20, delay: 0.5 },
        { Icon: Clock, top: '65%', left: '10%', size: 25, delay: 1 },
        { Icon: Calendar, top: '15%', left: '75%', size: 35, delay: 1.5 },
        { Icon: BarChart3, top: '80%', left: '90%', size: 40, delay: 2 },
        { Icon: Mic, top: '40%', left: '2%', size: 20, delay: 2.5 },
        { Icon: Shield, top: '5%', left: '40%', size: 25, delay: 3 },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 5 + i, 
            repeat: Infinity, 
            delay: item.delay 
          }}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            color: 'var(--text-primary)',
            zIndex: -1,
            pointerEvents: 'none'
          }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}

      {/* Background Decorative Accents */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1000px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 140, 0, 0.08) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ marginBottom: '1.5rem', position: 'relative' }}
      >
        <Logo size={64} className="text-primary" theme={theme} style={{ margin: '0 auto' }} />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: '1.5rem' }}>
          AI-Powered <span className="gradient-text">Meeting Intelligence</span>.
        </motion.h1>
      </div>

      <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} style={{ maxWidth: '700px', margin: '0 auto 2.5rem', color: 'var(--text-secondary)' }}>
        Zerion is a state-of-the-art solution for extracting structured action items from any meeting transcript.
        Transform hours of conversation into minutes of total clarity.
      </motion.p>

      <div className="flex-center" style={{ gap: '1.5rem', marginBottom: '5rem' }}>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 140, 0, 0.4)' }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-primary" 
          onClick={onStart} 
          style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', position: 'relative' }}
        >
          Get Started
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(-1rem, -5vw, -4rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontWeight: 700
        }}
      >
        <span>Explore Platform</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
        />
      </motion.div>
    </header>

    <CompatibilitySection theme={theme} />
    <ChromeExtensionSection theme={theme} />

    {/* Extra background icons for lower sections */}
    <motion.div
      animate={{ 
        opacity: [0.02, 0.05, 0.02],
        x: [0, 20, 0]
      }}
      transition={{ duration: 8, repeat: Infinity }}
      style={{ position: 'fixed', bottom: '10%', left: '5%', zIndex: -1, pointerEvents: 'none' }}
    >
      <Zap size={120} style={{ color: 'var(--primary)', filter: 'blur(40px)' }} />
    </motion.div>

    <section className="container view-section" style={{ position: 'relative' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', fontWeight: 800 }}>
        Why Choose <span className="gradient-text">Zerion?</span>
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[
          { icon: <Shield size={40} className="text-primary" />, title: "Privacy First", desc: "No data is stored on our servers. All API processing is handled via your local key." },
          { icon: <Zap size={40} color="var(--secondary)" />, title: "Instant Analysis", desc: "Get your structured task list in seconds, regardless of the meeting length." },
          { icon: <BarChart3 size={40} style={{ color: '#ffd700' }} />, title: "Smart Extraction", desc: "Detects nuanced owners and deadlines even if they are mentioned informally." }
        ].map((feat, i) => (
          <motion.div 
            whileHover={{ y: -8, background: 'rgba(255,255,255,0.04)' }}
            className="glass-card" 
            key={i} 
            style={{ 
              padding: '3rem 2.5rem',
              borderRadius: '32px',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(255,255,255,0.02)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transition: 'background 0.3s ease'
            }}
          >
            <div style={{ background: 'rgba(255,140,0,0.1)', width: 'fit-content', padding: '15px', borderRadius: '18px' }}>
              {feat.icon}
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700 }}>{feat.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </motion.div>
);
