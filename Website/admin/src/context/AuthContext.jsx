import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.warn('Could not read from localStorage:', error);
      // Clear localStorage if it's corrupted
      try {
        localStorage.clear();
      } catch (e) {
        console.error('Could not clear localStorage:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    try {
      // Clear any existing corrupted storage first
      localStorage.removeItem('adminToken');
      
      // In a real app, you would make an API call here
      // For demo, we'll hardcode admin credentials
      const hardcodedAdmin = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      if (email === hardcodedAdmin.email && password === hardcodedAdmin.password) {
        const token = 'demo_admin_token_' + Date.now();
        
        // Try to store with error handling
        try {
          localStorage.setItem('adminToken', token);
        } catch (storageError) {
          // If localStorage is full, clear it and try again
          if (storageError.name === 'QuotaExceededError') {
            localStorage.clear();
            localStorage.setItem('adminToken', token);
          } else {
            throw storageError;
          }
        }
        
        setIsAuthenticated(true);
        navigate('/admin/dashboard/ui/home');
        return { success: true };
      }
      
      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.name === 'QuotaExceededError' 
          ? 'Storage is full. Please clear browser data.' 
          : 'An error occurred. Please try again.' 
      };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('adminToken');
    } catch (error) {
      console.warn('Could not remove token from localStorage:', error);
    }
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};