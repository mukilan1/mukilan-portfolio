"use client"

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const SkillBar = ({ skill }) => {
  const barRef = useRef(null);
  
  useEffect(() => {
    const element = barRef.current;
    
    if (element) {
      setTimeout(() => {
        element.style.width = `${skill.level}%`;
      }, 300);
    }
  }, [skill.level]);
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {skill.icon && (
          <div className="mr-3 bg-gray-800 p-2 rounded-md">
            <Image src={skill.icon} alt={skill.name} width={24} height={24} />
          </div>
        )}
        <span className="text-lg font-medium">{skill.name}</span>
        <span className="ml-auto">{skill.level}%</span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div 
          ref={barRef}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
