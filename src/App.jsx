import React, { useState } from 'react';
import GlobeView from './components/GlobeView';
import MuseumPanel from './components/MuseumPanel';
import LifeMapPanel from './components/LifeMapPanel';
import { museums, dinosaurs } from './data';

const ERAS = ['All', 'Triassic', 'Jurassic', 'Cretaceous'];

function App() {
  const [selectedMuseum, setSelectedMuseum] = useState(null);
  const [selectedDino, setSelectedDino] = useState(null);
  const [viewMode, setViewMode] = useState('museum');
  const [era, setEra] = useState('Cretaceous');
  const [searchTerm, setSearchTerm] = useState('');

  const handleClosePanel = () => {
    setSelectedMuseum(null);
    setSelectedDino(null);
  };

  const filteredDinos = dinosaurs.filter(d => {
    const matchEra = era === 'All' || d.period.includes(era);
    const matchSearch = d.species.toLowerCase().includes(searchTerm.toLowerCase());
    return matchEra && matchSearch;
  });

  return (
    <div className={`app-container ${(selectedMuseum || selectedDino) ? 'panel-is-open' : ''}`}>
      <header className="app-header">
        <h1 className="app-title">DinoMap 3D</h1>
        <div className="app-subtitle">Global Paleontology Navigator</div>

        <div className="view-toggle" style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => { setViewMode('museum'); setSelectedMuseum(null); setSelectedDino(null); }}
            className={`toggle-btn ${viewMode === 'museum' ? 'active' : ''}`}
          >
            Museum Explorer
          </button>
          <button
            onClick={() => { setViewMode('lifemap'); setSelectedMuseum(null); setSelectedDino(null); }}
            className={`toggle-btn ${viewMode === 'lifemap' ? 'active' : ''}`}
          >
            Life Map
          </button>
        </div>

        {viewMode === 'lifemap' && (
          <div className="lifemap-controls">
            <div className="era-pills">
              {ERAS.map(e => (
                <button
                  key={e}
                  onClick={() => setEra(e)}
                  className={`era-pill ${era === e ? 'active' : ''}`}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="header-search-row">
              <input
                type="text"
                placeholder="Search species..."
                value={searchTerm}
                onChange={ev => setSearchTerm(ev.target.value)}
                className="header-search"
              />
              <span className="dino-count">{filteredDinos.length} species</span>
            </div>
          </div>
        )}
      </header>

      <div className="interaction-hint">
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
        <span>Drag to explore</span>
      </div>

      <GlobeView
        viewMode={viewMode}
        museums={museums}
        filteredDinos={filteredDinos}
        onMuseumSelect={setSelectedMuseum}
        onDinoSelect={setSelectedDino}
      />

      {viewMode === 'museum' && (
        <MuseumPanel museum={selectedMuseum} onClose={handleClosePanel} />
      )}
      {viewMode === 'lifemap' && selectedDino && (
        <LifeMapPanel
          selectedDino={selectedDino}
          onClose={handleClosePanel}
          onDinoSelect={setSelectedDino}
        />
      )}
    </div>
  );
}

export default App;
