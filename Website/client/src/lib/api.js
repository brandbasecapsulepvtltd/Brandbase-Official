import emailjs from '@emailjs/browser';

// Simple API client for Next.js
const API_URL = "https://api.brandbasecapsule.com/api";
const API_KEY = "8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de";

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_wotevqq',
  TEMPLATE_ID: 'template_2ysu787',
  PUBLIC_KEY: 'maLQ-G7P2BQOoOVoY',
  FROM_NAME: 'Brandbase Capsule Support',
  FROM_EMAIL: 'vinayakandhere4@gmail.com'
};

// Initialize EmailJS once
let emailjsInitialized = false;

function initializeEmailJS() {
  if (!emailjsInitialized) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    emailjsInitialized = true;
    console.log('EmailJS initialized');
  }
}

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

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  // Handle revalidation for Next.js
  if (options.revalidate !== undefined) {
    config.next = { revalidate: options.revalidate };
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

// Function to send email via EmailJS (direct from browser)
export async function sendEmailViaEmailJS(data) {
  try {
    // Initialize EmailJS if not already initialized
    initializeEmailJS();

    // Prepare email data
    const emailData = {
      to_name: `${data.firstName} ${data.lastName}`,
      to_email: data.email,
      from_name: EMAILJS_CONFIG.FROM_NAME,
      from_email: EMAILJS_CONFIG.FROM_EMAIL,
      category: data.category || 'General Inquiry',
      message: data.message || '',
      organization: data.organization || 'Not provided',
      contact_number: data.contactNumber || 'Not provided',
      region: data.region || 'Not specified',
      industry: data.industry || 'Not specified',
      date: new Date().toLocaleString()
    };

    console.log('Sending email with data:', emailData);

    // Send email via EmailJS using the imported module
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      emailData
    );

    console.log('✅ EmailJS Result:', result);

    return {
      success: true,
      emailId: result.messageId || result.text,
      message: 'Email sent successfully via EmailJS'
    };
  } catch (error) {
    console.error('❌ EmailJS Error Details:', error);

    // Better error message handling
    let errorMessage = 'Failed to send email';
    if (error.text) {
      errorMessage += ': ' + error.text;
    } else if (error.message) {
      errorMessage += ': ' + error.message;
    } else if (error.status) {
      errorMessage += ` (Status: ${error.status})`;
    }

    throw new Error(errorMessage);
  }
}

// Function to generate reference ID
function generateReferenceId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'REF-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Function to send contact confirmation email
export async function sendContactConfirmationEmail(data) {
  try {
    initializeEmailJS();

    const referenceId = generateReferenceId();
    const submissionDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const emailData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      contact_number: data.contactNumber || 'Not provided',
      organization: data.organization || 'Not provided',
      region: data.region || 'Not specified',
      industry: data.industry || 'Not specified',
      category: data.category || 'General Inquiry',
      message: data.message ? data.message.substring(0, 500) : '',
      reference_id: referenceId,
      submission_date: submissionDate
    };

    console.log('Sending confirmation email with data:', emailData);

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      emailData
    );

    console.log('✅ Confirmation email sent successfully');

    return {
      success: true,
      emailId: result.messageId || result.text,
      referenceId: referenceId,
      message: 'Confirmation email sent successfully'
    };
  } catch (error) {
    console.error('❌ Confirmation email error:', error);

    let errorMessage = 'Failed to send confirmation email';
    if (error.text) {
      errorMessage += ': ' + error.text;
    } else if (error.message) {
      errorMessage += ': ' + error.message;
    }

    throw new Error(errorMessage);
  }
}

// Updated contact submission function
export async function submitContactForm(data) {
  try {
    console.log('Starting contact form submission...', data);

    // Step 1: First send to your backend (save to database)
    console.log('Sending to backend API...');
    const backendResponse = await apiCall('/contacts', {
      method: 'POST',
      body: data
    });

    console.log('✅ Backend response:', backendResponse);

    // Step 2: Try to send confirmation email via EmailJS
    let emailResult = null;
    try {
      console.log('Attempting to send confirmation email...');
      emailResult = await sendContactConfirmationEmail(data);
      console.log('✅ Email result:', emailResult);
    } catch (emailError) {
      console.warn('⚠️ Email sending failed:', emailError.message);
      console.log('Contact was saved to database, but email failed.');
      // Continue anyway - the contact is saved in DB
    }

    return {
      success: true,
      data: backendResponse.data,
      referenceId: emailResult?.referenceId || generateReferenceId(),
      emailSent: !!emailResult?.success,
      message: emailResult
        ? 'Thank you! We\'ve received your message and sent a confirmation email.'
        : 'Thank you! We\'ve received your message. (Confirmation email failed)'
    };

  } catch (error) {
    console.error('❌ Contact submission failed:', error);
    throw error;
  }
}

// Ready-to-use functions for your app:
export const api = {
  // Homepage
  getHomepage: () => apiCall('/homepage'),

  // About Section
  getAboutSection: () => apiCall('/about-section'),

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
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    if (isObjectId) {
      return apiCall(`/services/${identifier}`);
    } else {
      return apiCall(`/services/${identifier}`);
    }
  },

  // Employees
  getEmployees: () => apiCall('/employees'),

  // Blogs
  getBlogs: () => apiCall('/blogs'),

  getBlogBySlug: (slug) => apiCall(`/blogs/slug/${slug}`),


  // Add these to your existing api object:

  // Service Categories
  getServiceCategoryBySlug: (slug) =>
    apiCall(`/service-categories/${slug}`),

  getServiceCategoryById: (id) =>
    apiCall(`/service-categories/id/${id}`),

  getServiceCategories: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/service-categories${queryString ? `?${queryString}` : ''}`);
  },

  getCategorySlugs: () => apiCall('/service-categories/slugs'),

  createServiceCategory: (data) => apiCall('/service-categories', {
    method: 'POST',
    body: data
  }),

  updateServiceCategory: (id, data) => apiCall(`/service-categories/${id}`, {
    method: 'PUT',
    body: data
  }),

  deleteServiceCategory: (id) => apiCall(`/service-categories/${id}`, {
    method: 'DELETE'
  }),

  // Continue with existing methods...
  getEvents: () => apiCall('/events'),

  // Contact us page api
  createContact: submitContactForm,

  // Direct EmailJS email sending (for testing)
  sendEmailViaEmailJS,

  // General Components
  getTopBar: (revalidate = 10) => apiCall('/topbar', { revalidate }),
  getNavbar: (revalidate = 10) => apiCall('/navbar', { revalidate }),
  getFooter: (revalidate = 10) => apiCall('/footer', { revalidate }),
  getFloatingLatest: (revalidate = 10) => apiCall('/floatinglatest', { revalidate }),
  getPolicy: (type, revalidate = 10) => apiCall(`/policies/${type}`, { revalidate }),

  // Health check
  checkHealth: async () => {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },
};

// Test function for EmailJS
export async function testEmailJS() {
  try {
    console.log('Testing EmailJS connection...');
    initializeEmailJS();

    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'vinayakandhere4@gmail.com',
      category: 'Test Category',
      message: 'This is a test email from EmailJS',
      organization: 'Test Org',
      contactNumber: '1234567890',
      region: 'Test Region',
      industry: 'Test Industry'
    };

    const result = await sendContactConfirmationEmail(testData);
    console.log('✅ Test email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Test email failed:', error);
    throw error;
  }
}
