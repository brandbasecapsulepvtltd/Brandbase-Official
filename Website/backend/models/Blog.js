const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  metadata: {
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['productivity', 'technology', 'wellness', 'marketing', 'business', 'lifestyle'],
      default: 'productivity'
    },
    isEditorPick: {
      type: Boolean,
      default: false
    },
    isSlider: {
      type: Boolean,
      default: false
    },
    isHelpfulResources: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true
    },
    author: {
      name: {
        type: String,
        required: [true, 'Please add author name'],
        trim: true
      },
      role: {
        type: String,
        required: [true, 'Please add author role'],
        trim: true
      },
      image: {
        type: String,
        required: [true, 'Please add author image URL']
      },
      twitter: {
        type: String,
        default: '#'
      },
      linkedin: {
        type: String,
        default: '#'
      }
    },
    readTime: {
      type: String,
      required: [true, 'Please add read time'],
      default: '5 min read'
    },
    featuredImage: {
      type: String,
      required: [true, 'Please add featured image URL']
    },
    publishDate: {
      type: Date,
      required: [true, 'Please add publish date'],
      default: Date.now
    }
  },
  sections: [{
    id: {
      type: String,
      required: [true, 'Please add section ID'],
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Please add section title'],
      trim: true
    },
    content: [{
      type: String,
      required: [true, 'Please add section content']
    }],
    listItems: [{
      type: String
    }]
  }],
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

// Indexes for better query performance
blogSchema.index({ 'metadata.slug': 1 });
blogSchema.index({ 'metadata.category': 1 });
blogSchema.index({ 'metadata.isEditorPick': 1 });
blogSchema.index({ 'metadata.isSlider': 1 });
blogSchema.index({ 'metadata.publishDate': -1 });

// Middleware to update updatedAt before save
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to get blog by slug
blogSchema.statics.findBySlug = function(slug) {
  return this.findOne({ 'metadata.slug': slug });
};

// Static method to get blogs by category
blogSchema.statics.findByCategory = function(category) {
  return this.find({ 'metadata.category': category }).sort({ 'metadata.publishDate': -1 });
};

// Static method to get editor's picks
blogSchema.statics.findEditorsPicks = function() {
  return this.find({ 'metadata.isEditorPick': true }).sort({ 'metadata.publishDate': -1 });
};

// Static method to get slider blogs
blogSchema.statics.findSliderBlogs = function() {
  return this.find({ 'metadata.isSlider': true }).sort({ 'metadata.publishDate': -1 });
};

// Static method to get helpful resources
blogSchema.statics.findHelpfulResources = function() {
  return this.find({ 'metadata.isHelpfulResources': true }).sort({ 'metadata.publishDate': -1 });
};

module.exports = mongoose.model('Blog', blogSchema);