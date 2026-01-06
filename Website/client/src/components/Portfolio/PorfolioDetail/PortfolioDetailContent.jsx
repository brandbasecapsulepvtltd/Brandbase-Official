// src/components/Portfolio/PorfolioDetail/PortfolioDetailContent.jsx
import React from 'react'
import { AccordionComponent } from './PortfolioDetailFaq/faq-accordion'
import PortfolioDetailBento from './PortfolioDetailBento'
import ClientPortfolioSection from './ClientPortfolioSection'
import TestimonalsOne from './PortfolioDetailTestimonal/Demo'
import AnimatedHeroDemo from './PortfolioDetailHero/AnimatedHeroDemo'

const PortfolioDetailContent = ({ portfolioItem }) => {
  // Destructure the data sections from the prop
  const { hero, bento, clientPortfolio, testimonials, faqs } = portfolioItem

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 dark:bg-black">
      <AnimatedHeroDemo heroData={hero} />
      <PortfolioDetailBento bentoData={bento} />
      <ClientPortfolioSection clientsData={clientPortfolio} />
      <TestimonalsOne testimonialsData={testimonials} />
      <AccordionComponent faqsData={faqs} />
    </div>
  )
}

export default PortfolioDetailContent;
