'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Button, 
  getButtons, 
  saveButtons, 
  updateButton, 
  addButton, 
  deleteButton, 
  getButtonSections,
  getButtonsBySection,
  type Button as ButtonType
} from '../../lib/adminData';

const ButtonsManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState<ButtonType[]>([]);
  const [editingButton, setEditingButton] = useState<ButtonType | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    section: 'hero',
    text: '',
    url: '',
    variant: 'primary' as 'primary' | 'secondary' | 'outline',
    order: 1,
    isActive: true
  });
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('oleumAdminToken');
    console.log('Buttons Management - Token:', token);
    
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      
      const loadButtons = () => {
        try {
          const allButtons = getButtons();
          console.log('Buttons Management - Loaded buttons:', allButtons);
          setButtons(allButtons);
        } catch (error) {
          console.error('Buttons Management - Error loading buttons:', error);
          setButtons([]);
        }
      };
      
      loadButtons();
      
      // Refresh buttons every 3 seconds to catch updates
      const interval = setInterval(loadButtons, 3000);
      
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

  const handleSaveButton = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingButton) {
      // Update existing button
      const updatedButton = updateButton(editingButton.id, {
        ...editingButton,
        ...formData
      });
      if (updatedButton) {
        setButtons(buttons.map(b => b.id === editingButton.id ? updatedButton : b));
      }
      setEditingButton(null);
    } else {
      // Add new button
      const newButton = addButton({
        section: formData.section,
        text: formData.text,
        url: formData.url,
        variant: formData.variant,
        order: formData.order,
        isActive: formData.isActive
      });
      setButtons([...buttons, newButton]);
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      section: 'hero',
      text: '',
      url: '',
      variant: 'primary',
      order: 1,
      isActive: true
    });
  };

  const handleEditButton = (button: ButtonType) => {
    setEditingButton(button);
    setFormData({
      section: button.section,
      text: button.text,
      url: button.url,
      variant: button.variant,
      order: button.order,
      isActive: button.isActive
    });
  };

  const handleDeleteButton = (id: string) => {
    if (confirm('Are you sure you want to delete this button?')) {
      const success = deleteButton(id);
      if (success) {
        setButtons(buttons.filter(b => b.id !== id));
      }
    }
  };

  const handleToggleActive = (id: string) => {
    const button = buttons.find(b => b.id === id);
    if (button) {
      const updatedButton = updateButton(id, { isActive: !button.isActive });
      if (updatedButton) {
        setButtons(buttons.map(b => b.id === id ? updatedButton : b));
      }
    }
  };

  const getSectionDisplayName = (section: string) => {
    const names: { [key: string]: string } = {
      'hero': 'Hero Section',
      'supply-solutions': 'Supply Solutions',
      'core-services': 'Core Services',
      'cta': 'Call to Action',
      'newsletter': 'Newsletter Section'
    };
    return names[section] || section;
  };

  const getVariantDisplayName = (variant: string) => {
    const names: { [key: string]: string } = {
      'primary': 'Primary',
      'secondary': 'Secondary',
      'outline': 'Outline'
    };
    return names[variant] || variant;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Buttons Management...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const sections = getButtonSections();

  return (
    <>
      <Head>
        <title>Button Management - Oleum Admin</title>
        <meta name="description" content="Manage site buttons" />
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
                  <h1 className="text-xl font-black text-white">Button Management</h1>
                  <p className="text-oleum-yellow/80 text-sm">Manage site buttons and CTAs</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add New Button
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Buttons</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{buttons.length}</p>
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
                  <p className="text-2xl font-semibold text-oleum-navy">{buttons.filter(b => b.isActive).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Sections</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{sections.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Variants</p>
                  <p className="text-2xl font-semibold text-oleum-navy">
                    {Array.from(new Set(buttons.map(b => b.variant))).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons List */}
          <div className="bg-white rounded-xl shadow-lg border border-oleum-gray">
            <div className="p-6 border-b border-oleum-gray">
              <h2 className="text-xl font-bold text-oleum-navy">All Buttons</h2>
            </div>
            <div className="p-6">
              {buttons.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-oleum-navy/60">No buttons found. Add your first button!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sections.map((section) => {
                    const sectionButtons = buttons.filter(button => button.section === section);
                    if (sectionButtons.length === 0) return null;
                    
                    return (
                      <div key={section} className="border border-oleum-gray rounded-lg">
                        <div className="bg-oleum-gray/50 px-4 py-3 border-b border-oleum-gray">
                          <h3 className="text-lg font-semibold text-oleum-navy">
                            {getSectionDisplayName(section)}
                          </h3>
                        </div>
                        <div className="divide-y divide-oleum-gray">
                          {sectionButtons
                            .sort((a, b) => a.order - b.order)
                            .map((button) => (
                              <div key={button.id} className="px-4 py-4 flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-oleum-navy/60 w-8">#{button.order}</span>
                                    <div className="flex-1">
                                      <div className="font-semibold text-oleum-navy">{button.text}</div>
                                      <div className="text-sm text-oleum-navy/60">{button.url}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      button.variant === 'primary' 
                                        ? 'bg-oleum-navy text-white' 
                                        : button.variant === 'secondary'
                                        ? 'bg-oleum-yellow text-oleum-black'
                                        : 'bg-gray-200 text-gray-700'
                                    }`}>
                                      {getVariantDisplayName(button.variant)}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      button.isActive 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {button.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <button
                                    onClick={() => handleEditButton(button)}
                                    className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-3 py-1 rounded text-sm transition-colors"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleToggleActive(button.id)}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${
                                      button.isActive
                                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                    }`}
                                  >
                                    {button.isActive ? 'Deactivate' : 'Activate'}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteButton(button.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Add/Edit Form Modal */}
          {(showAddForm || editingButton) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-oleum-gray">
                  <h3 className="text-xl font-bold text-oleum-navy">
                    {editingButton ? 'Edit Button' : 'Add New Button'}
                  </h3>
                </div>
                
                <form onSubmit={handleSaveButton} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Section *</label>
                      <select
                        name="section"
                        value={formData.section}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        required
                      >
                        <option value="hero">Hero Section</option>
                        <option value="supply-solutions">Supply Solutions</option>
                        <option value="core-services">Core Services</option>
                        <option value="cta">Call to Action</option>
                        <option value="newsletter">Newsletter Section</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Button Text *</label>
                      <input
                        type="text"
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="e.g., Learn More"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">URL/Link *</label>
                    <input
                      type="text"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="e.g., /services"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Style Variant</label>
                      <select
                        name="variant"
                        value={formData.variant}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="outline">Outline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Display Order</label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        min="1"
                        required
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
                    <span className="ml-2 text-sm text-oleum-navy">Active button</span>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-oleum-gray">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingButton(null);
                      }}
                      className="px-4 py-2 text-oleum-gray-dark hover:text-oleum-navy transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {editingButton ? 'Update Button' : 'Add Button'}
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

export default ButtonsManagement; 