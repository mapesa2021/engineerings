'use client';
import { useState, useEffect, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animationType?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleUp' | 'rotateIn' | 'bounceIn';
  threshold?: number;
  triggerOnce?: boolean;
}

const AnimatedSection = ({ 
  children, 
  delay = 0, 
  className = '', 
  animationType = 'fadeIn',
  threshold = 0.1,
  triggerOnce = true
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px' }
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
  }, [threshold, triggerOnce]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      switch (animationType) {
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-12`;
        case 'slideInLeft':
          return `${baseClasses} opacity-0 -translate-x-12`;
        case 'slideInRight':
          return `${baseClasses} opacity-0 translate-x-12`;
        case 'scaleUp':
          return `${baseClasses} opacity-0 scale-75`;
        case 'rotateIn':
          return `${baseClasses} opacity-0 rotate-12 scale-75`;
        case 'bounceIn':
          return `${baseClasses} opacity-0 scale-50`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 