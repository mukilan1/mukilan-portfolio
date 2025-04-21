"use client"

const initParticles = () => {
  const particlesContainer = document.querySelector('.particles-container');
  if (!particlesContainer) return;
  
  // Create luxury gold particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'luxury-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.width = `${Math.random() * 4 + 1}px`;
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
  }
};

const initRevealAnimations = () => {
  // Setup reveal animations for elements with data-reveal attribute
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => observer.observe(el));
};

const initMouseEffects = () => {
  const elements = document.querySelectorAll('.magnetic');
  
  elements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const moveX = (e.clientX - centerX) * 0.2;
      const moveY = (e.clientY - centerY) * 0.2;
      
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initRevealAnimations();
  initMouseEffects();
});

export { initParticles, initRevealAnimations, initMouseEffects };
