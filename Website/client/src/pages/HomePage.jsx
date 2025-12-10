'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import HeroSection from '@/components/homeComponents/HeroSection';
import AboutUs from '@/components/homeComponents/AboutUs';
import BrandElevation from '@/components/homeComponents/BrandElevation';
import RecentWork from '@/components/homeComponents/RecentWork';
import Clients from '@/components/homeComponents/Clients';
import Faqs from '@/components/homeComponents/Faqs';
import CTASection from '@/components/homeComponents/CTASection';
import TestimonialSlider from '@/components/homeComponents/TestimonalSlider';
import ServiceSlider from '@/components/ServiceSlider';
import HeroSlider from '@/components/homeComponents/HeroSlider';

// API configuration
const API_CONFIG = {
  baseURL: 'https://brandbase.onrender.com/api',
  timeout: 10000,
};

const api = axios.create(API_CONFIG);

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fix: Scroll to top on page load/reload
  useLayoutEffect(() => {
    // Reset scroll position immediately when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll without animation
    });
    
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

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
      <main 
        className="min-h-screen flex items-center justify-center bg-gray-50"
        aria-label="Loading page content"
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"
            aria-label="Loading indicator"
            role="status"
          ></div>
          <h1 className="text-xl font-semibold text-gray-700 mb-2">Loading BrandBase</h1>
          <p className="text-gray-500">Fetching the latest content...</p>
        </div>
      </main>
    );
  }

  // Render error state
  if (error) {
    return (
      <main 
        className="min-h-screen flex items-center justify-center bg-gray-50"
        aria-label="Error page"
      >
        <article className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <div 
            className="text-6xl mb-6"
            aria-hidden="true"
          >🚧</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Content Unavailable</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchHomePageData}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              aria-label="Retry loading page content"
            >
              Retry Loading
            </button>
            <div className="text-sm text-gray-500">
              <h2 className="font-medium mb-2">Make sure:</h2>
              <ul className="list-disc list-inside mt-2 text-left" role="list">
                <li role="listitem">Backend server is running on port 5000</li>
                <li role="listitem">Database is properly seeded</li>
                <li role="listitem">API endpoint /api/homepage is accessible</li>
              </ul>
            </div>
          </div>
        </article>
      </main>
    );
  }

  // Check if we have the minimum required data
  if (!homePageData) {
    return (
      <main 
        className="min-h-screen flex items-center justify-center bg-gray-50"
        aria-label="No data available"
      >
        <div className="text-center">
          <div 
            className="text-6xl mb-4"
            aria-hidden="true"
          >❓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h1>
          <p className="text-gray-600">Please check the backend configuration.</p>
        </div>
      </main>
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
    <main className="home-page">
      {/* Hero Section */}
      {/*{heroSection && <HeroSection data={heroSection} />} */}
      <HeroSlider/>
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
    </main>
  );
};

export default HomePage;