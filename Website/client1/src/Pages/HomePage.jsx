import React from 'react'
import HeroSection from '../sections/HeroSection'
import AboutUs from '../sections/AboutUs'
import BrandElevation from '../sections/BrandElevation'
import RecentWork from '../sections/RecentWork'
import Clients from '../sections/Clients'
import ServiceSlider from '../Components/ServiceSlider'
import TestimonialSlider from '../sections/TestimonalSlider'
import Faqs from '../sections/Faqs'
import CTASection from '../sections/CTASection'

const HomePage = () => {
  return (
    <>
    <HeroSection/>
    <AboutUs/>
    <BrandElevation/>
    <RecentWork/>
    <Clients/>
    <ServiceSlider/>
    <TestimonialSlider/>
    <Faqs/>
    <CTASection/>
    </>
  )
}

export default HomePage
