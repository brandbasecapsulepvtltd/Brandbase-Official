const mongoose = require('mongoose');

const dayScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    required: true
  },
  enabled: { type: Boolean, default: true },
  customSlots: [{ type: String }]
});

const disabledDateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: String
});

const disabledSlotSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  description: String,
  recurring: { type: Boolean, default: false }
});

const appointmentConfigSchema = new mongoose.Schema({
  weeklySchedule: [dayScheduleSchema],
  disabledDates: [disabledDateSchema],
  disabledTimeSlots: [disabledSlotSchema],
  bufferTime: { type: Number, default: 0 },
  maxAppointmentsPerDay: { type: Number, default: 20 },
  workingHours: {
    start: { type: String, default: "9:00 AM" },
    end: { type: String, default: "5:00 PM" }
  }
}, {
  timestamps: true
});

// Static method to get or create config with defaults
appointmentConfigSchema.statics.getConfig = async function() {
  let config = await this.findOne();
  
  if (!config) {
    // Create default configuration
    config = new this({
      weeklySchedule: [
        { 
          day: 'monday', 
          enabled: true, 
          customSlots: [
            "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
            "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
            "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
            "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
          ] 
        },
        { 
          day: 'tuesday', 
          enabled: true, 
          customSlots: [
            "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
            "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
            "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
            "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
          ] 
        },
        { 
          day: 'wednesday', 
          enabled: true, 
          customSlots: [
            "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
            "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
            "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
            "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
          ] 
        },
        { 
          day: 'thursday', 
          enabled: true, 
          customSlots: [
            "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
            "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
            "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
            "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
          ] 
        },
        { 
          day: 'friday', 
          enabled: true, 
          customSlots: [
            "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
            "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
            "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
            "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
          ] 
        },
        { day: 'saturday', enabled: false, customSlots: [] },
        { day: 'sunday', enabled: false, customSlots: [] }
      ],
      disabledDates: [],
      disabledTimeSlots: [
        { startTime: "12:00 PM", endTime: "1:00 PM", description: "Lunch break", recurring: true }
      ]
    });
    await config.save();
  }
  
  return config;
};

module.exports = mongoose.model('AppointmentConfig', appointmentConfigSchema);