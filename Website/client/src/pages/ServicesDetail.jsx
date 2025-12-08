// DynamicStatic.js (main page)
import React from 'react'
import ComparisonSection from '../Components/ServicesDetail/ComparisonSection'
import FeatureSection from '../Components/ServicesDetail/FeatureSection'
import VideoMakerSection from '../Components/ServicesDetail/VideoMakerSection'
import AnimateImage from '../Components/ServicesDetail/AnimateImage'
import WebHeroSection from '../Components/ServicesDetail/WebHeroSection'
import ServicePackages from '../Components/ServicesDetail/ServicePackages'
import { DynamicStatic } from '../Data/masterData' // Import master JSON

const ServicesDetail = () => {
  return (
    <> 
      <WebHeroSection data={DynamicStatic.hero} />
      <AnimateImage data={DynamicStatic.animateImage} />
      <ComparisonSection data={DynamicStatic.comparison} />
      <FeatureSection data={DynamicStatic.features} />
      <ServicePackages data={DynamicStatic.packages} />
      <VideoMakerSection data={DynamicStatic.videoMaker} />
    </>
  )
}

export default ServicesDetail;