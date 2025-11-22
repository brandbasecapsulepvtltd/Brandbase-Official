const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper function to parse and validate date
const parseAppointmentDate = (dateInput) => {
  if (!dateInput) return null;
  
  try {
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    return null;
  }
};

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      organization,
      region,
      industry,
      otherIndustry,
      category,
      otherCategory,
      message,
      country,
      state,
      city,
      consent,
      marketing,
      appointmentDate,
      appointmentTime
    } = req.body;

    console.log("Received data:", {
      appointmentDate,
      appointmentTime,
      email,
      firstName
    });

    // Validate and parse date
    const parsedDate = parseAppointmentDate(appointmentDate);
    if (!parsedDate) {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment date format'
      });
    }

    // Check if date is in the past
    if (parsedDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date cannot be in the past'
      });
    }

    // Check for existing appointment with same email and date
    const existingAppointment = await Appointment.findOne({
      email: email.toLowerCase().trim(),
      appointmentDate: parsedDate,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'You already have an appointment scheduled for this date'
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      organization: organization.trim(),
      region,
      industry: industry === 'other' ? (otherIndustry || '').trim() : industry,
      category: category === 'other' ? (otherCategory || '').trim() : category,
      message: message.trim(),
      country: country.trim(),
      state: state.trim(),
      city: city.trim(),
      appointmentDate: parsedDate,
      appointmentTime,
      consent,
      marketing
    });

    await appointment.save();

    // Send confirmation email to client
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Appointment Booking Confirmation - Brandbase Capsule',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #FF6600;">Appointment Booked Successfully!</h2>
            <p>Dear ${firstName} ${lastName},</p>
            <p>Thank you for booking an appointment with Brandbase Capsule.</p>
            
            <div style="background: #f8f8f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 10px;">Appointment Details:</h3>
              <p><strong>Date:</strong> ${parsedDate.toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${appointmentTime}</p>
              <p><strong>Service:</strong> ${category === 'other' ? otherCategory : category}</p>
            </div>
            
            <p>We will contact you shortly to confirm your consultation for exhibition stall design services.</p>
            
            <p>Best regards,<br>Brandbase Capsule Team</p>
          </div>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }

    // Send notification to admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Appointment Booking',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #FF6600;">New Appointment Booking</h2>
            <h3>Client Information:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            
            <h3>Appointment Details:</h3>
            <p><strong>Date:</strong> ${parsedDate.toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            <p><strong>Service:</strong> ${category === 'other' ? otherCategory : category}</p>
            <p><strong>Industry:</strong> ${industry === 'other' ? otherIndustry : industry}</p>
            
            <h3>Location:</h3>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>State:</strong> ${state}</p>
            <p><strong>City:</strong> ${city}</p>
            
            <h3>Message:</h3>
            <p>${message}</p>
          </div>
        `
      });
    } catch (adminEmailError) {
      console.log('Admin notification email failed:', adminEmailError);
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        id: appointment._id,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        service: appointment.category
      }
    });

  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
    });
  }
};

// Get all appointments (for admin) - UPDATED with better sorting
const getAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, search } = req.query;
    
    const query = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } }
      ];
    }

    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 }) // Sort by latest first
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v'); // Exclude version key

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      data: appointments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalAppointments: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment
};