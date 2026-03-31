import { motion } from 'framer-motion';

// --- IMAGE ASSETS (LINKED TO PUBLIC FOLDER) ---
const GUIDE_STEP_1 = "guide_step1.png";
const GUIDE_STEP_2 = "guide_step2.png";
const GUIDE_STEP_3 = "guide_step3.png";

export const HowToUseView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container view-section">
    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>How to Use Zerion AI</h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      {[
        {
          step: "Step 01",
          title: "Input Your Transcript",
          desc: "Collect your transcript from Zoom, Google Meet, or Microsoft Teams. Paste the raw text into our interactive input field. Don't worry about formatting.",
          img: GUIDE_STEP_1
        },
        {
          step: "Step 02",
          title: "Trigger AI Analysis",
          desc: "Choose your preferred Gemini model and click 'Extract'. Our system analyzes linguistic patterns to find actionable commitments.",
          img: GUIDE_STEP_2
        },
        {
          step: "Step 03",
          title: "Export & Action",
          desc: "Review the extracted tasks, owners, and deadlines. Export them as clean JSON for your project management tools.",
          img: GUIDE_STEP_3
        }
      ].map((s, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {i % 2 === 0 ? (
            <div>
              <span className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{s.step}</span>
              <h3 style={{ fontSize: '2rem', margin: '1rem 0' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid var(--primary)' }}>
              <img src={s.img} alt={s.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}
          {i % 2 !== 0 ? (
            <div>
              <span className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{s.step}</span>
              <h3 style={{ fontSize: '2rem', margin: '1rem 0' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid var(--primary)' }}>
              <img src={s.img} alt={s.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  </motion.div>
);
