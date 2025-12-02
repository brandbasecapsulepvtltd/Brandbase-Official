// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  organization: String,
  region: String,
  industry: String,
  otherIndustry: String,
  category: String,
  otherCategory: String,
  message: String,
  consent: { type: Boolean, default: false },
  marketing: { type: Boolean, default: false },
  country: String,
  state: String,
  city: String,
  
  // New fields for enhanced functionality
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled'],
    default: 'pending' 
  },
  assignedEmployee: {
    name: String,
    email: String,
    image: String,
    profession: String,
    contact: String
  },
  meetingLink: String,
  contactNumber: String,
  adminNotes: String,
  responseSent: { type: Boolean, default: false },
  responseType: {
    type: String,
    enum: ['accepted', 'rejected', 'rescheduled', 'banned', null],
    default: null
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);