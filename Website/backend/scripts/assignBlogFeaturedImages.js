/**
 * Assign unique professional featured images to exhibition blog posts.
 * Run from backend/: npm run assign:blog-images
 */
require('dotenv').config();

const connectDB = require('../config/database');
const Blog = require('../models/Blog');

/** Brandbase / ImageKit exhibition & stall photography */
const PROFESSIONAL_IMAGES = {
  exhibitionHall: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  brandbaseStall: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/Brandbase%20capsule%20stall%20(1).jpg',
  stallLighting: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/lights%20(1).jpg',
  mumbaiBrands: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/why_mumbai_choose_brandbase_capsule.jpg',
  trends2026: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/riseofstalldesign2026%20(1).jpg',
  imagination: 'https://ik.imagekit.io/vinayak06/Mavnox/imagination1.jpg',
  techExhibition: 'https://ik.imagekit.io/vinayak06/technology-exhibition.jpg',
  servicesHero: 'https://ik.imagekit.io/vinayak06/Services/exhibtionManagement.png',
  stallA: 'https://ik.imagekit.io/vinayak06/stalls/WhatsApp%20Image%202025-12-22%20at%206.10.59%20PM.jpeg',
  stallB: 'https://ik.imagekit.io/vinayak06/stalls/WhatsApp%20Image%202025-12-22%20at%206.11.15%20PM%20(1).jpeg',
  stallC: 'https://ik.imagekit.io/vinayak06/stalls/WhatsApp%20Image%202025-12-22%20at%206.11.10%20PM.jpeg',
  stallD: 'https://ik.imagekit.io/vinayak06/stalls/WhatsApp%20Image%202025-12-22%20at%206.11.14%20PM%20(2).jpeg',
  stallE: 'https://ik.imagekit.io/vinayak06/stalls/WhatsApp%20Image%202025-12-22%20at%206.11.08%20PM%20(1).jpeg',
  stallF: 'https://ik.imagekit.io/vinayak06/stalls/WhatsApp%20Image%202025-12-22%20at%206.11.09%20PM.jpeg',
  stallG: 'https://ik.imagekit.io/vinayak06/stalls/WhatsApp%20Image%202025-12-22%20at%206.11.10%20PM%20(2).jpeg',
  ie01: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/1.jpg',
  ie02: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/2.JPG',
  ie03: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/3.JPG',
  ie04: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/4.JPG',
  ie05: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/5.JPG',
  ie06: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/6.JPG',
  ie08: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/8.jpg',
  ie09: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/9.jpg',
  ie10: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/10.jpg',
  ie11: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/11.jpg',
  ie12: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/12.jpg',
  ie13: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/13.jpg',
  ie14: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/14.jpg',
  ie15: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/15.jpg',
  ie16: 'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/16.jpg',
};

