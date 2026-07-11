/**
 * Canonical home hero slides — 5 public services, fixed order.
 * App development is excluded from the homepage carousel.
 */

export const HOME_HERO_SLIDE_ORDER = ['exhibition', 'event', 'web', 'av', 'digital'];

const IK = 'https://ik.imagekit.io/vinayak06';

/** Hero images — local assets (deploy with public/images/hero-slides/) */
const HERO_IMAGES = {
  event: '/images/hero-slides/event-live-concert.png',
  web: '/images/hero-slides/web-development-hero.png',
  av: '/images/hero-slides/av-video-production.png',
};

export const HOME_HERO_SLIDES = {
  event: {
    id: 'event',
    title: 'Where Events Become Iconic Experiences',
    subtext:
      'From high-impact exhibitions to unforgettable brand events, we design, build, and manage experiences that command attention and leave a lasting legacy.',
    image: HERO_IMAGES.event,
    link: '/services/exhibition-management',
    linkText: 'Explore',
  },
  exhibition: {
    id: 'exhibition',
    title: 'Exhibition Stalls That Command the Floor',
    subtext:
      'Custom stall design, fabrication, and on-site management — turnkey exhibition solutions that make your brand impossible to ignore.',
    image: `${IK}/stalls/BlogsImages/exhibition.jpg`,
    link: '/services/events-exhibition/stall-design',
    linkText: 'Explore',
  },
  web: {
    id: 'web',
    title: 'Web Experiences Built to Perform',
    subtext:
      'High-end websites engineered for speed, scalability, and conversions—where design meets precision and performance.',
    image: HERO_IMAGES.web,
    link: '/services/website-development',
    linkText: 'Explore',
  },
  av: {
    id: 'av',
    title: 'Cinematic Stories. Flawless Execution.',
    subtext:
      'Premium audio-visual production crafted to elevate your brand—sharp visuals, immersive sound, and storytelling that feels larger than life.',
    image: HERO_IMAGES.av,
    link: '/services/av-production',
    linkText: 'Explore',
  },
  digital: {
    id: 'digital',
    title: 'Marketing That Commands the Digital Space',
    subtext:
      'Strategic digital marketing designed to build authority, drive demand, and turn attention into measurable growth across every platform.',
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=2070',
    link: '/services/digital-marketing',
    linkText: 'Explore',
  },
};

const APP_PATTERNS = [
  /app-development/i,
  /mobile-app/i,
  /apps that power/i,
  /mobile application/i,
];

function isAppSlide(slide) {
  const haystack = `${slide?.link || ''} ${slide?.title || ''} ${slide?.subtext || ''}`;
  return APP_PATTERNS.some((pattern) => pattern.test(haystack));
}

function detectSlideKey(slide) {
  const haystack = `${slide?.link || ''} ${slide?.title || ''} ${slide?.subtext || ''}`.toLowerCase();

  if (isAppSlide(slide)) return 'app';
  if (haystack.includes('digital-marketing') || haystack.includes('marketing that commands')) {
    return 'digital';
  }
  if (haystack.includes('av-production') || haystack.includes('cinematic stories')) {
    return 'av';
  }
  if (haystack.includes('website-development') || haystack.includes('web experiences')) {
    return 'web';
  }
  if (
    haystack.includes('stall-design') ||
    haystack.includes('fabrication') ||
    haystack.includes('stalls that command')
  ) {
    return 'exhibition';
  }
  if (
    haystack.includes('exhibition-management') ||
    haystack.includes('events-exhibition') ||
    haystack.includes('events become') ||
    haystack.includes('iconic experiences')
  ) {
    return 'event';
  }
  return null;
}

/** Merge CMS slides into canonical order; always returns exactly 5 slides, no app. */
export function normalizeHomeHeroSlides(cmsSlides = []) {
  const merged = Object.fromEntries(
    HOME_HERO_SLIDE_ORDER.map((key) => [key, { ...HOME_HERO_SLIDES[key] }])
  );

  for (const slide of cmsSlides) {
    if (!slide || isAppSlide(slide)) continue;
    const key = detectSlideKey(slide);
    if (!key || key === 'app' || !merged[key]) continue;
    merged[key] = {
      ...merged[key],
      ...slide,
      id: merged[key].id,
      title: slide.title || merged[key].title,
      subtext: slide.subtext || merged[key].subtext,
      // Code defaults are source of truth — avoids stale/broken CMS image URLs
      image: merged[key].image,
      link: slide.link || merged[key].link,
      linkText: slide.linkText || merged[key].linkText,
    };
  }

  return HOME_HERO_SLIDE_ORDER.map((key, index) => ({
    ...merged[key],
    id: index + 1,
  }));
}

export function getHomeHeroSlidesForDb() {
  return normalizeHomeHeroSlides([]);
}
