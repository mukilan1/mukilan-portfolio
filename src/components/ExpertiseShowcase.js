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
    <div className="expertise-container">
      <div className="expertise-list">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`expertise-item ${selectedSkill === index ? 'active' : ''}`}
            onClick={() => toggleSkill(index)}
          >
            <div className="expertise-header">
              {skill.icon && (
                <div className="expertise-icon">
                  <Image src={skill.icon} alt={skill.name} width={32} height={32} />
                </div>
              )}
              <h3 className="expertise-title">{skill.name}</h3>
              <div className="expertise-level">
                <span className="level-value">{skill.level}</span>
                <span className="level-max">/100</span>
              </div>
            </div>
            
            <div 
              ref={el => detailsRefs.current[index] = el}
              className="expertise-details"
              style={{ 
                maxHeight: "0",
                opacity: "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease, opacity 0.3s ease"
              }}
            >
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim, diam non consequat hendrerit, risus lorem auctor nisi, vel luctus metus.</p>
              
              <div className="expertise-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: selectedSkill === index ? `${skill.level}%` : '0%', transition: 'width 1s ease-out' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseShowcase;
