/** Shared site constants for SEO, schema, and metadata */

export const SITE_URL = 'https://www.brandbasecapsule.com';

export const ORG = {
  name: 'BrandBase Capsule',
  legalName: 'BrandBase Capsule Pvt. Ltd.',
  phone: '+91-7045390416',
  email: 'info@brandbasecapsule.com',
  description:
    'BrandBase Capsule is a Mumbai-based creative agency offering event & exhibition management, digital marketing, web development, audio & video production, and branding.',
  logo: 'https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819',
  ogImage: 'https://ik.imagekit.io/vinayak06/Home.png',
  sameAs: [
    'https://www.instagram.com/brandbasecapsule',
    'https://www.facebook.com/brandbasecapsule',
    'https://www.linkedin.com/company/brandbasecapsule',
    'https://twitter.com/brandbasecapsule',
  ],
  address: {
    streetAddress: 'R-34A, Office No. 34, NESCO IT Park, Goregaon East',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400063',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 19.1547,
    longitude: 72.8535,
  },
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
};

export const PUBLIC_SERVICE_OFFERS = [
  'Event & Exhibition Management',
  'Digital Marketing',
  'Website Development',
  'Audio & Video Production',
  'Branding & Creative Design',
];

export const DEFAULT_HOME_SEO = {
  title: 'BrandBase Capsule | Event, Exhibition & Digital Agency in Mumbai',
  description:
    'Mumbai-based creative agency for exhibition stall design, event management, digital marketing, web development, AV production, and branding. Serving clients across India and globally.',
  keywords: [
    'exhibition management company Mumbai',
    'stall design company Mumbai',
    'event management agency Mumbai',
    'digital marketing agency Mumbai',
    'BrandBase Capsule',
  ],
};

