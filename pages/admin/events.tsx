'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isAdminAuthenticated } from '../../utils/adminData';

interface Event {
  id: number;
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
  createdAt: string;
  updatedAt: string;
}

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      loadEvents();
    }
  }, []);

  const loadEvents = () => {
    const stored = localStorage.getItem('caretheplanet_events');
    if (stored) {
      setEvents(JSON.parse(stored));
    } else {
      // Load default events
      const defaultEvents: Event[] = [
        {
          id: 1,
          title: "Neon Nights #1",
          description: "Experience the ultimate nightlife connection with Q Play. Request your favorite songs and tip DJs in real-time for an unforgettable night.",
          date: "2024-09-15",
          time: "10:00 PM",
          location: "Midtown Club",
          venue: "Midtown Club",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          djName: "DJ Mike",
          djBio: "Professional DJ with 10+ years of experience in nightlife and electronic music.",
          ticketPrice: "$25",
          capacity: 300,
          category: "Nightclub",
          status: "upcoming",
          featured: true,
          createdAt: "2024-08-15T10:00:00Z",
          updatedAt: "2024-08-15T10:00:00Z"
        },
        {
          id: 2,
          title: "Electric Beats Festival",
          description: "A three-day electronic music festival featuring top DJs and Q Play integration for interactive crowd experiences.",
          date: "2024-09-20",
          time: "6:00 PM",
          location: "Downtown Arena",
          venue: "Downtown Arena",
          address: "456 Music Avenue",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90210",
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          djName: "Sarah Chen",
          djBio: "Award-winning DJ specializing in house and techno music with global recognition.",
          ticketPrice: "$75",
          capacity: 2000,
          category: "Festival",
          status: "upcoming",
          featured: true,
          createdAt: "2024-08-10T10:00:00Z",
          updatedAt: "2024-08-10T10:00:00Z"
        },
        {
          id: 3,
          title: "Miami Beach Vibes",
          description: "Sunset to sunrise beach party with Q Play integration. Request songs while watching the ocean waves.",
          date: "2024-09-25",
          time: "8:00 PM",
          location: "Beachfront Resort",
          venue: "Ocean View Resort",
          address: "789 Beach Boulevard",
          city: "Miami",
          state: "FL",
          zipCode: "33139",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          djName: "DJ Carlos",
          djBio: "Latin music specialist with expertise in reggaeton, salsa, and electronic fusion.",
          ticketPrice: "$35",
          capacity: 500,
          category: "Beach Party",
          status: "upcoming",
          featured: false,
          createdAt: "2024-08-05T10:00:00Z",
          updatedAt: "2024-08-05T10:00:00Z"
        }
      ];
      localStorage.setItem('caretheplanet_events', JSON.stringify(defaultEvents));
      setEvents(defaultEvents);
    }
    setIsLoading(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== id);
      localStorage.setItem('caretheplanet_events', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    }
  };

  const handleStatusToggle = (event: Event) => {
    const updatedEvent: Event = {
      ...event,
      status: event.status === 'upcoming' ? 'ongoing' : event.status === 'ongoing' ? 'completed' : 'upcoming'
    };
    
    const updatedEvents = events.map(e => e.id === event.id ? updatedEvent : e);
    localStorage.setItem('caretheplanet_events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const handleFeaturedToggle = (event: Event) => {
    const updatedEvent: Event = {
      ...event,
      featured: !event.featured
    };
    
    const updatedEvents = events.map(e => e.id === event.id ? updatedEvent : e);
    localStorage.setItem('caretheplanet_events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  if (!isAdminAuthenticated()) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-q-orange mx-auto mb-4"></div>
          <p className="text-gray-300">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container-custom">
        <div className="bg-dark-card rounded-xl shadow-lg p-8 border border-q-orange/20">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Manage Events</h1>
              <p className="text-gray-300">Create, edit, and organize your events</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                ← Back to Admin
              </Link>
              <Link
                href="/admin/events/new"
                className="bg-gradient-to-r from-q-orange to-q-magenta hover:from-glow-orange hover:to-glow-magenta text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create New Event
              </Link>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No events found.</p>
                <Link
                  href="/admin/events/new"
                  className="bg-q-orange hover:bg-glow-orange text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Create Your First Event
                </Link>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : event.status === 'ongoing'
                            ? 'bg-green-100 text-green-800'
                            : event.status === 'completed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        {event.featured && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                        <span>📅 {event.date} at {event.time}</span>
                        <span>📍 {event.venue}, {event.city}</span>
                        <span>🎵 {event.djName}</span>
                        <span>💰 {event.ticketPrice}</span>
                        <span>👥 {event.capacity} capacity</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/events/edit/${event.id}`}
                          className="text-q-orange hover:text-glow-orange font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/events/${event.id}`}
                          className="text-q-magenta hover:text-glow-magenta font-medium"
                        >
                          View Public Page
                        </Link>
                        <button
                          onClick={() => handleStatusToggle(event)}
                          className="text-q-purple hover:text-glow-purple font-medium"
                        >
                          Toggle Status
                        </button>
                        <button
                          onClick={() => handleFeaturedToggle(event)}
                          className="text-yellow-600 hover:text-yellow-700 font-medium"
                        >
                          {event.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsManagement; 