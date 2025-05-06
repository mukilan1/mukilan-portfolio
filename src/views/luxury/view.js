"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ParallaxText from '../../components/ParallaxText';
import ProjectGallery from '../../components/ProjectGallery';
import ExpertiseShowcase from '../../components/ExpertiseShowcase';
import AnimatedHeading from '../../components/AnimatedHeading';

const LuxuryHomeView = ({ heroData, skillsData, projectsData }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionsRef = useRef({});
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (section && 
            scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(key);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation for elements that fade in when they appear
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('[data-animate]');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('animate-visible');
        }
      });
    };
    
    animateOnScroll(); // Run once on mount
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
  
  // Animate elements when they become visible
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.fade-in-up, .fade-in, .scroll-animate');
    
    // Enhanced observer that also handles parallax effects
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          
          // Handle parallax effect elements
          if (entry.target.classList.contains('parallax-parent')) {
            const parallaxItems = entry.target.querySelectorAll('.parallax-scroll-up');
            parallaxItems.forEach(item => {
              item.style.transform = 'translateY(0)';
            });
          }
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before element is fully in view
    });
    
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Handle parallax parents separately
    const parallaxParents = document.querySelectorAll('.parallax-parent');
    parallaxParents.forEach(el => observer.observe(el));
    
    return () => {
      elementsToAnimate.forEach(el => observer.unobserve(el));
      parallaxParents.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  // Also add a new effect to handle scroll position for parallax elements 
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-scroll-up');
      
      parallaxElements.forEach(element => {
        if (!element.classList.contains('animate-visible')) {
          const parentBounds = element.closest('.parallax-parent')?.getBoundingClientRect();
          if (parentBounds && parentBounds.top < window.innerHeight) {
            const speed = element.classList.contains('parallax-slow') ? 0.05 :
                          element.classList.contains('parallax-medium') ? 0.08 : 0.1;
            const yPos = (window.innerHeight - parentBounds.top) * speed;
            element.style.transform = `translateY(${Math.min(0, -yPos)}px)`;
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const addSectionRef = (key) => (el) => {
    if (el) sectionsRef.current[key] = el;
  };
  
  return (
    <div className="luxury-portfolio">
      {/* Elite Hero Section - New Design */}
      <section 
        id="hero"
        ref={addSectionRef('hero')}
        className="h-screen relative flex items-center justify-center overflow-hidden elite-hero"
        data-scroll-section
      >
        {/* Minimalist Background */}
        <div className="absolute inset-0 bg-[#080808]">
          {/* Subtle grain texture */}
          <div className="noise-overlay"></div>
          
          {/* Refined gold accent line */}
          <div className="accent-line"></div>
          
          {/* Elegant corner mark */}
          <div className="corner-mark top-left"></div>
          <div className="corner-mark top-right"></div>
          <div className="corner-mark bottom-left"></div>
          <div className="corner-mark bottom-right"></div>
        </div>
        
        {/* Main Content */}
        <div className="container relative z-10 mx-auto px-4 h-full">
          <div className="hero-layout">
            {/* Left content area */}
            <div className="hero-content-left">
              <div className="vertical-text">
                <span>Est. <span className="highlight-accent">2023</span></span>
              </div>
              
              <div className="personal-brand">
                <span className="brand-mark">M</span>
              </div>
            </div>
            
            {/* Center content area */}
            <div className="hero-content-center">
              {/* Add Navigation Menu for Hero Section */}
              <div className="hero-navigation">
                <nav className="flex justify-center mb-8">
                  <ul className="flex items-center space-x-8">
                    <li><a href="/" className="nav-link active">Home</a></li>
                    <li><a href="/gallery" className="nav-link">Gallery</a></li>
                    <li><a href="#projects" className="nav-link">Projects</a></li>
                    <li><a href="#contact" className="nav-link">Contact</a></li>
                  </ul>
                </nav>
              </div>
              
              <div className="fade-in-sequence">
                <span className="profession-tag">{heroData.entrepreneur}</span>
                
                <h1 className="elite-name">{heroData.name}</h1>
                
                <div className="title-line"></div>
                
                <p className="elite-title">{heroData.title}</p>
                
                <div className="hero-actions">
                  <button className="elite-button primary">
                    <span className="btn-text">View Resume</span>
                    <span className="btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  
                  <button 
                    className="elite-button secondary"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="btn-text">Contact</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right content area */}
            <div className="hero-content-right">
              <div className="image-frame">
                <div className="image-container">
                  <Image 
                    src={heroData.image}
                    alt={heroData.name}
                    layout="fill"
                    objectFit="cover"
                    className="hero-image"
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="frame-decoration top"></div>
                <div className="frame-decoration right"></div>
                <div className="frame-decoration bottom"></div>
                <div className="frame-decoration left"></div>
              </div>
              
              <div className="expertise-tags">
                <div className="tag">App Developer</div>
                <div className="tag">Automation</div>
                <div className="tag">Robotics</div>
                <div className="tag">Backend Developer as Django</div>
                <div className="tag">Prompt Engineering</div>
                <div className="tag">Leadership Quality</div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="elegant-scroll-indicator">
            <div className="scroll-indicator-line"></div>
            <span>Scroll</span>
          </div>
        </div>
      </section>
      
      {/* Introduction Section with Parallax */}
      <section 
        id="intro"
        ref={addSectionRef('intro')}
        className="py-32 relative"
        data-scroll-section
      >
        <div className="container mx-auto px-8">
          <div className="parallax-container">
            <ParallaxText baseVelocity={-3}>Innovation • Excellence • Vision</ParallaxText>
            <ParallaxText baseVelocity={3}>Leadership • Creativity • Precision</ParallaxText>
          </div>
          
          <div className="max-w-3xl mx-auto mt-20 mb-24 luxury-card">
            <div className="quote-mark left">"</div>
            <p className="luxury-quote">
              Pioneering the future through innovative technology solutions, delivering excellence that transcends expectations, and transforming visions into reality.
            </p>
            <div className="quote-mark right">"</div>
          </div>
          
          <div className="gold-separator"></div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div 
              className="luxury-content fade-in-up" 
              data-animate
              style={{ 
                opacity: 0, 
                transform: 'translateY(30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
              }}
              data-scroll 
              data-scroll-speed="1"
            >
              <h3 className="section-subtitle">My Vision</h3>
              <p className="luxury-paragraph">
                Creating technological solutions that elegantly solve complex problems. My work combines innovation with practical application, focusing on delivering exceptional experiences that drive growth and transformation.
              </p>
            </div>
            
            <div 
              className="luxury-content fade-in-up" 
              data-animate
              style={{ 
                opacity: 0, 
                transform: 'translateY(30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                transitionDelay: '0.2s'
              }}
              data-scroll 
              data-scroll-speed="2"
            >
              <h3 className="section-subtitle">My Approach</h3>
              <p className="luxury-paragraph">
                I apply precision engineering, creative thinking, and strategic vision to every project. By balancing technical excellence with business acumen, I develop solutions that are both cutting-edge and sustainable.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expertise Showcase */}
      <section 
        id="expertise"
        ref={addSectionRef('expertise')}
        className="py-32 expertise-section"
        data-scroll-section
      >
        <div className="container mx-auto px-8">
          <div
            className="text-center mb-24 fade-in-up"
            data-animate
            style={{ 
              opacity: 0, 
              transform: 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
          >
            <span className="section-tag">Areas of Excellence</span>
            <h2 className="section-title">Expertise & Capabilities</h2>
          </div>
          
          <ExpertiseShowcase skills={skillsData} />
        </div>
      </section>
      
      {/* Projects Gallery - Horizontal Scroll */}
      <section 
        id="projects"
        ref={addSectionRef('projects')}
        className="py-32 bg-luxury-dark"
        data-scroll-section
      >
        <div className="container mx-auto px-8 mb-16">
          <div
            className="text-center mb-24 fade-in-up"
            data-animate
            style={{ 
              opacity: 0, 
              transform: 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
          >
            <span className="section-tag">Portfolio Highlights</span>
            <h2 className="section-title">Signature Projects</h2>
          </div>
        </div>
        
        <ProjectGallery projects={projectsData} />
      </section>
      
      {/* Contact Section */}
      <section 
        id="contact"
        ref={addSectionRef('contact')}
        className="py-32 contact-section parallax-parent"
        data-scroll-section
      >
        <div className="container mx-auto px-8">
          <div className="luxury-contact-card">
            <div
              className="text-center mb-16 fade-in-up"
              data-animate
              style={{ 
                opacity: 0, 
                transform: 'translateY(30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
              }}
            >
              <span className="section-tag">Let's Connect</span>
              <h2 className="section-title">Start a Conversation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center stagger-children">
              <div className="contact-info scroll-animate parallax-scroll-up parallax-medium">
                <div className="contact-method">
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>contact@mukilanportfolio.com</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>San Francisco, California</p>
                  </div>
                </div>
                
                <div className="social-links">
                  <a href="#" className="social-icon" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon" aria-label="Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1942 12.773 4.95372C12.2575 5.71324 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon" aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.49995C19.9988 8.30492 19.5325 7.15726 18.7 6.29995C19.0905 5.26248 19.0545 4.11349 18.6 3.09995C18.6 3.09995 17.5 2.79995 15.1 4.39995C13.0672 3.87054 10.9328 3.87054 8.9 4.39995C6.5 2.79995 5.4 3.09995 5.4 3.09995C4.94548 4.11349 4.90953 5.26248 5.3 6.29995C4.46745 7.15726 4.00122 8.30492 4 9.49995C4 14.1 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <form className="contact-form scroll-animate parallax-scroll-up parallax-slow">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="luxury-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" className="luxury-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="5" className="luxury-input"></textarea>
                </div>
                <button type="submit" className="luxury-button primary w-full">
                  <span className="button-text">Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="luxury-footer parallax-parent" data-scroll-section>
        <div className="container mx-auto px-8">
          <div className="footer-content scroll-animate parallax-scroll-up parallax-fast">
            <div className="logo-section">
              <div className="footer-logo">M</div>
              <p>© {new Date().getFullYear()} Mukilan. All rights reserved.</p>
            </div>
            
            <div className="footer-nav">
              <a href="/" className="footer-link">Home</a>
              <a href="/gallery" className="footer-link">Gallery</a>
              <a href="#expertise" className="footer-link">Expertise</a>
              <a href="#projects" className="footer-link">Portfolio</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Navigation Indicators */}
      <nav className="side-nav">
        <ul>
          {['hero', 'intro', 'expertise', 'projects', 'contact'].map((section) => (
            <li key={section} className={activeSection === section ? 'active' : ''}>
              <a href={`#${section}`} 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="nav-dot"></span>
                <span className="nav-label">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default LuxuryHomeView;
