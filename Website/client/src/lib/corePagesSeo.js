/**
 * Centralized metadata & JSON-LD for core listing pages
 * (contact, appointment, services, blogs, detail pages)
 */
import { APPOINTMENT_FAQS, CONTACT, CONTACT_FAQS } from '@/lib/contactConstants';
import { ORG, SITE_URL } from '@/lib/siteConfig';

const IK = 'https://ik.imagekit.io/vinayak06';

export const CONTACT_PAGE_SEO = {
  title: `Contact ${ORG.name} | Get in Touch — Mumbai Agency`,
  description: `Contact ${ORG.name} for exhibition, digital marketing, web development, and branding. ${CONTACT.email} | NESCO, Mumbai.`,
  keywords: [
    'contact digital agency Mumbai',
    'exhibition management contact',
    'BrandBase Capsule contact',
    'stall design quote Mumbai',
  ],
  canonicalPath: '/contact',
  ogImage: ORG.ogImage,
};

export const APPOINTMENT_PAGE_SEO = {
  title: `Book Appointment | Free Consultation — ${ORG.name}`,
  description: `Schedule a free consultation with ${ORG.name}. Exhibition, digital marketing, web & branding. Book online or visit our contact page.`,
  keywords: [
    'book appointment digital agency Mumbai',
    'free consultation exhibition',
    'BrandBase Capsule appointment',
  ],
  canonicalPath: '/appointment',
  ogImage: ORG.ogImage,
};

export const SERVICES_LISTING_SEO = {
  title: `Our Services | Event, Exhibition, Digital & Brand | ${ORG.name}`,
  description: `${ORG.name} offers exhibition management, stall design, digital marketing, web development, AV production, and branding. Mumbai-based, serving clients globally.`,
  keywords: [
    'exhibition management company',
    'stall design company Mumbai',
    'digital marketing agency Mumbai',
    'BrandBase Capsule services',
  ],
  canonicalPath: '/services',
  ogImage: `${IK}/Services/exhibtionManagement.png`,
};

export const BLOGS_LISTING_SEO = {
  title: `Blog | Exhibition, Digital Marketing & Brand Insights | ${ORG.name}`,
  description: `Expert insights on exhibition management, stall design, digital marketing, web development, and branding from ${ORG.name}.`,
  keywords: [
    'exhibition blog',
    'stall design tips',
    'digital marketing blog Mumbai',
    'BrandBase Capsule blog',
  ],
  canonicalPath: '/blogs',
  ogImage: `${IK}/stalls/BlogsImages/exhibition.jpg`,
};

function baseMetadata(seo) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: `${ORG.name} Team` }],
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
      images: seo.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
      creator: '@brandbasecapsule',
    },
  };
}

export function buildContactPageMetadata() {
  return baseMetadata(CONTACT_PAGE_SEO);
}

export function buildContactPageJsonLd() {
  const pageUrl = `${SITE_URL}/contact`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: CONTACT_PAGE_SEO.title,
        description: CONTACT_PAGE_SEO.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: CONTACT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

export function buildAppointmentPageMetadata() {
  return baseMetadata(APPOINTMENT_PAGE_SEO);
}

export function buildAppointmentPageJsonLd() {
  const pageUrl = `${SITE_URL}/appointment`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: APPOINTMENT_PAGE_SEO.title,
        description: APPOINTMENT_PAGE_SEO.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Book Appointment', item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        name: 'Free Strategy Consultation',
        provider: { '@id': `${SITE_URL}/#organization` },
        description: 'Complimentary consultation for exhibition, web, and marketing projects',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        areaServed: 'IN',
      },
      {
        '@type': 'FAQPage',
        mainEntity: APPOINTMENT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

export function buildServicesListingMetadata() {
  return baseMetadata(SERVICES_LISTING_SEO);
}

export function buildServicesListingJsonLd(services = []) {
  const pageUrl = `${SITE_URL}/services`;
  const orgId = `${SITE_URL}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: SERVICES_LISTING_SEO.title,
        description: SERVICES_LISTING_SEO.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: pageUrl },
        ],
      },
      ...services.map((service) => ({
        '@type': 'Service',
        name: service.title,
        description: service.description || undefined,
        url: `${SITE_URL}${service.href}`,
        provider: { '@id': orgId },
        areaServed: { '@type': 'Country', name: 'India' },
      })),
    ],
  };
}

export function buildBlogsListingMetadata() {
  return baseMetadata(BLOGS_LISTING_SEO);
}

export function buildBlogsListingJsonLd(blogs = []) {
  const pageUrl = `${SITE_URL}/blogs`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${pageUrl}/#blog`,
        url: pageUrl,
        name: `${ORG.name} Blog`,
        description: BLOGS_LISTING_SEO.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: pageUrl },
        ],
      },
      ...blogs.slice(0, 10).map((blog) => ({
        '@type': 'BlogPosting',
        headline: blog.metadata?.title,
        description: blog.metadata?.description,
        url: `${SITE_URL}/blogs/${blog.metadata?.category}/${blog.metadata?.slug}`,
        datePublished: blog.metadata?.publishedAt,
        author: {
          '@type': 'Person',
          name: blog.metadata?.author?.name || ORG.name,
        },
      })),
    ],
  };
}

