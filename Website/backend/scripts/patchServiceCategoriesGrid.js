/**
 * Align /services grid with footer: 5 categories, AV Production added,
 * Event merged into Exhibition, App Development hidden.
 * Run from backend/: npm run patch:service-grid
 */
require('dotenv').config();

const connectDB = require('../config/database');
const ServiceCategory = require('../models/ServiceCategory');

const PUBLIC_GRID_ORDER = {
  'exhibition-management': 0,
  'digital-marketing': 1,
  'website-development': 2,
  'av-production': 3,
  'branding-design': 4,
};

const HIDDEN_FROM_GRID = ['app-development', 'mobile-app-development', 'event-management'];

function stripMongoIds(value) {
  if (Array.isArray(value)) return value.map(stripMongoIds);
  if (value && typeof value === 'object') {
    const next = {};
    for (const [key, nested] of Object.entries(value)) {
      if (key === '_id' || key === '__v') continue;
      next[key] = stripMongoIds(nested);
    }
    return next;
  }
  return value;
}

const AV_PRODUCTION_HERO = {
  title: 'Audio & Video Production That Tells Your Story',
  subtitle:
    'Corporate films, ads, event coverage, and social content with cinematic visuals and crystal-clear sound.',
  highlightedText: ['Tells Your Story'],
  description:
    'High-quality audio and video production that brings your brand vision to life — from concept to final cut.',
  imgUrl: 'https://ik.imagekit.io/vinayak06/Services/videoProd-removebg-preview.png',
  cta: {
    primary: 'Start a Project',
    primaryLink: '/appointment',
    secondary: 'View Our Work',
    secondaryLink: '/portfolio',
  },
};

