// Simple API client for Next.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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
  getService: (id) => apiCall(`/services/${id}`),
  
  // Employees
  getEmployees: () => apiCall('/employees'),
  
  // Blogs
  getBlogs: () => apiCall('/blogs'),
  
  // Health check (no API key needed)
  checkHealth: async () => {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },
};