export function formatBlogCategoryLabel(category) {
  return category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function buildBlogCategoryMetadata(category) {
  const label = formatBlogCategoryLabel(category);
  const seo = {
    title: `${label} Articles | ${ORG.name} Blog`,
    description: `Read ${label.toLowerCase()} articles and insights from ${ORG.name} — exhibition, digital, and brand expertise.`,
    keywords: [`${label} blog`, 'BrandBase Capsule', category],
    canonicalPath: `/blogs/${category}`,
    ogImage: BLOGS_LISTING_SEO.ogImage,
  };
  return baseMetadata(seo);
}

export function buildBlogCategoryJsonLd(category, blogs = []) {
  const label = formatBlogCategoryLabel(category);
  const pageUrl = `${SITE_URL}/blogs/${category}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${label} | ${ORG.name} Blog`,
        description: `${label} articles and insights`,
        isPartOf: { '@id': `${SITE_URL}/blogs#blog` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blogs` },
          { '@type': 'ListItem', position: 3, name: label, item: pageUrl },
        ],
      },
      ...blogs.slice(0, 20).map((blog) => ({
        '@type': 'BlogPosting',
        headline: blog.metadata?.title,
        url: `${SITE_URL}/blogs/${category}/${blog.metadata?.slug}`,
        datePublished: blog.metadata?.publishedAt,
      })),
    ],
  };
}

export function buildServiceDetailMetadata(category, slug, service) {
  if (!service?.hero) {
    return { title: `Service | ${ORG.name}` };
  }

  const categoryLabel = formatBlogCategoryLabel(category);
  const title = `${service.hero.headline} | ${categoryLabel} | ${ORG.name}`;
  const description = service.hero.subHeadline || ORG.description;
  const canonicalPath = `/services/${category}/${slug}`;
  const ogImage = service.hero.image || service.animateImage?.image || ORG.ogImage;

  return {
    title,
    description,
    authors: [{ name: `${ORG.name} Team` }],
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
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: service.hero.headline }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
      creator: '@brandbasecapsule',
    },
  };
}

export function buildServiceDetailJsonLd(category, slug, service) {
  if (!service?.hero) return null;

  const pageUrl = `${SITE_URL}/services/${category}/${slug}`;
  const categoryLabel = formatBlogCategoryLabel(category);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: service.hero.headline,
        description: service.hero.subHeadline,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: categoryLabel, item: `${SITE_URL}/services/${category}` },
          { '@type': 'ListItem', position: 4, name: service.hero.headline, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}/#service`,
        name: service.hero.headline,
        description: service.hero.subHeadline,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        url: pageUrl,
      },
    ],
  };
}

export function buildPortfolioDetailMetadata(slug, portfolio) {
  if (!portfolio) {
    return {
      title: `Portfolio | ${ORG.name}`,
      description: 'Explore our exhibition and digital project case studies.',
    };
  }

  const { metadata, hero } = portfolio;
  const title = metadata?.title || `${hero?.title} | ${ORG.name} Portfolio`;
  const description = metadata?.description || hero?.description;
  const canonicalPath = `/portfolio/${slug}`;
  const ogImage = hero?.images?.[0] || ORG.ogImage;

  return {
    title,
    description,
    keywords: metadata?.keywords || [],
    authors: [{ name: `${ORG.name} Team` }],
    robots: { index: true, follow: true },
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: ORG.name,
      locale: 'en_IN',
      type: 'article',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: hero?.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
      creator: '@brandbasecapsule',
    },
  };
}

export function buildPortfolioDetailJsonLd(slug, portfolio) {
  if (!portfolio) return null;

  const { hero, metadata, gallery, faqs } = portfolio;
  const pageUrl = `${SITE_URL}/portfolio/${slug}`;

  const graph = [
    {
      '@type': 'CreativeWork',
      '@id': `${pageUrl}/#project`,
      name: hero?.title || metadata?.title,
      description: metadata?.description || hero?.description,
      url: pageUrl,
      image: hero?.images?.[0] || gallery?.[0],
      creator: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
        { '@type': 'ListItem', position: 3, name: hero?.title || 'Case Study', item: pageUrl },
      ],
    },
  ];

  if (faqs?.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
