const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stallSize: { type: String, required: true },
  industry: { type: String, required: true },
  clientTestimonial: { type: String, required: true },
  clientName: { type: String, required: true },
  clientCompany: { type: String, required: true }
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: [{ type: String }],
  listItems: [{ type: String }],
  media: [{
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    url: { type: String },
    caption: { type: String }
  }]
});

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  organizer: { type: String, required: true },
  organizerWebsite: { type: String, required: true },
  industry: {
    type: String,
    required: true
  },
  isIndoor: { type: Boolean, required: true },
  expectedFootfall: { type: Number, required: true },
  stallSizes: [{ type: String, required: true }],
  description: { type: String, required: true },
  whyParticipate: { type: String, required: true },
  portfolioItems: [portfolioItemSchema],
  faqs: [faqSchema],
  sections: [sectionSchema],
  similarEvents: [{ type: String }],
  // SEO Fields
  slug: { type: String, unique: true, sparse: true }, // sparse allows existing docs to lack it initially
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: [String] }, // Array of strings
  structuredData: { type: String }, // JSON string
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'published'
  },
  blogConfiguration: {
    enabled: { type: Boolean, default: false },
    generationStartDate: { type: Date },
    generationEndDate: { type: Date },
    postsPerDay: { type: Number, default: 0.2 }, // Default to 1 every 5 days if not specified
    keywords: [{ type: String }],
    scheduledBlogs: [{
      category: {
        type: String,
        enum: ['guide', 'fabricator', 'trends', 'checklist', 'roi']
      },
      publishDate: { type: Date },
      isGenerated: { type: Boolean, default: false },
      blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
    }],
    lastGeneratedDate: { type: Date },
    generatedBlogCount: { type: Number, default: 0 }
  },

  // Existing fields continue...
}, {
  timestamps: true
});

// Indexes for better query performance
eventSchema.index({ city: 1 });
eventSchema.index({ industry: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ isIndoor: 1 });
eventSchema.index({ slug: 1 }); // Index for slug lookup

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;