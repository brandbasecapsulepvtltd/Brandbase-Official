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
  image: String
});

const brandElevationSchema = new mongoose.Schema({
  services: [serviceItemSchema]
});

const workSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String
});

const bentoItemSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  desc: String,
  companyLogo: String,
  url: String, // Main image
  galleryImages: [String],
  services: [String],
  results: [{
    value: String,
    label: String,
    icon: String // Optional: store icon name or svg
  }],
  testimonial: {
    quote: String,
    author: String,
    role: String,
    avatar: String
  },
  industry: String
});

const recentWorkSchema = new mongoose.Schema({
  bentoItems: {
    type: [bentoItemSchema],
    validate: [arrayLimit, '{PATH} must have exactly 6 items']
  },
  // Ensure we keep the old structure if needed for migration or make it optional, 
  // but for this task we are replacing/enhancing it. 
  // We'll keep 'works' and 'spanClasses' from previous definition if they are still needed for fallback 
  // or backward compatibility, but the plan implies replacing/using strict 6 items.
  // To avoid breaking existing data immediately, we can keep them but we focus on bentoItems.
});

function arrayLimit(val) {
  return val.length <= 6;
}

const serviceSliderSchema = new mongoose.Schema({
  services: [String]
});

const ctaSchema = new mongoose.Schema({
  title: String,
  highlightedText: String,
  description: String,
  features: [{
    icon: String, // emoji or text
    title: String,
    subtitle: String
  }],
  buttons: {
    primary: { text: String, link: String },
    secondary: { text: String, link: String }
  },
  statsText: String,
  serviceColumns: [{
    name: String,
    icon: String,
    description: String
  }]
});

const clientItemSchema = new mongoose.Schema({
  name: String,
  logo: String
});

const clientsSchema = new mongoose.Schema({
  clientData: [clientItemSchema]
});

const testimonialItemSchema = new mongoose.Schema({
  text: String,
  author: String,
  role: String,
  image: String
});

const testimonialsSchema = new mongoose.Schema({
  testimonials: [testimonialItemSchema]
});

const faqItemSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const faqsSchema = new mongoose.Schema({
  faqs: [faqItemSchema]
});

const homePageSchema = new mongoose.Schema({
  heroSection: heroSectionSchema,
  brandElevation: brandElevationSchema,
  recentWork: recentWorkSchema,
  serviceSlider: serviceSliderSchema,
  ctaSection: ctaSchema,
  clients: clientsSchema,
  testimonials: testimonialsSchema,
  faqs: faqsSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('HomePage', homePageSchema);