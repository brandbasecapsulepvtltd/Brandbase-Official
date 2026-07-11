/**
 * Fix event-management portfolio category + hero image (TRILEGAL outdoor stage).
 * Run from backend/: npm run patch:event-portfolio
 */
require('dotenv').config();

const connectDB = require('../config/database');
const Portfolio = require('../models/Portfolio');

const SLUG = 'event-management';
const HERO_IMAGE = '/images/portfolio/event-management-trilegal-stage.png';

async function patchEventManagementPortfolio() {
  await connectDB();

  const doc = await Portfolio.findOne({ slug: SLUG });
  if (!doc) {
    console.error(`Portfolio not found: ${SLUG}`);
    process.exit(1);
  }

  doc.category = 'event-management';
  doc.hero = {
    ...(doc.hero?.toObject?.() || doc.hero || {}),
    title: "Events That Don't Just Happen—They Trend",
    description:
      'From intimate gatherings to massive festivals, we create experiences that attendees remember and talk about for years. Every detail meticulously planned, every moment Instagram-worthy.',
    images: [
      HERO_IMAGE,
      ...((doc.hero?.images || []).filter((url) => url !== HERO_IMAGE)),
    ],
  };

  if (doc.bento) {
    doc.bento.mainHeading = doc.bento.mainHeading || 'Experiences Worth Remembering';
    if (doc.bento.cards?.showcaseStall) {
      doc.bento.cards.showcaseStall.imageUrl = HERO_IMAGE;
      doc.bento.cards.showcaseStall.alt = 'Outdoor corporate event stage production';
    }
  }

  doc.markModified('hero');
  doc.markModified('bento');
  await doc.save();

  console.log(`Updated portfolio: ${SLUG}`);
  console.log(`  category: ${doc.category}`);
  console.log(`  hero image: ${doc.hero.images[0]}`);
  process.exit(0);
}

patchEventManagementPortfolio().catch((err) => {
  console.error('patch:event-portfolio failed:', err);
  process.exit(1);
});
