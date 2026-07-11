/**
 * HGH India 2026 — portfolio, blog, and home recent-work content.
 * Images live at /images/hgh-india-2026/ on the client site.
 */

const IMG = (file) => `/images/hgh-india-2026/${file}`;

const IMAGES = {
  artToDecorExterior: IMG('01-art-to-decor-exterior.jpg'),
  corelleHall: IMG('02-corelle-hall-wide.jpg'),
  artToDecorInterior: IMG('03-art-to-decor-interior.jpg'),
  artToDecorDisplay: IMG('04-art-to-decor-display.jpg'),
  berghoffCorelle: IMG('05-berghoff-corelle-display.jpg'),
  corelleBakersSecret: IMG('06-corelle-bakers-secret.jpg'),
  irekaHomes: IMG('07-ireka-homes-booth.jpg'),
  artToDecorLighting: IMG('08-art-to-decor-lighting.jpg'),
};

const GALLERY = Object.values(IMAGES);

const logo = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF6600&color=fff&size=128&bold=true`;

const SERVICES = [
  'Exhibition Stall Design',
  'Custom Fabrication',
  'Lighting & Display',
  'On-site Management',
];

const PORTFOLIO_SLUG = 'hgh-india-2026-exhibition-management';
const BLOG_SLUG = 'hgh-india-2026-bombay-exhibition-centre';
const BLOG_CATEGORY = 'exhibition';

const PORTFOLIO = {
  slug: PORTFOLIO_SLUG,
  category: 'exhibition-stalls',
  hero: {
    tagline: 'HGH India 2026 · Bombay Exhibition Centre, Mumbai',
    title: 'Turnkey Exhibition Stalls at India’s Premier Home Products Trade Show',
    description:
      'BrandBase Capsule delivered full stall design, fabrication, lighting, and on-site management for leading brands at the 19th edition of HGH India — 30 June to 3 July 2026 at BEC Goregaon, Mumbai.',
    ctaText: 'Plan Your Next Exhibition',
    videoUrl: '',
    images: [IMAGES.corelleHall, IMAGES.artToDecorExterior, IMAGES.irekaHomes, IMAGES.artToDecorLighting],
  },
  bento: {
    mainHeading: 'HGH India 2026 — Design, Build, Deliver',
    cards: {
      conceptToReality: {
        title: 'From Concept to Booth',
        imageAlt: 'ART TO DECOR exhibition stall at HGH India 2026',
        imageUrl: IMAGES.artToDecorExterior,
      },
      projectsDelivered: {
        count: '4+',
        label: 'Brand Stalls Delivered',
      },
      amazingWork: {
        title: 'Premium finishes, precise lighting, and on-time handover across every booth.',
        structureImage: IMAGES.artToDecorInterior,
        structureAlt: 'Exhibition stall interior fabrication at HGH India',
      },
      showcaseStall: {
        imageUrl: IMAGES.corelleHall,
        alt: 'Corelle exhibition booth at HGH India 2026',
        location: 'Bombay Exhibition Centre, Mumbai',
      },
      citiesReach: {
        count: '4',
        label: 'Days On-site',
      },
    },
    services: [
      '3D Stall Concept Design',
      'Custom Fabrication',
      'Integrated Lighting',
      'Graphics & Branding',
      'On-site Coordination',
      'Quality Handover',
    ],
  },
  clientPortfolio: [
    {
      imagePosition: 'right',
      logo: logo('ART TO DECOR'),
      companyName: 'ART TO DECOR',
      industry: 'Home Décor & Lifestyle',
      projectTitle: 'Stylize Your Space — Premium Lifestyle Booth',
      projectDescription:
        'A warm, gallery-style exhibition environment with integrated shelving, accent lighting, and curated product zones — designed and fabricated end-to-end by BrandBase Capsule for HGH India 2026.',
      servicesProvided: SERVICES,
      results: [
        { value: '4', label: 'Days Live' },
        { value: '100%', label: 'On-time Handover' },
        { value: '360°', label: 'Brand Visibility' },
        { value: 'LED', label: 'Integrated Lighting' },
      ],
      mediaItems: [
        { type: 'image', url: IMAGES.artToDecorExterior, alt: 'ART TO DECOR stall exterior at HGH India 2026', title: 'Exterior View' },
        { type: 'image', url: IMAGES.artToDecorInterior, alt: 'ART TO DECOR stall interior', title: 'Interior Display' },
        { type: 'image', url: IMAGES.artToDecorLighting, alt: 'ART TO DECOR product lighting', title: 'Product Lighting' },
      ],
      testimonial: {
        clientImage: logo('ART TO DECOR'),
        clientName: 'Exhibitor Representative',
        position: 'ART TO DECOR',
        quote:
          'The booth design captured our brand aesthetic perfectly. Lighting, finishes, and on-site support were handled professionally throughout the show.',
      },
    },
    {
      imagePosition: 'left',
      logo: logo('Corelle'),
      companyName: 'Corelle (The Stone Sapphire India)',
      industry: 'Kitchenware & Houseware',
      projectTitle: 'Large-Format Brand Pavilion at HGH India',
      projectDescription:
        'A high-impact pavilion with circular brand signage, tiered product displays, integrated spot lighting, and coordinated sub-brand zones — delivered with full fabrication and on-site management.',
      servicesProvided: SERVICES,
      results: [
        { value: 'Multi', label: 'Brand Zones' },
        { value: '4', label: 'Show Days' },
        { value: 'High', label: 'Footfall Visibility' },
        { value: 'Full', label: 'Turnkey Delivery' },
      ],
      mediaItems: [
        { type: 'image', url: IMAGES.corelleHall, alt: 'Corelle pavilion at HGH India 2026', title: 'Main Pavilion' },
        { type: 'image', url: IMAGES.corelleBakersSecret, alt: "Corelle Baker's Secret zone", title: "Baker's Secret Zone" },
        { type: 'image', url: IMAGES.berghoffCorelle, alt: 'BergHOFF display within Corelle pavilion', title: 'Sub-brand Display' },
      ],
      testimonial: {
        clientImage: logo('Corelle'),
        clientName: 'Exhibitor Representative',
        position: 'Corelle / The Stone Sapphire',
        quote:
          'BrandBase Capsule executed a complex multi-zone stall with precision. The finish quality and on-site coordination met our expectations for a flagship trade show presence.',
      },
    },
    {
      imagePosition: 'right',
      logo: logo('BergHOFF'),
      companyName: 'BergHOFF',
      industry: 'Cookware & Kitchenware',
      projectTitle: 'Premium Cookware Display Unit',
      projectDescription:
        'A sculptural mint-green display structure with integrated product shelving, spotlighting, and brand signage — fabricated and installed for maximum product visibility at HGH India 2026.',
      servicesProvided: SERVICES,
      results: [
        { value: '3D', label: 'Display Structure' },
        { value: 'LED', label: 'Track Lighting' },
        { value: '4', label: 'Days On-site' },
        { value: '100%', label: 'Quality Finish' },
      ],
      mediaItems: [
        { type: 'image', url: IMAGES.berghoffCorelle, alt: 'BergHOFF display at HGH India', title: 'BergHOFF Display' },
        { type: 'image', url: IMAGES.corelleBakersSecret, alt: 'Kitchenware exhibition hall context', title: 'Hall Context' },
      ],
      testimonial: {
        clientImage: logo('BergHOFF'),
        clientName: 'Exhibitor Representative',
        position: 'BergHOFF',
        quote:
          'The display unit stood out on the show floor. Fabrication quality and lighting made our product range shine throughout the exhibition.',
      },
    },
    {
      imagePosition: 'left',
      logo: logo('ireka HOMES'),
      companyName: 'ireka HOMES',
      industry: 'Furniture & Home Living',
      projectTitle: 'Furniture Showroom Booth — Build A Home You Love',
      projectDescription:
        'An immersive furniture showroom booth with backlit brand panels, living-room staging, track lighting, and premium finishes — designed, built, and managed for HGH India 2026.',
      servicesProvided: SERVICES,
      results: [
        { value: 'Full', label: 'Showroom Layout' },
        { value: '4', label: 'Show Days' },
        { value: 'Premium', label: 'Finish Quality' },
        { value: 'On-site', label: 'Management' },
      ],
      mediaItems: [
        { type: 'image', url: IMAGES.irekaHomes, alt: 'ireka HOMES booth at HGH India 2026', title: 'ireka HOMES Booth' },
        { type: 'image', url: IMAGES.artToDecorDisplay, alt: 'Lifestyle product display reference', title: 'Display Detail' },
      ],
      testimonial: {
        clientImage: logo('ireka HOMES'),
        clientName: 'Exhibitor Representative',
        position: 'ireka HOMES',
        quote:
          'Our booth felt like a real showroom on the exhibition floor. The team handled design, fabrication, and on-site support seamlessly.',
      },
    },
  ],
  testimonials: {
    sectionTitle: 'Trusted at India’s Leading Trade Shows',
    sectionDescription:
      'BrandBase Capsule has delivered exhibition stalls across Mumbai’s major venues including BEC Goregaon and NESCO.',
    testimonials: [
      {
        text: 'Professional stall fabrication with timely handover and excellent on-site coordination at HGH India 2026.',
        image: logo('BCPL'),
        name: 'Exhibition Client',
        role: 'HGH India 2026',
      },
      {
        text: 'The team translated our brand vision into a standout booth with premium lighting and finishes.',
        image: logo('BCPL'),
        name: 'Brand Manager',
        role: 'Home & Lifestyle Sector',
      },
      {
        text: 'End-to-end exhibition management — from design drawings to final handover on the show floor.',
        image: logo('BCPL'),
        name: 'Procurement Head',
        role: 'Houseware & Décor',
      },
    ],
  },
  faqs: {
    sectionTitle: 'HGH India 2026 — Frequently Asked Questions',
    faqs: [
      {
        question: 'What is HGH India?',
        answer:
          'HGH India is one of India’s largest B2B trade exhibitions for home textiles, home décor, furniture, houseware, gifts, and lifestyle products. The 19th edition ran from 30 June to 3 July 2026 at the Bombay Exhibition Centre, Goregaon, Mumbai.',
      },
      {
        question: 'What services did BrandBase Capsule provide at HGH India 2026?',
        answer:
          'We delivered full exhibition stall design, custom fabrication, integrated lighting, graphics, and on-site management for brands including ART TO DECOR, Corelle, BergHOFF, and ireka HOMES.',
      },
      {
        question: 'Do you manage exhibitions outside Mumbai?',
        answer:
          'Yes. BrandBase Capsule provides exhibition management and stall fabrication across India and internationally. Contact us for your next trade show.',
      },
    ],
  },
  gallery: GALLERY,
  metadata: {
    title: 'HGH India 2026 Exhibition Stalls | BrandBase Capsule',
    description:
      'Case study: turnkey exhibition stall design, fabrication, and on-site management for ART TO DECOR, Corelle, BergHOFF, and ireka HOMES at HGH India 2026, Mumbai.',
    keywords: [
      'HGH India 2026',
      'exhibition management Mumbai',
      'exhibition stall design',
      'Bombay Exhibition Centre',
      'BrandBase Capsule',
    ],
  },
};

const BLOG = {
  metadata: {
    slug: BLOG_SLUG,
    category: BLOG_CATEGORY,
    isEditorPick: true,
    isSlider: true,
    isHelpfulResources: true,
    title: 'HGH India 2026: BrandBase Capsule at India’s Premier Home Products Trade Show',
    description:
      'The 19th edition of HGH India opened at Bombay Exhibition Centre, Mumbai. Here’s how BrandBase Capsule delivered turnkey exhibition stalls for leading home and lifestyle brands.',
    author: {
      name: 'Brandbase Capsule Team',
      role: 'Exhibition Management',
      image: 'https://ik.imagekit.io/vinayak06/Services/exhibtionManagement.png',
      twitter: 'https://twitter.com/brandbasecapsule',
      linkedin: 'https://www.linkedin.com/company/brandbasecapsule',
    },
    readTime: '8 min read',
    featuredImage: IMAGES.corelleHall,
    publishDate: new Date('2026-06-30'),
    seo: {
      metaTitle: 'HGH India 2026 | Exhibition Stalls by BrandBase Capsule',
      metaDescription:
        'HGH India 2026 at BEC Mumbai — exhibition stall design, fabrication, and on-site management for ART TO DECOR, Corelle, BergHOFF, and ireka HOMES.',
      keywords: ['HGH India 2026', 'exhibition management', 'Mumbai trade show', 'stall design'],
      canonicalUrl: `https://www.brandbasecapsule.com/blogs/${BLOG_CATEGORY}/${BLOG_SLUG}`,
    },
    isAI: false,
  },
  sections: [
    {
      id: 'intro',
      title: 'HGH India 2026 Opens in Mumbai',
      content: [
        'The stage is set for the 19th edition of HGH India 2026, one of the country’s largest and most influential B2B trade exhibitions dedicated to home textiles, home décor, furniture, houseware, gifts, and lifestyle products.',
        'The event opened on 30 June 2026 at the Bombay Exhibition Centre, Goregaon, Mumbai, and continued until 3 July 2026, attracting thousands of trade visitors, buyers, manufacturers, retailers, architects, interior designers, and industry professionals from across India and international markets.',
      ],
      media: [{ type: 'image', url: IMAGES.corelleHall, caption: 'HGH India 2026 — Bombay Exhibition Centre, Mumbai' }],
    },
    {
      id: 'platform',
      title: 'India’s Leading Home Products Platform',
      content: [
        'Organised by Texzone Information Services Pvt. Ltd., HGH India has become a significant business platform for companies looking to expand their footprint in India’s rapidly growing home and lifestyle market.',
        'Since its inception in 2012, the exhibition has connected domestic and international manufacturers, exporters, and suppliers with retailers, distributors, importers, institutional buyers, and hospitality businesses.',
      ],
    },
    {
      id: 'visitors',
      title: 'Thousands of Buyers and Industry Professionals',
      content: [
        'The four-day exhibition witnessed participation from business visitors representing hundreds of cities across India, along with delegates from several international markets.',
        'Professionals from every segment of the home and lifestyle industry attended — including retailers, wholesalers, distributors, online sellers, architects, interior designers, procurement heads, hospitality buyers, and corporate sourcing teams.',
      ],
    },
    {
      id: 'showcase',
      title: 'Wide Product Showcase Across Categories',
      content: [
        'HGH India 2026 featured an extensive display covering home textiles, furnishing fabrics, curtains, upholstery, furniture, mattresses, decorative accessories, carpets, rugs, lighting, kitchenware, tableware, houseware, gifts, and lifestyle products.',
        'Leading Indian and international brands unveiled latest innovations, sustainable solutions, and contemporary designs reflecting current market trends.',
      ],
      media: [{ type: 'image', url: IMAGES.artToDecorExterior, caption: 'ART TO DECOR — lifestyle exhibition stall' }],
    },
    {
      id: 'festive',
      title: 'Festive and Wedding Season Business Opportunities',
      content: [
        'A major highlight of HGH India 2026 is its strategic focus on helping retailers prepare for India’s upcoming festive and wedding shopping seasons — periods that account for a significant share of annual sales in home furnishings and lifestyle sectors.',
        'Retailers and buyers evaluated new collections months before peak demand, identifying fast-selling products and planning inventory more efficiently.',
      ],
    },
    {
      id: 'schedule',
      title: 'Visitor Schedule and Opening Day',
      content: [
        'The exhibition officially commenced on 30 June 2026 with exclusive entry reserved for HGH India Plus Members, allowing premium buyers to interact with exhibitors in a focused business environment.',
        'General trade visitors — retailers, wholesalers, architects, designers, and sourcing professionals — visited from 1 July to 3 July 2026.',
      ],
    },
    {
      id: 'brandbase',
      title: 'BrandBase Capsule at HGH India 2026',
      content: [
        'BrandBase Capsule delivered full exhibition stall design, custom fabrication, integrated lighting, and on-site management for leading brands at HGH India 2026, including ART TO DECOR, Corelle (The Stone Sapphire India), BergHOFF, and ireka HOMES.',
        'From 3D concept and structural fabrication to final handover on the show floor, our team ensured premium finishes, brand-accurate displays, and seamless on-site coordination across all four days of the exhibition.',
        `View the full case study at /portfolio/${PORTFOLIO_SLUG}`,
      ],
      media: [
        { type: 'image', url: IMAGES.irekaHomes, caption: 'ireka HOMES — furniture showroom booth' },
        { type: 'image', url: IMAGES.berghoffCorelle, caption: 'BergHOFF — premium cookware display' },
        { type: 'image', url: IMAGES.artToDecorLighting, caption: 'ART TO DECOR — integrated product lighting' },
      ],
    },
    {
      id: 'conclusion',
      title: 'India’s Premier Home Products Trade Show',
      content: [
        'As India’s home and lifestyle industry continues to grow — driven by urbanisation, rising disposable incomes, and demand for premium living spaces — HGH India remains at the forefront of industry development.',
        'With strong participation from leading domestic and global brands, innovative product showcases, and extensive networking opportunities, the 19th edition of HGH India reinforced its reputation as India’s premier trade exhibition for home textiles, furniture, décor, houseware, and lifestyle products.',
      ],
    },
  ],
};

