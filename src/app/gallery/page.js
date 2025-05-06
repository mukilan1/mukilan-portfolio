"use client"

import { useEffect } from 'react';
import GalleryController from '../../controllers/gallery/controller';
import GalleryView from '../../views/gallery/view';
import LuxuryBackground from '../../components/LuxuryBackground';
import Cursor from '../../components/Cursor'; // Import the Cursor component
import GalleryNavbar from '../../components/GalleryNavbar'; // Import the navbar component

export default function GalleryPage() {
  const controller = new GalleryController();
  const galleryData = controller.getGalleryData();
  
  useEffect(() => {
    // Add custom scrolling behavior
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const scrollPos = window.scrollY;
        const speed = element.getAttribute('data-speed') || 0.2;
        element.style.transform = `translateY(${scrollPos * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="gallery-page">
      {/* Add Cursor component for proper mouse pointer visibility */}
      <Cursor />
      
      {/* Background elements */}
      <LuxuryBackground />
      
      {/* Add the Gallery Navbar */}
      <GalleryNavbar />
      
      {/* Main content */}
      <GalleryView 
        galleryData={galleryData}
        controller={controller}
      />
    </main>
  );
}
