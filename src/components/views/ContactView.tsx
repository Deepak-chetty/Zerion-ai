import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

export const ContactView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container view-section">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
      <div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Get in Touch</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}> Connect with the team. </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1.5rem' }}>
            <div className="glass-panel flex-center" style={{ width: 50, height: 50, borderRadius: '50%' }}> <Mail className="text-primary" size={24} /> </div>
            <div>
              <div style={{ fontWeight: 600 }}>Email</div>
              <div style={{ color: 'var(--text-secondary)' }}>support@zerion.ai</div>
            </div>
          </div>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1.5rem' }}>
            <div className="glass-panel flex-center" style={{ width: 50, height: 50, borderRadius: '50%' }}> <MapPin className="text-primary" size={24} /> </div>
            <div>
              <div style={{ fontWeight: 600 }}>Location</div>
              <div style={{ color: 'var(--text-secondary)' }}>Malla Reddy University, Hyderabad</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', margin: '1rem' }}>
        <h3 style={{ marginBottom: '2rem' }}>Send a Message</h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
          <input className="input-field" placeholder="Your Name" />
          <input className="input-field" placeholder="Your Email" />
          <textarea className="input-field" placeholder="Your Message" style={{ minHeight: '150px' }} />
          <button className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }}>Send Message</button>
        </form>
      </div>
    </div>
  </motion.div>
);