export function buildHomeJsonLd(fullData = {}) {
  const db = fullData.organizationSettings || {};
  const orgId = `${SITE_URL}/#organization`;
  const localId = `${SITE_URL}/#localbusiness`;
  const websiteId = `${SITE_URL}/#website`;

  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: db.name || ORG.name,
      legalName: db.legalName || ORG.legalName,
      url: SITE_URL,
      logo: db.logo || ORG.logo,
      description: db.description || ORG.description,
      sameAs: db.socialLinks?.length ? db.socialLinks : ORG.sameAs,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: db.phone || ORG.phone,
        email: ORG.email,
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
        areaServed: 'IN',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: db.address || ORG.address.streetAddress,
        addressLocality: ORG.address.addressLocality,
        addressRegion: ORG.address.addressRegion,
        postalCode: db.zip || ORG.address.postalCode,
        addressCountry: ORG.address.addressCountry,
      },
      makesOffer: PUBLIC_SERVICE_OFFERS.map((name) => ({
        '@type': 'Offer',
        name,
      })),
    },
    {
      '@type': 'LocalBusiness',
      '@id': localId,
      name: db.name || ORG.name,
      image: db.logo || ORG.logo,
      url: SITE_URL,
      telephone: db.phone || ORG.phone,
      email: ORG.email,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        ...ORG.address,
        streetAddress: db.address || ORG.address.streetAddress,
        postalCode: db.zip || ORG.address.postalCode,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: ORG.geo.latitude,
        longitude: ORG.geo.longitude,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        ...ORG.openingHours,
      },
      parentOrganization: { '@id': orgId },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: ORG.name,
      description: ORG.description,
      publisher: { '@id': orgId },
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blogs?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  if (fullData.faqs?.faqs?.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: fullData.faqs.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildHomeMetadata(seoSettings = {}) {
  const title = seoSettings.title || DEFAULT_HOME_SEO.title;
  const description = seoSettings.description || DEFAULT_HOME_SEO.description;
  const keywords = seoSettings.keywords || DEFAULT_HOME_SEO.keywords;
  const ogImage = seoSettings.mainImage || ORG.ogImage;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    applicationName: ORG.name,
    publisher: ORG.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: '/' },
    openGraph: {
      title: seoSettings.ogTitle || title,
      description: seoSettings.ogDescription || description,
      url: SITE_URL,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${ORG.name} — Creative Agency Mumbai`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@brandbasecapsule',
    },
    category: 'Business',
  };
}

export const DEFAULT_ABOUT_SEO = {
  title: 'About BrandBase Capsule | Event, Exhibition & Digital Agency Mumbai',
  description:
    'Meet BrandBase Capsule — a Mumbai agency with 10+ years delivering exhibition management, stall design, digital marketing, web development, AV production, and branding for clients worldwide.',
  keywords: [
    'about BrandBase Capsule',
    'exhibition company Mumbai',
    'event management agency Mumbai',
    'digital agency Mumbai team',
    'stall design company about',
  ],
  ogImage: 'https://ik.imagekit.io/vinayak06/wmremove-transformed.png',
};

export const ABOUT_FAQS = [
  {
    question: 'When was BrandBase Capsule founded?',
    answer:
      'BrandBase Capsule has grown over a decade in Mumbai, delivering exhibition, event, digital, and branding solutions for clients across India and internationally.',
  },
  {
    question: 'What services does BrandBase Capsule offer?',
    answer:
      'We offer event & exhibition management, digital marketing, website development, audio & video production, and branding & creative design — all under one roof.',
  },
  {
    question: 'Where is BrandBase Capsule located?',
    answer:
      'Our office is at NESCO IT Park, Goregaon, Mumbai, Maharashtra 400063. We serve clients across India and globally.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'We work with brands in exhibitions, FMCG, technology, healthcare, real estate, hospitality, startups, and enterprise sectors.',
  },
  {
    question: 'How can I start a project with BrandBase Capsule?',
    answer:
      'Book a free consultation via our appointment page or contact us at info@brandbasecapsule.com.',
  },
];

export function buildAboutJsonLd(pageData = {}) {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const aboutUrl = `${SITE_URL}/about`;

  const faqSource = pageData?.faqs?.length ? pageData.faqs : ABOUT_FAQS;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: ORG.name,
        legalName: ORG.legalName,
        url: SITE_URL,
        logo: ORG.logo,
        description: ORG.description,
        foundingDate: '2010',
        sameAs: ORG.sameAs,
        address: {
          '@type': 'PostalAddress',
          ...ORG.address,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: ORG.phone,
          email: ORG.email,
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi', 'Marathi'],
          areaServed: 'IN',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: ORG.name,
        image: ORG.logo,
        url: SITE_URL,
        telephone: ORG.phone,
        email: ORG.email,
        address: { '@type': 'PostalAddress', ...ORG.address },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: ORG.geo.latitude,
          longitude: ORG.geo.longitude,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          ...ORG.openingHours,
        },
        parentOrganization: { '@id': orgId },
      },
      {
        '@type': 'AboutPage',
        '@id': `${aboutUrl}/#webpage`,
        url: aboutUrl,
        name: DEFAULT_ABOUT_SEO.title,
        description: DEFAULT_ABOUT_SEO.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        publisher: { '@id': orgId },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${aboutUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: aboutUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${aboutUrl}/#faq`,
        mainEntity: faqSource.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      ...PUBLIC_SERVICE_OFFERS.map((name, index) => ({
        '@type': 'Service',
        '@id': `${aboutUrl}/#service-${index + 1}`,
        name,
        provider: { '@id': orgId },
        areaServed: { '@type': 'Country', name: 'India' },
      })),
    ],
  };
}

export function buildAboutMetadata() {
  const { title, description, keywords, ogImage } = DEFAULT_ABOUT_SEO;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    applicationName: ORG.name,
    publisher: ORG.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/about',
      languages: { 'en-IN': '/about' },
    },
    openGraph: {
      title: 'About BrandBase Capsule | Our Story & Expertise',
      description,
      url: `${SITE_URL}/about`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'BrandBase Capsule Team — About Us',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@brandbasecapsule',
    },
    category: 'Business',
  };
}

