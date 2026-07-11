/**
 * Patch navbar CMS: remove App Development, merge Event+Exhibition,
 * trim to 4 sub-items per category, align 5 service columns.
 * Run from backend/: npm run patch:navbar
 */
require('dotenv').config();

const connectDB = require('../config/database');
const Navbar = require('../models/Navbar');

const NAVBAR_SERVICES = [
  {
    category: 'Event & Exhibition',
    categoryLink: '/services/exhibition-management',
    items: [
      { name: 'Stall & Booth Design', link: '/services/events-exhibition/stall-design' },
      { name: 'Event Planning & Management', link: '/services/events-exhibition/event-planning-management' },
      { name: 'Exhibition Booth Fabrication', link: '/services/events-exhibition/stall-design' },
      { name: 'On-site Event Coordination', link: '/services/events-exhibition/onsite-event-coordination' },
    ],
  },
  {
    category: 'Digital Marketing',
    categoryLink: '/services/digital-marketing',
    items: [
      { name: 'SEO Optimization', link: '/services/digital-marketing/seo-optimization' },
      { name: 'Social Media Marketing', link: '/services/digital-marketing/social-media-marketing' },
      { name: 'Online Ads Campaigns', link: '/services/digital-marketing/online-ads-campaigns' },
      { name: 'Content Writing', link: '/services/digital-marketing/content-writing' },
    ],
  },
  {
    category: 'Website Development',
    categoryLink: '/services/website-development',
    items: [
      { name: 'Business Website', link: '/services/website-development/business-website' },
      { name: 'E-Commerce Websites', link: '/services/website-development/ecommerce-websites' },
      { name: 'Landing Page Development', link: '/services/website-development/landing-page-development' },
      { name: 'CMS Website', link: '/services/website-development/cms-website' },
    ],
  },
  {
    category: 'Audio & Video Production',
    categoryLink: '/services/av-production',
    items: [
      { name: 'Corporate Films', link: '/services/av-production' },
      { name: 'Commercial & Ad Films', link: '/services/av-production' },
      { name: 'Event Coverage', link: '/services/av-production' },
      { name: 'Social & Reels Production', link: '/services/av-production' },
    ],
  },
  {
    category: 'Branding & Creative Design',
    categoryLink: '/services/branding-design',
    items: [
      { name: 'Brand Identity Design', link: '/services/branding-design' },
      { name: 'Logo & Visual Systems', link: '/services/branding-design' },
      { name: 'Marketing Collateral', link: '/services/branding-design' },
      { name: 'Event Branding', link: '/services/events-exhibition/event-branding' },
    ],
  },
];

async function run() {
  await connectDB();

  const navbar = await Navbar.findOne();
  if (!navbar) {
    console.log('No navbar document found.');
    process.exit(0);
  }

  navbar.services = NAVBAR_SERVICES;
  navbar.directLinkServices = [];
  navbar.markModified('services');
  navbar.markModified('directLinkServices');

  await navbar.save();
  console.log('Navbar patched: 5 service columns, 4 sub-items each, no App Development.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