async function ensureAvProduction(templateDoc) {
  const existing = await ServiceCategory.findOne({ category: 'av-production' });
  if (existing) {
    existing.isActive = true;
    existing.order = PUBLIC_GRID_ORDER['av-production'];
    existing.hero = { ...existing.hero?.toObject?.() || existing.hero, ...AV_PRODUCTION_HERO };
    if (existing.pageMetadata) {
      existing.pageMetadata.title = 'Audio & Video Production | Corporate Films & Event Coverage';
      existing.pageMetadata.description =
        'Professional audio and video production — corporate films, ads, event coverage, and branded content in Mumbai.';
    }
    await existing.save();
    console.log('Updated existing av-production category.');
    return;
  }

  const base = stripMongoIds(templateDoc.toObject());
  delete base.category;
  delete base.createdAt;
  delete base.updatedAt;

  await ServiceCategory.create({
    ...base,
    category: 'av-production',
    isActive: true,
    order: PUBLIC_GRID_ORDER['av-production'],
    hero: AV_PRODUCTION_HERO,
    pageMetadata: {
      title: 'Audio & Video Production | Corporate Films & Event Coverage',
      description:
        'Professional audio and video production — corporate films, ads, event coverage, and branded content in Mumbai.',
      keywords: [
        'video production',
        'audio production',
        'corporate films',
        'event videography',
        'commercial video',
      ],
    },
    visionBanner: {
      heading:
        'Great video content builds trust, drives engagement, and converts viewers into customers. We deliver production quality that matches your brand ambition.',
      imageUrl: 'https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg',
    },
    comparisonTable: {
      category: 'Audio & Video Production',
      brand: {
        logoUrl:
          'https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819',
        features: [
          'End-to-end scripting, shooting, editing, and delivery',
          'Corporate films, ads, reels, and event coverage',
          'Professional crew, gear, and post-production',
          'Brand-aligned creative direction',
          'Fast turnaround with clear project milestones',
        ],
      },
      others: [
        {
          title: 'Freelance Videographers',
          points: [
            'Limited pre-production and scripting support',
            'Inconsistent quality and delivery timelines',
            'No integrated brand strategy',
            'Basic editing and sound design',
            'Hard to scale for larger productions',
          ],
        },
        {
          title: 'Typical Production Houses',
          points: [
            'Higher costs with less marketing alignment',
            'Limited digital-first content expertise',
            'Slow revision cycles',
            'Generic templates instead of custom storytelling',
            'Weak coordination with your marketing team',
          ],
        },
      ],
    },
    categoryServices: {
      title: 'Audio & Video Production Services',
      subtitle: 'Content That Captivates and Converts',
      description:
        'From corporate films to social reels and live event coverage, we produce video and audio content built for impact.',
      services: [
        {
          title: 'Corporate Films',
          description:
            'Brand films, company profiles, and investor videos that communicate credibility and vision.',
          image: 'https://ik.imagekit.io/vinayak06/Services/videoProd-removebg-preview.png',
          link: '#',
        },
        {
          title: 'Commercial & Ad Films',
          description:
            'High-impact ad films and promotional videos for campaigns across TV, digital, and social.',
          image: 'https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg',
          link: '#',
        },
        {
          title: 'Event Coverage',
          description:
            'Multi-camera event filming, highlight reels, and live-stream support for conferences and exhibitions.',
          image: 'https://ik.imagekit.io/vinayak06/Services/exhibtionManagement.png',
          link: '#',
        },
        {
          title: 'Social & Reels Production',
          description:
            'Short-form video for Instagram, LinkedIn, and YouTube — optimized for engagement and reach.',
          image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
          link: '#',
        },
      ],
    },
    ctaData: {
      title: 'Ready to bring your story to life on screen?',
      subheading: 'Let us plan, shoot, and deliver video content that elevates your brand.',
      primaryText: 'Book a Consultation',
      primaryLink: '/appointment',
      secondaryText: 'View All Services',
      secondaryLink: '/services',
    },
    faqData: [
      {
        question: 'What types of video production do you offer?',
        answer:
          'We produce corporate films, commercials, event coverage, product videos, social reels, and post-production editing.',
      },
      {
        question: 'Do you handle scripting and creative direction?',
        answer:
          'Yes. We support concept development, scripting, storyboarding, shooting, editing, color grading, and final delivery.',
      },
      {
        question: 'Can you cover live events and exhibitions?',
        answer:
          'Absolutely. We offer multi-camera coverage, highlight edits, and live-stream support for events of all sizes.',
      },
    ],
  });

  console.log('Created av-production category.');
}

async function run() {
  await connectDB();

  const exhibition = await ServiceCategory.findOne({ category: 'exhibition-management' });
  if (exhibition?.hero) {
    exhibition.hero.title = 'Event & Exhibition Management That Elevates Your Brand';
    exhibition.hero.subtitle =
      'From stall design to full event execution — exhibitions, activations, and live experiences under one roof.';
    exhibition.order = PUBLIC_GRID_ORDER['exhibition-management'];
    exhibition.isActive = true;
    exhibition.markModified('hero');
    await exhibition.save();
    console.log('Updated exhibition-management hero (merged Event + Exhibition).');
  }

  for (const slug of HIDDEN_FROM_GRID) {
    const doc = await ServiceCategory.findOne({ category: slug });
    if (doc && doc.isActive !== false) {
      doc.isActive = false;
      await doc.save();
      console.log(`Deactivated ${slug} (hidden from public grid).`);
    }
  }

  for (const [slug, order] of Object.entries(PUBLIC_GRID_ORDER)) {
    if (slug === 'av-production') continue;
    const doc = await ServiceCategory.findOne({ category: slug });
    if (doc) {
      doc.order = order;
      doc.isActive = true;
      await doc.save();
      console.log(`Set ${slug} order=${order}, active=true.`);
    }
  }

  const template =
    (await ServiceCategory.findOne({ category: 'digital-marketing' })) ||
    (await ServiceCategory.findOne({ category: 'branding-design' }));

  if (!template) {
    throw new Error('No template category found to seed av-production.');
  }

  await ensureAvProduction(template);

  console.log('Service categories grid patch complete.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
