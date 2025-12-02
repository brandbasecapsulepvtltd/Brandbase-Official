'use client';

import React, { useEffect, useState, useRef } from 'react';
//import axios from '@/utils/axios'; // ✅ Make sure path is correct
import { motion, useAnimation } from 'framer-motion';
//import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import WDHero from './WDHero';
import ServicesGrid from './ServicesGrid';
import OtherServicesAndCalculator from './OtherServicesAndCalculator';
import WhyBuildWithBcpl from './WhyBuildWithBcpl';
import ComparisonTable from './ComparisonTable';
import WebDesignAdvantages from './WebDesignAdvantages';
import VisionBanner from './VisionBanner';

const WebsiteDevelopment = () => {
  const [servicesData, setServicesData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const subNavRef = useRef(null);
  const sectionRefs = useRef({});

{/*
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServicesData(res.data);
        if (res.data.length > 0) setActiveSection(res.data[0].id || res.data[0]._id);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const service of servicesData) {
        const el = sectionRefs.current[service._id];
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(service._id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [servicesData]);  
*/}

  return (
    <div className="bg-white text-gray-800 mt-[70px]">
      <WDHero />
      <VisionBanner/>
      <ComparisonTable/>
      <ServicesGrid />
      <WebDesignAdvantages/>
      <WhyBuildWithBcpl/>
      <OtherServicesAndCalculator />
    </div>
  );
};


export default WebsiteDevelopment;
