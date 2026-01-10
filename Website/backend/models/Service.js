// models/Service.js
const mongoose = require('mongoose');

// Sub-schemas
const FeatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Feature name is required']
  },
  icon: {
    type: String,
    required: [true, 'Feature icon is required']
  }
});

const HeroSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: [true, 'Headline is required']
  },
  subHeadline: {
    type: String,
    required: [true, 'Sub-headline is required']
  },
  ctaText: {
    type: String,
    required: [true, 'CTA text is required']
  },
  ctaLink: {
    type: String,
    default: '#'
  },
  trustNote1: {
    type: String,
    required: [true, 'Trust note 1 is required']
  },
  trustNote2: {
    type: String,
    required: [true, 'Trust note 2 is required']
  },
  features: [FeatureSchema]
});

const AnimateImageCardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Card ID is required']
  },
  image: {
    type: String,
    required: [true, 'Card image URL is required'],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  }
});

const AnimateImageSchema = new mongoose.Schema({
  header: {
    title: {
      type: String,
      required: [true, 'Animate image title is required']
    },
    highlight: {
      type: String,
      required: [true, 'Animate image highlight is required']
    }
  },
  cards: [AnimateImageCardSchema]
});

const ComparisonRowSchema = new mongoose.Schema({
  feature: {
    type: String,
    required: [true, 'Comparison feature is required']
  },
  values: [{
    type: String,
    required: [true, 'Comparison values are required']
  }]
});

const ComparisonSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Comparison heading is required']
  },
  subheading: {
    type: String,
    required: [true, 'Comparison subheading is required']
  },
  columns: [{
    type: String,
    required: [true, 'Comparison columns are required']
  }],
  rows: [ComparisonRowSchema]
});

const FeatureItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Feature item ID is required']
  },
  title: {
    type: String,
    required: [true, 'Feature item title is required']
  },
  description: {
    type: String,
    required: [true, 'Feature item description is required']
  },
  image: {
    type: String,
    required: [true, 'Feature item image is required'],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  imagePosition: {
    type: String,
    enum: ['left', 'right'],
    default: 'right'
  }
});

const PackageItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Package ID is required']
  },
  title: {
    type: String,
    required: [true, 'Package title is required']
  },
  price: {
    type: String,
    required: [true, 'Package price is required']
  },
  icon: {
    type: String,
    required: [true, 'Package icon is required']
  },
  image: {
    type: String,
    required: [true, 'Package image is required'],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  features: [{
    type: String,
    required: [true, 'Package features are required']
  }],
  link: {
    type: String,
    default: '#'
  }
});

const PackagesHeaderSchema = new mongoose.Schema({
  titleLine1: {
    type: String,
    required: [true, 'Package header title is required']
  },
  highlighted: {
    type: String,
    required: [true, 'Package header highlight is required']
  },
  subtitle: {
    type: String,
    required: [true, 'Package subtitle is required']
  }
});

const PackagesSchema = new mongoose.Schema({
  header: {
    type: PackagesHeaderSchema,
    required: [true, 'Package header is required']
  },
  packages: {
    type: Map,
    of: PackageItemSchema,
    required: [true, 'Packages are required']
  }
});

const VideoMakerSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Video maker heading is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Video maker image URL is required'],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)/.test(v);
      },
      message: 'Image URL must be valid'
    }
  },
  paragraphs: [{
    type: String,
    required: [true, 'Video maker paragraphs are required']
  }]
});

const ServiceDataSchema = new mongoose.Schema({
  hero: {
    type: HeroSchema,
    required: [true, 'Hero section is required']
  },
  animateImage: {
    type: AnimateImageSchema,
    required: [true, 'Animate image section is required']
  },
  comparison: {
    type: ComparisonSchema,
    required: [true, 'Comparison section is required']
  },
  features: [FeatureItemSchema],
  packages: {
    type: PackagesSchema,
    required: [true, 'Packages section is required']
  },
  videoMaker: {
    type: VideoMakerSchema,
    required: [true, 'Video maker section is required']
  }
});

const ServiceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    index: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  data: {
    type: ServiceDataSchema,
    required: [true, 'Service data is required']
  },
  published: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create indexes
ServiceSchema.index({ category: 1, slug: 1 });
ServiceSchema.index({ category: 1, order: 1, published: 1 });

// Text index for search
ServiceSchema.index({
  'data.hero.headline': 'text',
  'data.hero.subHeadline': 'text',
  'data.features.title': 'text',
  'data.features.description': 'text',
  category: 'text'
});

// Static methods
ServiceSchema.statics.getCategories = async function () {
  return this.distinct('category');
};

ServiceSchema.statics.getByCategory = async function (category) {
  return this.find({
    category,
    published: true
  }).sort({ order: 1 });
};

ServiceSchema.statics.getService = async function (category, slug) {
  return this.findOne({
    category,
    slug,
    published: true
  });
};

// Helper methods
ServiceSchema.methods.toJSON = function () {
  const obj = this.toObject();

  // Convert packages Map to object for better JSON serialization
  if (obj.data && obj.data.packages && obj.data.packages.packages instanceof Map) {
    obj.data.packages.packages = Object.fromEntries(obj.data.packages.packages);
  }

  return obj;
};

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;