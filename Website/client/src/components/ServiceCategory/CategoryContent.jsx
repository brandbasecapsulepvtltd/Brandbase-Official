'use client';

import Breadcrumbs from '@/components/General/Breadcrumbs';
import { CATEGORY_SEO_DEFAULTS, getCategoryBreadcrumbLabel } from '@/lib/siteConfig';

import CategoryHero from './CategoryHero';
import OtherServicesAndCalculator from './OtherServicesAndCalculator';
import WhyBuildWithBcpl from './WhyBuildWithBcpl';
import ComparisonTable from './ComparisonTable';
import CategoryAdvantages from './CategoryAdvantages';
import VisionBanner from './VisionBanner';
import CategoryServices from './CategoryServices';
import Faq from './Faq';
import CtaSection from './CtaSection';
import WeCreate from './WeCreate';
import ServiceHeroSlider from './ServiceHeroSlider';

const CategoryContent = ({ pageData, categorySlug }) => {
  const breadcrumbLabel = getCategoryBreadcrumbLabel(categorySlug, pageData);
  const faqIntro =
    CATEGORY_SEO_DEFAULTS[categorySlug]?.faqIntro ||
    'Clear answers to help you plan your project with confidence.';

  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 font-sans">
      <ServiceHeroSlider slides={pageData.heroSlider?.slides} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: breadcrumbLabel, href: `/services/${categorySlug}` },
          ]}
        />
      </div>

      <main id="main-content">
        {!pageData.heroSlider?.slides?.length && <CategoryHero data={pageData.hero} />}
        <VisionBanner data={pageData.visionBanner} />
        <ComparisonTable data={pageData.comparisonTable} />
        <CategoryServices data={pageData.categoryServices} />
        <CategoryAdvantages data={pageData.categoryAdvantages} />
        <WhyBuildWithBcpl data={pageData.whyBuildWithBcpl} />
        <WeCreate data={pageData.weCreate} />
        <OtherServicesAndCalculator />
        <CtaSection data={pageData.ctaData} />
        {pageData.faqData?.length > 0 && (
          <Faq data={pageData.faqData} intro={faqIntro} />
        )}
      </main>
    </div>
  );
};

export default CategoryContent;
