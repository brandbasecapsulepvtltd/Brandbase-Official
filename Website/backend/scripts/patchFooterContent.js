/**
 * Patch footer CMS: Blogs label, remove App Development, BrandBase capitalization.
 * Run from backend/: node scripts/patchFooterContent.js
 */
require('dotenv').config();

const connectDB = require('../config/database');
const Footer = require('../models/Footer');

function fixBrandDisplay(text) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return text;
  if (/^https?:\/\//i.test(trimmed)) return text;
  return text.replace(/\bBrandbase\b/g, 'BrandBase');
}

const NESCO_ADDRESS =
  'Brandbase Capsule Pvt. Ltd, R-34A, Office No. 34, NESCO IT Park, Goregaon East, Mumbai, Maharashtra 400063';

const OLD_FOOTER_ADDRESS_PATTERNS = [
  /Gulmohar/i,
  /Pimpleshwar/i,
  /Goregaon Railway/i,
  /Office #204/i,
];

function isOldFooterAddress(address) {
  if (!address || typeof address !== 'string') return false;
  return OLD_FOOTER_ADDRESS_PATTERNS.some((pattern) => pattern.test(address));
}
  const label = (link.label || '').toLowerCase();
  const href = (link.href || '').toLowerCase();
  return (
    label.includes('app development') ||
    href.includes('app-development') ||
    href.includes('mobile-app-development')
  );
}

async function run() {
  await connectDB();

  const footer = await Footer.findOne();
  if (!footer) {
    console.log('No footer document found.');
    process.exit(0);
  }

  footer.description = fixBrandDisplay(footer.description);
  footer.copyright = fixBrandDisplay(footer.copyright);

  if (footer.contactInfo?.address) {
    footer.contactInfo.address = fixBrandDisplay(footer.contactInfo.address);
    if (isOldFooterAddress(footer.contactInfo.address)) {
      footer.contactInfo.address = NESCO_ADDRESS;
    }
  }

  for (const col of footer.columns || []) {
    col.links = col.links.filter((link) => !shouldExcludeLink(link));
    for (const link of col.links) {
      if ((link.label || '').trim().toLowerCase() === 'blog') {
        link.label = 'Blogs';
      } else {
        link.label = fixBrandDisplay(link.label);
      }
    }
  }

  footer.markModified('columns');
  footer.markModified('contactInfo');

  await footer.save();
  console.log('Footer patched successfully.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
