const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  id: Number,
  title: String,
  subtext: String,
  image: String,
  link: String,
  linkText: String,  // Add this line
});

const videoSchema = new mongoose.Schema({
  url: String
});

const heroSectionSchema = new mongoose.Schema({
  slides: [slideSchema],
  video: videoSchema
});

const serviceItemSchema = new mongoose.Schema({
  category: String,
  items: [String],
  icon: String,
  image: String,
  link: String  // Link for the "Learn More" button
});

const brandElevationSchema = new mongoose.Schema({
  services: [serviceItemSchema]
});

const workSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  link: { type: String, default: '#' }
});

const recentWorkSchema = new mongoose.Schema({
  works: [workSchema],
  spanClasses: [String]
});

const clientSchema = new mongoose.Schema({
  id: Number,
  logo: String,
  name: String,
  description: String,
  projectImage: String,
  service: String,
  location: String,
  date: String,
  results: String
});

const clientsSchema = new mongoose.Schema({
  clientData: [clientSchema]
});

const testimonialSchema = new mongoose.Schema({
  logo: String,
  text: String,
  name: String,
  role: String,
  avatar: String
});

const testimonialsSchema = new mongoose.Schema({
  testimonials: [testimonialSchema]
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  image: String,
  hasImage: Boolean
});

const faqsSchema = new mongoose.Schema({
  faqs: [faqSchema]
});

const caseStudyResultSchema = new mongoose.Schema({
  value: String,
  label: String
});

const caseStudyTestimonialSchema = new mongoose.Schema({
  quote: String,
  author: String,
  role: String,
  avatar: String
});

const caseStudySchema = new mongoose.Schema({
  id: Number,
  companyLogo: String,
  companyName: String,
  industry: String,
  title: String,
  desc: String,
  url: String, // Main image
  galleryImages: [String],
  services: [String],
  results: [caseStudyResultSchema],
  testimonial: caseStudyTestimonialSchema,
  span: String
});

const caseStudiesSectionSchema = new mongoose.Schema({
  heading: String,
  subHeading: String,
  caseStudies: [caseStudySchema]
});

const ctaSectionSchema = new mongoose.Schema({
  title: String,
  subheading: String,
  primaryText: String,
  primaryLink: String,
  secondaryText: String,
  secondaryLink: String
});

const homePageSchema = new mongoose.Schema({
  heroSection: heroSectionSchema,
  brandElevation: brandElevationSchema,
  recentWork: recentWorkSchema,
  clients: clientsSchema,
  caseStudiesSection: caseStudiesSectionSchema,
  testimonials: testimonialsSchema,
  faqs: faqsSchema,
  ctaSection: ctaSectionSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('HomePage', homePageSchema);