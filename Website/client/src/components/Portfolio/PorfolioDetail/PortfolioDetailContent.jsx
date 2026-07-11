import React from 'react';
import Link from 'next/link';
import { AccordionComponent } from './PortfolioDetailFaq/faq-accordion';
import PortfolioDetailBento from './PortfolioDetailBento';
import ClientPortfolioSection from './ClientPortfolioSection';
import TestimonalsOne from './PortfolioDetailTestimonal/Demo';
import AnimatedHeroDemo from './PortfolioDetailHero/AnimatedHeroDemo';
import KineticScrollGallery from '../KineticScrollGallery';
import PortfolioDetailHeader from './PortfolioDetailHeader';

function formatCategory(category) {
  if (!category) return 'Case Study';
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const PortfolioDetailContent = ({ portfolioItem, slug }) => {
  const { hero, bento, clientPortfolio, testimonials, faqs, category, gallery } = portfolioItem;
  const categoryLabel = formatCategory(category);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <PortfolioDetailHeader
        slug={slug}
        title={hero?.title || 'Case Study'}
        categoryLabel={categoryLabel}
      />
      <AnimatedHeroDemo heroData={hero} categoryLabel={categoryLabel} />
      <PortfolioDetailBento bentoData={bento} />
      <KineticScrollGallery images={gallery} />
      {clientPortfolio?.length > 0 && (
        <ClientPortfolioSection clientsData={clientPortfolio} />
      )}
      {testimonials?.testimonials?.length > 0 && (
        <TestimonalsOne testimonialsData={testimonials} />
      )}
      {faqs?.faqs?.length > 0 && (
        <AccordionComponent faqsData={faqs} />
      )}

      {/* Bottom CTA */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6600]">
            Start Your Project
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Ready for results like this?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Let&apos;s discuss your exhibition, event, or digital project with our team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white font-semibold rounded-xl transition-colors"
            >
              More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetailContent;
