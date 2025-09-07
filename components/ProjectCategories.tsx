'use client';
import { useState, useEffect } from 'react';
import { getProjects } from '../lib/adminData';
import type { Project } from '../lib/adminData';
import AnimatedCard from './AnimatedCard';
import Link from 'next/link';

interface ProjectCategoriesProps {
  title?: string;
  subtitle?: string;
}

export default function ProjectCategories({ 
  title = "Project Categories",
  subtitle = "Explore our diverse portfolio of engineering solutions across different sectors."
}: ProjectCategoriesProps) {
  const [categories, setCategories] = useState<{name: string, count: number, icon: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = () => {
      try {
        console.log('🔍 ProjectCategories - Loading project categories from admin data');
        const allProjects = getProjects().filter(project => project.isActive);
        console.log('🔍 ProjectCategories - All active projects:', allProjects);
        
        // Group projects by category and count them
        const categoryCounts: {[key: string]: number} = {};
        allProjects.forEach(project => {
          const category = project.category || 'Other';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        // Convert to array with icons
        const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
          name,
          count,
          icon: getCategoryIcon(name)
        }));
        
        console.log('🔍 ProjectCategories - Category data:', categoryData);
        setCategories(categoryData);
      } catch (error) {
        console.error('❌ ProjectCategories - Error loading categories:', error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
    
    // Refresh categories every 5 seconds to catch admin updates
    const interval = setInterval(loadCategories, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string): string => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('electrical') || categoryLower.includes('power')) return '⚡';
    if (categoryLower.includes('industrial') || categoryLower.includes('manufacturing')) return '🏭';
    if (categoryLower.includes('environmental') || categoryLower.includes('eco')) return '🌱';
    if (categoryLower.includes('infrastructure') || categoryLower.includes('construction')) return '🏗️';
    if (categoryLower.includes('water') || categoryLower.includes('treatment')) return '🌊';
    if (categoryLower.includes('automation') || categoryLower.includes('control')) return '🤖';
    if (categoryLower.includes('chemical') || categoryLower.includes('process')) return '🧪';
    if (categoryLower.includes('safety') || categoryLower.includes('security')) return '🛡️';
    if (categoryLower.includes('printing') || categoryLower.includes('print')) return '🖨️';
    if (categoryLower.includes('stationary') || categoryLower.includes('stationaries')) return '📝';
    if (categoryLower.includes('branding') || categoryLower.includes('brand')) return '🎨';
    return '📋';
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-oleum-navy">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 font-display">
              {title}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
              {subtitle}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-yellow"></div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="section-padding bg-oleum-navy">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 font-display">
              {title}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
              {subtitle}
            </p>
          </div>
          <div className="text-center text-white/80">
            <p>No project categories available. Please add projects through the admin panel.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-oleum-navy">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 font-display">
            {title}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <AnimatedCard 
              key={category.name}
              delay={index * 100}
              animationType="scaleUp"
              hoverEffect="lift"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-oleum-navy mb-3">{category.name}</h3>
                <p className="text-oleum-navy/70 mb-4">
                  {getCategoryDescription(category.name)}
                </p>
                <div className="text-oleum-yellow font-semibold mb-4">{category.count} Projects</div>
                <Link 
                  href={`/projects?category=${encodeURIComponent(category.name)}`}
                  className="inline-block bg-oleum-navy text-white px-4 py-2 rounded-lg hover:bg-oleum-navy-dark transition-colors duration-200 text-sm font-semibold"
                >
                  Learn More →
                </Link>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const getCategoryDescription = (category: string): string => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('electrical')) return 'Power distribution, automation, and electrical infrastructure solutions.';
  if (categoryLower.includes('industrial')) return 'Manufacturing automation, process optimization, and industrial solutions.';
  if (categoryLower.includes('environmental')) return 'Environmental consulting, waste management, and sustainability solutions.';
  if (categoryLower.includes('infrastructure')) return 'Construction materials, building systems, and infrastructure development.';
  if (categoryLower.includes('water')) return 'Water treatment, purification, and management systems.';
  if (categoryLower.includes('automation')) return 'Industrial automation, control systems, and smart solutions.';
  if (categoryLower.includes('chemical')) return 'Chemical processing, supply, and industrial chemistry solutions.';
  if (categoryLower.includes('safety')) return 'Safety systems, security solutions, and compliance management.';
  if (categoryLower.includes('printing')) return 'Professional printing services, digital printing, and print solutions.';
  if (categoryLower.includes('stationary') || categoryLower.includes('stationaries')) return 'Office supplies, stationery, and business materials.';
  if (categoryLower.includes('branding')) return 'Brand identity, logo design, and marketing materials.';
  return 'Engineering solutions and technical services.';
};
