import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Image, 
  Video,
  Layout,
  Users,
  MessageSquare,
  HelpCircle,
  ArrowLeft,
  ChevronDown,
  Menu
} from 'lucide-react';

const API_BASE_URL = 'https://brandbase.onrender.com/api';

const AdminHome = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get('/api/homepage');
      
      const data = response.data.data || response.data;
      
      // Ensure all sections have proper structure
      const initializedData = {
        heroSection: data.heroSection || { slides: [], video: { url: '' } },
        brandElevation: data.brandElevation || { services: [] },
        recentWork: data.recentWork || { works: [], spanClasses: [] },
        clients: data.clients || { clientData: [] },
        testimonials: data.testimonials || { testimonials: [] },
        faqs: data.faqs || { faqs: [] },
        ...data
      };
      
      setHomePageData(initializedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // Set default structure if fetch fails
      setHomePageData({
        heroSection: { slides: [], video: { url: '' } },
        brandElevation: { services: [] },
        recentWork: { works: [], spanClasses: [] },
        clients: { clientData: [] },
        testimonials: { testimonials: [] },
        faqs: { faqs: [] }
      });
    } finally {
      setLoading(false);
    }
  };

  const saveHomePageData = async () => {
    setSaving(true);
    try {
      const response = await adminAxios.put('/api/homepage', homePageData);
      
      if (response.data.success) {
        alert('Data saved successfully!');
        // Refresh data after save to ensure we have the latest
        fetchHomePageData();
      } else {
        throw new Error(response.data.message || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`Error saving data: ${error.response?.data?.message || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const updateSectionData = (section, data) => {
    setHomePageData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: Layout },
    { id: 'brandElevation', name: 'Brand Elevation', icon: Users },
    { id: 'recentWork', name: 'Recent Work', icon: Image },
    { id: 'clients', name: 'Clients', icon: Users },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
    { id: 'faqs', name: 'FAQs', icon: HelpCircle }
  ];

  const getActiveSectionName = () => {
    return sections.find(section => section.id === activeSection)?.name || 'Dashboard';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!homePageData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load data</p>
          <button 
            onClick={fetchHomePageData}
            className="mt-4 px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gray-50">
  {/* Header */}
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between py-4">
        {/* Left side - Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Home Page Admin</h1>
        </div>
        
        {/* Right side - Hamburger and Save button */}
        <div className="flex items-center space-x-4">
          {/* Hamburger menu for both desktop and mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button
            onClick={saveHomePageData}
            disabled={saving}
            className="px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu - Shows on both desktop and mobile when open */}
      {mobileMenuOpen && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg mt-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-left border-b border-gray-100 last:border-b-0 transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#FF6600] text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {section.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  </header>

  {/* Current Section Indicator */}
  <div className="bg-white border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Currently editing:</span>
          <span className="font-semibold text-[#FF6600]">{getActiveSectionName()}</span>
        </div>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      {activeSection === 'hero' && (
        <HeroSectionManager 
          data={homePageData.heroSection} 
          onChange={(data) => updateSectionData('heroSection', data)} 
        />
      )}
      {activeSection === 'brandElevation' && (
        <BrandElevationManager 
          data={homePageData.brandElevation} 
          onChange={(data) => updateSectionData('brandElevation', data)} 
        />
      )}
      {activeSection === 'recentWork' && (
        <RecentWorkManager 
          data={homePageData.recentWork} 
          onChange={(data) => updateSectionData('recentWork', data)} 
        />
      )}
      {activeSection === 'clients' && (
        <ClientsManager 
          data={homePageData.clients} 
          onChange={(data) => updateSectionData('clients', data)} 
        />
      )}
      {activeSection === 'testimonials' && (
        <TestimonialsManager 
          data={homePageData.testimonials} 
          onChange={(data) => updateSectionData('testimonials', data)} 
        />
      )}
      {activeSection === 'faqs' && (
        <FaqsManager 
          data={homePageData.faqs} 
          onChange={(data) => updateSectionData('faqs', data)} 
        />
      )}
    </div>
  </div>
</div>
  );
};

// Hero Section Manager - FIXED
const HeroSectionManager = ({ data, onChange }) => {
  const [editingSlide, setEditingSlide] = useState(null);
  const [showSlideForm, setShowSlideForm] = useState(false);

  const safeData = {
    slides: data?.slides || [],
    video: data?.video || { url: '' }
  };

  const addSlide = () => {
    const newSlide = {
      id: Date.now().toString(),
      title: 'New Slide Title',
      subtext: 'New slide description',
      image: ''
    };
    setEditingSlide(newSlide);
    setShowSlideForm(true);
  };

  const editSlide = (slide) => {
    setEditingSlide({ ...slide });
    setShowSlideForm(true);
  };

  const saveSlide = () => {
    if (!editingSlide.title.trim()) {
      alert('Please enter a title for the slide');
      return;
    }

    if (editingSlide.id && safeData.slides.some(slide => slide.id === editingSlide.id)) {
      // Update existing slide
      const updatedSlides = safeData.slides.map(slide => 
        slide.id === editingSlide.id ? editingSlide : slide
      );
      onChange({ ...safeData, slides: updatedSlides });
    } else {
      // Add new slide
      const newSlideWithId = {
        ...editingSlide,
        id: editingSlide.id || Date.now().toString()
      };
      onChange({ 
        ...safeData, 
        slides: [...safeData.slides, newSlideWithId] 
      });
    }
    setShowSlideForm(false);
    setEditingSlide(null);
  };

  const deleteSlide = (id) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      const updatedSlides = safeData.slides.filter(slide => slide.id !== id);
      onChange({ ...safeData, slides: updatedSlides });
    }
  };

  const updateVideo = (videoUrl) => {
    onChange({ ...safeData, video: { url: videoUrl } });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
        <button
          onClick={addSlide}
          className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </button>
      </div>

      {/* Video URL */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Video URL
        </label>
        <input
          type="url"
          value={safeData.video?.url || ''}
          onChange={(e) => updateVideo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
          placeholder="Enter video URL"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter a URL for a background video (optional)
        </p>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        {safeData.slides.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Image className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No slides added yet. Click "Add Slide" to get started.</p>
          </div>
        ) : (
          safeData.slides.map((slide, index) => (
            <div key={slide.id || index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium self-start">
                      Slide {index + 1}
                    </span>
                    <h3 className="font-medium text-gray-900">{slide.title || 'Untitled Slide'}</h3>
                  </div>
                  {slide.image && (
                    <img 
                      src={slide.image} 
                      alt="Slide preview" 
                      className="h-20 w-32 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <p className="text-gray-600 text-sm">{slide.subtext}</p>
                </div>
                <div className="flex space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => editSlide(slide)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSlide(slide.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slide Form Modal */}
      {showSlideForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingSlide.id ? 'Edit Slide' : 'Add New Slide'}
              </h3>
              <button
                onClick={() => {
                  setShowSlideForm(false);
                  setEditingSlide(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={editingSlide?.title || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter slide title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtext
                </label>
                <textarea
                  value={editingSlide?.subtext || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtext: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter slide subtext"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingSlide?.image || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter image URL"
                />
              </div>

              {editingSlide?.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Preview
                  </label>
                  <img 
                    src={editingSlide.image} 
                    alt="Preview" 
                    className="h-40 w-full object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowSlideForm(false);
                    setEditingSlide(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSlide}
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] order-1 sm:order-2"
                >
                  Save Slide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Brand Elevation Manager - FIXED
const BrandElevationManager = ({ data, onChange }) => {
  const [editingService, setEditingService] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const safeData = {
    services: data?.services || []
  };

  const addService = () => {
    const newService = {
      category: 'New Service Category',
      items: ['Service item 1'],
      icon: '💻',
      image: ''
    };
    setEditingService(newService);
    setShowServiceForm(true);
  };

  const editService = (service, index) => {
    setEditingService({ ...service, _index: index });
    setShowServiceForm(true);
  };

  const saveService = () => {
    if (!editingService.category.trim()) {
      alert('Please enter a category name');
      return;
    }

    if (editingService._index !== undefined) {
      // Update existing service
      const updatedServices = [...safeData.services];
      updatedServices[editingService._index] = editingService;
      onChange({ ...safeData, services: updatedServices });
    } else {
      // Add new service
      onChange({ 
        ...safeData, 
        services: [...safeData.services, editingService] 
      });
    }
    setShowServiceForm(false);
    setEditingService(null);
  };

  const deleteService = (index) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updatedServices = safeData.services.filter((_, i) => i !== index);
      onChange({ ...safeData, services: updatedServices });
    }
  };

  const updateServiceItem = (index, value) => {
    const updatedItems = [...editingService.items];
    updatedItems[index] = value;
    setEditingService({ ...editingService, items: updatedItems });
  };

  const addServiceItem = () => {
    setEditingService({
      ...editingService,
      items: [...editingService.items, '']
    });
  };

  const removeServiceItem = (index) => {
    if (editingService.items.length <= 1) {
      alert('At least one service item is required');
      return;
    }
    const updatedItems = editingService.items.filter((_, i) => i !== index);
    setEditingService({ ...editingService, items: updatedItems });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Brand Elevation Services</h2>
        <button
          onClick={addService}
          className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </button>
      </div>

      <div className="grid gap-4">
        {safeData.services.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No services added yet. Click "Add Service" to get started.</p>
          </div>
        ) : (
          safeData.services.map((service, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="font-semibold text-gray-900">{service.category}</h3>
                  </div>
                  {service.image && (
                    <img 
                      src={service.image} 
                      alt={service.category}
                      className="h-20 w-32 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => editService(service, index)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteService(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingService._index !== undefined ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => {
                  setShowServiceForm(false);
                  setEditingService(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={editingService?.category || ''}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter service category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <input
                  type="text"
                  value={editingService?.icon || ''}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter emoji icon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingService?.image || ''}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
                  <label className="block text-sm font-medium text-gray-700">
                    Service Items *
                  </label>
                  <button
                    type="button"
                    onClick={addServiceItem}
                    className="text-sm text-[#FF6600] hover:text-[#E55A00] flex items-center justify-center sm:justify-start"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {editingService?.items?.map((item, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateServiceItem(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                        placeholder="Enter service item"
                      />
                      {editingService.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeServiceItem(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowServiceForm(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={saveService}
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] order-1 sm:order-2"
                >
                  Save Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Recent Work Manager - FIXED
const RecentWorkManager = ({ data, onChange }) => {
  const [editingWork, setEditingWork] = useState(null);
  const [showWorkForm, setShowWorkForm] = useState(false);

  const safeData = {
    works: data?.works || [],
    spanClasses: data?.spanClasses || []
  };

  const addWork = () => {
    const newWork = {
      image: '',
      name: 'New Work Project',
      description: 'Project description'
    };
    setEditingWork(newWork);
    setShowWorkForm(true);
  };

  const editWork = (work, index) => {
    setEditingWork({ ...work, _index: index });
    setShowWorkForm(true);
  };

  const saveWork = () => {
    if (!editingWork.name.trim()) {
      alert('Please enter a name for the work');
      return;
    }

    if (editingWork._index !== undefined) {
      // Update existing work
      const updatedWorks = [...safeData.works];
      updatedWorks[editingWork._index] = editingWork;
      onChange({ ...safeData, works: updatedWorks });
    } else {
      // Add new work
      onChange({ 
        ...safeData, 
        works: [...safeData.works, editingWork] 
      });
    }
    setShowWorkForm(false);
    setEditingWork(null);
  };

  const deleteWork = (index) => {
    if (confirm('Are you sure you want to delete this work?')) {
      const updatedWorks = safeData.works.filter((_, i) => i !== index);
      onChange({ ...safeData, works: updatedWorks });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Recent Work</h2>
        <button
          onClick={addWork}
          className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Work
        </button>
      </div>

      <div className="grid gap-4">
        {safeData.works.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Image className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No works added yet. Click "Add Work" to get started.</p>
          </div>
        ) : (
          safeData.works.map((work, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-4 flex-1">
                  {work.image && (
                    <img 
                      src={work.image} 
                      alt={work.name}
                      className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{work.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{work.description}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                      Layout: {safeData.spanClasses[index] || 'Auto'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => editWork(work, index)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteWork(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Work Form Modal */}
      {showWorkForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingWork._index !== undefined ? 'Edit Work' : 'Add New Work'}
              </h3>
              <button
                onClick={() => {
                  setShowWorkForm(false);
                  setEditingWork(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={editingWork?.name || ''}
                  onChange={(e) => setEditingWork({ ...editingWork, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter work name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingWork?.description || ''}
                  onChange={(e) => setEditingWork({ ...editingWork, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter work description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingWork?.image || ''}
                  onChange={(e) => setEditingWork({ ...editingWork, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="Enter image URL"
                />
              </div>

              {editingWork?.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Preview
                  </label>
                  <img 
                    src={editingWork.image} 
                    alt="Preview" 
                    className="h-32 w-full object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowWorkForm(false);
                    setEditingWork(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={saveWork}
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] order-1 sm:order-2"
                >
                  Save Work
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Clients Manager - FIXED
const ClientsManager = ({ data, onChange }) => {
  const [editingClient, setEditingClient] = useState(null);
  const [showClientForm, setShowClientForm] = useState(false);

  const safeData = {
    clientData: data?.clientData || []
  };

  const addClient = () => {
    const newClient = {
      id: Date.now().toString(),
      logo: '',
      name: 'New Client',
      description: 'Client description',
      projectImage: '',
      service: 'Web Development',
      location: 'Location',
      date: new Date().toISOString().split('T')[0],
      results: 'Great results achieved'
    };
    setEditingClient(newClient);
    setShowClientForm(true);
  };

  const editClient = (client) => {
    setEditingClient({ ...client });
    setShowClientForm(true);
  };

  const saveClient = () => {
    if (!editingClient.name.trim()) {
      alert('Please enter a client name');
      return;
    }

    if (editingClient.id && safeData.clientData.some(client => client.id === editingClient.id)) {
      // Update existing client
      const updatedClients = safeData.clientData.map(client => 
        client.id === editingClient.id ? editingClient : client
      );
      onChange({ ...safeData, clientData: updatedClients });
    } else {
      // Add new client
      const newClientWithId = {
        ...editingClient,
        id: editingClient.id || Date.now().toString()
      };
      onChange({ 
        ...safeData, 
        clientData: [...safeData.clientData, newClientWithId] 
      });
    }
    setShowClientForm(false);
    setEditingClient(null);
  };

  const deleteClient = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      const updatedClients = safeData.clientData.filter(client => client.id !== id);
      onChange({ ...safeData, clientData: updatedClients });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Clients</h2>
        <button
          onClick={addClient}
          className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      <div className="grid gap-4">
        {safeData.clientData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No clients added yet. Click "Add Client" to get started.</p>
          </div>
        ) : (
          safeData.clientData.map((client) => (
            <div key={client.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  {client.logo && (
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="h-12 w-12 object-contain bg-white p-1 rounded-lg flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{client.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full self-start sm:self-auto">
                        {client.service}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{client.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-2 text-xs text-gray-500">
                      <span>{client.location}</span>
                      <span>{client.date}</span>
                      <span className="text-green-600 font-medium">{client.results}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => editClient(client)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Client Form Modal */}
      {showClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingClient?.id ? 'Edit Client' : 'Add New Client'}
              </h3>
              <button
                onClick={() => {
                  setShowClientForm(false);
                  setEditingClient(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={editingClient?.name || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service *
                </label>
                <input
                  type="text"
                  value={editingClient?.service || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, service: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={editingClient?.logo || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, logo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image URL
                </label>
                <input
                  type="url"
                  value={editingClient?.projectImage || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, projectImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editingClient?.location || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={editingClient?.date || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Results
                </label>
                <input
                  type="text"
                  value={editingClient?.results || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, results: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  placeholder="e.g., 45% increase in bookings"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingClient?.description || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6">
              <button
                onClick={() => {
                  setShowClientForm(false);
                  setEditingClient(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={saveClient}
                className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] order-1 sm:order-2"
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Testimonials Manager - FIXED
const TestimonialsManager = ({ data, onChange }) => {
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);

  const safeData = {
    testimonials: data?.testimonials || []
  };

  const addTestimonial = () => {
    const newTestimonial = {
      logo: '',
      text: 'This is a great testimonial about your service...',
      name: 'Client Name',
      role: 'CEO, Company Name',
      avatar: ''
    };
    setEditingTestimonial(newTestimonial);
    setShowTestimonialForm(true);
  };

  const editTestimonial = (testimonial, index) => {
    setEditingTestimonial({ ...testimonial, _index: index });
    setShowTestimonialForm(true);
  };

  const saveTestimonial = () => {
    if (!editingTestimonial.name.trim() || !editingTestimonial.text.trim()) {
      alert('Please enter both name and testimonial text');
      return;
    }

    if (editingTestimonial._index !== undefined) {
      // Update existing testimonial
      const updatedTestimonials = [...safeData.testimonials];
      updatedTestimonials[editingTestimonial._index] = editingTestimonial;
      onChange({ ...safeData, testimonials: updatedTestimonials });
    } else {
      // Add new testimonial
      onChange({ 
        ...safeData, 
        testimonials: [...safeData.testimonials, editingTestimonial] 
      });
    }
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
  };

  const deleteTestimonial = (index) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const updatedTestimonials = safeData.testimonials.filter((_, i) => i !== index);
      onChange({ ...safeData, testimonials: updatedTestimonials });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Testimonials</h2>
        <button
          onClick={addTestimonial}
          className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {safeData.testimonials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No testimonials added yet. Click "Add Testimonial" to get started.</p>
          </div>
        ) : (
          safeData.testimonials.map((testimonial, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {testimonial.avatar && (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">"{testimonial.text}"</p>
                  {testimonial.logo && (
                    <div className="mt-3">
                      <img 
                        src={testimonial.logo} 
                        alt="Client logo"
                        className="h-8 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => editTestimonial(testimonial, index)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Testimonial Form Modal */}
      {showTestimonialForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingTestimonial._index !== undefined ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button
                onClick={() => {
                  setShowTestimonialForm(false);
                  setEditingTestimonial(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial?.name || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial?.role || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Text *
                </label>
                <textarea
                  value={editingTestimonial?.text || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={editingTestimonial?.avatar || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={editingTestimonial?.logo || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, logo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowTestimonialForm(false);
                    setEditingTestimonial(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTestimonial}
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] order-1 sm:order-2"
                >
                  Save Testimonial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// FAQs Manager - FIXED
const FaqsManager = ({ data, onChange }) => {
  const [editingFaq, setEditingFaq] = useState(null);
  const [showFaqForm, setShowFaqForm] = useState(false);

  const safeData = {
    faqs: data?.faqs || []
  };

  const addFaq = () => {
    const newFaq = {
      question: 'New frequently asked question?',
      answer: 'Answer to the frequently asked question.',
      image: '',
      hasImage: false
    };
    setEditingFaq(newFaq);
    setShowFaqForm(true);
  };

  const editFaq = (faq, index) => {
    setEditingFaq({ ...faq, _index: index });
    setShowFaqForm(true);
  };

  const saveFaq = () => {
    if (!editingFaq.question.trim() || !editingFaq.answer.trim()) {
      alert('Please enter both question and answer');
      return;
    }

    if (editingFaq._index !== undefined) {
      // Update existing FAQ
      const updatedFaqs = [...safeData.faqs];
      updatedFaqs[editingFaq._index] = editingFaq;
      onChange({ ...safeData, faqs: updatedFaqs });
    } else {
      // Add new FAQ
      onChange({ 
        ...safeData, 
        faqs: [...safeData.faqs, editingFaq] 
      });
    }
    setShowFaqForm(false);
    setEditingFaq(null);
  };

  const deleteFaq = (index) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      const updatedFaqs = safeData.faqs.filter((_, i) => i !== index);
      onChange({ ...safeData, faqs: updatedFaqs });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">FAQs</h2>
        <button
          onClick={addFaq}
          className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {safeData.faqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No FAQs added yet. Click "Add FAQ" to get started.</p>
          </div>
        ) : (
          safeData.faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    {faq.hasImage && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        <Image className="w-3 h-3 mr-1" />
                        Has Image
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => editFaq(faq, index)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteFaq(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAQ Form Modal */}
      {showFaqForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingFaq._index !== undefined ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button
                onClick={() => {
                  setShowFaqForm(false);
                  setEditingFaq(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  value={editingFaq?.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Answer *
                </label>
                <textarea
                  value={editingFaq?.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hasImage"
                  checked={editingFaq?.hasImage || false}
                  onChange={(e) => setEditingFaq({ ...editingFaq, hasImage: e.target.checked })}
                  className="w-4 h-4 text-[#FF6600] border-gray-300 rounded focus:ring-[#FF6600]"
                />
                <label htmlFor="hasImage" className="text-sm font-medium text-gray-700">
                  Include Image
                </label>
              </div>

              {editingFaq?.hasImage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={editingFaq?.image || ''}
                    onChange={(e) => setEditingFaq({ ...editingFaq, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  />
                  {editingFaq.image && (
                    <img 
                      src={editingFaq.image} 
                      alt="Preview" 
                      className="h-32 w-full object-cover rounded-lg border mt-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowFaqForm(false);
                    setEditingFaq(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFaq}
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] order-1 sm:order-2"
                >
                  Save FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;