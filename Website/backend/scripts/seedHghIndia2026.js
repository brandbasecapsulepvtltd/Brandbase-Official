/**
 * Seed HGH India 2026 portfolio, blog, and home recent-work entries.
 * Run from backend/: npm run seed:hgh-india-2026
 */
require('dotenv').config();

const connectDB = require('../config/database');
const Portfolio = require('../models/Portfolio');
const Blog = require('../models/Blog');
const HomePage = require('../models/HomePage');
const {
  PORTFOLIO_SLUG,
  BLOG_SLUG,
  PORTFOLIO,
  BLOG,
  HOME_RECENT_WORK_ITEMS,
  HOME_RECENT_WORK_SPANS,
  CASE_STUDIES_SECTION,
  CASE_STUDY_ITEMS,
} = require('./hghIndia2026Data');

async function upsertPortfolio() {
  const existing = await Portfolio.findOne({ slug: PORTFOLIO_SLUG });
  if (existing) {
    Object.assign(existing, PORTFOLIO);
    await existing.save();
    console.log(`Updated portfolio: ${PORTFOLIO_SLUG}`);
    return existing;
  }
  const created = await Portfolio.create(PORTFOLIO);
  console.log(`Created portfolio: ${PORTFOLIO_SLUG}`);
  return created;
}

async function upsertBlog() {
  const existing = await Blog.findOne({ 'metadata.slug': BLOG_SLUG });
  if (existing) {
    existing.metadata = BLOG.metadata;
    existing.sections = BLOG.sections;
    existing.markModified('metadata');
    existing.markModified('sections');
    await existing.save();
    console.log(`Updated blog: ${BLOG_SLUG}`);
    return existing;
  }
  const created = await Blog.create(BLOG);
  console.log(`Created blog: ${BLOG_SLUG}`);
  return created;
}

async function patchHomeRecentWork() {
  const doc = await HomePage.findOne();
  if (!doc) {
    console.warn('No HomePage document — skipping recent work update.');
    return;
  }

  const existingWorks = doc.recentWork?.works || [];
  const existingSpans = doc.recentWork?.spanClasses || [];

  const filteredWorks = existingWorks.filter(
    (work) =>
      !String(work.name || '').includes('HGH India') &&
      !String(work.name || '').includes('ART TO DECOR Stall') &&
      !String(work.name || '').includes('ireka HOMES Booth') &&
      work.link !== `/portfolio/${PORTFOLIO_SLUG}`
  );

  const works = [...HOME_RECENT_WORK_ITEMS, ...filteredWorks].slice(0, 6);
  const spanClasses = [
    ...HOME_RECENT_WORK_SPANS,
    'col-span-2 md:col-span-1 md:row-span-1',
    'col-span-2 md:col-span-1 md:row-span-2',
    'col-span-2 md:col-span-1 md:row-span-2',
    'col-span-2 md:col-span-1 md:row-span-1',
    'col-span-2 md:col-span-1 md:row-span-1',
  ].slice(0, works.length);

  doc.recentWork = { works, spanClasses };
  doc.markModified('recentWork');
  await doc.save();
  console.log(`Home recent work updated — ${works.length} items (HGH India featured first).`);
}

async function patchCaseStudiesSection() {
  const doc = await HomePage.findOne();
  if (!doc) {
    console.warn('No HomePage document — skipping case studies update.');
    return;
  }

  const existing = doc.caseStudiesSection?.caseStudies || [];
  const hghIds = new Set(CASE_STUDY_ITEMS.map((item) => item.id));
  const filtered = existing.filter(
    (study) =>
      !hghIds.has(study.id) &&
      !String(study.companyName || '').includes('HGH India') &&
      study.companyName !== 'ART TO DECOR' &&
      study.companyName !== 'Corelle' &&
      study.companyName !== 'ireka HOMES'
  );

  doc.caseStudiesSection = {
    ...CASE_STUDIES_SECTION,
    ...(doc.caseStudiesSection?.toObject?.() || doc.caseStudiesSection || {}),
    heading: CASE_STUDIES_SECTION.heading,
    subHeading: CASE_STUDIES_SECTION.subHeading,
    caseStudies: [...CASE_STUDY_ITEMS, ...filtered],
  };

  doc.markModified('caseStudiesSection');
  await doc.save();
  console.log(
    `Home case studies updated — ${CASE_STUDY_ITEMS.length} HGH items prepended (${doc.caseStudiesSection.caseStudies.length} total).`
  );
}

async function seedHghIndia2026() {
  await connectDB();

  await upsertPortfolio();
  await upsertBlog();
  await patchHomeRecentWork();
  await patchCaseStudiesSection();

  console.log('\nDone. URLs:');
  console.log(`  Portfolio: /portfolio/${PORTFOLIO_SLUG}`);
  console.log(`  Blog:      /blogs/${BLOG.metadata.category}/${BLOG_SLUG}`);
  console.log('  Home:      Recent Work + Case Studies sections');

  process.exit(0);
}

seedHghIndia2026().catch((err) => {
  console.error('seed:hgh-india-2026 failed:', err);
  process.exit(1);
});
