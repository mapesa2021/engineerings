import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getContactMessages, 
  markMessageAsRead,
  type ContactMessage 
} from '../../lib/adminData';

const MessagesManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('oleumAdminToken');
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      // Load real contact messages
      const realMessages = getContactMessages();
      setMessages(realMessages);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleMarkAsRead = (id: string) => {
    const updatedMessage = markMessageAsRead(id);
    if (updatedMessage) {
      setMessages(messages.map(m => m.id === id ? updatedMessage : m));
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'new') return message.status === 'new';
    if (filter === 'read') return message.status === 'read';
    if (filter === 'replied') return message.status === 'replied';
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Messages Management...</p>
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
        <title>Contact Messages - Oleum Admin</title>
        <meta name="description" content="Manage contact form messages" />
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
                  <h1 className="text-xl font-black text-white">Contact Messages</h1>
                  <p className="text-oleum-yellow/80 text-sm">Manage contact form submissions</p>
                </div>
              </div>
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
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Messages</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{messages.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">New Messages</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{messages.filter(m => m.status === 'new').length}</p>
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
                  <p className="text-sm font-medium text-oleum-gray-dark">Read Messages</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{messages.filter(m => m.status === 'read').length}</p>
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
                  <p className="text-sm font-medium text-oleum-gray-dark">Replied</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{messages.filter(m => m.status === 'replied').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-oleum-navy text-white'
                    : 'bg-white text-oleum-navy hover:bg-oleum-navy hover:text-white'
                }`}
              >
                All Messages
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'new'
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-red-500 hover:bg-red-500 hover:text-white'
                }`}
              >
                New ({messages.filter(m => m.status === 'new').length})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'read'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'
                }`}
              >
                Read ({messages.filter(m => m.status === 'read').length})
              </button>
              <button
                onClick={() => setFilter('replied')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'replied'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-green-500 hover:bg-green-500 hover:text-white'
                }`}
              >
                Replied ({messages.filter(m => m.status === 'replied').length})
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-oleum-gray">
                <div className="p-6 border-b border-oleum-gray">
                  <h3 className="text-lg font-semibold text-oleum-navy">Messages</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <div className="p-6 text-center text-oleum-gray-dark">
                      No messages found
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 border-b border-oleum-gray cursor-pointer hover:bg-oleum-gray/50 transition-colors ${
                          selectedMessage?.id === message.id ? 'bg-oleum-navy/10' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-oleum-navy truncate">{message.name}</h4>
                            <p className="text-sm text-oleum-gray-dark truncate">{message.subject}</p>
                            <p className="text-xs text-oleum-gray-dark mt-1">
                              {new Date(message.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              message.status === 'new' ? 'bg-red-100 text-red-800' :
                              message.status === 'read' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {message.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Message Details */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white rounded-xl shadow-lg border border-oleum-gray">
                  <div className="p-6 border-b border-oleum-gray">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-oleum-navy">Message Details</h3>
                      {!selectedMessage.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-oleum-gray-dark mb-1">Name</label>
                        <p className="text-oleum-navy font-medium">{selectedMessage.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-oleum-gray-dark mb-1">Email</label>
                        <p className="text-oleum-navy">{selectedMessage.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-oleum-gray-dark mb-1">Phone</label>
                        <p className="text-oleum-navy">{selectedMessage.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-oleum-gray-dark mb-1">Subject</label>
                        <p className="text-oleum-navy font-medium">{selectedMessage.subject}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-oleum-gray-dark mb-1">Date</label>
                        <p className="text-oleum-navy">{new Date(selectedMessage.date).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-oleum-gray-dark mb-2">Message</label>
                      <div className="bg-oleum-gray/50 p-4 rounded-lg">
                        <p className="text-oleum-navy whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                        className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        Reply via Email
                      </a>
                      {selectedMessage.phone && (
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-12 text-center">
                  <div className="text-6xl mb-4">📧</div>
                  <h3 className="text-xl font-semibold text-oleum-navy mb-2">Select a Message</h3>
                  <p className="text-oleum-gray-dark">Choose a message from the list to view its details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MessagesManagement;
