"use client"

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const ProjectGallery = ({ projects }) => {
  const [activeProject, setActiveProject] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const carouselRef = useRef(null);
  const innerRef = useRef(null);
  
  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(-${activeProject * 100}%)`;
    }
  }, [activeProject]);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentTranslate(-activeProject * 100);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = (currentX - startX) / carouselRef.current.offsetWidth * 100;
    const newTranslate = currentTranslate + diff;
    
    innerRef.current.style.transform = `translateX(${newTranslate}%)`;
  };
  
  const handleMouseUp = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const currentX = e.clientX;
    const diff = currentX - startX;
    const threshold = carouselRef.current.offsetWidth * 0.2;
    
    if (diff > threshold && activeProject > 0) {
      setActiveProject(activeProject - 1);
    } else if (diff < -threshold && activeProject < projects.length - 1) {
      setActiveProject(activeProject + 1);
    } else {
      // Return to current slide
      innerRef.current.style.transform = `translateX(-${activeProject * 100}%)`;
    }
  };
  
  return (
    <div className="project-gallery">
      <div className="project-selector">
        {projects.map((project, index) => (
          <div 
            key={index}
            className={`project-selector-item ${activeProject === index ? 'active' : ''}`}
            onClick={() => setActiveProject(index)}
          >
            <span className="project-number">{(index + 1).toString().padStart(2, '0')}</span>
            <span className="project-title">{project.title}</span>
          </div>
        ))}
      </div>
      
      <div
        ref={carouselRef}
        className="projects-carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          ref={innerRef}
          className="projects-inner"
          style={{ 
            transform: `translateX(-${activeProject * 100}%)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease'
          }}
        >
          {projects.map((project, index) => (
            <div key={index} className="project-card-container">
              <div className="project-card">
                <div className="project-image">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  
                  <button className="view-project-btn">
                    View Project Details
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-controls">
        <button 
          className={`carousel-arrow prev ${activeProject === 0 ? 'disabled' : ''}`}
          onClick={() => activeProject > 0 && setActiveProject(activeProject - 1)}
          disabled={activeProject === 0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="carousel-pagination">
          {projects.map((_, index) => (
            <button 
              key={index}
              className={`pagination-dot ${activeProject === index ? 'active' : ''}`}
              onClick={() => setActiveProject(index)}
            />
          ))}
        </div>
        
        <button 
          className={`carousel-arrow next ${activeProject === projects.length - 1 ? 'disabled' : ''}`}
          onClick={() => activeProject < projects.length - 1 && setActiveProject(activeProject + 1)}
          disabled={activeProject === projects.length - 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectGallery;
