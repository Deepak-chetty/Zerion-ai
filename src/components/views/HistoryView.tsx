import { motion } from 'framer-motion';
import { Trash2, Clock } from 'lucide-react';

interface HistoryViewProps {
  history: any[];
  onClear: () => void;
  onRevisit: (item: any) => void;
}

export const HistoryView = ({ history, onClear, onRevisit }: HistoryViewProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container view-section">
    <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '2rem' }}>
      <h2>Meeting History</h2>
      {history.length > 0 && (
        <button className="btn btn-outline" style={{ color: '#ff4444' }} onClick={onClear}>
          <Trash2 size={16} />
          Clear All
        </button>
      )}
    </div>

    {history.length === 0 ? (
      <div className="glass-panel flex-center" style={{ height: '300px', flexDirection: 'column' }}>
        <Clock size={40} opacity={0.3} />
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>No history found. Try processing a transcript!</p>
      </div>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {history.map((h, i) => (
          <div className="glass-card" key={i} onClick={() => onRevisit(h)} style={{ cursor: 'pointer' }}>
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {new Date(h.timestamp).toLocaleString()}
              </span>
              <span className="gradient-text" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{h.items.length} items</span>
            </div>
            <p style={{ fontSize: '0.95rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#ccc' }}>
              {h.transcript}
            </p>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);
