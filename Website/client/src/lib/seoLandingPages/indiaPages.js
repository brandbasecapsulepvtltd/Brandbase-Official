import { IK, HGH_MAIN_IMAGE, HGH_IMAGES, indiaMarkets, baseBottomCta } from './shared';

const PORTFOLIO_HGH = '/portfolio/hgh-india-2026-exhibition-management';

export const INDIA_SEO_PAGES = [
  {
    slug: 'exhibition-management-company-india',
    breadcrumbLabel: 'Exhibition Management India',
    region: 'india',
    serviceHref: '/services/exhibition-management',
    schema: {
      serviceName: 'Exhibition Management',
      serviceDescription:
        'Pan-India exhibition stall design, fabrication, and on-site management for trade shows and B2B expos.',
      areaServed: { type: 'Country', name: 'India' },
    },
    seo: {
      title: 'Exhibition Management Company in India | Stall Design & Fabrication | BrandBase Capsule',
      description:
        'Leading exhibition management company in India — custom stall design, booth fabrication, and turnkey on-site execution at HGH India, BEC Mumbai, and major venues nationwide.',
      keywords: [
        'exhibition management company india',
        'stall design company india',
        'exhibition booth fabrication india',
        'trade show stall designer india',
        'exhibition management mumbai india',
        'HGH India stall designer',
        'BrandBase Capsule exhibition',
      ],
      canonicalPath: '/exhibition-management-company-india',
      ogImage: `${IK}/stalls/BlogsImages/exhibition.jpg`,
    },
    hero: {
      badge: 'Pan-India Exhibition Experts',
      titleLead: 'Top',
      titleAccent: 'Exhibition',
      titleMain: 'Management Company',
      titleLocation: 'in India',
      subtitle:
        'From Mumbai to Delhi, Bengaluru to Hyderabad — we design, fabricate, and manage exhibition stalls that put your brand center stage at India’s biggest trade shows.',
      primaryCta: { label: 'Get Exhibition Quote', href: '/appointment' },
      secondaryCta: { label: 'HGH India Case Study', href: PORTFOLIO_HGH },
    },
    about: {
      image: HGH_MAIN_IMAGE,
      imageAlt: 'HGH India 2026 exhibition stalls by BrandBase Capsule',
      statValue: '450+',
      statLabel: 'Stalls Delivered',
      title: 'Trusted at',
      titleAccent: 'HGH India 2026',
      paragraphs: [
        'India’s exhibition industry demands partners who understand venue rules, tight build schedules, and brand-grade finishes.',
        'BrandBase Capsule delivered turnkey stalls for ART TO DECOR, Corelle, BergHOFF, and ireka HOMES at HGH India 2026 — and execute nationally for industrial, lifestyle, and pharma expos.',
      ],
      highlights: ['3D Stall Design', 'In-house Fabrication', 'Pan-India Logistics', 'On-site Management'],
    },
    venues: indiaMarkets(),
    services: {
      eyebrow: 'Exhibition Services',
      title: 'End-to-End Exhibition Management',
      subtitle: 'One partner from concept and 3D design to dismantling.',
      items: [
        { title: 'Stall Design', icon: 'pencil-ruler', desc: '3D visuals and brand-aligned spatial planning.' },
        { title: 'Fabrication', icon: 'hammer', desc: 'Wood, metal, acrylic, and modular systems.' },
        { title: 'Graphics & Branding', icon: 'palette', desc: 'UV prints, backlit panels, and signage.' },
        { title: 'Logistics', icon: 'truck', desc: 'Pan-India shipping, storage, and venue delivery.' },
        { title: 'Electrical & AV', icon: 'lightbulb', desc: 'Lighting design and display integration.' },
        { title: 'On-site Teams', icon: 'award', desc: 'Supervisors, installers, and show-floor support.' },
      ],
    },
    portfolio: {
      eyebrow: 'Recent Exhibitions',
      title: 'Crafted Across India',
      portfolioAlt: 'Exhibition stall India',
      locationLabel: 'Trade Show Stall',
      cta: { label: 'View HGH India Project', href: PORTFOLIO_HGH },
      images: HGH_IMAGES,
    },
    faqIntro: 'Questions about exhibition management services across India.',
    faqs: [
      {
        question: 'Which exhibition management company is best in India?',
        answer:
          'BrandBase Capsule is recognized for turnkey stall design and fabrication with proven delivery at HGH India, Bombay Exhibition Centre, and major national trade fairs.',
      },
      {
        question: 'Do you work outside Mumbai?',
        answer:
          'Yes — we execute exhibitions across India including Delhi NCR, Bengaluru, Hyderabad, Chennai, and Ahmedabad with local vendor networks.',
      },
      {
        question: 'What was your role at HGH India 2026?',
        answer:
          'We provided full stall design, fabrication, lighting, and on-site management for multiple leading home and lifestyle brands at BEC Goregaon.',
      },
      {
        question: 'How long does stall fabrication take?',
        answer:
          'Typically 3–4 weeks: one week for design approvals and 2–3 weeks for production, depending on complexity and venue.',
      },
    ],
    bottomCta: baseBottomCta('across India'),
  },
  {
    slug: 'event-management-company-india',
    breadcrumbLabel: 'Event Management India',
    region: 'india',
    serviceHref: '/services/events-exhibition/event-planning-management',
    schema: {
      serviceName: 'Event Management',
      serviceDescription: 'Corporate events, conferences, and brand activations across India.',
      areaServed: { type: 'Country', name: 'India' },
    },
    seo: {
      title: 'Event Management Company in India | Corporate Events Nationwide | BrandBase Capsule',
      description:
        'Top event management company in India for corporate conferences, product launches, exhibitions, and brand experiences — Mumbai HQ with pan-India execution.',
      keywords: [
        'event management company india',
        'corporate event planner india',
        'event management agency india',
        'conference management india',
        'product launch event india',
        'BrandBase Capsule events',
      ],
      canonicalPath: '/event-management-company-india',
      ogImage: `${IK}/ServiceSlider/onsite.jpg`,
    },
    hero: {
      badge: 'National Event Production',
      titleLead: 'Leading',
      titleAccent: 'Event',
      titleMain: 'Management Company',
      titleLocation: 'in India',
      subtitle:
        'Corporate events, conferences, exhibitions, and activations — planned and produced with precision from Mumbai to metros nationwide.',
      primaryCta: { label: 'Plan Your Event', href: '/appointment' },
      secondaryCta: { label: 'Event Services', href: '/services/events-exhibition/event-planning-management' },
    },
    about: {
      image: `${IK}/ServiceSlider/onsite.jpg`,
      imageAlt: 'Event management India',
      statValue: '500+',
      statLabel: 'Events Nationwide',
      title: 'Events at',
      titleAccent: 'National Scale',
      paragraphs: [
        'India’s corporate event landscape spans five-star hotels, convention centres, exhibition halls, and outdoor venues — each with unique compliance and production needs.',
        'BrandBase Capsule provides strategy, creative, AV, and on-ground teams for brands that need consistent quality across cities.',
      ],
      highlights: ['Multi-city Execution', 'Vendor Network', 'AV Production', 'Show Management'],
    },
    venues: indiaMarkets(),
    services: {
      eyebrow: 'Event Capabilities',
      title: 'Corporate & Brand Events',
      subtitle: 'Conferences, launches, exhibitions, and experiential marketing.',
      items: [
        { title: 'Conference Production', icon: 'award', desc: 'Delegate flows, staging, and speaker management.' },
        { title: 'Product Launches', icon: 'lightbulb', desc: 'Reveal moments, media zones, and influencer ops.' },
        { title: 'Exhibition Support', icon: 'truck', desc: 'Stall launches, on-floor activations, and hospitality.' },
        { title: 'AV & Staging', icon: 'palette', desc: 'Sound, lighting, LED, and live direction.' },
        { title: 'Hybrid Events', icon: 'pencil-ruler', desc: 'Streaming, remote speakers, and digital engagement.' },
        { title: 'On-site Crews', icon: 'hammer', desc: 'Show callers, ushers, and floor supervisors.' },
      ],
    },
    portfolio: {
      eyebrow: 'Event Portfolio',
      title: 'National Highlights',
      portfolioAlt: 'Corporate event India',
      locationLabel: 'Corporate Event',
      cta: { label: 'View Portfolio', href: '/portfolio' },
      images: HGH_IMAGES.slice(0, 4),
    },
    faqIntro: 'Questions about pan-India event management.',
    faqs: [
      {
        question: 'Do you manage events outside Mumbai?',
        answer:
          'Yes. We produce events across India with local partners while maintaining BrandBase quality standards and a single point of contact.',
      },
      {
        question: 'What types of events do you handle?',
        answer:
          'Corporate conferences, AGMs, product launches, exhibition-related events, award nights, and brand activations.',
      },
      {
        question: 'Can you combine events with exhibition stalls?',
        answer:
          'Absolutely — many clients use us for both stall fabrication and launch events on the exhibition floor.',
      },
    ],
    bottomCta: baseBottomCta('across India'),
  },
  {
    slug: 'website-development-company-india',
    breadcrumbLabel: 'Web Development India',
    region: 'india',
    serviceHref: '/services/website-development',
    schema: {
      serviceName: 'Website Development',
      serviceDescription: 'Business websites and e-commerce for brands across India.',
      areaServed: { type: 'Country', name: 'India' },
    },
    seo: {
      title: 'Website Development Company in India | Business & E-commerce Sites | BrandBase Capsule',
      description:
        'Best website development company in India — SEO-ready business sites, e-commerce, CMS, and landing pages for brands targeting Indian and global customers.',
      keywords: [
        'website development company india',
        'web design agency india',
        'best website development india',
        'business website india',
        'ecommerce development india',
        'SEO website development india',
      ],
      canonicalPath: '/website-development-company-india',
      ogImage: `${IK}/Mavnox/BrandBase/Business-removebg-preview.png`,
    },
    hero: {
      badge: 'India Web Studio',
      titleLead: 'Best',
      titleAccent: 'Website',
      titleMain: 'Development Company',
      titleLocation: 'in India',
      subtitle:
        'High-performance websites for Indian businesses going digital — mobile-first, SEO-ready, and built to convert visitors into customers.',
      primaryCta: { label: 'Request Web Proposal', href: '/appointment' },
      secondaryCta: { label: 'Web Services', href: '/services/website-development' },
    },
    about: {
      image: `${IK}/Mavnox/BrandBase/portfolioWeb-removebg-preview.png`,
      imageAlt: 'Website development India',
      statValue: '98+',
      statLabel: 'Websites Live',
      title: 'Digital Presence',
      titleAccent: 'That Performs',
      paragraphs: [
        'Indian buyers research online before they call — your website must load fast, rank on Google, and guide users to action.',
        'BrandBase Capsule builds for SMEs, enterprises, and exporters who need credible digital storefronts with measurable results.',
      ],
      highlights: ['India & Global SEO', 'E-commerce Ready', 'Secure & Scalable', 'Dedicated Support'],
    },
    venues: indiaMarkets(),
    services: {
      eyebrow: 'Web Solutions',
      title: 'Websites for Indian Businesses',
      subtitle: 'From brochure sites to full e-commerce platforms.',
      items: [
        { title: 'Corporate Websites', icon: 'pencil-ruler', desc: 'Trust-building sites for B2B and services.' },
        { title: 'E-commerce', icon: 'truck', desc: 'Sell across India with payment gateway integration.' },
        { title: 'Landing Pages', icon: 'lightbulb', desc: 'Campaign pages for ads and exhibitions.' },
        { title: 'CMS & Blogs', icon: 'palette', desc: 'Content marketing infrastructure built-in.' },
        { title: 'Technical SEO', icon: 'award', desc: 'Schema, speed, and indexation best practices.' },
        { title: 'Maintenance', icon: 'hammer', desc: 'SLA-based support and security updates.' },
      ],
    },
    portfolio: {
      eyebrow: 'Web Projects',
      title: 'Built for Growth',
      portfolioAlt: 'Website project India',
      locationLabel: 'Website',
      cta: { label: 'View Portfolio', href: '/portfolio' },
      images: [
        `${IK}/Mavnox/BrandBase/Business-removebg-preview.png`,
        `${IK}/Mavnox/BrandBase/LandingPage-removebg-preview.png`,
      ],
    },
    faqIntro: 'Questions about website development across India.',
    faqs: [
      {
        question: 'Do you serve clients outside Mumbai?',
        answer: 'Yes — we work with clients across India and internationally, with remote discovery and project management.',
      },
      {
        question: 'Are your websites optimized for Indian mobile users?',
        answer: 'Yes. Mobile-first design and fast loading on 4G networks are standard.',
      },
      {
        question: 'Can you integrate payment gateways for Indian e-commerce?',
        answer: 'Yes — Razorpay, PayU, and other Indian payment providers are supported.',
      },
    ],
    bottomCta: baseBottomCta('across India'),
  },
  {
    slug: 'av-production-company-india',
    breadcrumbLabel: 'AV Production India',
    region: 'india',
    serviceHref: '/services/av-production',
    schema: {
      serviceName: 'Audio & Video Production',
      serviceDescription: 'Corporate video and event coverage across India.',
      areaServed: { type: 'Country', name: 'India' },
    },
    seo: {
      title: 'AV Production Company in India | Corporate Video & Event Films | BrandBase Capsule',
      description:
        'Professional audio and video production company in India — corporate films, exhibition coverage, promotional videos, and post-production for brands nationwide.',
      keywords: [
        'av production company india',
        'video production company india',
        'corporate film production india',
        'event videography india',
        'promotional video india',
      ],
      canonicalPath: '/av-production-company-india',
      ogImage: `${IK}/Services/videoProd-removebg-preview.png`,
    },
    hero: {
      badge: 'National AV Crews',
      titleLead: 'Top',
      titleAccent: 'AV',
      titleMain: 'Production Company',
      titleLocation: 'in India',
      subtitle:
        'Corporate films, exhibition highlight reels, and event coverage — cinematic quality with crews available across India’s major cities.',
      primaryCta: { label: 'Book Video Production', href: '/appointment' },
      secondaryCta: { label: 'AV Services', href: '/services/av-production' },
    },
    about: {
      image: `${IK}/Services/videoProd-removebg-preview.png`,
      imageAlt: 'AV production India',
      statValue: '200+',
      statLabel: 'Videos Delivered',
      title: 'Film & Event',
      titleAccent: 'Excellence',
      paragraphs: [
        'Indian brands need video that works on YouTube, Instagram, exhibition screens, and boardrooms.',
        'BrandBase Capsule handles scripting, shooting, and post-production — including multi-city event coverage and trade show films.',
      ],
      highlights: ['Corporate Films', 'Trade Show Coverage', 'Social Content', 'Post-Production'],
    },
    venues: indiaMarkets(),
    services: {
      eyebrow: 'Production Services',
      title: 'Video & Audio Production',
      subtitle: 'Concept to delivery — one accountable team.',
      items: [
        { title: 'Brand Films', icon: 'award', desc: 'Company profiles and stakeholder communications.' },
        { title: 'Exhibition Video', icon: 'truck', desc: 'Stall loops, walkthroughs, and highlight edits.' },
        { title: 'Event Coverage', icon: 'lightbulb', desc: 'Multi-camera shoots at venues nationwide.' },
        { title: 'Social Reels', icon: 'palette', desc: 'Short-form content for digital campaigns.' },
        { title: 'Editing & GFX', icon: 'pencil-ruler', desc: 'Colour, motion graphics, and localization.' },
        { title: 'Live Streaming', icon: 'hammer', desc: 'Hybrid events and webinar production.' },
      ],
    },
    portfolio: {
      eyebrow: 'Production Work',
      title: 'Films & Coverage',
      portfolioAlt: 'Video production India',
      locationLabel: 'AV Project',
      cta: { label: 'View Portfolio', href: PORTFOLIO_HGH },
      images: [`${IK}/Services/videoProd-removebg-preview.png`, ...HGH_IMAGES.slice(0, 3)],
    },
    faqIntro: 'Questions about video production in India.',
    faqs: [
      {
        question: 'Can you shoot at exhibitions across India?',
        answer: 'Yes — our crews cover major trade fairs including HGH India, IMTEX, pharma expos, and corporate summits.',
      },
      {
        question: 'Do you provide scripts and creative direction?',
        answer: 'Yes. We offer full creative development or work from your brief and brand guidelines.',
      },
      {
        question: 'What formats do you deliver?',
        answer: 'MP4 for web, vertical cuts for social, and ProRes masters on request.',
      },
    ],
    bottomCta: baseBottomCta('across India'),
  },
  {
    slug: 'digital-marketing-company-india',
    breadcrumbLabel: 'Digital Marketing India',
    region: 'india',
    serviceHref: '/services/digital-marketing',
    schema: {
      serviceName: 'Digital Marketing',
      serviceDescription: 'SEO, ads, and social media for brands targeting India and global markets.',
      areaServed: { type: 'Country', name: 'India' },
    },
    seo: {
      title: 'Digital Marketing Company in India | SEO & Performance Ads | BrandBase Capsule',
      description:
        'Top digital marketing company in India — SEO, Google Ads, social media, and content marketing for brands growing in India and worldwide markets.',
      keywords: [
        'digital marketing company india',
        'SEO company india',
        'best digital marketing agency india',
        'social media marketing india',
        'performance marketing india',
        'online marketing company india',
      ],
      canonicalPath: '/digital-marketing-company-india',
      ogImage: `${IK}/Services/digitalMarketing-removebg-preview.png`,
    },
    hero: {
      badge: 'Growth Marketing India',
      titleLead: 'Top',
      titleAccent: 'Digital',
      titleMain: 'Marketing Company',
      titleLocation: 'in India',
      subtitle:
        'SEO, paid media, and content that scales — helping Indian brands win locally and compete in global markets.',
      primaryCta: { label: 'Free Marketing Consultation', href: '/appointment' },
      secondaryCta: { label: 'Digital Services', href: '/services/digital-marketing' },
    },
    about: {
      image: `${IK}/Services/digitalMarketing-removebg-preview.png`,
      imageAlt: 'Digital marketing India',
      statValue: '150+',
      statLabel: 'Campaigns Run',
      title: 'Growth Across',
      titleAccent: 'India & Beyond',
      paragraphs: [
        'Indian consumers and B2B buyers discover brands on search and social — your marketing must be data-led and locally relevant.',
        'BrandBase Capsule runs integrated campaigns for exhibition exhibitors, manufacturers, and service brands targeting India and export markets.',
      ],
      highlights: ['Search & Social', 'Lead Generation', 'Content Engine', 'Transparent Reporting'],
    },
    venues: indiaMarkets(),
    services: {
      eyebrow: 'Marketing Stack',
      title: 'Digital Marketing Services',
      subtitle: 'Full-funnel strategy and execution.',
      items: [
        { title: 'SEO', icon: 'lightbulb', desc: 'Rank for high-intent keywords in India and abroad.' },
        { title: 'Google & Meta Ads', icon: 'award', desc: 'Performance campaigns with ROAS tracking.' },
        { title: 'Social Media', icon: 'palette', desc: 'LinkedIn, Instagram, and YouTube content.' },
        { title: 'Content Marketing', icon: 'pencil-ruler', desc: 'Blogs, case studies, and landing pages.' },
        { title: 'Exhibitor Marketing', icon: 'truck', desc: 'Pre-show buzz and post-show lead nurture.' },
        { title: 'Analytics', icon: 'hammer', desc: 'GA4, pixels, and monthly growth reviews.' },
      ],
    },
    portfolio: {
      eyebrow: 'Campaign Work',
      title: 'Measurable Results',
      portfolioAlt: 'Digital marketing India',
      locationLabel: 'Campaign',
      cta: { label: 'View Case Studies', href: '/portfolio' },
      images: [
        `${IK}/Mavnox/BrandBase/SEOOptimize_no_bg_ta5un9b9.png`,
        `${IK}/Mavnox/BrandBase/onlineAds_no_bg_3tj3n4nc.png`,
      ],
    },
    faqIntro: 'Questions about digital marketing in India.',
    faqs: [
      {
        question: 'Do you work with B2B and exhibition clients?',
        answer:
          'Yes — a core strength is marketing for exhibitors, manufacturers, and professional services with long sales cycles.',
      },
      {
        question: 'Can you target international buyers?',
        answer: 'Yes. We run geo-targeted campaigns for export-focused Indian brands.',
      },
      {
        question: 'What reporting do you provide?',
        answer: 'Monthly dashboards covering traffic, leads, ad spend, ROAS, and keyword rankings.',
      },
    ],
    bottomCta: baseBottomCta('across India'),
  },
];
