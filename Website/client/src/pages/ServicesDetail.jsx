// pages/ServicesDetail.jsx (or wherever it should be)
import React from 'react'
import ComparisonSection from '@/components/ServicesDetail/ComparisonSection'
import FeatureSection from '@/components/ServicesDetail/FeatureSection'
import VideoMakerSection from '@/components/ServicesDetail/VideoMakerSection'
import AnimateImage from '@/components/ServicesDetail/AnimateImage'
import WebHeroSection from '@/components/ServicesDetail/WebHeroSection'
import ServicePackages from '@/components/ServicesDetail/ServicePackages'

// This component should receive data as a prop, NOT import it directly
const ServicesDetail = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  
  console.log("ServicesDetail rendering with data:", data.hero.headline);
  
  return (
    <> 
      <WebHeroSection data={data.hero} />
      <AnimateImage data={data.animateImage} />
      <ComparisonSection data={data.comparison} />
      <FeatureSection data={data.features} />
      <ServicePackages data={data.packages} />
      <VideoMakerSection data={data.videoMaker} />
    </>
  )
}

export default ServicesDetail;
