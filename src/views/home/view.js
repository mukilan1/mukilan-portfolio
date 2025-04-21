"use client"

import Image from 'next/image';
import { useEffect } from 'react';
import AnimatedText from '../../components/AnimatedText';
import SkillBar from '../../components/SkillBar';
import ProjectCard from '../../components/ProjectCard';

const HomeView = ({ heroData, skillsData, projectsData }) => {
  useEffect(() => {
    // Animation initialization
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h4 className="text-blue-400 mb-2 tracking-wider">{heroData.entrepreneur}</h4>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <AnimatedText text={`Hi, I'm ${heroData.name}`} />
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">{heroData.title}</h2>
            <p className="text-gray-400 mb-8">{heroData.subTitle}</p>
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
                View Projects
              </button>
              <button className="border border-white/30 text-white font-bold py-3 px-6 rounded-full hover:bg-white/10 transition duration-300">
                Contact Me
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-lg shadow-purple-500/20 animate-float">
              <Image 
                src={heroData.image}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -top-5 -left-5 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll">My Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((skill, index) => (
              <div key={index} className="animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                <SkillBar skill={skill} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div key={index} className="animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600/30 to-purple-600/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-on-scroll">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-on-scroll">
            Looking for an experienced developer with a passion for innovation? I'm ready to bring your ideas to life.
          </p>
          <button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300 animate-on-scroll">
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
