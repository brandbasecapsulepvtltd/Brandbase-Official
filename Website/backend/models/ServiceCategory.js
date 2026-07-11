const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  highlightedText: [{ type: String }],
  description: { type: String },
  imgUrl: { type: String, required: true },
  cta: {
    primary: { type: String, required: true },
    primaryLink: { type: String, default: '#' },
    secondary: { type: String, required: true },
    secondaryLink: { type: String, default: '#' }
  }
});

const visionBannerSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const comparisonBrandSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  features: [{ type: String, required: true }]
});

const comparisonOtherSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: [{ type: String, required: true }]
});

const comparisonTableSchema = new mongoose.Schema({
  category: { type: String, required: true },
  brand: comparisonBrandSchema,
  others: [comparisonOtherSchema]
});

const categoryServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String }
});

const categoryServicesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  services: [categoryServiceSchema]
});

const contentItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'list', 'image'],
    required: true
  },
  value: { type: String },
  items: [{ type: String }],
  src: { type: String },
  alt: { type: String }
});

const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  heading: { type: String, required: true },
  content: [contentItemSchema]
});

const categoryAdvantagesSchema = new mongoose.Schema({
  mainTitle: { type: String, required: true },
  sections: {
    overview: sectionSchema,
    conversionRate: sectionSchema,
    userExperience: sectionSchema,
    competitiveEdge: sectionSchema,
    searchRankings: sectionSchema,
    digitalMarketing: sectionSchema
  }
});

const whyBuildReasonSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  reason: { type: String, required: true }
});

const whyBuildWithBcplSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  reasons: [whyBuildReasonSchema]
});

const tagSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ['primary', 'secondary'],
    default: 'primary'
  }
});

const weCreateHeaderSchema = new mongoose.Schema({
  titleOrange: { type: String, required: true },
  titleBlack: { type: String, required: true },
  description: { type: String, required: true }
});

const leftFeaturedSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  tags: [tagSchema]
});

const rightColumnItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  tags: [tagSchema]
});

const weCreateSchema = new mongoose.Schema({
  header: weCreateHeaderSchema,
  leftFeatured: leftFeaturedSchema,
  rightColumnItems: [rightColumnItemSchema]
});

const pageMetadataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: [{ type: String }]
});

const ctaDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subheading: { type: String, required: true },
  primaryText: { type: String },
  primaryLink: { type: String },
  secondaryText: { type: String },
  secondaryLink: { type: String }
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const heroSliderItemSchema = new mongoose.Schema({
  img: { type: String, required: true },
  text: [{ type: String, required: true }],
  link: { type: String, required: true },
  buttonText: { type: String, required: true }
});

const heroSliderSchema = new mongoose.Schema({
  slides: [heroSliderItemSchema]
});

const serviceCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  hero: heroSchema,
  heroSlider: heroSliderSchema,
  visionBanner: visionBannerSchema,
  comparisonTable: comparisonTableSchema,
  categoryServices: categoryServicesSchema,
  categoryAdvantages: categoryAdvantagesSchema,
  whyBuildWithBcpl: whyBuildWithBcplSchema,
  weCreate: weCreateSchema,
  pageMetadata: pageMetadataSchema,
  ctaData: ctaDataSchema,
  faqData: [faqSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for faster queries
serviceCategorySchema.index({ category: 1 });
serviceCategorySchema.index({ isActive: 1 });
serviceCategorySchema.index({ order: 1 });

// Middleware to update updatedAt timestamp
serviceCategorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to update updatedAt on update operations
serviceCategorySchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

module.exports = ServiceCategory;