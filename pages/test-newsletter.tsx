'use client';
import { useState, useEffect } from 'react';
import NewsletterForm from '../components/NewsletterForm';
import { 
  getNewsletterSubscribers, 
  addNewsletterSubscriber, 
  removeNewsletterSubscriber,
  type NewsletterSubscriber 
} from '../lib/adminData';

export default function TestNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadSubscribers = () => {
      try {
        const data = getNewsletterSubscribers();
        setSubscribers(data);
        setDebugInfo(`Loaded ${data.length} subscribers from localStorage`);
      } catch (error) {
        setDebugInfo(`Error loading subscribers: ${error}`);
      }
    };
    
    loadSubscribers();
    const interval = setInterval(loadSubscribers, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      console.log('Adding subscriber:', email);
      const subscriber = addNewsletterSubscriber(email);
      console.log('Subscriber added:', subscriber);
      
      if (subscriber) {
        setMessage('Thank you for subscribing!');
        setEmail('');
        setDebugInfo(`Successfully added subscriber: ${subscriber.email}`);
      } else {
        setMessage('Something went wrong. Please try again.');
        setDebugInfo('addNewsletterSubscriber returned null/undefined');
      }
    } catch (error) {
      console.error('Error adding subscriber:', error);
      setMessage('Something went wrong. Please try again.');
      setDebugInfo(`Error: ${error}`);
    }

    setTimeout(() => setMessage(''), 5000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this subscriber?')) {
      try {
        removeNewsletterSubscriber(id);
        setDebugInfo(`Removed subscriber with ID: ${id}`);
      } catch (error) {
        setDebugInfo(`Error removing subscriber: ${error}`);
      }
    }
  };

  const clearAllSubscribers = () => {
    if (confirm('Clear all subscribers?')) {
      try {
        localStorage.removeItem('oleum_newsletter_subscribers');
        setSubscribers([]);
        setDebugInfo('Cleared all subscribers');
      } catch (error) {
        setDebugInfo(`Error clearing subscribers: ${error}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Newsletter System Test</h1>
        
        {/* Debug Info */}
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Debug Information:</h3>
          <p className="text-yellow-700 text-sm">{debugInfo || 'No debug info yet'}</p>
        </div>
        
        {/* Test Form */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Test Newsletter Subscription</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter test email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Subscribe Test Email
            </button>
            {message && (
              <div className="p-3 bg-green-100 text-green-800 rounded">
                {message}
              </div>
            )}
          </form>
        </div>

        {/* NewsletterForm Component Test */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">NewsletterForm Component Test</h2>
          <div className="bg-gray-50 p-6 rounded">
            <h3 className="text-lg font-medium mb-4">Test NewsletterForm Component</h3>
            <div className="max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Subscribers List */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Current Subscribers ({subscribers.length})</h2>
            <button
              onClick={clearAllSubscribers}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2">
            {subscribers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No subscribers found</p>
            ) : (
              subscribers.map((subscriber) => (
                <div key={subscriber.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <span className="font-medium">{subscriber.email}</span>
                    <span className="text-sm text-gray-500 ml-4">
                      {new Date(subscriber.date).toLocaleDateString()}
                    </span>
                    <span className={`ml-4 px-2 py-1 rounded text-xs ${
                      subscriber.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {subscriber.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(subscriber.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* localStorage Debug */}
        <div className="bg-white rounded-lg p-6 mt-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">localStorage Debug</h2>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium mb-2">Raw localStorage Data:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {typeof window !== 'undefined' ? 
                localStorage.getItem('oleum_newsletter_subscribers') || 'No data found' 
                : 'Server side - no localStorage'
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
