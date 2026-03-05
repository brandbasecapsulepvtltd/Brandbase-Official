import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (token) {
          const response = await axios.get('/api/auth/me');
          if (response.data.success) {
            setUser(response.data.data);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('adminToken');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });

      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('adminToken', token);
        setUser(userData);
        setIsAuthenticated(true);
        navigate('/admin/dashboard/ui/home');
        return { success: true };
      }

      return { success: false, message: response.data.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  const updatePassword = async (currentPassword, newPassword, otp) => {
    try {
      const response = await axios.put('/api/auth/update-password', {
        currentPassword,
        newPassword,
        otp
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update password'
      };
    }
  };

  const requestPasswordResetOTP = async () => {
    try {
      const response = await axios.post('/api/auth/request-password-reset');
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send verification code'
      };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updatePassword, requestPasswordResetOTP, loading }}>
      {children}
    </AuthContext.Provider>
  );
};