const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  organization: {
    type: String,
    required: [true, 'Organization is required']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required']
  },
  region: {
    type: String,
    required: [true, 'Region is required']
  },
  industry: {
    type: String,
    required: [true, 'Industry is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [1500, 'Message cannot exceed 1500 characters']
  },
  consent: {
    type: Boolean,
    required: [true, 'Consent is mandatory']
  },
  marketing: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'replied', 'resolved', 'spam'],
    default: 'pending'
  },
  replies: [{
    message: {
      type: String,
      required: true
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    repliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ContactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Contact', ContactSchema);