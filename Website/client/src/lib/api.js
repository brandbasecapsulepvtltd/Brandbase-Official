// Simple API client for Next.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://brandbase.onrender.com';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Show warning in console if API key is missing (development only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !API_KEY) {
  console.warn('⚠️ API_KEY is not set in environment variables!');
  console.warn('Add to .env.local: NEXT_PUBLIC_API_KEY=your_api_key_here');
  console.warn('Current API_URL:', API_URL);
}

// Simple function to make API calls
export async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add API key only if it exists (your server requires it)
  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
  } else if (process.env.NODE_ENV === 'development') {
    console.warn(`⚠️ No API key for request: ${endpoint}`);
  }

  const config = {
    ...options,
    headers,
  };

  // Convert body to JSON string if it's an object
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // If response is not JSON, use default message
      }
      
      // Create error object with more details
      const error = new Error(errorMessage);
      error.status = response.status;
      error.url = url;
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Call Failed:', {
      endpoint,
      url,
      error: error.message,
      status: error.status
    });
    
    // Re-throw the error so components can catch it
    throw error;
  }
}

// Ready-to-use functions for your app:
export const api = {
  // Homepage
  getHomepage: () => apiCall('/api/homepage'),
  
  // Appointments
  getAppointments: () => apiCall('/api/appointments'),
  getAppointmentById: (id) => apiCall(`/api/appointments/${id}`),
  createAppointment: (data) => apiCall('/api/appointments', {
    method: 'POST',
    body: data
  }),
  updateAppointment: (id, data) => apiCall(`/api/appointments/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteAppointment: (id) => apiCall(`/api/appointments/${id}`, {
    method: 'DELETE'
  }),

  // Services
  getServices: () => apiCall('/api/services'),
  getService: (identifier) => {
    // Handle both ID and category/slug format
    return apiCall(`/api/services/${identifier}`);
  },
  getServiceByCategorySlug: (category, slug) => apiCall(`/api/services/${category}/${slug}`),
  getServicesByCategory: (category) => apiCall(`/api/services/category/${category}`),
  getServiceCategories: () => apiCall('/api/services/categories'),
  createService: (data) => apiCall('/api/services', {
    method: 'POST',
    body: data
  }),
  updateService: (id, data) => apiCall(`/api/services/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteService: (id) => apiCall(`/api/services/${id}`, {
    method: 'DELETE'
  }),
  bulkCreateServices: (data) => apiCall('/api/services/bulk', {
    method: 'POST',
    body: data
  }),
  
  // Employees
  getEmployees: () => apiCall('/api/employees'),
  getEmployeeById: (id) => apiCall(`/api/employees/${id}`),
  createEmployee: (data) => apiCall('/api/employees', {
    method: 'POST',
    body: data
  }),
  updateEmployee: (id, data) => apiCall(`/api/employees/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteEmployee: (id) => apiCall(`/api/employees/${id}`, {
    method: 'DELETE'
  }),
  
  // Blogs
  getBlogs: () => apiCall('/api/blogs'),
  getBlogById: (id) => apiCall(`/api/blogs/${id}`),
  getBlogBySlug: (slug) => apiCall(`/api/blogs/slug/${slug}`),
  createBlog: (data) => apiCall('/api/blogs', {
    method: 'POST',
    body: data
  }),
  updateBlog: (id, data) => apiCall(`/api/blogs/${id}`, {
    method: 'PUT',
    body: data
  }),
  deleteBlog: (id) => apiCall(`/api/blogs/${id}`, {
    method: 'DELETE'
  }),
  
  // Health check (public endpoint - no API key needed)
  checkHealth: async () => {
    try {
      // Health endpoint doesn't require API key
      const response = await fetch(`${API_URL}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        success: false,
        message: 'Health check failed',
        error: error.message
      };
    }
  },
  
  // Verify API key
  verifyApiKey: () => apiCall('/api/verify-key'),
  
  // API Documentation
  getApiDocs: () => apiCall('/api'),
};

// Utility functions
export const apiUtils = {
  // Check if server is reachable
  isServerOnline: async () => {
    try {
      const health = await api.checkHealth();
      return health.success === true;
    } catch {
      return false;
    }
  },
  
  // Test API connection with key
  testConnection: async () => {
    try {
      const result = await api.verifyApiKey();
      return {
        connected: true,
        message: 'API connection successful',
        data: result
      };
    } catch (error) {
      return {
        connected: false,
        message: error.message,
        error: error
      };
    }
  },
  
  // Get all data for debugging
  debugAll: async () => {
    try {
      const [homepage, services, employees, blogs] = await Promise.allSettled([
        api.getHomepage(),
        api.getServices(),
        api.getEmployees(),
        api.getBlogs()
      ]);
      
      return {
        homepage: homepage.status === 'fulfilled' ? homepage.value : homepage.reason,
        services: services.status === 'fulfilled' ? services.value : services.reason,
        employees: employees.status === 'fulfilled' ? employees.value : employees.reason,
        blogs: blogs.status === 'fulfilled' ? blogs.value : blogs.reason,
        apiUrl: API_URL,
        hasApiKey: !!API_KEY
      };
    } catch (error) {
      return { error: error.message };
    }
  }
};

// For server-side components (Next.js App Router)
export const serverApi = {
  // Same functions but for server-side use
  ...api,
  
  // Additional server-only methods
  fetchWithCache: async (endpoint, revalidate = 3600) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY || ''
      },
      next: { revalidate }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
    }
    
    return response.json();
  }
};

// Default export
export default api;