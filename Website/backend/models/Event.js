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
    required: true,
    enum: ['tech', 'healthcare', 'manufacturing', 'retail', 'food', 'auto', 'fashion', 'pharma']
  },
  isIndoor: { type: Boolean, required: true },
  expectedFootfall: { type: Number, required: true },
  stallSizes: [{ type: String, required: true }],
  description: { type: String, required: true },
  whyParticipate: { type: String, required: true },
  portfolioItems: [portfolioItemSchema],
  similarEvents: [{ type: String }]
}, {
  timestamps: true
});

// Indexes for better query performance
eventSchema.index({ city: 1 });
eventSchema.index({ industry: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ isIndoor: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;