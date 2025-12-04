import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../sections/HeroSection';
import AboutUs from '../sections/AboutUs';
import BrandElevation from '../sections/BrandElevation';
import RecentWork from '../sections/RecentWork';
import Clients from '../sections/Clients';
import ServiceSlider from '../Components/ServiceSlider';
import TestimonialSlider from '../sections/TestimonalSlider';
import Faqs from '../sections/Faqs';
import CTASection from '../sections/CTASection';
import HeroSlider from '../sections/HeroSlider';

// API configuration
const API_CONFIG = {
  baseURL: 'https://brandbase.onrender.com',
  timeout: 10000,
};

const api = axios.create(API_CONFIG);

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/homepage');
      
      if (response.data.success && response.data.data) {
        setHomePageData(response.data.data);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching home page data:', err);
      
      // Handle different types of errors
      if (err.code === 'NETWORK_ERROR' || err.code === 'ECONNREFUSED') {
        setError('Unable to connect to server. Please make sure the backend is running.');
      } else if (err.response?.status === 404) {
        setError('Home page data not found. Please seed the database first.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.response?.data?.message || err.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading BrandBase</h3>
          <p className="text-gray-500">Fetching the latest content...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Content Unavailable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchHomePageData}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Retry Loading
            </button>
            <div className="text-sm text-gray-500">
              <p>Make sure:</p>
              <ul className="list-disc list-inside mt-2 text-left">
                <li>Backend server is running on port 5000</li>
                <li>Database is properly seeded</li>
                <li>API endpoint /api/homepage is accessible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if we have the minimum required data
  if (!homePageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h2>
          <p className="text-gray-600">Please check the backend configuration.</p>
        </div>
      </div>
    );
  }

  // Destructure data for easier access
  const {
    heroSection,
    brandElevation,
    recentWork,
    clients,
    testimonials,
    faqs
  } = homePageData;

  // Render the complete page with fetched data
  return (
    <div className="home-page">
      {/* Hero Section <HeroSection data={heroSection} />*/}
      {heroSection && <HeroSlider/>}
      
      {/* About Us Section */}
      <AboutUs />
      
      {/* Brand Elevation Section */}
      {brandElevation && <BrandElevation data={brandElevation} />}
      
      {/* Recent Work Section */}
      {recentWork && <RecentWork data={recentWork} />}
      
      {/* Clients Section */}
      {clients && <Clients data={clients} />}
      
      {/* Service Slider Section */}
      <ServiceSlider />
      
      {/* Testimonials Section */}
      {testimonials && <TestimonialSlider data={testimonials} />}
      
      {/* FAQs Section */}
      {faqs && <Faqs data={faqs} />}      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;