"use client"

import { useState, useEffect } from 'react';
import GalleryHeader from '../../components/GalleryHeader';
import CategoryFilter from '../../components/CategoryFilter';
import AchievementCard from '../../components/AchievementCard';

const GalleryView = ({ galleryData, controller }) => {
  const { pageMetadata, categories, achievements } = galleryData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredAchievements, setFilteredAchievements] = useState(achievements);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setActiveCategory(category);
    
    // Add a small delay to make the filtering feel more substantial
    setTimeout(() => {
      setFilteredAchievements(controller.filterAchievements(category));
      setIsLoading(false);
    }, 300);
  };
  
  // Animation for cards when they appear
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.achievement-card').forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [filteredAchievements]);

  return (
    <div className="gallery-view">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <div className="noise-overlay"></div>
          <div className="corner-mark top-left"></div>
          <div className="corner-mark top-right"></div>
          <div className="corner-mark bottom-left"></div>
          <div className="corner-mark bottom-right"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <GalleryHeader 
            title={pageMetadata.title} 
            subtitle={pageMetadata.subtitle} 
          />
        </div>
      </section>
      
      {/* Gallery Filter and Grid */}
      <section className="gallery-main">
        <div className="container mx-auto px-4">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          <div className={`gallery-grid ${isLoading ? 'loading' : ''}`}>
            {filteredAchievements.map((achievement, index) => (
              <div 
                className="achievement-item" 
                key={achievement.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AchievementCard achievement={achievement} />
              </div>
            ))}
            
            {filteredAchievements.length === 0 && (
              <div className="no-results">
                <p>No achievements found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryView;
