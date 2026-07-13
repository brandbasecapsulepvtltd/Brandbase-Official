export const IK = 'https://ik.imagekit.io/vinayak06';

export const HGH_MAIN_IMAGE = '/images/hgh-india-2026/02-corelle-hall-wide-v2.jpg';

export const HGH_IMAGES = [
  HGH_MAIN_IMAGE,
  '/images/hgh-india-2026/01-art-to-decor-exterior-v2.jpg',
  '/images/hgh-india-2026/07-ireka-homes-booth-v2.jpg',
  '/images/hgh-india-2026/03-art-to-decor-interior-v2.jpg',
  '/images/hgh-india-2026/06-corelle-bakers-secret-v2.jpg',
  '/images/hgh-india-2026/08-art-to-decor-lighting-v2.jpg',
];

export function mumbaiVenues() {
  return {
    eyebrow: 'Venue Expertise',
    title: 'Exhibiting in Mumbai?',
    titleAccent: 'Know Your Venue',
    subtitle:
      "Mumbai's major exhibition hubs have distinct technical requirements. We navigate permissions, logistics, and on-site execution seamlessly.",
    locations: [
      {
        id: 'bec',
        name: 'Bombay Exhibition Centre',
        subtitle: '(NESCO, Goregaon East)',
        accentClass: 'text-[#FF6600]',
        icon: 'map-pin',
        points: [
          { label: 'Shows', text: 'HGH India, industrial expos, and large-scale B2B trade fairs.' },
          { label: 'Logistics', text: 'Coordinated vehicle passes, rigging, and electrical sanctions.' },
          { label: 'Our Work', text: 'Turnkey stalls for ART TO DECOR, Corelle, BergHOFF, and ireka HOMES at HGH India 2026.' },
        ],
      },
      {
        id: 'jio',
        name: 'Jio World Centre',
        subtitle: '(BKC, Bandra Kurla Complex)',
        accentClass: 'text-[#FF6600]',
        icon: 'award',
        points: [
          { label: 'Profile', text: 'Premium corporate summits, lifestyle shows, and brand launches.' },
          { label: 'Finish', text: 'High-grade modular builds with integrated AV and digital activations.' },
          { label: 'Support', text: 'Dedicated project managers from design approval to dismantling.' },
        ],
      },
    ],
  };
}

export function indiaMarkets() {
  return {
    eyebrow: 'Pan-India Reach',
    title: 'Serving Brands',
    titleAccent: 'Across India',
    subtitle:
      'Headquartered in Mumbai with execution capability across India’s major business and exhibition cities.',
    locations: [
      {
        id: 'mumbai',
        name: 'Mumbai & Maharashtra',
        subtitle: 'Head office — NESCO, BKC, NCPA',
        accentClass: 'text-[#FF6600]',
        icon: 'map-pin',
        points: [
          { label: 'Hub', text: 'Bombay Exhibition Centre, Jio World Centre, and NESCO IT Park.' },
          { label: 'Strength', text: 'Exhibition stalls, corporate events, and AV production.' },
        ],
      },
      {
        id: 'metros',
        name: 'Delhi NCR · Bengaluru · Hyderabad',
        subtitle: 'National exhibition & event coverage',
        accentClass: 'text-[#FF6600]',
        icon: 'award',
        points: [
          { label: 'Coverage', text: 'Stall fabrication and on-site teams for major trade shows.' },
          { label: 'Partners', text: 'Logistics, local vendors, and venue compliance managed end-to-end.' },
        ],
      },
    ],
  };
}

export function baseBottomCta(regionLabel) {
  return {
    title: 'Ready to Grow Your Brand?',
    titleAccent: 'Book a Free Consultation',
    subtitle: `Partner with BrandBase Capsule — trusted ${regionLabel} for exhibitions, events, web, AV, and digital marketing.`,
    cta: { label: 'Start Your Project', href: '/appointment' },
  };
}
