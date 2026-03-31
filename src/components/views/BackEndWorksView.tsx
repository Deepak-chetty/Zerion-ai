import { motion } from 'framer-motion';
import { Shield, ClipboardList } from 'lucide-react';

export const BackEndWorksView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container view-section">
    <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>BackEnd Works</h2>

    <section>
      <h3 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--primary)', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>System Architecture</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%', maxWidth: '900px' }}>

          {/* Layer 1: UI */}
          <div className="glass-panel" style={{ padding: '2rem 1.5rem', width: '100%', textAlign: 'center', border: '1px solid var(--primary)' }}>
            <div className="gradient-text" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px' }}>LAYER 01: FRONTEND</div>
            <h3 style={{ margin: '0.5rem 0', fontSize: '1.4rem' }}>React + Vite Studio</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Framer Motion UI & State Management</p>
          </div>

          <div style={{ color: 'var(--primary)', opacity: 0.5 }}>▼</div>

          {/* Layer 2: API Gateway */}
          <div className="glass-panel" style={{ padding: '2rem 1.5rem', width: '100%', textAlign: 'center', border: '1px solid var(--secondary)' }}>
            <div className="gradient-text" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px' }}>LAYER 02: API GATEWAY</div>
            <h3 style={{ margin: '0.5rem 0', fontSize: '1.4rem' }}>Node + Express Backend</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>POST /analyze-transcript — Orchestration</p>
          </div>

          <div style={{ color: 'var(--primary)', opacity: 0.5 }}>▼</div>

          {/* Layer 3: Pipeline */}
          <div className="glass-panel" style={{ padding: '2rem 1.5rem', width: '100%', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
            <div className="gradient-text" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px' }}>LAYER 03: PIPELINE</div>
            <h3 style={{ margin: '0.5rem 0', fontSize: '1.4rem' }}>NLP Preprocessing</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>SVO, POS Tagging, & NER Analysis</p>
          </div>

          <div style={{ color: 'var(--primary)', opacity: 0.5 }}>▼</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
            <motion.div whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'var(--card-bg)', border: '1px dashed var(--primary)' }}>
              <div className="gradient-text" style={{ fontSize: '0.8rem', fontWeight: 900 }}>PHASE 1: MVP</div>
              <h4 style={{ marginTop: '0.5rem' }}>Rule-Based Engine</h4>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Regex & Pattern Matching.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'var(--card-bg)', border: '2px solid var(--secondary)' }}>
              <div className="gradient-text" style={{ fontSize: '0.8rem', fontWeight: 900 }}>PHASE 2: ML DETECTION</div>
              <h4 style={{ marginTop: '0.5rem' }}>AI Intelligence</h4>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Gemini 2.5 Flash for Context.</p>
            </motion.div>
          </div>

          {/* New: NLP Intelligence Details */}
          <div className="glass-panel" style={{ width: '100%', padding: '2.5rem 2rem', marginTop: '1rem', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)', fontSize: '1.2rem' }}>Intelligence Pipeline Components</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontWeight: 800, fontSize: '0.85rem' }}>01. NER</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Detecting Names & Dates.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontWeight: 800, fontSize: '0.85rem' }}>02. DEP-PARSING</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>SVO extraction logic.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontWeight: 800, fontSize: '0.85rem' }}>03. COREFERENCE</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Pronoun-to-Entity resolution.</p>
              </div>
            </div>
          </div>

          {/* Data Strategy Section */}
          <div className="glass-panel" style={{ width: '100%', padding: '2.5rem 2rem', marginTop: '2rem', background: 'var(--card-bg)' }}>
            <div className="gradient-text" style={{ fontSize: '0.8rem', fontWeight: 800, textAlign: 'center' }}>STRATEGIC DATA OPS</div>
            <h3 style={{ textAlign: 'center', margin: '0.5rem 0 2rem', fontSize: '1.6rem' }}>Training Strategy</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Shield size={20} /> Dataset Sources
                </h4>
                <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '2' }}>
                  <li><strong>AMI/ICSI Corpus:</strong> 175h Meeting Data.</li>
                  <li><strong>Custom Annotation:</strong> Verified snippets.</li>
                </ul>
              </div>

              <div style={{ width: '100%', minWidth: 0 }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <ClipboardList size={20} /> Annotation Format
                </h4>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-secondary)', overflowX: 'auto' }}>
                  <span style={{ color: 'var(--primary)' }}>"Rahul prepare slides..."</span><br />
                  <span style={{ color: 'var(--text-muted)' }}>- Task:</span> prepare slides<br />
                  <span style={{ color: 'var(--text-muted)' }}>- Owner:</span> Rahul
                </div>
              </div>
            </div>
          </div>
          {/* Evaluation Metrics Section */}
          <div className="glass-panel" style={{ width: '100%', padding: '2rem', marginTop: '2rem', border: '1px solid var(--border-subtle)' }}>
            <div className="gradient-text" style={{ fontSize: '0.8rem', fontWeight: 800, textAlign: 'center' }}>ACADEMIC RIGOR</div>
            <h3 style={{ textAlign: 'center', margin: '0.5rem 0 2rem' }}>Model Performance Metrics</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>P / R / F1</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Classification Quality</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Measures detection accuracy, coverage, and harmonic mean.</p>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>EMA</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Exact Match Accuracy</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Strict verification of task-owner-deadline triplets.</p>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ff4444', marginBottom: '0.5rem' }}>Token-F1</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Entity Extraction</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Precision of NER token spans for Names and Dates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);