/** Display labels and SEO fallbacks per canonical category slug */
export const CATEGORY_SEO_DEFAULTS = {
  'exhibition-management': {
    breadcrumbLabel: 'Event & Exhibition',
    title: 'Event & Exhibition Management Mumbai | Stall Design & Booth Fabrication | BrandBase Capsule',
    description:
      'End-to-end exhibition management, custom stall design, booth fabrication, and on-site event execution in Mumbai. Trusted by brands across India and globally.',
    keywords: [
      'exhibition management company Mumbai',
      'stall design company Mumbai',
      'booth fabrication Mumbai',
      'event exhibition agency',
      'BrandBase Capsule exhibition',
    ],
    ogImage: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
    faqIntro:
      'Answers about our exhibition strategy, stall design process, timelines, and on-site execution.',
  },
  'digital-marketing': {
    breadcrumbLabel: 'Digital Marketing',
    title: 'Digital Marketing Agency Mumbai | SEO, Ads & Social Media | BrandBase Capsule',
    description:
      'Data-driven SEO, paid ads, social media marketing, and content that grows your brand. Mumbai-based digital marketing with measurable ROI.',
    keywords: [
      'digital marketing agency Mumbai',
      'SEO company Mumbai',
      'social media marketing Mumbai',
      'online advertising agency',
    ],
    ogImage: 'https://ik.imagekit.io/vinayak06/Services/digitalMarketing-removebg-preview.png',
    faqIntro:
      'Clear answers about our digital marketing services, reporting, timelines, and how we measure results.',
  },
  'website-development': {
    breadcrumbLabel: 'Website Development',
    title: 'Website Design & Development Mumbai | Business & E-commerce Sites | BrandBase Capsule',
    description:
      'Fast, SEO-ready business websites, landing pages, CMS, and e-commerce built for conversions. Mumbai web development agency.',
    keywords: [
      'website development company Mumbai',
      'web design agency Mumbai',
      'ecommerce website development',
      'business website design',
    ],
    ogImage: 'https://ik.imagekit.io/vinayak06/Services/WebDevelopment1-removebg-preview.png',
    faqIntro:
      'Answers about our web design process, technology stack, timelines, and ongoing support.',
  },
  'branding-design': {
    breadcrumbLabel: 'Branding & Design',
    title: 'Branding & Creative Design Mumbai | Logo & Brand Identity | BrandBase Capsule',
    description:
      'Brand strategy, logo design, visual identity, and creative assets that make your business memorable. Mumbai branding agency.',
    keywords: [
      'branding agency Mumbai',
      'logo design company Mumbai',
      'brand identity design',
      'creative design agency',
    ],
    ogImage: 'https://ik.imagekit.io/vinayak06/Services/branding-removebg-preview.png',
    faqIntro:
      'Answers about our branding process, deliverables, revisions, and how we build cohesive brand systems.',
  },
  'av-production': {
    breadcrumbLabel: 'Audio & Video Production',
    title: 'Audio & Video Production Mumbai | Corporate Films & Event Coverage | BrandBase Capsule',
    description:
      'Professional video production, corporate films, event coverage, and promotional content. Mumbai-based AV production team with broadcast-quality delivery.',
    keywords: [
      'video production company Mumbai',
      'corporate film production',
      'event videography Mumbai',
      'audio video production agency',
      'BrandBase Capsule AV',
    ],
    ogImage: 'https://ik.imagekit.io/vinayak06/Services/avProduction-removebg-preview.png',
    faqIntro:
      'Answers about our AV production process, deliverables, timelines, and equipment.',
  },
  'app-development': {
    breadcrumbLabel: 'App Development',
    title: 'Mobile App Development | iOS & Android | BrandBase Capsule',
    description: 'Custom mobile app development for iOS, Android, and cross-platform.',
    keywords: ['mobile app development', 'iOS app development', 'Android app development'],
    ogImage: 'https://ik.imagekit.io/vinayak06/Services/appDevelopment-removebg-preview%20(1).png',
    faqIntro: 'Answers about our app development process, platforms, and launch support.',
  },
};

