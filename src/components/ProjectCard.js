"use client"

import Image from 'next/image';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-700 text-blue-300 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <button className="mt-4 text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors">
          View Details
          <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
