"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import GalleryController from '../../../controllers/gallery/controller';
import LuxuryBackground from '../../../components/LuxuryBackground';
import Cursor from '../../../components/Cursor'; // Import the Cursor component
import GalleryNavbar from '../../../components/GalleryNavbar'; // Import the navbar component

export default function AchievementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const controller = new GalleryController();
    const achievementData = controller.getAchievementDetails(params.id);
    
    if (achievementData) {
      setAchievement(achievementData);
    }
    
    setLoading(false);
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="luxury-loader"></div>
      </div>
    );
  }
  
  if (!achievement) {
    return (
      <div className="error-container">
        <h1>Achievement not found</h1>
        <button 
          className="elite-button primary"
          onClick={() => router.push('/gallery')}
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <main className="achievement-detail-page">
      {/* Add Cursor component for proper mouse pointer visibility */}
      <Cursor />
      
      <LuxuryBackground />
      
      {/* Add the Gallery Navbar */}
      <GalleryNavbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="back-button-container">
          <button 
            className="back-button"
            onClick={() => router.push('/gallery')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Gallery</span>
          </button>
        </div>
        
        <div className="achievement-detail-card">
          <div className="achievement-detail-header">
            <h1 className="achievement-detail-title">{achievement.title}</h1>
            <div className="achievement-meta">
              <div className="achievement-date">{achievement.date}</div>
              <div className="achievement-category">{achievement.category}</div>
            </div>
          </div>
          
          <div className="achievement-detail-content">
            <div className="achievement-detail-image">
              <Image 
                src={achievement.image || '/placeholder-achievement.jpg'} 
                alt={achievement.title}
                width={800}
                height={500}
                className="main-image"
              />
              
              {achievement.featured && (
                <div className="featured-badge large">
                  <span>Featured Achievement</span>
                </div>
              )}
            </div>
            
            <div className="achievement-detail-text">
              <div className="detail-section">
                <h2 className="section-heading">Description</h2>
                <p className="luxury-paragraph">{achievement.description}</p>
                
                {/* Placeholder for additional content that would be in a real system */}
                <p className="luxury-paragraph mt-4">
                  This achievement represents a significant milestone in my professional journey, 
                  demonstrating expertise in {achievement.category} and contributing to my growth as 
                  a technology professional.
                </p>
              </div>
              
              <div className="detail-section">
                <h2 className="section-heading">Impact</h2>
                <ul className="impact-list">
                  <li>Enhanced my reputation in the {achievement.category} domain</li>
                  <li>Contributed to professional growth and expertise development</li>
                  <li>Opened new opportunities for collaboration and innovation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