export function getCategoryBreadcrumbLabel(categorySlug, pageData = {}) {
  const defaults = CATEGORY_SEO_DEFAULTS[categorySlug];
  if (defaults?.breadcrumbLabel) return defaults.breadcrumbLabel;
  if (pageData?.hero?.title) return pageData.hero.title;
  return categorySlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function buildServiceCategoryMetadata(categorySlug, pageData = {}) {
  const defaults = CATEGORY_SEO_DEFAULTS[categorySlug] || {};
  const cms = pageData?.pageMetadata || {};
  const title = cms.title || defaults.title || `${getCategoryBreadcrumbLabel(categorySlug, pageData)} | BrandBase Capsule`;
  const description = cms.description || defaults.description || ORG.description;
  const keywords = cms.keywords?.length ? cms.keywords : defaults.keywords || [];
  const ogImage = defaults.ogImage || ORG.ogImage;
  const canonicalPath = `/services/${categorySlug}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    applicationName: ORG.name,
    publisher: ORG.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: { 'en-IN': canonicalPath },
    },
    openGraph: {
      title: cms.ogTitle || title,
      description: cms.ogDescription || description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@brandbasecapsule',
    },
    category: 'Business',
  };
}

export function buildServiceCategoryJsonLd(categorySlug, pageData = {}) {
  const defaults = CATEGORY_SEO_DEFAULTS[categorySlug] || {};
  const label = getCategoryBreadcrumbLabel(categorySlug, pageData);
  const pageUrl = `${SITE_URL}/services/${categorySlug}`;
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: ORG.name,
      url: SITE_URL,
      logo: ORG.logo,
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}/#webpage`,
      url: pageUrl,
      name: pageData?.pageMetadata?.title || defaults.title || label,
      description: pageData?.pageMetadata?.description || defaults.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': orgId },
      publisher: { '@id': orgId },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: label, item: pageUrl },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}/#service`,
      name: label,
      description: pageData?.hero?.subtitle || defaults.description,
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'India' },
      url: pageUrl,
    },
  ];

  const subServices = pageData?.categoryServices?.services || [];
  if (subServices.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}/#subservices`,
      name: `${label} — Sub-services`,
      itemListElement: subServices.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: service.link?.startsWith('http')
          ? service.link
          : `${SITE_URL}${service.link || pageUrl}`,
      })),
    });
  }

  const faqs = pageData?.faqData || [];
  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

const EVENT_CALENDAR_OG =
  'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg';

export const DEFAULT_EVENT_CALENDAR_SEO = {
  title: 'Exhibition & Trade Show Calendar 2026 | India | BrandBase Capsule',
  description:
    'Browse upcoming exhibitions, trade shows, and corporate events across India. Plan your stall design and fabrication with BrandBase Capsule — Mumbai-based exhibition experts.',
  keywords: [
    'exhibition calendar 2026',
    'upcoming trade shows India',
    'trade fair schedule Mumbai',
    'exhibition dates Delhi',
    'business events Bangalore',
    'stall design services',
    'exhibition organizers India',
    'BrandBase event calendar',
  ],
};

export function buildEventCalendarMetadata() {
  const { title, description, keywords } = DEFAULT_EVENT_CALENDAR_SEO;
  const canonicalPath = '/event-calendar';

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    applicationName: ORG.name,
    publisher: ORG.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: "India's Premier Exhibition Calendar 2026 | BrandBase",
      description:
        'Find upcoming trade shows and exhibitions in Mumbai, Delhi, Bangalore, and more. Book your stall fabrication partner today.',
      url: `${SITE_URL}${canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: EVENT_CALENDAR_OG,
          width: 1200,
          height: 630,
          alt: 'Upcoming Exhibitions India — BrandBase Calendar',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Upcoming Exhibitions & Trade Shows 2026 | BrandBase',
      description: 'Find your next business opportunity across India.',
      images: [EVENT_CALENDAR_OG],
      creator: '@brandbasecapsule',
    },
    category: 'Events & Exhibitions',
  };
}

export function buildEventCalendarJsonLd(events = [], faqs = []) {
  const pageUrl = `${SITE_URL}/event-calendar`;
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const graph = [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}/#collection`,
      url: pageUrl,
      name: 'Upcoming Exhibition Calendar India',
      description: DEFAULT_EVENT_CALENDAR_SEO.description,
      isPartOf: { '@id': websiteId },
      publisher: { '@id': orgId },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Event Calendar', item: pageUrl },
      ],
    },
    {
      '@type': 'Organization',
      '@id': orgId,
      name: ORG.name,
      url: SITE_URL,
      logo: ORG.logo,
      sameAs: ORG.sameAs,
    },
  ];

  if (events.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}/#events`,
      name: 'Upcoming Exhibitions',
      numberOfItems: events.length,
      itemListElement: events.slice(0, 20).map((event, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: event.name,
        url: `${SITE_URL}/event-calendar/${event.slug || event.id}`,
      })),
    });
  }

  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

