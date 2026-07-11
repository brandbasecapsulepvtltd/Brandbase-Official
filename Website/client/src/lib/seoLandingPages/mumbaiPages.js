import { IK, HGH_IMAGES, mumbaiVenues, baseBottomCta } from './shared';

export const MUMBAI_SEO_PAGES = [
  {
    slug: 'top-event-management-company-mumbai',
    breadcrumbLabel: 'Event Management Mumbai',
    region: 'mumbai',
    serviceHref: '/services/events-exhibition/event-planning-management',
    schema: {
      serviceName: 'Corporate Event Management',
      serviceDescription:
        'End-to-end corporate event planning, production, branding, and on-site coordination in Mumbai.',
      areaServed: { type: 'City', name: 'Mumbai' },
    },
    seo: {
      title: 'Top Event Management Company in Mumbai | Corporate Events & Launches | BrandBase Capsule',
      description:
        'Leading event management company in Mumbai for corporate conferences, product launches, exhibitions, and brand activations. Strategy, production, and flawless on-site execution.',
      keywords: [
        'top event management company mumbai',
        'event management agency mumbai',
        'corporate event planner mumbai',
        'event production company mumbai',
        'brand activation mumbai',
        'conference management mumbai',
        'BrandBase Capsule events',
      ],
      canonicalPath: '/top-event-management-company-mumbai',
      ogImage: `${IK}/stalls/BlogsImages/exhibition.jpg`,
    },
    hero: {
      badge: "Mumbai's Event Specialists",
      titleLead: 'Top',
      titleAccent: 'Event',
      titleMain: 'Management Company',
      titleLocation: 'in Mumbai',
      subtitle:
        'From concept to curtain call — we plan, produce, and manage corporate events, launches, and large-format brand experiences across Mumbai’s premier venues.',
      primaryCta: { label: 'Plan Your Event', href: '/appointment' },
      secondaryCta: { label: 'View Our Work', href: '/portfolio' },
    },
    about: {
      image: `${IK}/ServiceSlider/onsite.jpg`,
      imageAlt: 'On-site event management team in Mumbai',
      statValue: '500+',
      statLabel: 'Events Delivered',
      title: 'Events That',
      titleAccent: 'Command Attention',
      paragraphs: [
        'Searching for a top event management company in Mumbai means finding a partner who owns timelines, vendors, staging, and guest experience — not just decoration.',
        'BrandBase Capsule delivers corporate events, exhibition openings, conferences, and brand activations with dedicated project managers and production crews based in Mumbai.',
      ],
      highlights: ['Venue & Vendor Management', 'Stage & Production', 'Guest Experience Design', 'On-site Coordination'],
    },
    venues: mumbaiVenues(),
    services: {
      eyebrow: 'Event Services',
      title: 'Full-Service Event Management',
      subtitle: 'Strategy, creative, production, and on-ground execution under one roof.',
      items: [
        { title: 'Event Strategy', icon: 'lightbulb', desc: 'Objectives, run-of-show, and stakeholder alignment.' },
        { title: 'Venue & Logistics', icon: 'truck', desc: 'Permits, rigging, catering, and vendor coordination.' },
        { title: 'Stage & AV', icon: 'award', desc: 'Sound, lighting, LED walls, and live show calling.' },
        { title: 'Brand Experience', icon: 'palette', desc: 'Theming, signage, and immersive activations.' },
        { title: 'Corporate Conferences', icon: 'pencil-ruler', desc: 'Delegate management, speakers, and breakout sessions.' },
        { title: 'On-site Management', icon: 'hammer', desc: 'Dedicated show callers and floor teams on event day.' },
      ],
    },
    portfolio: {
      eyebrow: 'Recent Events',
      title: 'Mumbai & National Shows',
      portfolioAlt: 'Event management project Mumbai',
      locationLabel: 'Corporate Event',
      cta: { label: 'View Portfolio', href: '/portfolio' },
      images: HGH_IMAGES.slice(0, 4),
    },
    faqIntro: 'Common questions about hiring an event management company in Mumbai.',
    faqs: [
      {
        question: 'What is the best event management company in Mumbai?',
        answer:
          'BrandBase Capsule is trusted for corporate events, exhibition support, and brand activations in Mumbai — with in-house production, venue expertise at BEC and BKC, and end-to-end project management.',
      },
      {
        question: 'Do you manage both corporate events and exhibitions?',
        answer:
          'Yes. We handle standalone corporate events as well as exhibition-related launches, stall inaugurations, and on-floor brand activations.',
      },
      {
        question: 'Which venues do you work with in Mumbai?',
        answer:
          'We regularly execute at Bombay Exhibition Centre (NESCO), Jio World Centre (BKC), hotels, and corporate campuses across Mumbai and Navi Mumbai.',
      },
      {
        question: 'How early should we book an event manager?',
        answer:
          'For large corporate events we recommend 6–8 weeks lead time. Smaller activations can be turned around faster depending on scope.',
      },
    ],
    bottomCta: baseBottomCta('in Mumbai'),
  },
  {
    slug: 'best-website-development-company-mumbai',
    breadcrumbLabel: 'Web Development Mumbai',
    region: 'mumbai',
    serviceHref: '/services/website-development',
    schema: {
      serviceName: 'Website Design & Development',
      serviceDescription: 'SEO-ready business websites, e-commerce, and landing pages built for performance in Mumbai.',
      areaServed: { type: 'City', name: 'Mumbai' },
    },
    seo: {
      title: 'Best Website Development Company in Mumbai | SEO-Ready Business Sites | BrandBase Capsule',
      description:
        'Top website development company in Mumbai — fast, mobile-first business websites, e-commerce, CMS, and landing pages engineered for SEO and conversions.',
      keywords: [
        'best website development company mumbai',
        'web design agency mumbai',
        'website development company mumbai',
        'business website design mumbai',
        'ecommerce website development mumbai',
        'SEO friendly website mumbai',
        'BrandBase Capsule web',
      ],
      canonicalPath: '/best-website-development-company-mumbai',
      ogImage: `${IK}/Mavnox/BrandBase/Business-removebg-preview.png`,
    },
    hero: {
      badge: 'Performance-First Web Studio',
      titleLead: 'Best',
      titleAccent: 'Website',
      titleMain: 'Development Company',
      titleLocation: 'in Mumbai',
      subtitle:
        'We build fast, SEO-ready websites that turn visitors into leads — business sites, e-commerce, CMS platforms, and high-converting landing pages.',
      primaryCta: { label: 'Get a Web Quote', href: '/appointment' },
      secondaryCta: { label: 'Our Services', href: '/services/website-development' },
    },
    about: {
      image: `${IK}/Mavnox/BrandBase/Business-removebg-preview.png`,
      imageAlt: 'Website development team Mumbai',
      statValue: '98+',
      statLabel: 'Sites Launched',
      title: 'Web Experiences',
      titleAccent: 'Built to Perform',
      paragraphs: [
        'The best website development company in Mumbai should deliver speed, clean code, and measurable conversions — not just attractive mockups.',
        'BrandBase Capsule engineers mobile-first sites with Core Web Vitals in mind, CMS flexibility, and SEO foundations so your business ranks and converts.',
      ],
      highlights: ['Mobile-First Design', 'SEO Architecture', 'E-commerce & CMS', 'Ongoing Support'],
    },
    venues: {
      eyebrow: 'Who We Build For',
      title: 'Mumbai Businesses',
      titleAccent: 'We Serve',
      subtitle: 'From BKC startups to established brands across Maharashtra and India.',
      locations: [
        {
          id: 'smb',
          name: 'SMEs & Growing Brands',
          subtitle: 'Business & portfolio websites',
          accentClass: 'text-[#FF6600]',
          icon: 'map-pin',
          points: [
            { label: 'Deliverables', text: 'Corporate sites, service pages, and lead-capture funnels.' },
            { label: 'Stack', text: 'Modern React/Next.js, WordPress, Shopify, and headless CMS.' },
          ],
        },
        {
          id: 'enterprise',
          name: 'Enterprises & Exhibitors',
          subtitle: 'High-traffic & campaign sites',
          accentClass: 'text-[#FF6600]',
          icon: 'award',
          points: [
            { label: 'Scale', text: 'Multi-page architectures, multilingual, and API integrations.' },
            { label: 'Speed', text: 'Optimized assets, CDN delivery, and performance monitoring.' },
          ],
        },
      ],
    },
    services: {
      eyebrow: 'Web Services',
      title: 'End-to-End Web Development',
      subtitle: 'Design, development, SEO setup, and launch support.',
      items: [
        { title: 'Business Websites', icon: 'pencil-ruler', desc: 'Professional sites that establish credibility and capture leads.' },
        { title: 'E-commerce', icon: 'truck', desc: 'Shopify, WooCommerce, and custom storefronts.' },
        { title: 'Landing Pages', icon: 'lightbulb', desc: 'Campaign pages optimized for ads and conversions.' },
        { title: 'CMS & Blogs', icon: 'palette', desc: 'Easy content updates with SEO-friendly structure.' },
        { title: 'Performance & SEO', icon: 'award', desc: 'Core Web Vitals, schema markup, and technical SEO.' },
        { title: 'Maintenance', icon: 'hammer', desc: 'Security updates, backups, and ongoing improvements.' },
      ],
    },
    portfolio: {
      eyebrow: 'Digital Work',
      title: 'Websites & Platforms',
      portfolioAlt: 'Website development project',
      locationLabel: 'Web Project',
      cta: { label: 'View Portfolio', href: '/portfolio' },
      images: [
        `${IK}/Mavnox/BrandBase/portfolioWeb-removebg-preview.png`,
        `${IK}/Mavnox/BrandBase/LandingPage-removebg-preview.png`,
        `${IK}/Mavnox/BrandBase/Business-removebg-preview.png`,
      ],
    },
    faqIntro: 'Questions about website development costs and timelines in Mumbai.',
    faqs: [
      {
        question: 'How much does website development cost in Mumbai?',
        answer:
          'Costs depend on pages, features, and integrations. We provide transparent quotes after a discovery call — from lean business sites to full e-commerce builds.',
      },
      {
        question: 'Do you build SEO-friendly websites?',
        answer:
          'Yes. Every site includes semantic HTML, meta structure, sitemap readiness, fast loading, and mobile optimization as standard.',
      },
      {
        question: 'Which technologies do you use?',
        answer:
          'We use modern stacks including Next.js/React, WordPress, and Shopify depending on your goals, team, and budget.',
      },
      {
        question: 'Do you offer website maintenance?',
        answer:
          'Yes — we offer ongoing support plans covering updates, security, content changes, and performance monitoring.',
      },
    ],
    bottomCta: baseBottomCta('in Mumbai'),
  },
  {
    slug: 'video-production-company-mumbai',
    breadcrumbLabel: 'Video Production Mumbai',
    region: 'mumbai',
    serviceHref: '/services/av-production',
    schema: {
      serviceName: 'Audio & Video Production',
      serviceDescription:
        'Corporate films, event coverage, promotional videos, and AV production in Mumbai.',
      areaServed: { type: 'City', name: 'Mumbai' },
    },
    seo: {
      title: 'Video Production Company in Mumbai | Corporate Films & Event Coverage | BrandBase Capsule',
      description:
        'Top AV and video production company in Mumbai — corporate films, event coverage, promotional videos, and broadcast-quality editing for brands across India.',
      keywords: [
        'video production company mumbai',
        'corporate film production mumbai',
        'event videography mumbai',
        'audio video production mumbai',
        'promotional video mumbai',
        'AV production agency mumbai',
        'BrandBase Capsule video',
      ],
      canonicalPath: '/video-production-company-mumbai',
      ogImage: `${IK}/Services/videoProd-removebg-preview.png`,
    },
    hero: {
      badge: 'Cinematic AV Studio',
      titleLead: 'Leading',
      titleAccent: 'Video',
      titleMain: 'Production Company',
      titleLocation: 'in Mumbai',
      subtitle:
        'Corporate films, event coverage, social content, and AV production — sharp visuals, immersive sound, and storytelling that elevates your brand.',
      primaryCta: { label: 'Start a Video Project', href: '/appointment' },
      secondaryCta: { label: 'AV Services', href: '/services/av-production' },
    },
    about: {
      image: `${IK}/Services/videoProd-removebg-preview.png`,
      imageAlt: 'Video production crew Mumbai',
      statValue: '200+',
      statLabel: 'Films Produced',
      title: 'Stories That',
      titleAccent: 'Move People',
      paragraphs: [
        'A top video production company in Mumbai combines creative direction, professional crews, and post-production polish.',
        'BrandBase Capsule produces corporate films, exhibition coverage, product launches, and social content — from script to final cut.',
      ],
      highlights: ['Corporate Films', 'Event Coverage', 'Post-Production', 'Multi-platform Delivery'],
    },
    venues: mumbaiVenues(),
    services: {
      eyebrow: 'AV Services',
      title: 'Audio & Video Production',
      subtitle: 'Pre-production through delivery — one team, broadcast-quality output.',
      items: [
        { title: 'Corporate Films', icon: 'award', desc: 'Brand stories, CEO messages, and company profiles.' },
        { title: 'Event Coverage', icon: 'truck', desc: 'Multi-cam shoots for conferences, exhibitions, and launches.' },
        { title: 'Promotional Videos', icon: 'lightbulb', desc: 'Ads, reels, and campaign content for digital channels.' },
        { title: 'Post-Production', icon: 'palette', desc: 'Editing, colour grading, motion graphics, and sound design.' },
        { title: 'Exhibition Films', icon: 'pencil-ruler', desc: 'Stall loops, product demos, and live event highlights.' },
        { title: 'Live AV Support', icon: 'hammer', desc: 'On-site switching, streaming, and show playback.' },
      ],
    },
    portfolio: {
      eyebrow: 'Showreel Highlights',
      title: 'Film & Event Coverage',
      portfolioAlt: 'Video production project Mumbai',
      locationLabel: 'AV Production',
      cta: { label: 'View Portfolio', href: '/portfolio' },
      images: [
        `${IK}/Services/videoProd-removebg-preview.png`,
        `${IK}/stalls/BlogsImages/exhibition.jpg`,
        ...HGH_IMAGES.slice(0, 2),
      ],
    },
    faqIntro: 'Questions about video production services and timelines in Mumbai.',
    faqs: [
      {
        question: 'What video production services do you offer in Mumbai?',
        answer:
          'Corporate films, event coverage, promotional videos, exhibition highlight reels, interviews, and full post-production including editing and motion graphics.',
      },
      {
        question: 'Do you cover exhibitions and trade shows?',
        answer:
          'Yes — we film at Bombay Exhibition Centre, Jio World Centre, and venues nationwide, including recent HGH India 2026 coverage.',
      },
      {
        question: 'What is the typical production timeline?',
        answer:
          'Simple edits may take 1–2 weeks; full corporate films typically need 3–6 weeks from brief to delivery depending on scope.',
      },
      {
        question: 'Can you live-stream our corporate event?',
        answer:
          'Yes. We provide multi-camera live streaming and hybrid event AV support.',
      },
    ],
    bottomCta: baseBottomCta('in Mumbai'),
  },
  {
    slug: 'digital-marketing-agency-mumbai',
    breadcrumbLabel: 'Digital Marketing Mumbai',
    region: 'mumbai',
    serviceHref: '/services/digital-marketing',
    schema: {
      serviceName: 'Digital Marketing',
      serviceDescription: 'SEO, paid ads, social media, and content marketing for Mumbai businesses.',
      areaServed: { type: 'City', name: 'Mumbai' },
    },
    seo: {
      title: 'Digital Marketing Agency in Mumbai | SEO, Ads & Social Media | BrandBase Capsule',
      description:
        'Top digital marketing agency in Mumbai — SEO, Google Ads, social media marketing, and content strategy that drives measurable growth for brands in India and worldwide.',
      keywords: [
        'digital marketing agency mumbai',
        'SEO company mumbai',
        'social media marketing mumbai',
        'google ads agency mumbai',
        'best digital marketing company mumbai',
        'online marketing agency mumbai',
        'BrandBase Capsule digital',
      ],
      canonicalPath: '/digital-marketing-agency-mumbai',
      ogImage: `${IK}/Services/digitalMarketing-removebg-preview.png`,
    },
    hero: {
      badge: 'Growth-Driven Marketing',
      titleLead: 'Top',
      titleAccent: 'Digital',
      titleMain: 'Marketing Agency',
      titleLocation: 'in Mumbai',
      subtitle:
        'SEO, paid media, social content, and conversion-focused campaigns — data-led marketing that builds authority and drives revenue.',
      primaryCta: { label: 'Get Marketing Audit', href: '/appointment' },
      secondaryCta: { label: 'Digital Services', href: '/services/digital-marketing' },
    },
    about: {
      image: `${IK}/Services/digitalMarketing-removebg-preview.png`,
      imageAlt: 'Digital marketing team Mumbai',
      statValue: '3.5x',
      statLabel: 'Avg. ROAS',
      title: 'Marketing That',
      titleAccent: 'Delivers ROI',
      paragraphs: [
        'The best digital marketing agency in Mumbai pairs strategy with execution — not vanity metrics.',
        'BrandBase Capsule runs SEO, Google & Meta ads, social content, and funnel optimization for brands targeting Mumbai, India, and international markets.',
      ],
      highlights: ['SEO & Content', 'Paid Media', 'Social Strategy', 'Analytics & Reporting'],
    },
    venues: {
      eyebrow: 'Markets We Grow',
      title: 'Mumbai to',
      titleAccent: 'Global Audiences',
      subtitle: 'Local lead generation and international brand campaigns from one team.',
      locations: [
        {
          id: 'local',
          name: 'Mumbai & Maharashtra',
          subtitle: 'Local SEO & lead gen',
          accentClass: 'text-[#FF6600]',
          icon: 'map-pin',
          points: [
            { label: 'Focus', text: 'Google Business Profile, local SEO, and high-intent search campaigns.' },
            { label: 'Sectors', text: 'Exhibitions, B2B services, retail, and professional services.' },
          ],
        },
        {
          id: 'global',
          name: 'India & International',
          subtitle: 'Scale beyond Mumbai',
          accentClass: 'text-[#FF6600]',
          icon: 'award',
          points: [
            { label: 'Reach', text: 'Multi-market paid social, search, and content in English and Hindi.' },
            { label: 'Reporting', text: 'Transparent dashboards with ROI-focused KPIs.' },
          ],
        },
      ],
    },
    services: {
      eyebrow: 'Digital Services',
      title: 'Full-Funnel Digital Marketing',
      subtitle: 'Attract, engage, and convert your ideal customers.',
      items: [
        { title: 'SEO', icon: 'lightbulb', desc: 'Technical SEO, content strategy, and local search dominance.' },
        { title: 'Paid Ads', icon: 'award', desc: 'Google Ads, Meta, LinkedIn — optimized for ROAS.' },
        { title: 'Social Media', icon: 'palette', desc: 'Content calendars, reels, and community management.' },
        { title: 'Content Writing', icon: 'pencil-ruler', desc: 'Blogs, landing pages, and conversion copy.' },
        { title: 'Analytics', icon: 'hammer', desc: 'GA4, conversion tracking, and monthly performance reviews.' },
        { title: 'CRO', icon: 'truck', desc: 'Landing page tests and funnel improvements.' },
      ],
    },
    portfolio: {
      eyebrow: 'Campaign Results',
      title: 'Digital Growth Stories',
      portfolioAlt: 'Digital marketing campaign',
      locationLabel: 'Marketing Campaign',
      cta: { label: 'View Case Studies', href: '/portfolio' },
      images: [
        `${IK}/Mavnox/BrandBase/SEOOptimize_no_bg_ta5un9b9.png`,
        `${IK}/Mavnox/BrandBase/onlineAds_no_bg_3tj3n4nc.png`,
        `${IK}/Mavnox/BrandBase/SMMarketing_no_bg_vk4ljl7g.png`,
      ],
    },
    faqIntro: 'Questions about digital marketing services and pricing in Mumbai.',
    faqs: [
      {
        question: 'What makes BrandBase Capsule a top digital marketing agency in Mumbai?',
        answer:
          'We combine SEO, paid media, and content with industry experience in exhibitions and B2B — delivering measurable leads, not just impressions.',
      },
      {
        question: 'Do you offer local SEO for Mumbai businesses?',
        answer:
          'Yes — Google Business Profile optimization, local citations, and geo-targeted campaigns are core services.',
      },
      {
        question: 'How long until we see SEO results?',
        answer:
          'Most clients see meaningful organic traction in 3–6 months depending on competition and site health.',
      },
      {
        question: 'Can you manage ads for international markets?',
        answer:
          'Yes. We run campaigns targeting India, GCC, Europe, and other regions with localized creative and landing pages.',
      },
    ],
    bottomCta: baseBottomCta('in Mumbai'),
  },
];
