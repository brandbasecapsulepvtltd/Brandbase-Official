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

const homePageSchema = new mongoose.Schema({
  heroSection: heroSectionSchema,
  brandElevation: brandElevationSchema,
  recentWork: recentWorkSchema,
  clients: clientsSchema,
  testimonials: testimonialsSchema,
  faqs: faqsSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('HomePage', homePageSchema);