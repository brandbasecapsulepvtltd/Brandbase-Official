const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'Layers'
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  content: {
    hero: {
      title: String,
      subtitle: String,
      image: String
    },
    description: String,
    features: [{
      title: String,
      description: String,
      icon: String
    }]
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

// Create indexes
CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ order: 1, published: 1 });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;