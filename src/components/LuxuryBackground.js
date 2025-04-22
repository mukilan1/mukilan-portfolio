"use client"

import { useEffect, useRef, useState } from 'react';

const LuxuryBackground = () => {
  const canvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Unable to get canvas context');
        return;
      }
      
      // Set canvas dimensions to match window
      const setCanvasSize = () => {
        try {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        } catch (e) {
          console.error('Error setting canvas size:', e);
        }
      };
      
      setCanvasSize();
      
      // Create a simplified version with fewer particles
      const particles = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 30000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
          alpha: Math.random() * 0.3 + 0.05
        });
      }
      
      // Simplified animation loop
      let animationFrameId;
      
      const animate = () => {
        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Update and draw each particle
          particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.fillStyle = `rgba(212, 175, 55, ${particle.alpha})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          });
          
          animationFrameId = requestAnimationFrame(animate);
        } catch (e) {
          console.error('Animation error:', e);
          cancelAnimationFrame(animationFrameId);
        }
      };
      
      // Start animation with a slight delay
      const timeoutId = setTimeout(() => {
        animate();
      }, 100);
      
      // Cleanup
      return () => {
        clearTimeout(timeoutId);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    } catch (e) {
      console.error('Error initializing background:', e);
    }
  }, []);
  
  if (!isClient) {
    return null;
  }
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#080808]"
      aria-hidden="true"
    />
  );
};

export default LuxuryBackground;
