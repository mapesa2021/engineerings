import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getProjects, 
  addProject, 
  updateProject, 
  deleteProject,
  type Project 
} from '../../lib/adminData';

const ProjectsManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    client: '',
    location: '',
    completionDate: '',
    isActive: true,
    featured: false,
    technologies: '',
    results: ''
  });
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('oleumAdminToken');
    console.log('Projects Management - Token:', token);
    
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      
      const loadProjects = () => {
        try {
          const realProjects = getProjects();
          console.log('Projects Management - Loaded projects:', realProjects);
          setProjects(realProjects);
        } catch (error) {
          console.error('Projects Management - Error loading projects:', error);
          setProjects([]);
        }
      };
      
      loadProjects();
      
      // Refresh projects every 3 seconds to catch updates
      const interval = setInterval(loadProjects, 3000);
      
      // Set loading to false after authentication check
      setIsLoading(false);
      
      return () => clearInterval(interval);
    } else {
      // User is not authenticated
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      // Update existing project
      const updatedProject = updateProject(editingProject.id, {
        ...editingProject,
        ...formData,
        featured: formData.featured,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0),
        results: formData.results.split(',').map(result => result.trim()).filter(result => result.length > 0)
      });
      if (updatedProject) {
        setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
      }
      setEditingProject(null);
    } else {
      // Add new project
      const newProject = addProject({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        client: formData.client,
        location: formData.location,
        completionDate: formData.completionDate,
        isActive: formData.isActive,
        featured: formData.featured,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0),
        results: formData.results.split(',').map(result => result.trim()).filter(result => result.length > 0)
      });
      setProjects([...projects, newProject]);
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      client: '',
      location: '',
      completionDate: '',
      isActive: true,
      featured: false,
      technologies: '',
      results: ''
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      client: project.client,
      location: project.location,
      completionDate: project.completionDate,
      isActive: project.isActive,
      featured: project.featured,
      technologies: project.technologies.join(', '),
      results: project.results.join(', ')
    });
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const success = deleteProject(id);
      if (success) {
        setProjects(projects.filter(p => p.id !== id));
      }
    }
  };

  const handleToggleActive = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      const updatedProject = updateProject(id, { isActive: !project.isActive });
      if (updatedProject) {
        setProjects(projects.map(p => p.id === id ? updatedProject : p));
      }
    }
  };

  const handleToggleFeatured = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      const updatedProject = updateProject(id, { featured: !project.featured });
      if (updatedProject) {
        setProjects(projects.map(p => p.id === id ? updatedProject : p));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Projects Management...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Projects Management - Oleum Admin</title>
        <meta name="description" content="Manage portfolio projects" />
      </Head>

      <div className="min-h-screen bg-oleum-gray">
        {/* Header */}
        <header className="bg-oleum-navy shadow-lg border-b border-oleum-yellow/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/admin" className="mr-4">
                  <svg className="w-6 h-6 text-oleum-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                <div className="w-8 h-8 bg-oleum-yellow rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-oleum-black">O</span>
                </div>
                <div>
                  <h1 className="text-xl font-black text-white">Projects Management</h1>
                  <p className="text-oleum-yellow/80 text-sm">Manage portfolio projects</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add New Project
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-oleum-navy/10 rounded-full">
                  <svg className="w-6 h-6 text-oleum-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Projects</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{projects.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Active Projects</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{projects.filter(p => p.isActive).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Categories</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{new Set(projects.map(p => p.category)).size}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Clients</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{new Set(projects.map(p => p.client)).size}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setProjects(projects.filter(p => p.isActive))}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-oleum-navy text-white"
              >
                Active ({projects.filter(p => p.isActive).length})
              </button>
              <button
                onClick={() => setProjects(projects.filter(p => !p.isActive))}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-oleum-gray text-oleum-navy hover:bg-oleum-gray-dark"
              >
                Inactive ({projects.filter(p => !p.isActive).length})
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg border border-oleum-gray overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-oleum-gray rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-oleum-navy">{project.title}</h3>
                      <p className="text-sm text-oleum-gray-dark">{project.category}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        project.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-oleum-gray-dark">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {project.client}
                    </div>
                    <div className="flex items-center text-sm text-oleum-gray-dark">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-oleum-gray-dark">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {project.completionDate}
                    </div>
                  </div>
                  
                  <p className="text-sm text-oleum-gray-dark mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-oleum-yellow/20 text-oleum-yellow-dark px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(project.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          project.isActive
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {project.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(project.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          project.featured
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {project.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Form Modal */}
          {(showAddForm || editingProject) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-oleum-gray">
                  <h3 className="text-xl font-bold text-oleum-navy">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                </div>
                
                <form onSubmit={handleSaveProject} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Project Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter project title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Water Treatment">Water Treatment</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Printing">Printing</option>
                        <option value="Stationaries">Stationaries</option>
                        <option value="Branding">Branding</option>
                        <option value="Automation">Automation</option>
                        <option value="Safety">Safety</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Description *</label>
                    <textarea
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter project description"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Client</label>
                      <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter client name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter project location"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Completion Date</label>
                      <input
                        type="date"
                        name="completionDate"
                        value={formData.completionDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Image URL</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Technologies (comma separated)</label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="e.g., PLC, SCADA, HMI, Sensors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Results (comma separated)</label>
                    <input
                      type="text"
                      name="results"
                      value={formData.results}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="e.g., 30% efficiency increase, 50% cost reduction"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="rounded border-oleum-gray text-oleum-navy focus:ring-oleum-navy"
                      />
                      <span className="ml-2 text-sm text-oleum-navy">Active project</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="rounded border-oleum-gray text-oleum-navy focus:ring-oleum-navy"
                      />
                      <span className="ml-2 text-sm text-oleum-navy">Featured project</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-oleum-gray">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingProject(null);
                      }}
                      className="px-4 py-2 text-oleum-gray-dark hover:text-oleum-navy transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProjectsManagement;