const EVENT_OG_DEFAULT =
  'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg';

export function buildEventDetailMetadata(event, slug) {
  if (!event) {
    return {
      title: 'Event Not Found | BrandBase Capsule',
      description: 'The requested exhibition could not be found.',
    };
  }

  const title = event.seoTitle || `${event.name} | Exhibition Calendar | BrandBase`;
  const description =
    event.seoDescription ||
    (event.description?.length > 160 ? `${event.description.slice(0, 157)}...` : event.description) ||
    `Exhibition details for ${event.name} in ${event.city}.`;
  const keywords = event.seoKeywords || [
    event.industry,
    'exhibition',
    'trade show',
    event.city,
    event.name,
  ];
  const canonicalPath = `/event-calendar/${slug}`;
  const ogImage = event.coverImage || EVENT_OG_DEFAULT;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    robots: { index: true, follow: true },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: event.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@brandbasecapsule',
    },
  };
}

export function buildEventDetailJsonLd(event, slug) {
  const pageUrl = `${SITE_URL}/event-calendar/${slug}`;
  const orgId = `${SITE_URL}/#organization`;

  const graph = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Event Calendar', item: `${SITE_URL}/event-calendar` },
        { '@type': 'ListItem', position: 3, name: event.name, item: pageUrl },
      ],
    },
    {
      '@type': 'Event',
      '@id': `${pageUrl}/#event`,
      name: event.name,
      startDate: event.startDate,
      endDate: event.endDate,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      description: event.description,
      url: pageUrl,
      location: {
        '@type': 'Place',
        name: event.venue,
        address: {
          '@type': 'PostalAddress',
          addressLocality: event.city,
          addressCountry: 'IN',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: event.organizer,
        url: event.organizerWebsite,
      },
      performer: { '@id': orgId },
    },
  ];

  if (event.faqs?.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: event.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function buildExpoPageMetadata(pageConfig) {
  const seo = pageConfig.seo;
  const canonicalPath = seo.canonicalPath;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    robots: { index: true, follow: true },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
      creator: '@brandbasecapsule',
    },
  };
}

export function buildExpoPageJsonLd(pageConfig) {
  const pageUrl = `${SITE_URL}${pageConfig.seo.canonicalPath}`;
  const orgId = `${SITE_URL}/#organization`;

  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}/#webpage`,
      url: pageUrl,
      name: pageConfig.seo.title,
      description: pageConfig.seo.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': orgId },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: pageConfig.breadcrumbLabel, item: pageUrl },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}/#service`,
      name: pageConfig.hero.title,
      description: pageConfig.hero.subtitle,
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'India' },
      url: pageUrl,
    },
  ];

  if (pageConfig.faqs?.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: pageConfig.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function buildMumbaiPageMetadata(pageConfig) {
  const seo = pageConfig.seo;
  const canonicalPath = seo.canonicalPath;
  const isIndia = pageConfig.region === 'india';

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    robots: { index: true, follow: true },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
      creator: '@brandbasecapsule',
    },
    other: isIndia
      ? {
          'geo.region': 'IN',
          'geo.placename': 'India',
        }
      : {
          'geo.region': 'IN-MH',
          'geo.placename': 'Mumbai',
          'geo.position': `${ORG.geo.latitude};${ORG.geo.longitude}`,
          ICBM: `${ORG.geo.latitude}, ${ORG.geo.longitude}`,
        },
  };
}

