// Simple API client for Next.js
const API_URL = "https://brandbase.onrender.com/api";
const API_KEY = "8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de";

// Simple function to make API calls
export async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
    ...options.headers,
  };

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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API Error: ${response.status} ${response.statusText}`
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Call Failed:', error.message);
    throw error;
  }
}

// Ready-to-use functions for your app:
export const api = {
  // Homepage
  getHomepage: () => apiCall('/homepage'),
  
  // Appointments
  getAppointments: () => apiCall('/appointments'),
  createAppointment: (data) => apiCall('/appointments', {
    method: 'POST',
    body: data
  }),

  // Services
  getServices: () => apiCall('/services'),
  getServiceByCategorySlug: (category, slug) => 
    apiCall(`/services/${category}/${slug}`),
  getService: async (identifier) => {
    // Check if identifier is an ID (24 hex chars) or category/slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    if (isObjectId) {
      return apiCall(`/services/${identifier}`);
    } else {
      // Assuming identifier is in format "category/slug"
      return apiCall(`/services/${identifier}`);
    }
  },
  
  // Employees
  getEmployees: () => apiCall('/employees'),
  
  // Blogs
  getBlogs: () => apiCall('/blogs'),

  // Matches your BlogPage fetch (using the /slug/:slug endpoint)
  getBlogBySlug: (slug) => 
    apiCall(`/blogs/slug/${slug}`),
  
  // Health check (no API key needed)
  checkHealth: async () => {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },
};