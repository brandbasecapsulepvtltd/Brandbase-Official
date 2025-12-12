'use client';

import { useState, useRef } from 'react';
// import { useRouter } from 'next/navigation'; // <-- Import useRouter if needed for navigation

import CategoryHero from './CategoryHero'; // or your actual component paths
import OtherServicesAndCalculator from './OtherServicesAndCalculator';
import WhyBuildWithBcpl from './WhyBuildWithBcpl';
import ComparisonTable from './ComparisonTable';
import CategoryAdvantages from './CategoryAdvantages';
import VisionBanner from './VisionBanner';
import CategoryServices from './CategoryServices';
import Faq from './Faq';
import CtaSection from './CtaSection';
import WeCreate from './WeCreate';

const CategoryContent = ({ pageData }) => {
  const [servicesData, setServicesData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const subNavRef = useRef(null);
  const sectionRefs = useRef({});
  
  // const router = useRouter(); // <-- Initialize useRouter if you need to perform client-side redirects

  // IMPORTANT: The issue you had with 'useNavigate()' is likely inside
  // one of the child components like CategoryHero or CtaSection.
  // You must replace 'useNavigate()' with 'useRouter()' in those files.

  return (
    <div className="bg-white text-gray-800 mt-[70px]">
      <CategoryHero data={pageData.hero} />
      <VisionBanner data={pageData.visionBanner} />
      <ComparisonTable data={pageData.comparisonTable} />
      <CategoryServices data={pageData.categoryServices} />
      <CategoryAdvantages data={pageData.categoryAdvantages} />
      <WhyBuildWithBcpl data={pageData.whyBuildWithBcpl} />
      <WeCreate data={pageData.weCreate} />
      <OtherServicesAndCalculator />
      <CtaSection data={pageData.ctaData} />
      <Faq data={pageData.faqData} />
    </div>
  );
};

export default CategoryContent;