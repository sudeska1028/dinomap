import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { exhibits as allExhibits, dinosaurs as allDinosaurs } from '../data';
import ExhibitCard from './ExhibitCard';

const MuseumPanel = ({ museum, onClose }) => {
  const [comparingDino, setComparingDino] = useState(null);

  if (!museum) {
    return (
      <div className="side-panel glass-panel open welcome-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <MapPin size={48} style={{ color: '#f5a623', marginBottom: '1rem', opacity: 0.8 }} />
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Welcome to Museum Explorer</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Select any of the glowing golden museum pins on the 3D globe to explore their incredible dinosaur fossil collections and compare them with realistic reconstructions.
        </p>
      </div>
    );
  }

  const museumExhibits = museum.exhibits.map(exId => {
    const exhibit = allExhibits.find(e => e.id === exId);
    if (!exhibit) return null;
    const dinosaur = allDinosaurs.find(d => d.id === exhibit.dinosaur_id);
    return { exhibit, dinosaur };
  }).filter(Boolean);

  return (
    <>
      <div className={`side-panel glass-panel ${museum ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <img 
          src={museum.thumbnail_url} 
          alt={museum.name} 
          className="museum-header-img"
        />
        
        <div className="museum-content">
          <div>
            <h2>{museum.name}</h2>
            <div className="museum-meta">
              <MapPin size={16} />
              <span>{museum.location}</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {museum.description}
          </p>

          <h3>Dinosaur Exhibits</h3>
          <div className="exhibits-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {museumExhibits.map((item, index) => (
              <ExhibitCard 
                key={item.exhibit.id} 
                exhibit={item.exhibit} 
                dinosaur={item.dinosaur} 
                onCompareClick={(dino) => setComparingDino(dino)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Two-Way Comparison Modal */}
      {comparingDino && (
        <div className="image-modal-overlay comparison-modal-overlay" onClick={() => setComparingDino(null)}>
          <button className="image-modal-close global-close" onClick={() => setComparingDino(null)}>
            <X size={32} />
          </button>

          <div className="comparison-container" onClick={(e) => e.stopPropagation()}>
            <div className="comparison-header">
              <h3>{comparingDino.dinosaur.species}</h3>
              <p>Fossil vs. Realistic Form Comparison</p>
            </div>

            <div className="comparison-grid">
              <div className="comparison-pane">
                <img src={comparingDino.fossilImg} alt="Fossil" onError={(e)=>{e.target.src="/assets/fossil_trex.png"}}/>
                <div className="comparison-label">Museum Fossil</div>
              </div>

              <div className="comparison-divider">VS</div>

              <div className="comparison-pane">
                <img src={comparingDino.realImg} alt="Alive" onError={(e)=>{e.target.src="/assets/real_trex.png"}}/>
                <div className="comparison-label">Realistic Reconstruction</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MuseumPanel;
