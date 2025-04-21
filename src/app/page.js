"use client"

import { useEffect, useState } from "react";
import LuxuryHomeView from '../views/luxury/view';
import HomeController from '../controllers/home/controller';
import Cursor from '../components/Cursor';
import LuxuryBackground from '../components/LuxuryBackground';

export default function Home() {
  const controller = new HomeController();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Set mounted state to handle hydration mismatch
    setMounted(true);
    
    // Remove default cursor
    document.body.classList.add('custom-cursor');
    
    // Preload animations
    const preloadAnimations = async () => {
      await import('../utils/animations');
    };
    preloadAnimations();
    
    // Initialize smooth scrolling
    const initSmoothScroll = () => {
      const links = document.querySelectorAll('a[href^="#"]');
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    };
    
    initSmoothScroll();
    
    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, []);
  
  // Handle hydration mismatch by not rendering until client-side
  if (!mounted) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#080808" }}></div>;
  }
  
  return (
    <main className="luxury-experience">
      <LuxuryBackground />
      <Cursor />
      <LuxuryHomeView 
        heroData={controller.getHeroData()}
        skillsData={controller.getSkillsData()}
        projectsData={controller.getProjectsData()}
      />
    </main>
  );
}
