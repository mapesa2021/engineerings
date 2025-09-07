import { useState, useEffect } from 'react';
import { getHeroSlides, getBlogPosts, getTeamMembers, getProjects, getTestimonials } from '../lib/adminData';

export default function TestAdmin() {
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        console.log('Testing admin data system...');
        
        const slides = getHeroSlides();
        console.log('Hero slides:', slides);
        setHeroSlides(slides);
        
        const posts = getBlogPosts();
        console.log('Blog posts:', posts);
        setBlogPosts(posts);
        
        const members = getTeamMembers();
        console.log('Team members:', members);
        setTeamMembers(members);
        
        const projs = getProjects();
        console.log('Projects:', projs);
        setProjects(projs);
        
        const tests = getTestimonials();
        console.log('Testimonials:', tests);
        setTestimonials(tests);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading admin data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Data Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Hero Slides */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Hero Slides ({heroSlides.length})</h2>
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="mb-3 p-3 bg-gray-50 rounded">
                <p className="font-medium">{slide.title}</p>
                <p className="text-sm text-gray-600">{slide.subtitle}</p>
                <p className="text-xs text-gray-500">Active: {slide.isActive ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>

          {/* Blog Posts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Blog Posts ({blogPosts.length})</h2>
            {blogPosts.map((post, index) => (
              <div key={post.id} className="mb-3 p-3 bg-gray-50 rounded">
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-600">{post.author}</p>
                <p className="text-xs text-gray-500">Published: {post.isPublished ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Team Members ({teamMembers.length})</h2>
            {teamMembers.map((member, index) => (
              <div key={member.id} className="mb-3 p-3 bg-gray-50 rounded">
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-600">{member.position}</p>
                <p className="text-xs text-gray-500">Active: {member.isActive ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Projects ({projects.length})</h2>
            {projects.map((project, index) => (
              <div key={project.id} className="mb-3 p-3 bg-gray-50 rounded">
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-gray-600">{project.category}</p>
                <p className="text-xs text-gray-500">Active: {project.isActive ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Testimonials ({testimonials.length})</h2>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="mb-3 p-3 bg-gray-50 rounded">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
                <p className="text-xs text-gray-500">Active: {testimonial.isActive ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h3>
          <p className="text-blue-700">
            1. Open browser console to see detailed logs<br/>
            2. Go to /admin and login with username: admin, password: oleum2025<br/>
            3. Try creating/editing content in the admin panel<br/>
            4. Refresh this page to see if changes appear<br/>
            5. Check the homepage to see if hero slider changes are visible
          </p>
        </div>
      </div>
    </div>
  );
}
