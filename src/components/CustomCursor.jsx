import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let targetX = -100;
    let targetY = -100;

    const updatePosition = (e) => {
      let x, y;
      if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      
      if (x !== undefined && y !== undefined) {
        targetX = x;
        targetY = y;
        setIsVisible(true);
        // Instant update for the dot
        setPosition({ x, y });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .dino-figurine, .museum-marker, input, .exhibit-card, .image-wrapper, .toggle-btn, .era-pill')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('touchmove', updatePosition, { passive: true });
    window.addEventListener('touchstart', (e) => { updatePosition(e); handleMouseDown(); }, { passive: true });
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('touchmove', updatePosition);
      window.removeEventListener('touchstart', updatePosition);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-ring ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
