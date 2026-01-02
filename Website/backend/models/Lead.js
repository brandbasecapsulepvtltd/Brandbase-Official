const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  // Event Information
  exhibitionName: {
    type: String,
    required: [true, 'Exhibition name is required'],
    trim: true
  },
  exhibitionLocation: {
    type: String,
    required: [true, 'Exhibition location is required'],
    trim: true
  },
  exhibitionDate: {
    type: Date,
    required: [true, 'Exhibition date is required']
  },
  
  // Lead Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  
  // Requirements
  preferredStallSize: {
    type: String,
    required: [true, 'Preferred stall size is required'],
    trim: true
  },
  budgetRange: {
    type: String,
    required: [true, 'Budget range is required'],
    enum: ['under-1l', '1l-3l', '3l-5l', '5l-10l', 'above-10l']
  },
  additionalMessage: {
    type: String,
    trim: true,
    default: ''
  },
  
  // Status Tracking
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost', 'on_hold'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'website_form'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Metadata - REMOVED User references
  assignedTo: {
    type: String,
    default: null
  },
  followUpDate: {
    type: Date,
    default: null
  },
  notes: [{
    content: String,
    createdBy: String, // Changed from ObjectId ref to String
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Timestamps
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

// Remove User-related indexes
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ exhibitionName: 'text', companyName: 'text', fullName: 'text' });

// Virtual for formatted phone number
leadSchema.virtual('formattedPhone').get(function() {
  if (!this.phoneNumber) return '';
  return this.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

// Virtual for formatted date
leadSchema.virtual('formattedExhibitionDate').get(function() {
  if (!this.exhibitionDate) return '';
  return this.exhibitionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to get budget label
leadSchema.methods.getBudgetLabel = function() {
  const labels = {
    'under-1l': 'Under ₹1 Lakh',
    '1l-3l': '₹1 - 3 Lakhs',
    '3l-5l': '₹3 - 5 Lakhs',
    '5l-10l': '₹5 - 10 Lakhs',
    'above-10l': 'Above ₹10 Lakhs'
  };
  return labels[this.budgetRange] || this.budgetRange;
};

// Method to get status label
leadSchema.methods.getStatusLabel = function() {
  const labels = {
    'new': 'New Lead',
    'contacted': 'Contacted',
    'qualified': 'Qualified',
    'proposal_sent': 'Proposal Sent',
    'won': 'Won',
    'lost': 'Lost',
    'on_hold': 'On Hold'
  };
  return labels[this.status] || this.status;
};

// Method to get priority label with color
leadSchema.methods.getPriorityInfo = function() {
  const priorities = {
    'low': { label: 'Low', color: 'bg-gray-100 text-gray-800' },
    'medium': { label: 'Medium', color: 'bg-blue-100 text-blue-800' },
    'high': { label: 'High', color: 'bg-yellow-100 text-yellow-800' },
    'urgent': { label: 'Urgent', color: 'bg-red-100 text-red-800' }
  };
  return priorities[this.priority] || { label: this.priority, color: 'bg-gray-100 text-gray-800' };
};

// Pre-save middleware
leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;