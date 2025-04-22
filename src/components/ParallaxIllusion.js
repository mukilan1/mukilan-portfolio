"use client"

import { useEffect } from 'react';

const ParallaxIllusion = () => {
  useEffect(() => {
    // Elements we'll track for parallax
    const sections = document.querySelectorAll('section');
    const imgElements = document.querySelectorAll('.project-image, .image-container');
    const textElements = document.querySelectorAll('h1, h2, h3, p, .luxury-paragraph, .luxury-quote');
    const cardElements = document.querySelectorAll('.luxury-card, .project-card, .expertise-item, .luxury-contact-card');
    
    // Function to create the illusion on scroll
    const createScrollIllusion = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Create parallax effect for sections
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        // Only animate if in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const distanceFromTop = rect.top;
          const scrollFactor = 0.05; // subtle movement
          
          // Subtle scaling and opacity change
          const scale = 1 - (distanceFromTop * 0.0001);
          section.style.transform = `scale(${Math.min(1, Math.max(0.98, scale))})`;
          section.style.opacity = Math.min(1, Math.max(0.9, 1 - (Math.abs(distanceFromTop) * 0.0005)));
        }
      });
      
      // Move images at a different speed for depth
      imgElements.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const distanceFromViewportCenter = rect.top - windowHeight / 2;
          img.style.transform = `translateY(${distanceFromViewportCenter * -0.05}px)`;
        }
      });
      
      // Subtle movement for text
      textElements.forEach(text => {
        const rect = text.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const distanceFromViewportCenter = rect.top - windowHeight / 2;
          text.style.transform = `translateY(${distanceFromViewportCenter * -0.02}px)`;
        }
      });
      
      // Card elements rise up slightly
      cardElements.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const distanceFromBottom = windowHeight - rect.top;
          const riseAmount = Math.min(20, distanceFromBottom * 0.03);
          card.style.transform = `translateY(-${riseAmount}px)`;
        }
      });
    };
    
    // Initial setup
    createScrollIllusion();
    
    // Listen for scroll events
    window.addEventListener('scroll', createScrollIllusion);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', createScrollIllusion);
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default ParallaxIllusion;
