"use client"

import { useEffect, useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import LuxuryHomeView from '../views/luxury/view';
import HomeController from '../controllers/home/controller';
import Cursor from '../components/Cursor';
import ErrorBoundary from '../components/ErrorBoundary';

// Dynamically import components that might cause issues
const LuxuryBackground = dynamic(() => import('../components/LuxuryBackground'), {
  ssr: false
});

const OpeningAnimation = dynamic(() => import('../components/OpeningAnimation'), {
  ssr: false
});

export default function Home() {
  const controller = new HomeController();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    try {
      // Set mounted state to handle hydration mismatch
      setMounted(true);
      
      // Remove default cursor if in browser
      if (typeof document !== 'undefined') {
        document.body.classList.add('custom-cursor');
      }
      
      return () => {
        if (typeof document !== 'undefined') {
          document.body.classList.remove('custom-cursor');
        }
      };
    } catch (e) {
      console.error("Error in page mount:", e);
    }
  }, []);
  
  // Handle hydration mismatch by not rendering until client-side
  if (!mounted) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#080808" }}></div>;
  }
  
  return (
    <main className="luxury-experience">
      <ErrorBoundary>
        <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#080808" }}></div>}>
          <OpeningAnimation />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<div className="fixed inset-0 bg-[#080808]"></div>}>
          <LuxuryBackground />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Cursor />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LuxuryHomeView 
          heroData={controller.getHeroData()}
          skillsData={controller.getSkillsData()}
          projectsData={controller.getProjectsData()}
        />
      </ErrorBoundary>
    </main>
  );
}
