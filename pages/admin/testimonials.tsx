import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getTestimonials, 
  addTestimonial, 
  updateTestimonial, 
  deleteTestimonial, 
  type Testimonial 
} from '../../lib/adminData';

const TestimonialsManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
    isActive: true
  });
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('oleumAdminToken');
    console.log('Testimonials Management - Token:', token);
    
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      
      const loadTestimonials = () => {
        try {
          const realTestimonials = getTestimonials();
          console.log('Testimonials Management - Loaded testimonials:', realTestimonials);
          setTestimonials(realTestimonials);
        } catch (error) {
          console.error('Testimonials Management - Error loading testimonials:', error);
          setTestimonials([]);
        }
      };
      
      loadTestimonials();
      
      // Refresh testimonials every 3 seconds to catch updates
      const interval = setInterval(loadTestimonials, 3000);
      
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
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      // Update existing testimonial
      const updatedTestimonial = updateTestimonial(editingTestimonial.id, {
        ...editingTestimonial,
        ...formData
      });
      if (updatedTestimonial) {
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? updatedTestimonial : t));
      }
      setEditingTestimonial(null);
    } else {
      // Add new testimonial
      const newTestimonial = addTestimonial({
        name: formData.name,
        position: formData.position,
        company: formData.company,
        content: formData.content,
        rating: formData.rating,
        image: formData.image,
        isActive: formData.isActive
      });
      setTestimonials([...testimonials, newTestimonial]);
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      name: '',
      position: '',
      company: '',
      content: '',
      rating: 5,
      image: '',
      isActive: true
    });
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image,
      isActive: testimonial.isActive
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const success = deleteTestimonial(id);
      if (success) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      }
    }
  };

  const handleToggleActive = (id: string) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (testimonial) {
      const updatedTestimonial = updateTestimonial(id, { isActive: !testimonial.isActive });
      if (updatedTestimonial) {
        setTestimonials(testimonials.map(t => t.id === id ? updatedTestimonial : t));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Testimonials Management...</p>
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
        <title>Testimonials Management - Oleum Admin</title>
        <meta name="description" content="Manage testimonials" />
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
                  <h1 className="text-xl font-black text-white">Testimonials Management</h1>
                  <p className="text-oleum-yellow/80 text-sm">Manage client testimonials</p>
                </div>
            </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add New Testimonial
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Testimonials</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{testimonials.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Active</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{testimonials.filter(t => t.isActive).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Average Rating</p>
                  <p className="text-2xl font-semibold text-oleum-navy">
                    {testimonials.length > 0 
                      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Latest</p>
                  <p className="text-2xl font-semibold text-oleum-navy">
                    {testimonials.length > 0 
                      ? new Date(testimonials[0].date).toLocaleDateString()
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials List */}
          <div className="bg-white rounded-xl shadow-lg border border-oleum-gray">
            <div className="p-6 border-b border-oleum-gray">
              <h2 className="text-xl font-bold text-oleum-navy">All Testimonials</h2>
            </div>
            <div className="p-6">
              {testimonials.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-oleum-navy/60">No testimonials found. Add your first testimonial!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border border-oleum-gray rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {testimonial.image ? (
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-oleum-navy rounded-full flex items-center justify-center text-white font-bold">
                                {testimonial.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-oleum-navy">{testimonial.name}</h3>
                              <p className="text-sm text-oleum-navy/60">{testimonial.position} at {testimonial.company}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-oleum-navy/80 text-sm italic">"{testimonial.content}"</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-oleum-navy/60">
                            <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              testimonial.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {testimonial.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditTestimonial(testimonial)}
                            className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleActive(testimonial.id)}
                            className={`px-3 py-1 rounded text-sm transition-colors ${
                              testimonial.isActive
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {testimonial.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add/Edit Form Modal */}
          {(showAddForm || editingTestimonial) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-oleum-gray">
                  <h3 className="text-xl font-bold text-oleum-navy">
                    {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h3>
          </div>

                <form onSubmit={handleSaveTestimonial} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Position *</label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="e.g., Factory Manager"
                      required
                    />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter company name"
                      required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Testimonial Content *</label>
                  <textarea
                      rows={4}
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter the testimonial content..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Rating</label>
                      <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Image URL</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter image URL (optional)"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="rounded border-oleum-gray text-oleum-navy focus:ring-oleum-navy"
                    />
                    <span className="ml-2 text-sm text-oleum-navy">Active testimonial</span>
                </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-oleum-gray">
                  <button
                    type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTestimonial(null);
                      }}
                      className="px-4 py-2 text-oleum-gray-dark hover:text-oleum-navy transition-colors"
                  >
                    Cancel
                  </button>
                    <button
                      type="submit"
                      className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
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

export default TestimonialsManagement; 