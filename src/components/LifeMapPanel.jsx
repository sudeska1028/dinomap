import { X, MapPin } from 'lucide-react';
import { exhibits as allExhibits, museums as allMuseums } from '../data';

const LifeMapPanel = ({ selectedDino, onDinoSelect }) => {
  if (!selectedDino) return null;

  const relatedExhibits = allExhibits.filter(e => e.dinosaur_id === selectedDino.id);
  const relatedMuseums = relatedExhibits.map(e => {
    const m = allMuseums.find(m => m.id === e.museum_id);
    return { museum: m, type: e.type, description: e.description };
  }).filter(x => x.museum);

  return (
    <div className="side-panel glass-panel open">
      <button className="close-btn" onClick={() => onDinoSelect(null)}>
        <X size={20} />
      </button>

      <div className="lifemap-header-img-container" style={{ position: 'relative', width: '100%', overflow: 'hidden', flexShrink: 0, backgroundColor: '#000' }}>
        <img
          src={selectedDino.animation_url}
          alt={selectedDino.species}
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
          onError={e => { e.target.parentElement.style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(transparent, #0f1115)' }} />
      </div>

      <div className="museum-content">
        <div>
          <h2 style={{ fontSize: '1.8rem' }}>{selectedDino.species}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="exhibit-type">{selectedDino.period}</span>
            <span className="exhibit-type" style={{ background: 'rgba(255,255,255,0.1)' }}>
              {selectedDino.diet}
            </span>
          </div>
          <div className="museum-meta" style={{ marginTop: '0.75rem' }}>
            <MapPin size={14} />
            <span style={{ fontSize: '0.8rem' }}>
              {selectedDino.locations?.map(l => l.region).join(' · ')}
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
          {selectedDino.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {[
            ['Length', selectedDino.length],
            ['Weight', selectedDino.weight],
            ['Family', selectedDino.family],
            ['Discovered', selectedDino.discovery],
          ].map(([label, val]) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.7rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{label}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>

        {relatedMuseums.length > 0 && (
          <>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0' }}>Where to see it</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {relatedMuseums.map((rm, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <MapPin size={13} color="var(--accent)" />
                    {rm.museum.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                    {rm.type} — {rm.description}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LifeMapPanel;
