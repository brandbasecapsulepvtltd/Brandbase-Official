/** Categories hidden from the public services grid */
export const EXCLUDED_SERVICE_CATEGORIES = [
  'app-development',
  'mobile-app-development',
  'event-management',
];

/** Matches footer service order (Event & Exhibition first on grid) */
export const PUBLIC_SERVICE_GRID_ORDER = [
  'exhibition-management',
  'digital-marketing',
  'website-development',
  'av-production',
  'branding-design',
];

function isExcludedService(href = '', category = '') {
  const slug = category || href.replace(/^\/services\//, '').split('/')[0];
  return EXCLUDED_SERVICE_CATEGORIES.includes(slug);
}

/** Fallback service cards when API data is unavailable (matches footer) */
export const FALLBACK_SERVICES = [
  {
    title: 'Event & Exhibition Management That Elevates Your Brand',
    description: 'Stall design, event planning, exhibitions, and on-site execution.',
    href: '/services/exhibition-management',
    imgSrc: 'https://ik.imagekit.io/vinayak06/Services/exhibtionManagement.png',
    variant: 'red',
  },
  {
    title: 'Digital Marketing Solutions That Grow Your Business',
    description: 'SEO, paid ads, social media, and content that drives measurable ROI.',
    href: '/services/digital-marketing',
    imgSrc: 'https://ik.imagekit.io/vinayak06/Services/digitalMarketing-removebg-preview.png',
    variant: 'blue',
  },
  {
    title: 'Website Design & Development Services',
    description: 'Fast, scalable websites and e-commerce built for conversions.',
    href: '/services/website-development',
    imgSrc: 'https://ik.imagekit.io/vinayak06/Services/WebDevelopment1-removebg-preview.png',
    variant: 'indigo',
  },
  {
    title: 'Audio & Video Production That Tells Your Story',
    description: 'Corporate films, ads, and event coverage with cinematic quality.',
    href: '/services/av-production',
    imgSrc: 'https://ik.imagekit.io/vinayak06/Services/videoProd-removebg-preview.png',
    variant: 'teal',
  },
  {
    title: 'Brand Design That Performs',
    description: 'Identity systems, creative assets, and brand experiences that stand out.',
    href: '/services/branding-design',
    imgSrc: 'https://ik.imagekit.io/vinayak06/Services/branding-removebg-preview.png',
    variant: 'orange',
  },
];

const VARIANT_CYCLE = ['orange', 'blue', 'red', 'teal', 'indigo'];

/** Stable card color per category (no plain white cards on the grid) */
const CATEGORY_VARIANT = {
  'branding-design': 'orange',
  'digital-marketing': 'blue',
  'exhibition-management': 'red',
  'events-exhibition': 'red',
  'event-management': 'teal',
  'website-development': 'indigo',
  'av-production': 'teal',
};

function cleanServiceTitle(title) {
  if (!title || typeof title !== 'string') return title;
  return title.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim();
}

const CATEGORY_IMAGES = {
  'exhibition-management': 'https://ik.imagekit.io/vinayak06/Services/exhibtionManagement.png',
  'events-exhibition': 'https://ik.imagekit.io/vinayak06/Services/exhibtionManagement.png',
  'digital-marketing': 'https://ik.imagekit.io/vinayak06/Services/digitalMarketing-removebg-preview.png',
  'website-development': 'https://ik.imagekit.io/vinayak06/Services/WebDevelopment1-removebg-preview.png',
  'app-development': 'https://ik.imagekit.io/vinayak06/Services/appDevelopment-removebg-preview%20(1).png',
  'mobile-app-development': 'https://ik.imagekit.io/vinayak06/Services/appDevelopment-removebg-preview%20(1).png',
  'av-production': 'https://ik.imagekit.io/vinayak06/Services/videoProd-removebg-preview.png',
  'branding-design': 'https://ik.imagekit.io/vinayak06/Services/branding-removebg-preview.png',
};

function formatCategoryTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function sortByPublicGridOrder(categories) {
  return [...categories].sort((a, b) => {
    const aIndex = PUBLIC_SERVICE_GRID_ORDER.indexOf(a.category);
    const bIndex = PUBLIC_SERVICE_GRID_ORDER.indexOf(b.category);
    const aRank = aIndex === -1 ? 999 : aIndex;
    const bRank = bIndex === -1 ? 999 : bIndex;
    if (aRank !== bRank) return aRank - bRank;
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

export function mapCategoriesToServices(categories = []) {
  return sortByPublicGridOrder(categories)
    .filter((cat) => cat.isActive !== false && !isExcludedService('', cat.category))
    .map((cat, index) => ({
      title: cleanServiceTitle(cat.hero?.title || formatCategoryTitle(cat.category)),
      description: cat.hero?.subtitle || cat.hero?.description || '',
      href: `/services/${cat.category}`,
      imgSrc: cat.hero?.imgUrl || CATEGORY_IMAGES[cat.category] || '',
      variant: CATEGORY_VARIANT[cat.category] || VARIANT_CYCLE[index % VARIANT_CYCLE.length],
    }));
}

export function resolveServicesList(categories) {
  const mapped = mapCategoriesToServices(categories);
  const bySlug = Object.fromEntries(
    mapped.map((service) => [service.href.replace(/^\/services\//, ''), service])
  );
  const fallbackBySlug = Object.fromEntries(
    FALLBACK_SERVICES.map((service) => [service.href.replace(/^\/services\//, ''), service])
  );

  const merged = PUBLIC_SERVICE_GRID_ORDER.map(
    (slug) => bySlug[slug] || fallbackBySlug[slug]
  ).filter(Boolean);

  const list = merged.length > 0 ? merged : FALLBACK_SERVICES;
  return list.filter((s) => !isExcludedService(s.href));
}
