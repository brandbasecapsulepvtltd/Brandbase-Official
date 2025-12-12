import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus, Search, Edit, Trash2, Eye,
  Filter, Calendar, User, Tag, Upload,
  ChevronLeft, ChevronRight, CheckCircle,
  XCircle, AlertCircle, Loader2, FileText
} from 'lucide-react';

const API_BASE_URL = 'https://brandbase.onrender.com/api';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    metadata: {
      slug: '',
      category: 'productivity',
      isEditorPick: false,
      isSlider: false,
      isHelpfulResources: false,
      title: '',
      description: '',
      author: {
        name: '',
        role: '',
        image: '',
        twitter: '#',
        linkedin: '#'
      },
      readTime: '5 min read',
      featuredImage: '',
      publishDate: new Date().toISOString().split('T')[0]
    },
    sections: [{
      id: 'intro',
      title: 'Introduction',
      content: [''],
      listItems: []
    }]
  });
  const [newSection, setNewSection] = useState({ id: '', title: '', content: [''] });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const itemsPerPage = 10;

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogs(response.data.data);
      
      // Calculate pagination
      const total = response.data.count;
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (err) {
      setError('Failed to fetch blogs. Please check your connection.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/categories`);
      setCategories(response.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.metadata.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.metadata.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      blog.metadata.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Paginate blogs
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('metadata.')) {
      const field = name.split('metadata.')[1];
      
      if (field.includes('author.')) {
        const authorField = field.split('author.')[1];
        setFormData(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            author: {
              ...prev.metadata.author,
              [authorField]: value
            }
          }
        }));
      } else if (field.includes('.')) {
        // Handle nested metadata fields if any
        const [parent, child] = field.split('.');
        setFormData(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            [parent]: {
              ...prev.metadata[parent],
              [child]: type === 'checkbox' ? checked : value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            [field]: type === 'checkbox' ? checked : value
          }
        }));
      }
    } else if (name.startsWith('section.')) {
      const [sectionIndex, field] = name.split('.').slice(1);
      const index = parseInt(sectionIndex);
      
      setFormData(prev => ({
        ...prev,
        sections: prev.sections.map((section, i) => 
          i === index ? { ...section, [field]: value } : section
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Handle content array updates for sections
  const handleSectionContentChange = (sectionIndex, contentIndex, value) => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      const newContent = [...newSections[sectionIndex].content];
      newContent[contentIndex] = value;
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        content: newContent
      };
      return { ...prev, sections: newSections };
    });
  };

  // Add new content paragraph to section
  const addSectionContent = (sectionIndex) => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].content.push('');
      return { ...prev, sections: newSections };
    });
  };

  // Remove content paragraph from section
  const removeSectionContent = (sectionIndex, contentIndex) => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      const newContent = newSections[sectionIndex].content.filter((_, i) => i !== contentIndex);
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        content: newContent
      };
      return { ...prev, sections: newSections };
    });
  };

  // Add new section
  const addNewSection = () => {
    if (newSection.id && newSection.title) {
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, {
          id: newSection.id.toLowerCase().replace(/\s+/g, '-'),
          title: newSection.title,
          content: [''],
          listItems: []
        }]
      }));
      setNewSection({ id: '', title: '', content: [''] });
    }
  };

  // Remove section
  const removeSection = (index) => {
    if (formData.sections.length > 1) {
      setFormData(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
      }));
    }
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const category = newCategory.trim().toLowerCase();
      if (!categories.includes(category)) {
        setCategories(prev => [...prev, category]);
        setFormData(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            category: category
          }
        }));
      }
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  // Import JSON
  const handleJsonImport = () => {
    try {
      setJsonError('');
      const parsedData = JSON.parse(jsonText);
      
      // Validate the JSON structure
      if (!parsedData.metadata || !parsedData.metadata.title || !parsedData.metadata.slug) {
        throw new Error('Invalid JSON structure. Must include metadata with title and slug.');
      }

      // Ensure sections array exists
      if (!parsedData.sections || !Array.isArray(parsedData.sections)) {
        parsedData.sections = [{
          id: 'intro',
          title: 'Introduction',
          content: [''],
          listItems: []
        }];
      }

      // Ensure author object exists
      if (!parsedData.metadata.author) {
        parsedData.metadata.author = {
          name: '',
          role: '',
          image: '',
          twitter: '#',
          linkedin: '#'
        };
      }

      // Ensure date is in correct format
      if (parsedData.metadata.publishDate && typeof parsedData.metadata.publishDate === 'string') {
        parsedData.metadata.publishDate = new Date(parsedData.metadata.publishDate).toISOString().split('T')[0];
      }

      setFormData(parsedData);
      setShowJsonImport(false);
      setJsonText('');
      setSuccessMessage('JSON imported successfully!');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setJsonError(err.message || 'Invalid JSON format');
    }
  };

  // Export current form data as JSON
  const exportAsJson = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(jsonData);
    setSuccessMessage('JSON copied to clipboard!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Open create modal
  const openCreateModal = () => {
    setFormData({
      metadata: {
        slug: '',
        category: 'productivity',
        isEditorPick: false,
        isSlider: false,
        isHelpfulResources: false,
        title: '',
        description: '',
        author: {
          name: '',
          role: '',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          twitter: '#',
          linkedin: '#'
        },
        readTime: '5 min read',
        featuredImage: '',
        publishDate: new Date().toISOString().split('T')[0]
      },
      sections: [{
        id: 'intro',
        title: 'Introduction',
        content: [''],
        listItems: []
      }]
    });
    setModalType('create');
    setShowModal(true);
    setShowJsonImport(false);
    setJsonText('');
    setJsonError('');
  };

  // Open edit modal
  const openEditModal = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      metadata: {
        ...blog.metadata,
        publishDate: new Date(blog.metadata.publishDate).toISOString().split('T')[0]
      },
      sections: blog.sections
    });
    setModalType('edit');
    setShowModal(true);
    setShowJsonImport(false);
    setJsonText('');
    setJsonError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (modalType === 'create') {
        await axios.post(`${API_BASE_URL}/blogs`, formData);
        setSuccessMessage('Blog created successfully!');
      } else {
        await axios.put(`${API_BASE_URL}/blogs/${currentBlog._id}`, formData);
        setSuccessMessage('Blog updated successfully!');
      }
      
      await fetchBlogs();
      await fetchCategories(); // Refresh categories after creating new blog
      setShowModal(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
      console.error('Error saving blog:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/blogs/${deleteConfirm}`);
      setSuccessMessage('Blog deleted successfully!');
      setDeleteConfirm(null);
      await fetchBlogs();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete blog. Please try again.');
      console.error('Error deleting blog:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  // Handle view blog
  const handleViewBlog = (blog) => {
    const url = `https://brandbase-nu.vercel.app/blogs/${blog.metadata.category}/${blog.metadata.slug}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <p className="text-gray-600 mt-2">Manage and publish your blog content</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
          <span className="text-green-700">{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <span className="text-red-700">{error}</span>
          <button 
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title, description, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Blog
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{blogs.length}</div>
            <div className="text-sm text-blue-600">Total Blogs</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {blogs.filter(b => b.metadata.isEditorPick).length}
            </div>
            <div className="text-sm text-green-600">Editor's Picks</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              {blogs.filter(b => b.metadata.isSlider).length}
            </div>
            <div className="text-sm text-purple-600">Slider Blogs</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">
              {blogs.filter(b => b.metadata.isHelpfulResources).length}
            </div>
            <div className="text-sm text-orange-600">Helpful Resources</div>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No blogs found</h3>
            <p className="mt-2 text-gray-600">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating your first blog'}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Blog
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blog
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedBlogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={blog.metadata.featuredImage}
                            alt={blog.metadata.title}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {blog.metadata.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {blog.metadata.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          blog.metadata.category === 'productivity' ? 'bg-blue-100 text-blue-800' :
                          blog.metadata.category === 'technology' ? 'bg-purple-100 text-purple-800' :
                          blog.metadata.category === 'wellness' ? 'bg-green-100 text-green-800' :
                          blog.metadata.category === 'marketing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {blog.metadata.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={blog.metadata.author.image}
                            alt={blog.metadata.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {blog.metadata.author.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {blog.metadata.author.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {blog.metadata.isEditorPick && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Editor's Pick
                            </span>
                          )}
                          {blog.metadata.isSlider && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Slider
                            </span>
                          )}
                          {blog.metadata.isHelpfulResources && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                              Helpful Resource
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(blog.metadata.publishDate)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewBlog(blog)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(blog)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(blog._id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredBlogs.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredBlogs.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Blog
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'create' ? 'Create New Blog' : 'Edit Blog'}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportAsJson}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center gap-2"
                    title="Export as JSON"
                  >
                    <FileText className="w-4 h-4" />
                    Export JSON
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {showJsonImport ? (
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Import JSON Data</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Paste your JSON data below. The JSON should match the blog structure with metadata and sections.
                  </p>
                  <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder={`{
  "metadata": {
    "slug": "example-blog",
    "category": "productivity",
    "title": "Example Blog Title",
    "description": "Blog description here",
    ...
  },
  "sections": [...]
}`}
                  />
                  {jsonError && (
                    <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                      {jsonError}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowJsonImport(false)}
                    className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel Import
                  </button>
                  <button
                    onClick={handleJsonImport}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Import JSON
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* JSON Import Button */}
                {modalType === 'create' && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setShowJsonImport(true)}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Import JSON Data</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Click here to import blog data from JSON format
                    </p>
                  </div>
                )}

                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="metadata.title"
                        value={formData.metadata.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter blog title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        name="metadata.slug"
                        value={formData.metadata.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="blog-slug-here"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <div className="space-y-2">
                        <select
                          name="metadata.category"
                          value={formData.metadata.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          {isAddingCategory ? (
                            <>
                              <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New category name"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <button
                                type="button"
                                onClick={handleAddCategory}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsAddingCategory(false)}
                                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsAddingCategory(true)}
                              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                              Add New Category
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Read Time
                      </label>
                      <input
                        type="text"
                        name="metadata.readTime"
                        value={formData.metadata.readTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5 min read"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image URL *
                      </label>
                      <input
                        type="url"
                        name="metadata.featuredImage"
                        value={formData.metadata.featuredImage}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        name="metadata.publishDate"
                        value={formData.metadata.publishDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="metadata.description"
                    value={formData.metadata.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of the blog"
                  />
                </div>

                {/* Author Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        name="metadata.author.name"
                        value={formData.metadata.author.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author Role *
                      </label>
                      <input
                        type="text"
                        name="metadata.author.role"
                        value={formData.metadata.author.role}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Creative Director"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author Image URL *
                      </label>
                      <input
                        type="url"
                        name="metadata.author.image"
                        value={formData.metadata.author.image}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/author.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Blog Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="metadata.isEditorPick"
                        checked={formData.metadata.isEditorPick}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Mark as Editor's Pick</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="metadata.isSlider"
                        checked={formData.metadata.isSlider}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Include in Slider</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="metadata.isHelpfulResources"
                        checked={formData.metadata.isHelpfulResources}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Mark as Helpful Resource</span>
                    </label>
                  </div>
                </div>

                {/* Sections */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Content Sections</h3>
                  </div>
                  
                  {formData.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {sectionIndex + 1}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{section.title}</div>
                            <div className="text-xs text-gray-500">ID: {section.id}</div>
                          </div>
                        </div>
                        {formData.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(sectionIndex)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title
                          </label>
                          <input
                            type="text"
                            name={`section.${sectionIndex}.title`}
                            value={section.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Section title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Content
                          </label>
                          {section.content.map((content, contentIndex) => (
                            <div key={contentIndex} className="flex gap-2 mb-2">
                              <textarea
                                value={content}
                                onChange={(e) => handleSectionContentChange(sectionIndex, contentIndex, e.target.value)}
                                rows={2}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Paragraph content"
                              />
                              {section.content.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSectionContent(sectionIndex, contentIndex)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg self-start"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addSectionContent(sectionIndex)}
                            className="mt-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            + Add Paragraph
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Section */}
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Section</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Section ID
                        </label>
                        <input
                          type="text"
                          value={newSection.id}
                          onChange={(e) => setNewSection({...newSection, id: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="section-id"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={newSection.title}
                          onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Section Title"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addNewSection}
                      className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Section
                    </button>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {modalType === 'create' ? 'Creating...' : 'Updating...'}
                      </>
                    ) : (
                      modalType === 'create' ? 'Create Blog' : 'Update Blog'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;