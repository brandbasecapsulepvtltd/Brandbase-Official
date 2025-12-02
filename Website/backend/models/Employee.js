// models/Employee.js
const mongoose = require("mongoose");

// Team Schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  description: {
    type: String,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true
  },
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
teamSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
  // Team Reference
  team: {
    type: String,
    required: true,
    trim: true
  },
  
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  
  // Contact Information
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  
  // Professional Information
  designation: {
    type: String,
    required: true,
    trim: true
  },
  
  // Additional Fields
  isRecommended: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Profile Image
  profileImage: {
    type: String,
    default: ""
  },
  
  // Additional Details
  specialization: {
    type: String,
    default: ""
  },
  experience: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  
  // Timestamps
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
employeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for better query performance
teamSchema.index({ name: 1 }, { unique: true });
employeeSchema.index({ team: 1, isActive: 1 });
employeeSchema.index({ email: 1 }, { unique: true });
employeeSchema.index({ isRecommended: 1 });

// Create models
const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

module.exports = {
  Team,
  Employee
};