/**
 * One-time patch: replace known dead Unsplash URLs in Blog CMS documents.
 * Run from backend/: node scripts/fixBrokenBlogImages.js
 */
require('dotenv').config();

const connectDB = require('../config/database');
const Blog = require('../models/Blog');

const BROKEN_UNSPLASH_REPLACEMENTS = {
  'photo-1540575467063': 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  'photo-1540575861501': 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  'photo-1531050171669': 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&h=800&fit=crop',
};

function resolveUrl(url) {
  if (!url || typeof url !== 'string') return url;
  for (const [brokenId, replacement] of Object.entries(BROKEN_UNSPLASH_REPLACEMENTS)) {
    if (url.includes(brokenId)) return replacement;
  }
  return url;
}

async function run() {
  await connectDB();
  const blogs = await Blog.find({});
  let patched = 0;

  for (const blog of blogs) {
    const current = blog.metadata?.featuredImage;
    const next = resolveUrl(current);
    if (current && next !== current) {
      blog.metadata.featuredImage = next;
      await blog.save();
      patched++;
      console.log('Patched:', blog.metadata.slug);
    }
  }

  console.log(`Done. Patched ${patched} blog(s).`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
