"use client"

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AchievementCard = ({ achievement }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div 
      className="achievement-card"
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetTilt();
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="achievement-image-container">
        <Image 
          src={achievement.image || '/placeholder-achievement.jpg'} 
          alt={achievement.title}
          width={400}
          height={300}
          className="achievement-image"
        />
        <div className="achievement-overlay"></div>
        
        {achievement.featured && (
          <div className="featured-badge">
            <span>Featured</span>
          </div>
        )}
        
        <div className="achievement-category">
          <span>{achievement.category}</span>
        </div>
      </div>
      
      <div className="achievement-content">
        <div className="achievement-date">{achievement.date}</div>
        <h3 className="achievement-title">{achievement.title}</h3>
        <p className="achievement-description">{achievement.description}</p>
        
        <Link href={`/gallery/${achievement.id}`} className="view-details-button">
          <span>View Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
      
      {/* Gold corner accents */}
      <div className="gold-corner top-left"></div>
      <div className="gold-corner top-right"></div>
      <div className="gold-corner bottom-left"></div>
      <div className="gold-corner bottom-right"></div>
    </div>
  );
};

export default AchievementCard;
