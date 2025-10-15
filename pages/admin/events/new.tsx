'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isAdminAuthenticated } from '../../../utils/adminData';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  djName: string;
  djBio: string;
  ticketPrice: string;
  capacity: number;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featured: boolean;
}

const CreateEvent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    venue: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    djName: '',
    djBio: '',
    ticketPrice: '',
    capacity: 100,
    category: 'Nightclub',
    status: 'upcoming',
    featured: false
  });

  const categoryOptions = [
    'Nightclub',
    'Festival',
    'Beach Party',
    'Wedding',
    'Corporate Event',
    'Private Party',
    'Concert',
    'Bar/Lounge'
  ];

  const statusOptions = [
    'upcoming',
    'ongoing',
    'completed',
    'cancelled'
  ];

  const imageOptions = [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=fit&w=2070&q=80'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing events
    const stored = localStorage.getItem('olerum_events');
    const existingEvents = stored ? JSON.parse(stored) : [];
    
    // Create new event
    const newEvent = {
      ...formData,
      id: Math.max(...existingEvents.map((e: any) => e.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem('olerum_events', JSON.stringify(updatedEvents));
    
    // Redirect to events management
    router.push('/admin/events');
  };

  if (!isAdminAuthenticated()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container-custom">
        <div className="bg-dark-card rounded-xl shadow-lg p-8 border border-q-orange/20">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Create New Event</h1>
              <p className="text-gray-300">Add a new event to your calendar</p>
            </div>
            <Link
              href="/admin/events"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              ← Back to Events Management
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                >
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                placeholder="Describe your event..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Venue Name *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="Enter venue name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="Street address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="City"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="State"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="ZIP Code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ticket Price *
                </label>
                <input
                  type="text"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="e.g., $25, Free, $50-75"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  DJ Name *
                </label>
                <input
                  type="text"
                  name="djName"
                  value={formData.djName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="Enter DJ name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                  placeholder="Maximum capacity"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                DJ Bio
              </label>
              <textarea
                name="djBio"
                value={formData.djBio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
                placeholder="Tell us about the DJ..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Event Image URL *
              </label>
              <select
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-q-magenta focus:border-transparent"
              >
                {imageOptions.map((url, index) => (
                  <option key={index} value={url}>Nightlife Image {index + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-q-orange bg-white/5 border-white/20 rounded focus:ring-2 focus:ring-q-magenta"
              />
              <label className="ml-2 text-sm text-white">
                Feature this event on the homepage
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-q-orange to-q-magenta hover:from-glow-orange hover:to-glow-magenta text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent; 