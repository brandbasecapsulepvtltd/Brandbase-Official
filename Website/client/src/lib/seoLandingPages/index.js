import { MUMBAI_LANDING_PAGE } from '@/lib/mumbaiPageData';
import { MUMBAI_SEO_PAGES } from './mumbaiPages';
import { INDIA_SEO_PAGES } from './indiaPages';

function enrichPage(page) {
  return {
    ...page,
    schema: page.schema || {
      serviceName: page.breadcrumbLabel,
      serviceDescription: page.seo?.description,
      areaServed:
        page.region === 'india'
          ? { type: 'Country', name: 'India' }
          : { type: 'City', name: 'Mumbai' },
    },
  };
}

const STALL_PAGE = enrichPage({
  ...MUMBAI_LANDING_PAGE,
  region: 'mumbai',
  serviceHref: '/services/exhibition-management',
  schema: {
    serviceName: 'Exhibition Stall Design & Fabrication',
    serviceDescription:
      'End-to-end exhibition stall design, booth fabrication, and on-site installation in Mumbai.',
    areaServed: { type: 'City', name: 'Mumbai' },
  },
  faqIntro: 'Everything you need to know about hiring a stall designer in Mumbai.',
  portfolio: {
    ...MUMBAI_LANDING_PAGE.portfolio,
    portfolioAlt: 'Exhibition stall design Mumbai',
    locationLabel: 'Mumbai Exhibition',
  },
});

const ALL_PAGES = [STALL_PAGE, ...MUMBAI_SEO_PAGES, ...INDIA_SEO_PAGES].map(enrichPage);

export const SEO_LANDING_PAGES_BY_SLUG = Object.fromEntries(
  ALL_PAGES.map((page) => [page.slug, page])
);

export function getSeoLandingPage(slug) {
  return SEO_LANDING_PAGES_BY_SLUG[slug] || null;
}

export function getAllSeoLandingSlugs() {
  return ALL_PAGES.map((page) => page.slug);
}

export function getRelatedSeoLandings(currentSlug, limit = 4) {
  const current = SEO_LANDING_PAGES_BY_SLUG[currentSlug];
  if (!current) return [];
  return ALL_PAGES.filter(
    (p) => p.slug !== currentSlug && p.region === current.region
  ).slice(0, limit);
}

export { ALL_PAGES };
