// src/components/Portfolio/PorfolioDetail/PortfolioDetailContent.jsx
import React from 'react'
import { AccordionComponent } from '@/components/Portfolio/PorfolioDetail/PortfolioDetailFaq/faq-accordion'
import PortfolioDetailBento from '@/components/Portfolio/PorfolioDetail/PortfolioDetailBento'
import ClientPortfolioSection from '@/components/Portfolio/PorfolioDetail/ClientPortfolioSection'
import TestimonalsOne from '@/components/Portfolio/PorfolioDetail/PortfolioDetailTestimonal/Demo'
import AnimatedHeroDemo from '@/components/Portfolio/PorfolioDetail/PortfolioDetailHero/Demo'

const PortfolioDetailContent = ({ portfolioItem }) => {
  // Destructure the data sections from the prop
  const { hero, bento, clientPortfolio, testimonials, faqs } = portfolioItem

  return (
    <div className="min-h-screen bg-white">
      <AnimatedHeroDemo heroData={hero} />
      <PortfolioDetailBento bentoData={bento} />
      <ClientPortfolioSection clientsData={clientPortfolio} />
      <TestimonalsOne testimonialsData={testimonials} />
      <AccordionComponent faqsData={faqs} />
    </div>
  )
}

export default PortfolioDetailContent;