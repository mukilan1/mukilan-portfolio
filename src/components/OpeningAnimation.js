"use client"

import { useEffect, useState } from 'react';

const OpeningAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Always play animation on every reload - remove storage checks
    
    // Prevent scrolling during animation
    try {
      if (typeof document !== 'undefined') {
        document.body.classList.add('no-scroll');
      }
    } catch (e) {
      console.error("Error adding scroll lock:", e);
    }
    
    // Complete animation after sequence finishes
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      try {
        if (typeof document !== 'undefined') {
          document.body.classList.remove('no-scroll');
        }
      } catch (e) {
        console.error("Error removing no-scroll class:", e);
      }
    }, 6000); // Total animation duration
    
    return () => {
      clearTimeout(timer);
      try {
        if (typeof document !== 'undefined') {
          document.body.classList.remove('no-scroll');
        }
      } catch (e) {
        console.error("Error cleaning up animation:", e);
      }
    };
  }, []);
  
  if (animationComplete) {
    return null;
  }
  
  return (
    <div className="opening-animation">
      <div className="animation-background"></div>
      
      <div className="animation-content">
        <div className="animation-logo">
          <span className="logo-letter">M</span>
        </div>
        
        <div className="animation-divider"></div>
        
        <div className="animation-text">
          <p className="reveal-text">
            <span>Transforming</span>
            <span>Vision</span>
            <span>Into</span>
            <span>Reality</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpeningAnimation;
