/**
 * Canonical home hero slides for MongoDB seed / patch scripts.
 * Order: exhibition → event → web → av → digital (no app development).
 */

const IK = 'https://ik.imagekit.io/vinayak06';

const HERO_IMAGES = {
  event: '/images/hero-slides/event-live-concert.png',
  web: '/images/hero-slides/web-development-hero.png',
  av: '/images/hero-slides/av-video-production.png',
};

const HOME_HERO_SLIDES = [
  {
    id: 1,
    title: 'Exhibition Stalls That Command the Floor',
    subtext:
      'Custom stall design, fabrication, and on-site management — turnkey exhibition solutions that make your brand impossible to ignore.',
    image: `${IK}/stalls/BlogsImages/exhibition.jpg`,
    link: '/services/events-exhibition/stall-design',
    linkText: 'Explore',
  },
  {
    id: 2,
    title: 'Where Events Become Iconic Experiences',
    subtext:
      'From high-impact exhibitions to unforgettable brand events, we design, build, and manage experiences that command attention and leave a lasting legacy.',
    image: HERO_IMAGES.event,
    link: '/services/exhibition-management',
    linkText: 'Explore',
  },
  {
    id: 3,
    title: 'Web Experiences Built to Perform',
    subtext:
      'High-end websites engineered for speed, scalability, and conversions—where design meets precision and performance.',
    image: HERO_IMAGES.web,
    link: '/services/website-development',
    linkText: 'Explore',
  },
  {
    id: 4,
    title: 'Cinematic Stories. Flawless Execution.',
    subtext:
      'Premium audio-visual production crafted to elevate your brand—sharp visuals, immersive sound, and storytelling that feels larger than life.',
    image: HERO_IMAGES.av,
    link: '/services/av-production',
    linkText: 'Explore',
  },
  {
    id: 5,
    title: 'Marketing That Commands the Digital Space',
    subtext:
      'Strategic digital marketing designed to build authority, drive demand, and turn attention into measurable growth across every platform.',
    image:
      'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=2070',
    link: '/services/digital-marketing',
    linkText: 'Explore',
  },
];

module.exports = { HOME_HERO_SLIDES };