const HOME_RECENT_WORK_ITEMS = [
  {
    image: IMAGES.corelleHall,
    name: 'HGH India 2026',
    description: 'Exhibition management at Bombay Exhibition Centre',
    link: `/portfolio/${PORTFOLIO_SLUG}`,
  },
  {
    image: IMAGES.artToDecorExterior,
    name: 'ART TO DECOR Stall',
    description: 'Custom exhibition design & fabrication',
    link: `/portfolio/${PORTFOLIO_SLUG}`,
  },
  {
    image: IMAGES.irekaHomes,
    name: 'ireka HOMES Booth',
    description: 'Premium furniture exhibition stall',
    link: `/portfolio/${PORTFOLIO_SLUG}`,
  },
];

const HOME_RECENT_WORK_SPANS = [
  'col-span-2 md:col-span-1 md:row-span-2',
  'col-span-2 md:col-span-1 md:row-span-1',
  'col-span-2 md:col-span-1 md:row-span-2',
];

const CASE_STUDIES_SECTION = {
  heading: 'Case Studies',
  subHeading:
    'Exhibition stalls, brand experiences, and digital projects delivered across industries',
};

const CASE_STUDY_ITEMS = [
  {
    id: 20260701,
    companyLogo: logo('HGH India'),
    companyName: 'HGH India 2026',
    industry: 'Exhibition Management',
    title: 'Turnkey Exhibition Stalls at India’s Premier Home Products Trade Show',
    desc: 'BrandBase Capsule delivered full stall design, fabrication, lighting, and on-site management for leading brands at HGH India 2026 — Bombay Exhibition Centre, Mumbai.',
    url: IMAGES.corelleHall,
    galleryImages: [IMAGES.corelleHall, IMAGES.artToDecorExterior, IMAGES.irekaHomes, IMAGES.berghoffCorelle],
    services: SERVICES,
    results: [
      { value: '4+', label: 'Brand Stalls' },
      { value: '4', label: 'Show Days' },
      { value: '100%', label: 'On-time Handover' },
      { value: 'BEC', label: 'Mumbai Venue' },
    ],
    testimonial: {
      quote:
        'End-to-end exhibition management — from design and fabrication to on-site coordination across all four days of the show.',
      author: 'BrandBase Capsule Team',
      role: 'Exhibition Management',
      avatar: 'https://ik.imagekit.io/vinayak06/Services/exhibtionManagement.png',
    },
  },
  {
    id: 20260702,
    companyLogo: logo('ART TO DECOR'),
    companyName: 'ART TO DECOR',
    industry: 'Home Décor & Lifestyle',
    title: 'Stylize Your Space — Premium Lifestyle Booth',
    desc: 'A warm, gallery-style exhibition environment with integrated shelving, accent lighting, and curated product zones at HGH India 2026.',
    url: IMAGES.artToDecorExterior,
    galleryImages: [IMAGES.artToDecorExterior, IMAGES.artToDecorInterior, IMAGES.artToDecorLighting],
    services: SERVICES,
    results: [
      { value: 'LED', label: 'Accent Lighting' },
      { value: '360°', label: 'Brand Visibility' },
      { value: '4', label: 'Days Live' },
      { value: 'Full', label: 'Turnkey' },
    ],
    testimonial: {
      quote: 'The booth design captured our brand aesthetic perfectly with professional lighting and finishes throughout the show.',
      author: 'Exhibitor Representative',
      role: 'ART TO DECOR',
      avatar: logo('ART TO DECOR'),
    },
  },
  {
    id: 20260703,
    companyLogo: logo('Corelle'),
    companyName: 'Corelle',
    industry: 'Kitchenware & Houseware',
    title: 'Large-Format Brand Pavilion at HGH India',
    desc: 'High-impact pavilion with circular brand signage, tiered displays, integrated spot lighting, and coordinated sub-brand zones for Corelle at HGH India 2026.',
    url: IMAGES.corelleBakersSecret,
    galleryImages: [IMAGES.corelleHall, IMAGES.corelleBakersSecret, IMAGES.berghoffCorelle],
    services: SERVICES,
    results: [
      { value: 'Multi', label: 'Brand Zones' },
      { value: '4', label: 'Show Days' },
      { value: 'High', label: 'Footfall' },
      { value: 'Full', label: 'Fabrication' },
    ],
    testimonial: {
      quote: 'A complex multi-zone stall executed with precision, premium finish quality, and reliable on-site coordination.',
      author: 'Exhibitor Representative',
      role: 'Corelle / The Stone Sapphire',
      avatar: logo('Corelle'),
    },
  },
  {
    id: 20260704,
    companyLogo: logo('ireka HOMES'),
    companyName: 'ireka HOMES',
    industry: 'Furniture & Home Living',
    title: 'Furniture Showroom Booth — Build A Home You Love',
    desc: 'An immersive furniture showroom booth with backlit brand panels, living-room staging, and premium finishes at HGH India 2026.',
    url: IMAGES.irekaHomes,
    galleryImages: [IMAGES.irekaHomes, IMAGES.artToDecorDisplay],
    services: SERVICES,
    results: [
      { value: 'Full', label: 'Showroom Layout' },
      { value: '4', label: 'Show Days' },
      { value: 'Premium', label: 'Finishes' },
      { value: 'On-site', label: 'Management' },
    ],
    testimonial: {
      quote: 'Our booth felt like a real showroom on the exhibition floor — design, fabrication, and on-site support were seamless.',
      author: 'Exhibitor Representative',
      role: 'ireka HOMES',
      avatar: logo('ireka HOMES'),
    },
  },
];

module.exports = {
  PORTFOLIO_SLUG,
  BLOG_SLUG,
  BLOG_CATEGORY,
  IMAGES,
  PORTFOLIO,
  BLOG,
  HOME_RECENT_WORK_ITEMS,
  HOME_RECENT_WORK_SPANS,
  CASE_STUDIES_SECTION,
  CASE_STUDY_ITEMS,
};
