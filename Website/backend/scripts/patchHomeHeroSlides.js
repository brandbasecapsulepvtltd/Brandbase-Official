/**
 * Replace homepage hero slides: remove app, add exhibition, order event → exhibition → web → av → digital.
 * Run from backend/: npm run patch:home-hero
 */
require('dotenv').config();

const connectDB = require('../config/database');
const HomePage = require('../models/HomePage');
const { HOME_HERO_SLIDES } = require('./homeHeroSlidesData');

async function patchHomeHeroSlides() {
  await connectDB();

  const doc = await HomePage.findOne();
  if (!doc) {
    console.error('No HomePage document found. Run home seed first.');
    process.exit(1);
  }

  const previousCount = doc.heroSection?.slides?.length ?? 0;
  const video = doc.heroSection?.video;

  doc.heroSection = {
    ...(doc.heroSection?.toObject?.() || doc.heroSection || {}),
    slides: HOME_HERO_SLIDES,
    video: video || { url: '' },
  };

  doc.markModified('heroSection');
  await doc.save();

  console.log(`Home hero slides updated: ${previousCount} → ${HOME_HERO_SLIDES.length} slides.`);
  HOME_HERO_SLIDES.forEach((slide, index) => {
    console.log(`  ${index + 1}. ${slide.title}`);
  });

  process.exit(0);
}

patchHomeHeroSlides().catch((err) => {
  console.error('patch:home-hero failed:', err);
  process.exit(1);
});
