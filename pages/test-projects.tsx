'use client';
import { useState, useEffect } from 'react';
import { 
  getProjects, 
  addProject, 
  updateProject, 
  deleteProject,
  type Project 
} from '../lib/adminData';

export default function TestProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: '',
    client: '',
    location: '',
    completionDate: '',
    results: [''],
    technologies: [''],
    image: '',
    isActive: true,
    featured: false,
    budget: '',
    duration: '',
    teamSize: 0
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = getProjects();
    console.log('🔍 Test Projects - All projects:', allProjects);
    setProjects(allProjects);
  };

  const handleAddProject = () => {
    console.log('📝 Test Projects - Adding project:', newProject);
    const project = addProject(newProject);
    console.log('📝 Test Projects - Project added:', project);
    loadProjects();
    
    // Reset form
    setNewProject({
      title: '',
      description: '',
      category: '',
      client: '',
      location: '',
      completionDate: '',
      results: [''],
      technologies: [''],
      image: '',
      isActive: true,
      featured: false,
      budget: '',
      duration: '',
      teamSize: 0
    });
  };

  const handleDeleteProject = (id: string) => {
    console.log('🗑️ Test Projects - Deleting project:', id);
    const success = deleteProject(id);
    console.log('🗑️ Test Projects - Delete result:', success);
    loadProjects();
  };

  const handleToggleFeatured = (project: Project) => {
    console.log('⭐ Test Projects - Toggling featured for project:', project.id);
    const updated = updateProject(project.id, { featured: !project.featured });
    console.log('⭐ Test Projects - Update result:', updated);
    loadProjects();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Projects System Test</h1>
        
        {/* Add New Project Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProject.category}
              onChange={(e) => setNewProject({...newProject, category: e.target.value})}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Client"
              value={newProject.client}
              onChange={(e) => setNewProject({...newProject, client: e.target.value})}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={newProject.location}
              onChange={(e) => setNewProject({...newProject, location: e.target.value})}
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="border p-2 rounded md:col-span-2"
              rows={3}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProject.image}
              onChange={(e) => setNewProject({...newProject, image: e.target.value})}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Budget"
              value={newProject.budget}
              onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
              className="border p-2 rounded"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newProject.isActive}
                  onChange={(e) => setNewProject({...newProject, isActive: e.target.checked})}
                  className="mr-2"
                />
                Active
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newProject.featured}
                  onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                  className="mr-2"
                />
                Featured
              </label>
            </div>
            <button
              onClick={handleAddProject}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Projects ({projects.length})</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.category} • {project.client}</p>
                    <p className="text-gray-500 text-sm">{project.location}</p>
                    <p className="text-sm mt-2">{project.description}</p>
                    <div className="flex gap-2 mt-2">
                      {project.isActive && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                      )}
                      {project.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Featured</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleFeatured(project)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      {project.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-800 text-white p-4 rounded-lg mt-8">
          <h3 className="font-semibold mb-2">Debug Information</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(projects, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
