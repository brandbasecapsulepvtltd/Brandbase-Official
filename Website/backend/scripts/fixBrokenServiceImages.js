/**
 * One-time patch: replace known dead Unsplash URLs in Service CMS documents.
 * Run from backend/: node scripts/fixBrokenServiceImages.js
 */
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Service = require('../models/Service');

const BROKEN_UNSPLASH_REPLACEMENTS = {
  'photo-1465495976277': 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  'photo-1492684223066-e9e4aab4d25e': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
  'photo-1514525253344': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
  'photo-1459749411177': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
  'photo-1454165833767': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  'photo-1563293881': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2025&auto=format&fit=crop',
  'photo-1592478411213': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069&auto=format&fit=crop',
  'photo-1581092921461': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
  'photo-1507537297725': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop',
};

function resolveImageUrl(url) {
  if (!url || typeof url !== 'string') return { url, changed: false };

  for (const [brokenId, replacement] of Object.entries(BROKEN_UNSPLASH_REPLACEMENTS)) {
    if (url.includes(brokenId)) {
      return { url: replacement, changed: true, brokenId };
    }
  }

  return { url, changed: false };
}

function patchServiceData(data, logPrefix, changes) {
  if (!data) return false;
  let modified = false;

  if (Array.isArray(data.features)) {
    data.features.forEach((feature, index) => {
      const result = resolveImageUrl(feature.image);
      if (result.changed) {
        feature.image = result.url;
        modified = true;
        changes.push(`${logPrefix} features[${index}] (${result.brokenId})`);
      }
    });
  }

  if (data.animateImage?.cards?.length) {
    data.animateImage.cards.forEach((card, index) => {
      const result = resolveImageUrl(card.image);
      if (result.changed) {
        card.image = result.url;
        modified = true;
        changes.push(`${logPrefix} animateImage.cards[${index}] (${result.brokenId})`);
      }
    });
  }

  const packagesMap = data.packages?.packages;
  if (packagesMap) {
    const entries = packagesMap instanceof Map
      ? [...packagesMap.entries()]
      : Object.entries(packagesMap);

    for (const [key, pkg] of entries) {
      const result = resolveImageUrl(pkg.image);
      if (result.changed) {
        pkg.image = result.url;
        modified = true;
        changes.push(`${logPrefix} packages.${key} "${pkg.title}" (${result.brokenId})`);

        if (packagesMap instanceof Map) {
          packagesMap.set(key, pkg);
        } else {
          packagesMap[key] = pkg;
        }
      }
    }

    if (modified && !(packagesMap instanceof Map)) {
      data.packages.packages = packagesMap;
      data.markModified('packages.packages');
    }
  }

  if (data.videoMaker?.imageUrl) {
    const result = resolveImageUrl(data.videoMaker.imageUrl);
    if (result.changed) {
      data.videoMaker.imageUrl = result.url;
      modified = true;
      changes.push(`${logPrefix} videoMaker.imageUrl (${result.brokenId})`);
    }
  }

  return modified;
}

async function fixBrokenServiceImages() {
  await connectDB();

  const services = await Service.find({});
  const changes = [];
  let updatedCount = 0;

  for (const service of services) {
    const prefix = `${service.category}/${service.slug}`;
    const modified = patchServiceData(service.data, prefix, changes);

    if (modified) {
      service.markModified('data');
      await service.save();
      updatedCount += 1;
    }
  }

  console.log(`\nScanned ${services.length} services.`);
  console.log(`Updated ${updatedCount} services with ${changes.length} image URL fix(es):\n`);
  changes.forEach((line) => console.log(`  - ${line}`));

  if (changes.length === 0) {
    console.log('  (none — all URLs already valid)');
  }

  await mongoose.connection.close();
  console.log('\nDone.');
}

fixBrokenServiceImages().catch(async (error) => {
  console.error('Patch failed:', error);
  await mongoose.connection.close();
  process.exit(1);
});
