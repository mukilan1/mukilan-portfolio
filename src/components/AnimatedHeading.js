"use client"

import { useEffect, useRef } from 'react';

const AnimatedHeading = ({ text, className = "" }) => {
  const headingRef = useRef(null);
  
  useEffect(() => {
    const element = headingRef.current;
    if (!element) return;
    
    // Clear any existing content
    element.innerHTML = '';
    
    // Create and animate each letter
    Array.from(text).forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === " " ? "\u00A0" : letter;
      span.className = letter === " " ? "space" : "";
      span.style.opacity = "0";
      span.style.transform = "translateY(20px) rotate(5deg)";
      span.style.display = "inline-block";
      span.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      span.style.transitionDelay = `${index * 0.04}s`;
      
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0) rotate(0)";
      }, 100);
      
      element.appendChild(span);
    });
  }, [text]);
  
  return (
    <h1 
      ref={headingRef}
      className={`animated-heading ${className}`}
      aria-label={text}
    >
      {text}
    </h1>
  );
};

export default AnimatedHeading;
