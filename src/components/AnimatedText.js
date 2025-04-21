"use client"

import { useEffect, useRef } from 'react';

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const element = textRef.current;
    const letters = text.split('');
    
    element.innerHTML = '';
    
    letters.forEach((letter, i) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      span.style.transitionDelay = `${i * 0.05}s`;
      
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 100);
      
      element.appendChild(span);
    });
  }, [text]);
  
  return <span ref={textRef}>{text}</span>;
};

export default AnimatedText;
