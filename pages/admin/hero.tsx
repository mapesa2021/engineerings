import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getHeroSlides, 
  addHeroSlide, 
  updateHeroSlide, 
  deleteHeroSlide,
  saveHeroSlides,
  type HeroSlide 
} from '../../lib/adminData';

const HeroManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    isActive: true
  });
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('oleumAdminToken');
    console.log('Hero Management - Token:', token);
    
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      
      const loadSlides = async () => {
        try {
          const realSlides = await getHeroSlides();
          console.log('Hero Management - Loaded slides:', realSlides);
          setSlides(realSlides);
        } catch (error) {
          console.error('Hero Management - Error loading slides:', error);
          setSlides([]);
        }
      };
      
      loadSlides();
      
      // Refresh slides every 3 seconds to catch updates
      const interval = setInterval(loadSlides, 3000);
      
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

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('💾 Admin Hero - Saving slide with form data:', formData);
    
    if (editingSlide) {
      console.log('💾 Admin Hero - Updating existing slide:', editingSlide.id);
      // Update existing slide
      const updatedSlide = updateHeroSlide(editingSlide.id, {
        ...editingSlide,
        ...formData
      });
      console.log('💾 Admin Hero - Update result:', updatedSlide);
      if (updatedSlide) {
        setSlides(slides.map(s => s.id === editingSlide.id ? updatedSlide : s));
      }
      setEditingSlide(null);
    } else {
      console.log('💾 Admin Hero - Adding new slide');
      // Add new slide
      const newSlide = addHeroSlide({
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        image: formData.image,
        buttonText: formData.buttonText,
        buttonLink: formData.buttonLink,
        isActive: formData.isActive,
        order: slides.length + 1
      });
      console.log('💾 Admin Hero - New slide created:', newSlide);
      setSlides([...slides, newSlide]);
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      buttonText: '',
      buttonLink: '',
      isActive: true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      isActive: slide.isActive
    });
  };

  const handleDeleteSlide = async (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      const success = await deleteHeroSlide(id);
      if (success) {
        setSlides(slides.filter(s => s.id !== id));
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    const slide = slides.find(s => s.id === id);
    if (slide) {
      const updatedSlide = await updateHeroSlide(id, { isActive: !slide.isActive });
      if (updatedSlide) {
        setSlides(slides.map(s => s.id === id ? updatedSlide : s));
      }
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(s => s.id === id);
    if (currentIndex === -1) return;

    const newSlides = [...slides];
    if (direction === 'up' && currentIndex > 0) {
      [newSlides[currentIndex], newSlides[currentIndex - 1]] = [newSlides[currentIndex - 1], newSlides[currentIndex]];
    } else if (direction === 'down' && currentIndex < slides.length - 1) {
      [newSlides[currentIndex], newSlides[currentIndex + 1]] = [newSlides[currentIndex + 1], newSlides[currentIndex]];
    }
    
    const reorderedSlides = newSlides.map((slide, index) => ({ ...slide, order: index + 1 }));
    setSlides(reorderedSlides);
    
    // Save the reordered slides to database
    await saveHeroSlides(reorderedSlides);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Hero Management...</p>
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
        <title>Hero Section Management - Oleum Admin</title>
        <meta name="description" content="Manage homepage hero slider content" />
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
                  <h1 className="text-xl font-black text-white">Hero Section Management</h1>
                  <p className="text-oleum-yellow/80 text-sm">Manage homepage slider content</p>
                </div>
              </div>
                <button
                onClick={() => setShowAddForm(true)}
                className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add New Slide
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Slides</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{slides.length}</p>
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
                  <p className="text-sm font-medium text-oleum-gray-dark">Active Slides</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{slides.filter(s => s.isActive).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-500/10 rounded-full">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Last Updated</p>
                  <p className="text-2xl font-semibold text-oleum-navy">Today</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Views Today</p>
                  <p className="text-2xl font-semibold text-oleum-navy">1.2K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slides List */}
          <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
            <h2 className="text-xl font-bold text-oleum-navy mb-6">Hero Slides</h2>
            
            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div key={slide.id} className="border border-oleum-gray rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center space-y-1">
                        <button
                          onClick={() => handleReorder(slide.id, 'up')}
                          disabled={index === 0}
                          className="w-6 h-6 bg-oleum-gray rounded flex items-center justify-center hover:bg-oleum-navy hover:text-white transition-colors disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <span className="text-xs text-oleum-gray-dark">{slide.order}</span>
                        <button
                          onClick={() => handleReorder(slide.id, 'down')}
                          disabled={index === slides.length - 1}
                          className="w-6 h-6 bg-oleum-gray rounded flex items-center justify-center hover:bg-oleum-navy hover:text-white transition-colors disabled:opacity-50"
                        >
                          ↓
                        </button>
                      </div>
                      
                      <div className="w-16 h-12 bg-oleum-gray rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-oleum-navy">{slide.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            slide.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {slide.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-oleum-gray-dark">{slide.subtitle}</p>
                        <p className="text-xs text-oleum-gray-dark mt-1">{slide.description.substring(0, 60)}...</p>
                  </div>
                </div>

                    <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleEditSlide(slide)}
                        className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                      <button
                        onClick={() => handleToggleActive(slide.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          slide.isActive
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {slide.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
          </div>

          {/* Add/Edit Form Modal */}
          {(showAddForm || editingSlide) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-oleum-gray">
                  <h3 className="text-xl font-bold text-oleum-navy">
                    {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                </h3>
                </div>
                
                <form onSubmit={handleSaveSlide} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter slide title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Subtitle</label>
                      <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter subtitle"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Description</label>
                    <textarea
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter slide description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Button Text</label>
                      <input
                        type="text"
                        name="buttonText"
                        value={formData.buttonText}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="e.g., Learn More"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Button Link</label>
                      <input
                        type="text"
                        name="buttonLink"
                        value={formData.buttonLink}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="e.g., /services"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter image URL"
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
                      <span className="ml-2 text-sm text-oleum-navy">Active</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-oleum-gray">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingSlide(null);
                      }}
                      className="px-4 py-2 text-oleum-gray-dark hover:text-oleum-navy transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {editingSlide ? 'Update Slide' : 'Add Slide'}
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

export default HeroManagement; 