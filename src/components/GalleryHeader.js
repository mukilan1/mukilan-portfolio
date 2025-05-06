"use client"

import { useEffect, useRef } from 'react';

const GalleryHeader = ({ title, subtitle }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Animate the title and subtitle
    const animateText = (element, delay) => {
      if (!element) return;
      
      const text = element.textContent;
      element.textContent = '';
      
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        span.style.transitionDelay = `${delay + (index * 0.03)}s`;
        
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 100);
        
        element.appendChild(span);
      });
    };
    
    animateText(titleRef.current, 0.2);
    animateText(subtitleRef.current, 0.6);
  }, []);

  return (
    <div className="gallery-header">
      <div className="gallery-header-content">
        <h1 ref={titleRef} className="gallery-title">{title}</h1>
        <div className="title-underline"></div>
        <p ref={subtitleRef} className="gallery-subtitle">{subtitle}</p>
      </div>
      
      <div className="header-decoration left"></div>
      <div className="header-decoration right"></div>
    </div>
  );
};

export default GalleryHeader;
