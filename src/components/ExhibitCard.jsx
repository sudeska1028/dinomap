import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Ruler, Scale, CalendarDays, MapPin, Loader2, Tag, Search, X, ArrowLeftRight } from 'lucide-react';

// Remove white/near-white background from an image URL via canvas pixel manipulation.
// Returns a data URL (transparent PNG) or null if CORS prevents access.
function removeWhiteBg(src) {
  return new Promise(resolve => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = id.data;
        // Pass 1: remove all near-white pixels globally (same logic as server-side Jimp script)
        const T = 215;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i] >= T && d[i+1] >= T && d[i+2] >= T) d[i+3] = 0;
        }
        // Pass 2: soften fringe pixels adjacent to transparent areas
        for (let i = 0; i < d.length; i += 4) {
          if (d[i+3] === 0) continue;
          const brightness = (d[i] + d[i+1] + d[i+2]) / 3;
          if (brightness < 190) continue;
          const w = canvas.width;
          const pos = i / 4;
          const neighbors = [pos-1, pos+1, pos-w, pos+w];
          if (neighbors.some(n => n >= 0 && n < d.length/4 && d[n*4+3] === 0)) {
            const t = (brightness - 190) / 65;
            d[i+3] = Math.round(d[i+3] * (1 - t));
          }
        }
        ctx.putImageData(id, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(null); // CORS blocked — fall back to original URL
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

const ExhibitCard = ({ exhibit, dinosaur, onCompareClick }) => {
  const [fossilImg, setFossilImg] = useState(null);
  const [realImg, setRealImg] = useState(dinosaur.animation_url);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [fossilImgProcessed, setFossilImgProcessed] = useState(null);
  const [lightboxProcessed, setLightboxProcessed] = useState(null);

  // Remove white background from the card thumbnail whenever fossilImg changes
  useEffect(() => {
    if (!fossilImg) { setFossilImgProcessed(null); return; }
    removeWhiteBg(fossilImg).then(result => {
      setFossilImgProcessed(result); // processed data URL, or null on CORS failure
    });
  }, [fossilImg]);

  // When a lightbox image is set, run canvas-based white background removal
  useEffect(() => {
    if (!lightboxImg) { setLightboxProcessed(null); return; }
    setLightboxProcessed('loading');
    removeWhiteBg(lightboxImg).then(result => {
      setLightboxProcessed(result);
    });
  }, [lightboxImg]);

  useEffect(() => {
    setRealImg(dinosaur.animation_url);
    setFossilImg(null);
    setLoading(true);

    const species = dinosaur.wiki_query || dinosaur.species;

    // Strategy 1: Wikipedia article's editor-curated main image (always a single clean photo)
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(species)}&prop=pageimages&format=json&origin=*&pithumbsize=900&pilicense=any`
    )
      .then(r => r.json())
      .then(data => {
        const page = Object.values(data.query?.pages || {})[0];
        const url = page?.thumbnail?.source;
        // Only use pageimages result if it's a JPG (real museum photo, not an illustration/cutout)
        if (url && /\.(jpg|jpeg)/i.test(url)) {
          setFossilImg(url);
          setLoading(false);
          return;
        }
        // Strategy 2: article image list, pick best skeleton/museum photo
        return fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(species)}&prop=images&format=json&origin=*&imlimit=50`
        )
          .then(r => r.json())
          .then(d => {
            const imgs = Object.values(d.query?.pages || {})[0]?.images || [];
            const BAD = ['map','icon','scale','logo','flag','clade','phylo','silhouette','range',
                         'diagram','schematic','anatomy','restoration_','chart','drawing','illustration',
                         'vertebra','femur','humerus','tibia','fibula','fragment','isolated','svg',
                         'tooth','teeth','claw','egg','footprint','track','comparison','versus'];
            // Prefer JPG — museum hall photos are JPG; white-bg cutouts are usually PNG
            const good = imgs.filter(i => {
              const t = i.title.toLowerCase();
              return (t.endsWith('.jpg') || t.endsWith('.jpeg')) &&
                !BAD.some(b => t.includes(b));
            });
            // Fall back to PNG only if no JPG found
            const goodPng = imgs.filter(i => {
              const t = i.title.toLowerCase();
              return t.endsWith('.png') && !BAD.some(b => t.includes(b));
            });
            const pool = good.length ? good : goodPng;
            const best =
              pool.find(i => { const t = i.title.toLowerCase(); return (t.includes('skeleton') || t.includes('mount')) && (t.includes('museum') || t.includes('natural_history') || t.includes('berlin') || t.includes('amnh') || t.includes('smithsonian')); }) ||
              pool.find(i => { const t = i.title.toLowerCase(); return t.includes('skeleton') || t.includes('mount'); }) ||
              pool.find(i => { const t = i.title.toLowerCase(); return t.includes('skull'); }) ||
              pool[0];
            if (best) {
              const name = best.title.replace(/^File:/i, '');
              setFossilImg(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=900`);
            } else {
              setFossilImg(dinosaur.image_url || '/assets/fossil_trex.png');
            }
            setLoading(false);
          });
      })
      .catch(() => {
        setFossilImg(dinosaur.image_url || '/assets/fossil_trex.png');
        setLoading(false);
      });
  }, [dinosaur]);

  const openCompare = (e) => {
    e.stopPropagation();
    onCompareClick({ dinosaur, fossilImg: fossilImgProcessed || fossilImg || dinosaur.image_url, realImg });
  };

  return (
    <>
      <div className="exhibit-card">
        <div className="exhibit-images-container">
          {loading ? (
            <div
              className="image-wrapper loading-wrapper"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', flex: 1 }}
            >
              <Loader2 className="animate-spin" size={32} color="var(--accent)" />
            </div>
          ) : (
            <>
              <div
                className="image-wrapper fossil"
                title="Click to enlarge"
                onClick={() => setLightboxImg(fossilImg || dinosaur.image_url)}
              >
                <img
                  src={fossilImgProcessed || fossilImg}
                  alt={`${dinosaur.species} exhibit`}
                  className="exhibit-img"
                  onError={e => { e.target.src = fossilImg || '/assets/fossil_trex.png'; }}
                />
                <div className="image-label">Museum Exhibit</div>
              </div>

              <div
                className="image-wrapper real"
                title="Click to enlarge"
                onClick={() => setLightboxImg(realImg)}
              >
                <img
                  src={realImg}
                  alt={`${dinosaur.species} alive`}
                  className="exhibit-img"
                  onError={e => { e.target.src = '/assets/real_trex.png'; }}
                />
                <div className="image-label">Realistic Form</div>
              </div>
            </>
          )}
        </div>

        {/* Compare button below the images */}
        {!loading && (
          <button
            onClick={openCompare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(79,70,229,0.15)',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              alignSelf: 'flex-start',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,70,229,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79,70,229,0.15)'; }}
          >
            <ArrowLeftRight size={14} />
            Compare Side by Side
          </button>
        )}

        <div className="exhibit-info">
          <span className="exhibit-type">{exhibit.type}</span>
          <h4>{dinosaur.species}</h4>
          <p className="exhibit-desc">{exhibit.description}</p>

          <div className="dino-stats">
            <div className="stat-item"><CalendarDays size={16} /><span>{dinosaur.period}</span></div>
            <div className="stat-item"><MapPin size={16} /><span>{dinosaur.diet}</span></div>
            <div className="stat-item"><Ruler size={16} /><span>{dinosaur.length}</span></div>
            <div className="stat-item"><Scale size={16} /><span>{dinosaur.weight}</span></div>
            <div className="stat-item"><Tag size={16} /><span>{dinosaur.family}</span></div>
            <div className="stat-item"><Search size={16} /><span>Discovered: {dinosaur.discovery}</span></div>
          </div>
        </div>
      </div>

      {/* Single-image lightbox — rendered via portal to escape side-panel transform stacking context */}
      {lightboxImg && createPortal(
        <div
          className="image-modal-overlay"
          onClick={() => setLightboxImg(null)}
        >
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="image-modal-close"
              onClick={() => setLightboxImg(null)}
            >
              <X size={20} />
            </button>
            {lightboxProcessed === 'loading' ? (
              <Loader2 className="animate-spin" size={48} color="var(--accent)" style={{ display: 'block', margin: '3rem' }} />
            ) : (
              <img
                src={lightboxProcessed || lightboxImg}
                alt="enlarged"
                onError={e => { e.target.src = lightboxImg; }}
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ExhibitCard;
