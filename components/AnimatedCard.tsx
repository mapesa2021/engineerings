'use client';
import { useState, useEffect, useRef } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: 'lift' | 'scale' | 'rotate' | 'glow' | 'tilt';
  animationType?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleUp' | 'rotateIn' | 'bounceIn';
}

const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0,
  hoverEffect = 'lift',
  animationType = 'fadeIn'
}: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isVisible) {
      switch (animationType) {
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slideInLeft':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'slideInRight':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'scaleUp':
          return `${baseClasses} opacity-0 scale-90`;
        case 'rotateIn':
          return `${baseClasses} opacity-0 rotate-6 scale-90`;
        case 'bounceIn':
          return `${baseClasses} opacity-0 scale-75`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
  };

  const getHoverClasses = () => {
    const baseHover = 'transition-all duration-300 ease-out';
    
    switch (hoverEffect) {
      case 'lift':
        return `${baseHover} hover:-translate-y-2 hover:shadow-xl`;
      case 'scale':
        return `${baseHover} hover:scale-105 hover:shadow-lg`;
      case 'rotate':
        return `${baseHover} hover:rotate-2 hover:scale-105`;
      case 'glow':
        return `${baseHover} hover:shadow-2xl hover:shadow-oleum-yellow/20`;
      case 'tilt':
        return `${baseHover} hover:rotate-1 hover:scale-105 hover:shadow-xl`;
      default:
        return `${baseHover} hover:-translate-y-1 hover:shadow-lg`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${getHoverClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default AnimatedCard; 