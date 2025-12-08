// DynamicStatic.js (main page)
import React from 'react'
import ComparisonSection from '../Components/ServicesDetail/ComparisonSection'
import FeatureSection from '../Components/ServicesDetail/FeatureSection'
import VideoMakerSection from '../Components/ServicesDetail/VideoMakerSection'
import AnimateImage from '../Components/ServicesDetail/AnimateImage'
import WebHeroSection from '../Components/ServicesDetail/WebHeroSection'
import ServicePackages from '../Components/ServicesDetail/ServicePackages'
import { websiteDevelopmentData } from '../Data/masterData' // Import master JSON

const DynamicStatic = () => {
  return (
    <> 
      <WebHeroSection data={websiteDevelopmentData.hero} />
      <AnimateImage data={websiteDevelopmentData.animateImage} />
      <ComparisonSection data={websiteDevelopmentData.comparison} />
      <FeatureSection data={websiteDevelopmentData.features} />
      <ServicePackages data={websiteDevelopmentData.packages} />
      <VideoMakerSection data={websiteDevelopmentData.videoMaker} />
    </>
  )
}

export default DynamicStatic;