"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const ExpertiseShowcase = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const detailsRefs = useRef({});
  
  const toggleSkill = (index) => {
    setSelectedSkill(selectedSkill === index ? null : index);
  };
  
  useEffect(() => {
    // Update height for animation
    Object.entries(detailsRefs.current).forEach(([key, element]) => {
      const index = parseInt(key);
      
      if (element) {
        if (selectedSkill === index) {
          const height = element.scrollHeight;
          element.style.maxHeight = `${height}px`;
          element.style.opacity = "1";
        } else {
          element.style.maxHeight = "0";
          element.style.opacity = "0";
        }
      }
    });
  }, [selectedSkill]);
  
  return (
    <div className="expertise-showcase">
      <div className="expertise-grid">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`expertise-card ${selectedSkill === index ? 'active' : ''}`}
            onClick={() => toggleSkill(index)}
          >
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="expertise-header">
                {skill.icon && (
                  <div className="expertise-icon">
                    <Image src={skill.icon} alt={skill.name} width={28} height={28} />
                  </div>
                )}
                <h3 className="expertise-title">{skill.name}</h3>
                
                <div className="expertise-level-tag">
                  <span className="level-value">{skill.level}</span>
                </div>
              </div>
              
              <div className="expertise-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
              
              <div 
                ref={el => detailsRefs.current[index] = el}
                className="expertise-details"
                style={{ 
                  maxHeight: "0",
                  opacity: "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease"
                }}
              >
                <p className="expertise-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim, diam non consequat hendrerit.</p>
                
                <div className="skill-attributes">
                  <div className="attribute">
                    <span className="attribute-label">Experience</span>
                    <span className="attribute-value">5+ years</span>
                  </div>
                  <div className="attribute">
                    <span className="attribute-label">Projects</span>
                    <span className="attribute-value">12+</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <button className="expand-button">
                  <span>{selectedSkill === index ? 'Less Details' : 'More Details'}</span>
                  <svg 
                    className={`arrow-icon ${selectedSkill === index ? 'up' : 'down'}`} 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="card-decoration top-left"></div>
            <div className="card-decoration top-right"></div>
            <div className="card-decoration bottom-left"></div>
            <div className="card-decoration bottom-right"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseShowcase;
