"use client"

import { useEffect, useRef } from 'react';

const ParallaxText = ({ children, baseVelocity = 5 }) => {
  const scrollerRef = useRef(null);
  
  useEffect(() => {
    const scrollerElement = scrollerRef.current;
    if (!scrollerElement) return;
    
    let animationId;
    let position = 0;
    const direction = baseVelocity > 0 ? -1 : 1;
    const speed = Math.abs(baseVelocity);
    
    const animate = () => {
      position += speed * direction * 0.1;
      
      // Reset position when text has scrolled completely
      if (Math.abs(position) >= 50) {
        position = 0;
      }
      
      scrollerElement.style.transform = `translateX(${position}%)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [baseVelocity]);
  
  return (
    <div className="parallax">
      <div ref={scrollerRef} className="scroller">
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </div>
    </div>
  );
};

export default ParallaxText;
