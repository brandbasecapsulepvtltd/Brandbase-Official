import React from 'react'
import AnimatedHeroDemo from '../PorfolioDetail/PortfolioDetailHero/demo'
import TestimonalsOne from '../PorfolioDetail/PortfolioDetailTestimonal/Demo'
import DemoOne from '../PorfolioDetail/PortfolioDetailFaq/demo'
import ClientPortfolioSection from '../PorfolioDetail/ClientPortfolioSection'
import PortfolioDetailBento from '../PorfolioDetail/PortfolioDetailBento'


const PortfolioContent = () => {
  return (
    <>
    {/*
    <PortfolioHero/>
    <ServicesShowcase/>
    <DemoOne/>
    */}
    <AnimatedHeroDemo/>
    <PortfolioDetailBento/>
    <ClientPortfolioSection/>
    <TestimonalsOne/>
    <DemoOne/>
    </>
  )
}

export default PortfolioContent
