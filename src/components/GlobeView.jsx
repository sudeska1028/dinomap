import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';

const GlobeView = ({ viewMode = 'museum', museums = [], filteredDinos = [], onMuseumSelect, onDinoSelect }) => {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      
      // Start zoomed in closer to the globe, but not too close
      globeRef.current.pointOfView({ altitude: 2.0 }, 0);
      
      // Update lighting for day/night effect
      const scene = globeRef.current.scene();
      
      // Configure ambient light to be bright enough to see the whole globe clearly
      scene.children.forEach(c => {
        if (c.type === 'AmbientLight') {
          c.intensity = 1.2; // Bright ambient light so there's no harsh darkness
        }
        // react-globe.gl adds a default DirectionalLight that follows the camera
        if (c.type === 'DirectionalLight' && c.name !== 'SunLight') {
          c.intensity = 0; // Disable the camera light completely
          c.position.set(0,0,0);
        }
      });
      
      // Add a directional light (Sun) coming from a specific angle
      if (!scene.children.some(c => c.name === 'SunLight')) {
        const sunLight = new THREE.DirectionalLight(0xffffff, 2.0); // Softer sun highlight
        sunLight.name = 'SunLight';
        sunLight.position.set(5, 3, 5); // Cross angle
        scene.add(sunLight);
      }
      
      // Enhance depth, shadows, and ocean reflections
      if (globeRef.current.globeMaterial) {
        const material = globeRef.current.globeMaterial();
        material.bumpScale = 15; // Increased depth for terrain shadows
        material.specular = new THREE.Color('#bbdefb'); // Bright blue-white for oceans
        material.shininess = 40; // Increased shininess for realistic sun reflection
      }
    }
  }, []);

  // Museum points (only used for HTML markers — no separate pointsData circles)
  const museumPoints = museums.map(museum => ({
    lat: museum.coordinates.lat,
    lng: museum.coordinates.lng,
    name: museum.name,
    type: 'museum',
    data: museum
  }));

  // Dino points with force-directed relaxation to prevent overlaps
  const rawDinoPoints = [];
  filteredDinos.forEach(dino => {
    dino.locations?.forEach(loc => {
      rawDinoPoints.push({ lat: loc.lat, lng: loc.lng, name: dino.species, type: 'dino', data: dino });
    });
  });

  const dinoPoints = JSON.parse(JSON.stringify(rawDinoPoints));
  const maxIterations = 60;
  const forceStrength = 0.6;
  const collisionDistance = 12; // Repulsion distance in degrees

  for (let i = 0; i < maxIterations; i++) {
    let moved = false;
    for (let j = 0; j < dinoPoints.length; j++) {
      for (let k = j + 1; k < dinoPoints.length; k++) {
        const p1 = dinoPoints[j];
        const p2 = dinoPoints[k];
        let dLat = p1.lat - p2.lat;
        let dLng = p1.lng - p2.lng;
        
        // Handle exact overlaps
        if (dLat === 0 && dLng === 0) {
          dLat = (Math.random() - 0.5) * 0.1;
          dLng = (Math.random() - 0.5) * 0.1;
        }

        const distSq = dLat*dLat + dLng*dLng;
        if (distSq < collisionDistance*collisionDistance) {
          const dist = Math.sqrt(distSq);
          const overlap = collisionDistance - dist;
          const pushLat = (dLat / dist) * overlap * forceStrength;
          const pushLng = (dLng / dist) * overlap * forceStrength;
          
          p1.lat += pushLat;
          p1.lng += pushLng;
          p2.lat -= pushLat;
          p2.lng -= pushLng;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }

  const htmlPoints = viewMode === 'museum' ? museumPoints : dinoPoints;
  const dinoGlobePoints = viewMode === 'lifemap' ? dinoPoints : [];

  return (
    <div className="globe-container">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        specularImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="#64b5f6"
        atmosphereAltitude={0.15}
        /* Dino mode subtle glow dots */
        pointsData={dinoGlobePoints}
        pointAltitude={0.01}
        pointColor={() => 'rgba(229,70,79,0.6)'}
        pointRadius={0.3}
        pointResolution={8}
        /* HTML markers */
        htmlElementsData={htmlPoints}
        onPointClick={point => {
          if (point.type === 'museum') onMuseumSelect(point.data);
          if (point.type === 'dino' && onDinoSelect) onDinoSelect(point.data);
        }}
        htmlElement={d => {
          const el = document.createElement('div');

          if (d.type === 'museum') {
            el.className = 'museum-marker';
            el.style.pointerEvents = 'auto';
            el.onclick = () => onMuseumSelect(d.data);
            el.innerHTML = `
              <div class="museum-pin-ring"></div>
              <div class="museum-pin-core"></div>
              <div class="museum-pin-label">${d.name}</div>
            `;
          } else {
            const speciesName = d.data.species?.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'unknown';
            el.className = 'dino-figurine';
            el.style.pointerEvents = 'auto';
            el.onclick = () => { if (onDinoSelect) onDinoSelect(d.data); };
            // Render with an inner wrapper to separate Globe's transform from our animation transforms
            el.innerHTML = `
              <div class="dino-inner-wrapper" style="position: relative;">
                <img src="/assets/chibis/3d_cutout_${speciesName}.png?v=9" style="width:70px;height:70px;object-fit:contain;background:transparent;" onerror="this.src='/assets/toy_theropod.png'" />
                <div class="dino-marker-info">${d.data.species}</div>
              </div>
            `;
            
            el.onmouseenter = () => {
              const rectA = el.getBoundingClientRect();
              const centerA = { x: rectA.left + rectA.width/2, y: rectA.top + rectA.height/2 };
              
              document.querySelectorAll('.dino-figurine').forEach(otherEl => {
                const inner = otherEl.querySelector('.dino-inner-wrapper');
                if (!inner) return;

                if (otherEl !== el) {
                  const rectB = otherEl.getBoundingClientRect();
                  const centerB = { x: rectB.left + rectB.width/2, y: rectB.top + rectB.height/2 };
                  const dx = centerB.x - centerA.x;
                  const dy = centerB.y - centerA.y;
                  const dist = Math.sqrt(dx*dx + dy*dy);
                  
                  if (dist < 220 && dist > 0) {
                    const pushStrength = (220 - dist) * 0.8; 
                    const pushX = (dx / dist) * pushStrength;
                    const pushY = (dy / dist) * pushStrength;
                    inner.style.transform = `translate(${pushX}px, ${pushY}px) scale(0.85)`;
                    inner.style.opacity = '0.4';
                  }
                } else {
                   otherEl.classList.add('hovered-active');
                   otherEl.style.zIndex = '1000';
                }
              });
            };
            
            el.onmouseleave = () => {
              document.querySelectorAll('.dino-figurine').forEach(otherEl => {
                const inner = otherEl.querySelector('.dino-inner-wrapper');
                if (inner) {
                  inner.style.transform = '';
                  inner.style.opacity = '1';
                }
                otherEl.classList.remove('hovered-active');
                otherEl.style.zIndex = 'auto';
              });
            };
          }
          return el;
        }}
        htmlAltitude={0.06}
      />
    </div>
  );
};

export default GlobeView;
