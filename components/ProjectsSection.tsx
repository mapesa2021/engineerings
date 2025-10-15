'use client';
import { useState, useEffect } from 'react';
import { getProjects } from '../lib/adminData';
import type { Project } from '../lib/adminData';
import AnimatedCard from './AnimatedCard';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  maxProjects?: number;
  showFeatured?: boolean;
  showCategories?: boolean;
  category?: string;
}

export default function ProjectsSection({ 
  title = "Featured Projects",
  subtitle = "Discover how we're delivering innovative engineering solutions across Tanzania.",
  maxProjects = 6,
  showFeatured = true,
  showCategories = true,
  category = ''
}: ProjectsSectionProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    // Get category from URL parameters if available
    const urlCategory = router.query.category as string;
    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [router.query.category, selectedCategory]);

  useEffect(() => {
    const loadProjects = () => {
      try {
        console.log('🔍 ProjectsSection - Loading projects from admin data');
        const allProjects = getProjects();
        console.log('🔍 ProjectsSection - All projects:', allProjects);
        
        let filteredProjects = allProjects.filter(project => project.isActive);
        
        // Filter by category if specified
        if (selectedCategory && selectedCategory !== 'all') {
          filteredProjects = filteredProjects.filter(project => 
            project.category.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
        
        // Show featured projects first if requested
        if (showFeatured) {
          // Sort featured projects first, then limit to maxProjects
          filteredProjects = filteredProjects
            .sort((a, b) => {
              // Featured projects come first
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            })
            .slice(0, maxProjects);
        }
        
        console.log('🔍 ProjectsSection - Filtered projects to display:', filteredProjects);
        setProjects(filteredProjects);
      } catch (error) {
        console.error('❌ ProjectsSection - Error loading projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
    
    // Refresh projects every 5 seconds to catch admin updates
    const interval = setInterval(loadProjects, 5000);
    
    return () => clearInterval(interval);
  }, [maxProjects, showFeatured, selectedCategory]);

  // Get unique categories for filtering
  const getCategories = () => {
    const allProjects = getProjects().filter(project => project.isActive);
    const categoryMap = new Map<string, boolean>();
    allProjects.forEach(project => categoryMap.set(project.category, true));
    return Array.from(categoryMap.keys());
  };

  const categories = getCategories();

  const handleLearnMore = (project: Project) => {
    // Toggle expanded state for this project
    if (expandedProject === project.id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(project.id);
    }
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-oleum-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-oleum-navy mb-6 font-display">
              {title}
            </h2>
            <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
              {subtitle}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy"></div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="section-padding bg-oleum-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-oleum-navy mb-6 font-display">
              {title}
            </h2>
            <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
              {subtitle}
            </p>
          </div>
          <div className="text-center text-oleum-navy/60">
            <p>No projects available. Please add projects through the admin panel.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-oleum-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-oleum-navy mb-6 font-display">
            {title}
          </h2>
          <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        {showCategories && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => {
                setSelectedCategory('all');
                router.push('/projects', undefined, { shallow: true });
              }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === 'all' || selectedCategory === ''
                  ? 'bg-oleum-navy text-white'
                  : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-navy hover:text-white'
              }`}
            >
              All Projects
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  router.push(`/projects?category=${encodeURIComponent(cat)}`, undefined, { shallow: true });
                }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-oleum-navy text-white'
                    : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-navy hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <AnimatedCard 
              key={project.id}
              delay={index * 100}
              animationType="scaleUp"
              hoverEffect="lift"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h3 className="text-2xl md:text-3xl font-bold text-oleum-navy mb-4">
                    {project.title}
                  </h3>
                  <p className="text-lg text-oleum-navy/80 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Project Stats */}
                  {project.results && project.results.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {project.results.slice(0, 2).map((result, resultIndex) => (
                        <div key={resultIndex} className="bg-oleum-gray rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-oleum-navy">
                            {result.split(':')[0]}
                          </div>
                          <div className="text-sm text-oleum-navy/60">
                            {result.split(':')[1] || result}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Project Details */}
                  <div className="space-y-2 mb-6 text-sm text-oleum-navy/70">
                    {project.client && (
                      <div><strong>Client:</strong> {project.client}</div>
                    )}
                    {project.location && (
                      <div><strong>Location:</strong> {project.location}</div>
                    )}
                    {project.completionDate && (
                      <div><strong>Completed:</strong> {project.completionDate}</div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleLearnMore(project)}
                    className="btn-primary hover:bg-oleum-navy-dark transition-colors duration-200"
                  >
                    {expandedProject === project.id ? 'Show Less' : 'Learn More'}
                  </button>
                </div>
                
                <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {project.image ? (
                    <div className="relative h-full min-h-[300px]">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback gradient background */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-oleum-yellow to-oleum-navy rounded-2xl flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">
                            {project.category === 'Electrical' ? '⚡' :
                             project.category === 'Industrial' ? '🏭' :
                             project.category === 'Environmental' ? '🌱' :
                             project.category === 'Infrastructure' ? '🏗️' :
                             project.category === 'Water Treatment' ? '🌊' :
                             project.category === 'Chemical' ? '🧪' :
                             project.category === 'Printing' ? '🖨️' :
                             project.category === 'Stationaries' ? '📝' :
                             project.category === 'Branding' ? '🎨' :
                             '📋'}
                          </div>
                          <h4 className="text-xl font-semibold mb-2">{project.category}</h4>
                          <p className="text-white/80">{project.client || 'Engineering Solution'}</p>
                        </div>
                      </div>
                      
                      {/* Overlay with project info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                        <h4 className="text-xl font-semibold text-white mb-2">{project.category}</h4>
                        <p className="text-white/90 text-sm">{project.client || 'Engineering Solution'}</p>
                        
                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <span 
                                  key={techIndex}
                                  className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-white/60 text-xs">+{project.technologies.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Fallback when no image is provided */
                    <div className="bg-gradient-to-br from-oleum-yellow to-oleum-navy rounded-2xl p-12 text-center text-white h-full min-h-[300px] flex items-center justify-center">
                      <div>
                        <div className="text-6xl mb-4">
                          {project.category === 'Electrical' ? '⚡' :
                           project.category === 'Industrial' ? '🏭' :
                           project.category === 'Environmental' ? '🌱' :
                           project.category === 'Infrastructure' ? '🏗️' :
                           project.category === 'Water Treatment' ? '🌊' :
                           project.category === 'Chemical' ? '🧪' :
                           project.category === 'Printing' ? '🖨️' :
                           project.category === 'Stationaries' ? '📝' :
                           project.category === 'Branding' ? '🎨' :
                           '📋'}
                        </div>
                        <h4 className="text-xl font-semibold mb-2">{project.category}</h4>
                        <p className="text-white/80">{project.client || 'Engineering Solution'}</p>
                        
                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="mt-4">
                            <p className="text-white/60 text-sm mb-2">Technologies:</p>
                            <div className="flex flex-wrap justify-center gap-2">
                              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <span 
                                  key={techIndex}
                                  className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-white/60 text-xs">+{project.technologies.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Expanded Project Details */}
              {expandedProject === project.id && (
                <div className="mt-8 p-6 bg-oleum-gray/20 rounded-lg border border-oleum-gray/30">
                  <h4 className="text-xl font-bold text-oleum-navy mb-4">Project Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-oleum-navy mb-2">Project Information</h5>
                      <div className="space-y-2 text-sm">
                        {project.budget && (
                          <div><strong>Budget:</strong> {project.budget}</div>
                        )}
                        {project.duration && (
                          <div><strong>Duration:</strong> {project.duration}</div>
                        )}
                        {project.teamSize && (
                          <div><strong>Team Size:</strong> {project.teamSize} members</div>
                        )}
                        {project.completionDate && (
                          <div><strong>Completion Date:</strong> {project.completionDate}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-oleum-navy mb-2">Technologies Used</h5>
                      {project.technologies && project.technologies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="bg-oleum-navy text-white text-xs px-3 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-oleum-navy/60">No specific technologies listed</p>
                      )}
                    </div>
                  </div>
                  
                  {project.results && project.results.length > 0 && (
                    <div className="mt-6">
                      <h5 className="font-semibold text-oleum-navy mb-3">Project Results</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="bg-white rounded-lg p-4 text-center border border-oleum-gray/20">
                            <div className="text-lg font-bold text-oleum-navy">
                              {result.split(':')[0]}
                            </div>
                            <div className="text-sm text-oleum-navy/60">
                              {result.split(':')[1] || result}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
