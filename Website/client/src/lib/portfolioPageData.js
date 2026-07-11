import { CONTACT } from '@/lib/contactConstants';

const IK = 'https://ik.imagekit.io/vinayak06';

export const PORTFOLIO_PAGE = {
  slug: 'portfolio',
  breadcrumbLabel: 'Portfolio',
  seo: {
    title: 'Portfolio | BrandBase Capsule — Exhibition, Web & Brand Work',
    description:
      'Explore BrandBase Capsule projects: exhibition stalls, event branding, websites, digital marketing, AV production, and creative design. Mumbai-based agency serving clients across India.',
    keywords: [
      'exhibition stall portfolio Mumbai',
      'BrandBase Capsule portfolio',
      'event branding case studies',
      'web development portfolio India',
      'digital marketing agency work',
      'creative agency Mumbai projects',
    ],
    canonicalPath: '/portfolio',
    ogImage: `${IK}/stalls/BlogsImages/exhibition.jpg`,
  },
  serviceCategories: [
    {
      name: 'Exhibition & Stall Design',
      description: 'Trade show booths, custom fabrication, and on-site event execution',
      path: '/services/events-exhibition/stall-design',
    },
    {
      name: 'Event Management',
      description: 'Planning, branding, and coordination for corporate and wedding events',
      path: '/services/events-exhibition/event-planning-management',
    },
    {
      name: 'Website Development',
      description: 'Business sites, landing pages, CMS, and e-commerce builds',
      path: '/services/website-development',
    },
    {
      name: 'Digital Marketing',
      description: 'SEO, social media, content, and paid campaigns',
      path: '/services/digital-marketing',
    },
    {
      name: 'Branding & Design',
      description: 'Brand identity, creative assets, and visual systems',
      path: '/services/branding-design',
    },
    {
      name: 'Audio & Video Production',
      description: 'Corporate films, event coverage, and promotional content',
      path: '/services/av-production',
    },
  ],
  faqs: [
    {
      question: 'What types of projects are in your portfolio?',
      answer:
        'Our work spans exhibition stalls and event experiences, website development, digital marketing campaigns, branding & design, and audio/video production — for startups, SMEs, and enterprise clients across India and internationally.',
    },
    {
      question: 'Can I see live examples of your work?',
      answer:
        'Yes — browse individual project pages for case studies, images, and live links where permitted. Some client work is under NDA and shows limited previews only.',
    },
    {
      question: 'Do you work with international clients?',
      answer:
        'Yes. We collaborate with clients in the USA, UK, UAE, Singapore, and Europe, with experience in remote delivery and on-ground execution in India.',
    },
    {
      question: 'How do I start a project similar to one in your portfolio?',
      answer: `Share your brief via our contact form or book a free consultation at /appointment. Visit our contact page for phone enquiries about scope, timeline, and budget.`,
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Timelines vary by scope: exhibition stalls often need 3–4 weeks; websites 4–12 weeks; branding and marketing engagements are scoped per campaign. We provide a clear timeline after the discovery call.',
    },
  ],
  bottomCta: {
    title: 'Ready to create your next success story?',
    subtitle:
      'From exhibition stalls to digital products — let\'s build something exceptional together.',
    primary: { label: 'Start a Project', href: '/contact' },
    secondary: { label: 'Book a Call', href: '/appointment' },
  },
};