export function buildMumbaiPageJsonLd(pageConfig) {
  const pageUrl = `${SITE_URL}${pageConfig.seo.canonicalPath}`;
  const orgId = `${SITE_URL}/#organization`;
  const localId = `${SITE_URL}/#localbusiness`;

  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}/#webpage`,
      url: pageUrl,
      name: pageConfig.seo.title,
      description: pageConfig.seo.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': orgId },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: pageConfig.breadcrumbLabel, item: pageUrl },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': localId,
      name: ORG.name,
      url: SITE_URL,
      logo: ORG.logo,
      image: pageConfig.seo.ogImage,
      description: ORG.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ORG.address.streetAddress,
        addressLocality: ORG.address.addressLocality,
        addressRegion: ORG.address.addressRegion,
        postalCode: ORG.address.postalCode,
        addressCountry: ORG.address.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: ORG.geo.latitude,
        longitude: ORG.geo.longitude,
      },
      telephone: ORG.phone,
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ORG.openingHours.dayOfWeek,
        opens: ORG.openingHours.opens,
        closes: ORG.openingHours.closes,
      },
      sameAs: ORG.sameAs,
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}/#service`,
      name: pageConfig.schema?.serviceName || 'BrandBase Capsule Services',
      provider: { '@id': orgId },
      areaServed: pageConfig.schema?.areaServed?.type
        ? {
            '@type': pageConfig.schema.areaServed.type,
            name: pageConfig.schema.areaServed.name,
          }
        : { '@type': 'City', name: 'Mumbai' },
      description:
        pageConfig.schema?.serviceDescription ||
        'Professional creative and exhibition services by BrandBase Capsule.',
      url: pageConfig.serviceHref ? `${SITE_URL}${pageConfig.serviceHref}` : pageUrl,
    },
  ];

  if (pageConfig.faqs?.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: pageConfig.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function buildLegalPageMetadata(pageConfig) {
  const seo = pageConfig.seo;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    robots: { index: true, follow: true },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: seo.canonicalPath },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}${seo.canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: seo.title,
      description: seo.description,
      creator: '@brandbasecapsule',
    },
  };
}

export function buildLegalPageJsonLd(pageConfig, policyData) {
  const pageUrl = `${SITE_URL}${pageConfig.seo.canonicalPath}`;

  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}/#webpage`,
      url: pageUrl,
      name: pageConfig.seo.title,
      description: pageConfig.seo.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
      dateModified: policyData?.lastUpdated || undefined,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: pageConfig.breadcrumbLabel, item: pageUrl },
      ],
    },
  ];

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function buildPortfolioPageMetadata(pageConfig) {
  const seo = pageConfig.seo;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'BrandBase Capsule Team' }],
    robots: { index: true, follow: true },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: seo.canonicalPath },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}${seo.canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
      creator: '@brandbasecapsule',
    },
  };
}

export function buildPortfolioPageJsonLd(pageConfig, portfolios = []) {
  const pageUrl = `${SITE_URL}${pageConfig.seo.canonicalPath}`;
  const orgId = `${SITE_URL}/#organization`;

  const categoryItems = (pageConfig.serviceCategories || []).map((cat, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: cat.name,
    description: cat.description,
    url: `${SITE_URL}${cat.path}`,
  }));

  const portfolioItems = (portfolios || [])
    .filter((p) => p?.slug)
    .slice(0, 12)
    .map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title || p.name,
        description: p.description || p.shortDescription,
        url: `${SITE_URL}/portfolio/${p.slug}`,
        image: p.image || p.thumbnail || p.coverImage,
      },
    }));

  const graph = [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}/#webpage`,
      url: pageUrl,
      name: pageConfig.seo.title,
      description: pageConfig.seo.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': orgId },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: pageConfig.breadcrumbLabel, item: pageUrl },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}/#service-categories`,
      name: 'Portfolio by Service',
      itemListElement: categoryItems,
    },
  ];

  if (portfolioItems.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}/#projects`,
      name: 'Featured Projects',
      numberOfItems: portfolioItems.length,
      itemListElement: portfolioItems,
    });
  }

  if (pageConfig.faqs?.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: pageConfig.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
