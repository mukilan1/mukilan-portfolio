"use client"

import { useEffect } from 'react';

// This component improves mobile layout without changing core functionality
const ResponsiveWrapper = () => {
  useEffect(() => {
    // Add mobile viewport meta tag to ensure proper scaling
    const ensureViewportMeta = () => {
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
      }
      viewportMeta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
    };
    
    // Fix for iOS height issues
    const fixIOSHeight = () => {
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVH();
      window.addEventListener('resize', setVH);
      return () => window.removeEventListener('resize', setVH);
    };
    
    // Fix for mobile overflow issues
    const fixOverflow = () => {
      document.documentElement.classList.add('overflow-x-hidden');
      document.body.classList.add('overflow-x-hidden', 'max-w-full');
    };
    
    // Make sure touch events work well
    const improveTouchInteraction = () => {
      const interactiveElements = document.querySelectorAll('button, a, .interactive');
      interactiveElements.forEach(el => {
        el.style.touchAction = 'manipulation';
      });
    };
    
    // Fix project cards layout on small screens
    const fixProjectCards = () => {
      const adjustCards = () => {
        const cards = document.querySelectorAll('.project-card');
        
        if (window.innerWidth < 768) {
          cards.forEach(card => {
            const imageSection = card.querySelector('.project-image');
            const infoSection = card.querySelector('.project-info');
            
            if (imageSection && infoSection) {
              // Ensure card content fits mobile screen
              card.style.display = 'flex';
              card.style.flexDirection = 'column';
              imageSection.style.width = '100%';
              imageSection.style.height = '200px';
              infoSection.style.padding = '1.5rem';
            }
          });
        }
      };
      
      adjustCards();
      window.addEventListener('resize', adjustCards);
      return () => window.removeEventListener('resize', adjustCards);
    };
    
    // Apply all mobile enhancements
    ensureViewportMeta();
    const cleanupVH = fixIOSHeight();
    fixOverflow();
    improveTouchInteraction();
    const cleanupCards = fixProjectCards();
    
    return () => {
      cleanupVH();
      cleanupCards();
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default ResponsiveWrapper;
