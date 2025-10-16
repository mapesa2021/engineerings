'use client';
import { useState, useEffect } from 'react';
import { 
  getButtons, 
  addButton, 
  updateButton, 
  deleteButton,
  getButtonsBySection,
  type Button 
} from '../lib/adminData';

export default function TestButtons() {
  const [buttons, setButtons] = useState<Button[]>([]);
  const [formData, setFormData] = useState({
    section: 'hero',
    text: '',
    url: '',
    variant: 'primary' as 'primary' | 'secondary' | 'outline',
    order: 1,
    isActive: true
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadButtons = () => {
      try {
        const data = getButtons();
        setButtons(data);
        setDebugInfo(`Loaded ${data.length} buttons from localStorage`);
      } catch (error) {
        setDebugInfo(`Error loading buttons: ${error}`);
      }
    };
    
    loadButtons();
    const interval = setInterval(loadButtons, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateButton(editingId, formData);
      setEditingId(null);
    } else {
      addButton(formData);
    }
    
    setFormData({
      section: 'hero',
      text: '',
      url: '',
      variant: 'primary',
      order: 1,
      isActive: true
    });
  };

  const handleEdit = (button: Button) => {
    setFormData({
      section: button.section,
      text: button.text,
      url: button.url,
      variant: button.variant,
      order: button.order,
      isActive: button.isActive
    });
    setEditingId(button.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this button?')) {
      deleteButton(id);
    }
  };

  const clearAllButtons = () => {
    if (confirm('Clear all buttons?')) {
      try {
        localStorage.removeItem('oleum_buttons');
        setButtons([]);
        setDebugInfo('Cleared all buttons');
      } catch (error) {
        setDebugInfo(`Error clearing buttons: ${error}`);
      }
    }
  };

  const sections = ['hero', 'supply-solutions', 'core-services', 'cta', 'newsletter'];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Button Management System Test</h1>
        
        {/* Debug Info */}
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Debug Information:</h3>
          <p className="text-yellow-700 text-sm">{debugInfo || 'No debug info yet'}</p>
        </div>
        
        {/* Test Form */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Button' : 'Add New Button'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({...formData, section: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  {sections.map(section => (
                    <option key={section} value={section}>
                      {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="e.g., Learn More"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                placeholder="e.g., /services"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Variant</label>
                <select
                  value={formData.variant}
                  onChange={(e) => setFormData({...formData, variant: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded"
                  min="1"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Active</label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {editingId ? 'Update' : 'Add'} Button
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      section: 'hero',
                      text: '',
                      url: '',
                      variant: 'primary',
                      order: 1,
                      isActive: true
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Buttons by Section */}
        <div className="space-y-6">
          {sections.map(section => {
            const sectionButtons = buttons.filter(b => b.section === section);
            if (sectionButtons.length === 0) return null;
            
            return (
              <div key={section} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')} Section
                  </h3>
                  <span className="text-sm text-gray-500">{sectionButtons.length} buttons</span>
                </div>
                <div className="space-y-2">
                  {sectionButtons
                    .sort((a, b) => a.order - b.order)
                    .map(button => (
                      <div key={button.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{button.text}</div>
                          <div className="text-sm text-gray-600">{button.url}</div>
                          <div className="flex gap-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs ${
                              button.variant === 'primary' ? 'bg-blue-100 text-blue-800' :
                              button.variant === 'secondary' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {button.variant}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              button.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {button.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                              Order: {button.order}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(button)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(button.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
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

        {/* Clear All Button */}
        <div className="mt-8 text-center">
          <button
            onClick={clearAllButtons}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Clear All Buttons
          </button>
        </div>

        {/* localStorage Debug */}
        <div className="bg-white rounded-lg p-6 mt-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">localStorage Debug</h2>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium mb-2">Raw localStorage Data:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {typeof window !== 'undefined' ? 
                localStorage.getItem('oleum_buttons') || 'No data found' 
                : 'Server side - no localStorage'
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
