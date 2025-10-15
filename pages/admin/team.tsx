import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getTeamMembers, 
  addTeamMember, 
  updateTeamMember, 
  deleteTeamMember,
  type TeamMember 
} from '../../lib/adminData';

const TeamManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    image: '',
    bio: '',
    expertise: '',
    linkedin: '',
    isActive: true
  });
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('oleumAdminToken');
    console.log('Team Management - Token:', token);
    
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      
      const loadMembers = () => {
        try {
          const realMembers = getTeamMembers();
          console.log('Team Management - Loaded members:', realMembers);
          setMembers(realMembers);
        } catch (error) {
          console.error('Team Management - Error loading members:', error);
          setMembers([]);
        }
      };
      
      loadMembers();
      
      // Refresh members every 3 seconds to catch updates
      const interval = setInterval(loadMembers, 3000);
      
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

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMember) {
      // Update existing member
      const updatedMember = updateTeamMember(editingMember.id, {
        ...editingMember,
        ...formData,
        expertise: formData.expertise.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
      });
      if (updatedMember) {
        setMembers(members.map(m => m.id === editingMember.id ? updatedMember : m));
      }
      setEditingMember(null);
    } else {
      // Add new member
      const newMember = addTeamMember({
        name: formData.name,
        position: formData.position,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        image: formData.image,
        bio: formData.bio,
        expertise: formData.expertise.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0),
        linkedin: formData.linkedin || undefined,
        isActive: formData.isActive
      });
      setMembers([...members, newMember]);
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      image: '',
      bio: '',
      expertise: '',
      linkedin: '',
      isActive: true
    });
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      email: member.email,
      phone: member.phone,
      image: member.image,
      bio: member.bio,
      expertise: member.expertise.join(', '),
      linkedin: member.linkedin || '',
      isActive: member.isActive
    });
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      const success = deleteTeamMember(id);
      if (success) {
        setMembers(members.filter(m => m.id !== id));
      }
    }
  };

  const handleToggleActive = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      const updatedMember = updateTeamMember(id, { isActive: !member.isActive });
      if (updatedMember) {
        setMembers(members.map(m => m.id === id ? updatedMember : m));
      }
    }
  };

  const filteredMembers = members.filter(member => {
    if (filter === 'active') return member.isActive;
    if (filter === 'inactive') return !member.isActive;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Team Management...</p>
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
        <title>Team Management - Oleum Admin</title>
        <meta name="description" content="Manage team members and staff profiles" />
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
                  <h1 className="text-xl font-black text-white">Team Management</h1>
                  <p className="text-oleum-yellow/80 text-sm">Manage team members and staff profiles</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add Team Member
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Members</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{members.length}</p>
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
                  <p className="text-sm font-medium text-oleum-gray-dark">Active Members</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{members.filter(m => m.isActive).length}</p>
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
                  <p className="text-sm font-medium text-oleum-gray-dark">Departments</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{new Set(members.map(m => m.department)).size}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Avg Experience</p>
                  <p className="text-2xl font-semibold text-oleum-navy">8.5y</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-oleum-navy">Team Members</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-oleum-navy text-white' 
                      : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-gray-dark'
                  }`}
                >
                  All ({members.length})
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'active' 
                      ? 'bg-oleum-navy text-white' 
                      : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-gray-dark'
                  }`}
                >
                  Active ({members.filter(m => m.isActive).length})
                </button>
                <button
                  onClick={() => setFilter('inactive')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'inactive' 
                      ? 'bg-oleum-navy text-white' 
                      : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-gray-dark'
                  }`}
                >
                  Inactive ({members.filter(m => !m.isActive).length})
                </button>
              </div>
            </div>
          </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg border border-oleum-gray overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-oleum-gray rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-oleum-navy">{member.name}</h3>
                      <p className="text-sm text-oleum-gray-dark">{member.position}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                   </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-oleum-gray-dark">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {member.department}
                    </div>
                    <div className="flex items-center text-sm text-oleum-gray-dark">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-oleum-gray-dark">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {member.phone}
                  </div>
                </div>

                  <p className="text-sm text-oleum-gray-dark mb-4">{member.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.expertise.map((skill, index) => (
                      <span key={index} className="bg-oleum-yellow/20 text-oleum-yellow-dark px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                            </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-oleum-gray-dark">
                      Joined: {member.joinDate}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditMember(member)}
                        className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(member.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          member.isActive
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {member.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
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
          {(showAddForm || editingMember) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-oleum-gray">
                  <h3 className="text-xl font-bold text-oleum-navy">
                    {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                  </h3>
                </div>
                
                <form onSubmit={handleSaveMember} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Full Name *</label>
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
                        placeholder="Enter job position"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Department</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      >
                        <option value="">Select department</option>
                        <option value="Executive">Executive</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Projects">Projects</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter phone number"
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
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Bio</label>
                    <textarea
                      rows={3}
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter member bio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Expertise (comma separated)</label>
                    <input
                      type="text"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="e.g., Project Management, Engineering, Leadership"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter LinkedIn profile URL"
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
                      <span className="ml-2 text-sm text-oleum-navy">Active member</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-oleum-gray">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingMember(null);
                      }}
                      className="px-4 py-2 text-oleum-gray-dark hover:text-oleum-navy transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {editingMember ? 'Update Member' : 'Add Member'}
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

export default TeamManagement; 