/**
 * Rebuild category heroSlider slides from each category's sub-service images.
 * Run from backend/: npm run patch:hero-sliders
 */
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/database');
const ServiceCategory = require('../models/ServiceCategory');
const { isBannedUrl, pickCategoryImage } = require('./serviceImageLibrary');

function resolveSlideImage(category, slug, index, rawImage) {
  if (rawImage && !isBannedUrl(rawImage)) return rawImage;
  return pickCategoryImage(category, slug || `slide-${index}`, `heroSlider[${index}]`);
}

async function patchServiceHeroSliders() {
  await connectDB();

  const categories = await ServiceCategory.find({});
  let updated = 0;

  for (const category of categories) {
    const subServices = category.categoryServices?.services || [];
    const slides = [];

    if (subServices.length > 0) {
      subServices.forEach((service, index) => {
        slides.push({
          img: resolveSlideImage(category.category, service.link?.split('/').pop(), index, service.image),
          text: [service.title?.toUpperCase() || 'OUR SERVICES'],
          link: service.link || '#',
          buttonText: 'Learn More',
        });
      });
    } else if (category.hero?.imgUrl) {
      slides.push({
        img: resolveSlideImage(category.category, 'hero', 0, category.hero.imgUrl),
        text: [category.hero.title?.toUpperCase() || category.category.toUpperCase()],
        link: `/services/${category.category}`,
        buttonText: 'Discover More',
      });
    }

    if (slides.length === 0) continue;

    category.heroSlider = { slides };
    await category.save();
    updated += 1;
    console.log(`Updated heroSlider for ${category.category} (${slides.length} slides)`);
  }

  console.log(`\nPatched ${updated} categories.`);
  await mongoose.connection.close();
}

patchServiceHeroSliders().catch(async (error) => {
  console.error('Patch failed:', error);
  await mongoose.connection.close();
  process.exit(1);
});