/** Unique image per exhibition blog slug */
const EXHIBITION_BLOG_IMAGES = {
  // iDAC Expo Mumbai 2026
  'best-stall-design-fabrication-company-for-idac-expo-mumbai-2026-mumbai-experts': PROFESSIONAL_IMAGES.brandbaseStall,
  'why-choosing-the-right-stall-fabricator-for-idac-expo-mumbai-2026-can-make-or-break-your-roi': PROFESSIONAL_IMAGES.stallLighting,
  'complete-checklist-to-prepare-your-exhibition-stall-for-idac-expo-mumbai-2026': PROFESSIONAL_IMAGES.exhibitionHall,
  'stall-design-ideas-trends-that-work-best-at-idac-expo-mumbai-2026-with-real-examples': PROFESSIONAL_IMAGES.trends2026,
  'ultimate-exhibitor-guide-for-idac-expo-mumbai-2026-dates-venue-stall-sizes-cost-tips': PROFESSIONAL_IMAGES.ie01,

  // Plastiworld 2026
  'best-stall-design-fabrication-company-for-plastiworld-2026-mumbai-experts': PROFESSIONAL_IMAGES.ie05,
  'why-choosing-the-right-stall-fabricator-for-plastiworld-2026-can-make-or-break-your-roi': PROFESSIONAL_IMAGES.ie08,
  'complete-checklist-to-prepare-your-exhibition-stall-for-plastiworld-2026': PROFESSIONAL_IMAGES.ie10,
  'stall-design-ideas-trends-that-work-best-at-plastiworld-2026-with-real-examples': PROFESSIONAL_IMAGES.ie12,
  'ultimate-exhibitor-guide-for-plastiworld-2026-dates-venue-stall-sizes-cost-tips': PROFESSIONAL_IMAGES.ie15,

  // ACREX India 2026
  'ultimate-exhibitor-guide-for-acrex-india-2026-test-dates-venue-stall-sizes-cost-tips': PROFESSIONAL_IMAGES.stallA,
  'high-impact-custom-booth-designs-for-building-engineering-brands-at-acrex-india-2026': PROFESSIONAL_IMAGES.stallB,
  'best-stall-design-company-for-acrex-2026': PROFESSIONAL_IMAGES.ie06,

  // OTM 2026
  'otm': PROFESSIONAL_IMAGES.ie02,
  'otm-exhibition-2026-stall-design-ideas': PROFESSIONAL_IMAGES.stallC,
  'choose-stall-design-agency-for-otm-2026': PROFESSIONAL_IMAGES.stallD,
  'otm-exhibition-2026-exhibitor-guide-stall-design-branding-promotion': PROFESSIONAL_IMAGES.stallE,
  'best-stall-design-company-for-otm-2026': PROFESSIONAL_IMAGES.stallF,

  // Mumbai / general exhibition
  'best-stall-fabricator-in-mumbai-from-idea-to-execution': PROFESSIONAL_IMAGES.imagination,
  'exhibition-management-company-in-mumbai-end-to-end-services': PROFESSIONAL_IMAGES.techExhibition,
  'best-exhibition-stall-design-company-in-mumbai': PROFESSIONAL_IMAGES.servicesHero,
  'best-stall-design-company-in-mumbai': PROFESSIONAL_IMAGES.ie03,
  'how-to-choose-the-best-stall-design-company-in-mumbai': PROFESSIONAL_IMAGES.ie04,
  'exhibition-stall-design-trends-mumbai-2026': PROFESSIONAL_IMAGES.ie09,
  'why-mumbai-brands-choose-brandbase-capsule-for-custom-stall-design': PROFESSIONAL_IMAGES.mumbaiBrands,
};

/** Default for new AI-generated exhibition blogs */
const DEFAULT_EXHIBITION_FEATURED_IMAGE = PROFESSIONAL_IMAGES.exhibitionHall;

async function run() {
  await connectDB();

  const exhibitionBlogs = await Blog.find({ 'metadata.category': 'exhibition' });
  let updated = 0;
  const usedImages = new Set();

  for (const blog of exhibitionBlogs) {
    const slug = blog.metadata?.slug;
    let nextImage = EXHIBITION_BLOG_IMAGES[slug];

    if (!nextImage) {
      // Assign next unused professional image from pool
      const pool = Object.values(PROFESSIONAL_IMAGES);
      nextImage = pool.find((url) => !usedImages.has(url)) || DEFAULT_EXHIBITION_FEATURED_IMAGE;
    }

    if (blog.metadata.featuredImage !== nextImage) {
      blog.metadata.featuredImage = nextImage;
      await blog.save();
      updated++;
      console.log('Updated:', slug);
    }

    usedImages.add(nextImage);
  }

  console.log(`Done. Updated ${updated} exhibition blog(s) with professional images.`);
  process.exit(0);
}

module.exports = {
  PROFESSIONAL_IMAGES,
  DEFAULT_EXHIBITION_FEATURED_IMAGE,
  EXHIBITION_BLOG_IMAGES,
};

if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
