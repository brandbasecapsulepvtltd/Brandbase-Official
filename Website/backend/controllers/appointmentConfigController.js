const AppointmentConfig = require('../models/AppointmentConfig');

// Get appointment configuration
const getAppointmentConfig = async (req, res) => {
  try {
    const config = await AppointmentConfig.getConfig();
    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Get appointment config error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment configuration'
    });
  }
};

// Update appointment configuration
const updateAppointmentConfig = async (req, res) => {
  try {
    const {
      weeklySchedule,
      disabledDates,
      disabledTimeSlots,
      bufferTime,
      maxAppointmentsPerDay,
      workingHours
    } = req.body;

    const config = await AppointmentConfig.findOneAndUpdate(
      {},
      {
        weeklySchedule,
        disabledDates,
        disabledTimeSlots,
        bufferTime,
        maxAppointmentsPerDay,
        workingHours
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Appointment configuration updated successfully',
      data: config
    });
  } catch (error) {
    console.error('Update appointment config error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment configuration'
    });
  }
};

// Add disabled date
const addDisabledDate = async (req, res) => {
  try {
    const { date, description } = req.body;
    
    const config = await AppointmentConfig.getConfig();
    config.disabledDates.push({ date: new Date(date), description });
    await config.save();

    res.json({
      success: true,
      message: 'Disabled date added successfully',
      data: config
    });
  } catch (error) {
    console.error('Add disabled date error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add disabled date'
    });
  }
};

// Remove disabled date
const removeDisabledDate = async (req, res) => {
  try {
    const { dateId } = req.params;
    
    const config = await AppointmentConfig.getConfig();
    config.disabledDates = config.disabledDates.filter(
      d => d._id.toString() !== dateId
    );
    await config.save();

    res.json({
      success: true,
      message: 'Disabled date removed successfully',
      data: config
    });
  } catch (error) {
    console.error('Remove disabled date error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove disabled date'
    });
  }
};

// Add disabled time slot
const addDisabledTimeSlot = async (req, res) => {
  try {
    const { startTime, endTime, description, recurring } = req.body;
    
    const config = await AppointmentConfig.getConfig();
    config.disabledTimeSlots.push({ startTime, endTime, description, recurring });
    await config.save();

    res.json({
      success: true,
      message: 'Disabled time slot added successfully',
      data: config
    });
  } catch (error) {
    console.error('Add disabled time slot error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add disabled time slot'
    });
  }
};

// Remove disabled time slot
const removeDisabledTimeSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    
    const config = await AppointmentConfig.getConfig();
    config.disabledTimeSlots = config.disabledTimeSlots.filter(
      s => s._id.toString() !== slotId
    );
    await config.save();

    res.json({
      success: true,
      message: 'Disabled time slot removed successfully',
      data: config
    });
  } catch (error) {
    console.error('Remove disabled time slot error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove disabled time slot'
    });
  }
};

module.exports = {
  getAppointmentConfig,
  updateAppointmentConfig,
  addDisabledDate,
  removeDisabledDate,
  addDisabledTimeSlot,
  removeDisabledTimeSlot
};