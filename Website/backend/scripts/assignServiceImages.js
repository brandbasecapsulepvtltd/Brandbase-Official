/**
 * Assign unique, category-relevant professional images to all service detail pages.
 * Replaces jet-engine placeholders and overused generic stock photos.
 *
 * Run from backend/: npm run assign:service-images
 */
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Service = require('../models/Service');
const { pickCategoryImage, isBannedUrl } = require('./serviceImageLibrary');

function assignImagesToServiceData(category, slug, data) {
  if (!data) return { data, changes: [] };

  const usedOnPage = new Set();
  const changes = [];

  const assign = (currentUrl, slotKey) => {
    const next = pickCategoryImage(category, slug, slotKey, usedOnPage);
    if (isBannedUrl(currentUrl) || currentUrl !== next) {
      changes.push(`${slotKey}`);
    }
    return next;
  };

  const packagesMap = data.packages?.packages;
  if (packagesMap) {
    const entries = packagesMap instanceof Map
      ? [...packagesMap.entries()]
      : Object.entries(packagesMap);

    for (const [key, pkg] of entries) {
      if (!pkg) continue;
      pkg.image = assign(pkg.image, `packages.${key}`);
      if (packagesMap instanceof Map) {
        packagesMap.set(key, pkg);
      } else {
        packagesMap[key] = pkg;
      }
    }

    if (!(packagesMap instanceof Map)) {
      data.packages.packages = packagesMap;
    }
  }

  if (Array.isArray(data.features)) {
    data.features.forEach((feature, index) => {
      if (!feature) return;
      feature.image = assign(feature.image, `features[${index}]`);
    });
  }

  if (data.animateImage?.cards?.length) {
    data.animateImage.cards.forEach((card, index) => {
      if (!card) return;
      card.image = assign(card.image, `animateImage.cards[${index}]`);
    });
  }

  if (data.videoMaker) {
    data.videoMaker.imageUrl = assign(data.videoMaker.imageUrl, 'videoMaker.imageUrl');
  }

  return { data, changes };
}

async function assignServiceImages() {
  await connectDB();

  const services = await Service.find({});
  let updatedCount = 0;
  const summary = [];

  for (const service of services) {
    const { data, changes } = assignImagesToServiceData(
      service.category,
      service.slug,
      service.data
    );

    if (changes.length === 0) continue;

    service.data = data;
    service.markModified('data');
    await service.save();
    updatedCount += 1;
    summary.push(`${service.category}/${service.slug} (${changes.length} slots)`);
  }

  console.log(`\nScanned ${services.length} services.`);
  console.log(`Updated ${updatedCount} services:\n`);
  summary.forEach((line) => console.log(`  - ${line}`));

  if (summary.length === 0) {
    console.log('  (none — all images already assigned)');
  }

  await mongoose.connection.close();
  console.log('\nDone.');
}

assignServiceImages().catch(async (error) => {
  console.error('Patch failed:', error);
  await mongoose.connection.close();
  process.exit(1);
});
