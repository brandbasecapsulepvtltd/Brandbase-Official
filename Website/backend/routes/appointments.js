// routes/appointments.js
const express = require("express");
const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");

const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ POST - Create appointment
// ✅ POST - Create appointment (FIXED VERSION)

router.post("/", async (req, res) => {
  let appointment;
  
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

    // Validate required fields
    if (!appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: "Date and time are required"
      });
    }

    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format"
      });
    }

    // Create appointment
    const appointmentData = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email?.trim().toLowerCase(),
      organization: organization?.trim(),
      region,
      industry: industry === 'other' ? (otherIndustry?.trim() || industry) : industry,
      category: category === 'other' ? (otherCategory?.trim() || category) : category,
      message: message?.trim(),
      country: country?.trim(),
      state: state?.trim(),
      city: city?.trim(),
      consent: !!consent,
      marketing: !!marketing,
      date: parsedDate,
      time: appointmentTime,
      status: 'pending'
    };

    appointment = new Appointment(appointmentData);
    await appointment.save();

    console.log("✅ Appointment saved to database:", appointment._id);

    // 🚨 CRITICAL FIX: Send response FIRST, then send email in background
    res.status(201).json({ 
      success: true,
      message: "Appointment booked successfully!",
      data: {
        id: appointment._id,
        date: appointment.date,
        time: appointment.time
      }
    });

    // 🔥 EMAIL IN BACKGROUND (non-blocking)
    // This happens AFTER the response is sent
    sendEmailInBackground(appointment).catch(emailError => {
      console.error("❌ Email failed (but appointment was saved):", emailError.message);
      // Don't throw error - appointment is already saved
    });

  } catch (error) {
    console.error("❌ Error saving appointment:", error);
    
    // Special handling for email errors
    if (error.message.includes('EMAIL_FAILED_BUT_APPOINTMENT_SAVED')) {
      // Appointment was saved but email failed
      res.status(201).json({ 
        success: true,
        message: "Appointment booked! (Email notification failed)",
        data: {
          id: appointment?._id,
          date: appointment?.date,
          time: appointment?.time
        }
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: "Internal server error",
        error: error.message 
      });
    }
  }
});

// Helper function for background email sending
async function sendEmailInBackground(appointment) {
  try {
    console.log("📧 Attempting to send email for appointment:", appointment._id);
    
    const notificationEmailHtml = createNotificationEmail(appointment);
    
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin
      subject: `📅 New Appointment Request - ${appointment.firstName} ${appointment.lastName}`,
      html: notificationEmailHtml,
    };

    // Add timeout to email sending
    const emailPromise = transporter.sendMail(notificationMailOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email timeout')), 10000); // 10 second timeout
    });

    await Promise.race([emailPromise, timeoutPromise]);
    
    console.log("✅ Email sent successfully for appointment:", appointment._id);
    
  } catch (emailError) {
    console.error("❌ Email error for appointment", appointment._id, ":", emailError.message);
    
    // Don't throw the error - just log it
    // We'll mark this in the database that email failed
    try {
      await Appointment.findByIdAndUpdate(appointment._id, {
        emailSent: false,
        emailError: emailError.message,
        updatedAt: Date.now()
      });
    } catch (updateError) {
      console.error("Failed to update email status:", updateError.message);
    }
    
    // Throw a special error that won't crash the main request
    throw new Error('EMAIL_FAILED_BUT_APPOINTMENT_SAVED');
  }
}

// ✅ GET - Fetch appointments with filtering
router.get("/", async (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const appointments = await Appointment.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        results: appointments.length,
        totalRecords: total
      }
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
});

// ✅ GET - Fetch appointment statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: 'pending' });
    const confirmed = await Appointment.countDocuments({ status: 'confirmed' });
    const completed = await Appointment.countDocuments({ status: 'completed' });
    const cancelled = await Appointment.countDocuments({ status: 'cancelled' });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        confirmed,
        completed,
        cancelled
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
});

// ✅ GET - Fetch appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: "Appointment not found" 
      });
    }
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
});

// ✅ PUT - Update appointment
router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: "Appointment not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
});

// ✅ DELETE - Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: "Appointment not found" 
      });
    }
    res.status(200).json({ 
      success: true,
      message: "Appointment deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
});

// ✅ POST - Respond to appointment
router.post("/:id/respond", async (req, res) => {
  const { id } = req.params;
  const {
    actionType,
    message,
    meetingLink,
    contact,
    email,
    assignedEmployee,
    adminNotes
  } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: "Appointment not found" 
      });
    }

    // Update appointment status based on action
    let newStatus = appointment.status;
    let responseType = null;

    switch(actionType) {
      case 'accept':
        newStatus = 'confirmed';
        responseType = 'accepted';
        break;
      case 'reject':
        newStatus = 'cancelled';
        responseType = 'rejected';
        break;
      case 'change':
        newStatus = 'rescheduled';
        responseType = 'rescheduled';
        break;
      case 'ban':
        responseType = 'banned';
        break;
    }

    // Update appointment
    const updateData = {
      status: newStatus,
      responseSent: true,
      responseType: responseType,
      updatedAt: Date.now()
    };

    if (actionType === 'accept') {
      updateData.meetingLink = meetingLink;
      updateData.contactNumber = contact;
      updateData.assignedEmployee = assignedEmployee;
    }

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    await Appointment.findByIdAndUpdate(id, updateData);

    // Send email to client
    const userEmailHtml = createResponseEmail(appointment, actionType, message, meetingLink, contact, assignedEmployee);
    
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Appointment ${getActionSubject(actionType)}`,
      html: userEmailHtml,
    };

    await transporter.sendMail(userMailOptions);

    // Send notification to assigned employee
    if (actionType === 'accept' && assignedEmployee?.email) {
      const employeeMailOptions = {
        from: process.env.EMAIL_USER,
        to: assignedEmployee.email,
        subject: "New Appointment Assigned",
        html: createEmployeeNotificationEmail(appointment, meetingLink),
      };

      await transporter.sendMail(employeeMailOptions);
    }

    res.status(200).json({ 
      success: true,
      message: `Appointment ${actionType}ed successfully and notifications sent.`,
      data: { status: newStatus }
    });
  } catch (error) {
    console.error("Error responding to appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
});

// Helper functions
function createNotificationEmail(appointment) {
  const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FF6600, #FF8C42); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; font-size: 24px;">📅 New Appointment Request</h2>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new appointment booking</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa; border: 1px solid #dee2e6;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #28a745;">
          <h3 style="color: #28a745; margin: 0 0 15px 0;">Appointment Scheduled</h3>
          <p style="margin: 0; font-size: 16px;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Time:</strong> ${appointment.time}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h4 style="color: #FF6600; margin: 0 0 15px 0;">👤 Client Information</h4>
            <p><strong>Name:</strong> ${appointment.firstName} ${appointment.lastName}</p>
            <p><strong>Email:</strong> ${appointment.email}</p>
            <p><strong>Organization:</strong> ${appointment.organization || 'Not provided'}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h4 style="color: #FF6600; margin: 0 0 15px 0;">🌍 Location Details</h4>
            <p><strong>Region:</strong> ${appointment.region || 'Not provided'}</p>
            <p><strong>Location:</strong> ${[appointment.city, appointment.state, appointment.country].filter(Boolean).join(', ') || 'Not provided'}</p>
            <p><strong>Industry:</strong> ${appointment.industry || 'Not provided'}</p>
          </div>
        </div>

        ${appointment.message ? `
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="color: #FF6600; margin: 0 0 15px 0;">💬 Client Message</h4>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0;">${appointment.message}</p>
        </div>
        ` : ''}

        <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
          <a href="${process.env.CLIENT_URL}/admin/dashboard/admin-appointment/${appointment._id}" 
             style="background: #FF6600; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Review Appointment
          </a>
        </div>
      </div>

      <div style="background: #343a40; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="margin: 0; font-size: 14px;">This is an automated notification from your appointment booking system.</p>
      </div>
    </div>
  `;
}

function createResponseEmail(appointment, actionType, message, meetingLink, contact, assignedEmployee) {
  const actionTitles = {
    accept: 'Confirmed',
    reject: 'Cancelled',
    change: 'Rescheduled',
    ban: 'Update'
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FF6600, #FF8C42); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; font-size: 24px;">📅 Appointment ${actionTitles[actionType]}</h2>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Your appointment request has been ${actionTitles[actionType].toLowerCase()}</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa; border: 1px solid #dee2e6;">
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <p>Dear ${appointment.firstName},</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        ${actionType === 'accept' ? `
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #FF6600; margin: 0 0 15px 0;">Meeting Details</h3>
          <div style="display: grid; gap: 10px;">
            <p><strong>📅 Date:</strong> ${new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>⏰ Time:</strong> ${appointment.time}</p>
            <p><strong>🔗 Meeting Link:</strong> <a href="${meetingLink}" style="color: #FF6600;">${meetingLink}</a></p>
            ${contact ? `<p><strong>📞 Contact:</strong> ${contact}</p>` : ''}
            ${assignedEmployee ? `<p><strong>👨‍💼 Assigned Representative:</strong> ${assignedEmployee.name} (${assignedEmployee.profession})</p>` : ''}
          </div>
        </div>
        ` : ''}

        <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #6c757d;">If you have any questions, please don't hesitate to contact us.</p>
        </div>
      </div>

      <div style="background: #343a40; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="margin: 0; font-size: 14px;">Thank you for choosing our services.</p>
      </div>
    </div>
  `;
}

function createEmployeeNotificationEmail(appointment, meetingLink) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; font-size: 24px;">🎯 New Appointment Assignment</h2>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">You have been assigned to a new appointment</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa; border: 1px solid #dee2e6;">
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #007bff; margin: 0 0 20px 0;">Appointment Details</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <h4 style="color: #6c757d; margin: 0 0 10px 0;">Client Information</h4>
              <p><strong>Name:</strong> ${appointment.firstName} ${appointment.lastName}</p>
              <p><strong>Email:</strong> ${appointment.email}</p>
              <p><strong>Organization:</strong> ${appointment.organization || 'N/A'}</p>
            </div>
            <div>
              <h4 style="color: #6c757d; margin: 0 0 10px 0;">Meeting Details</h4>
              <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${appointment.time}</p>
              <p><strong>Link:</strong> <a href="${meetingLink}">Join Meeting</a></p>
            </div>
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px;">
          <h4 style="color: #007bff; margin: 0 0 15px 0;">Additional Information</h4>
          <p><strong>Industry:</strong> ${appointment.industry}</p>
          <p><strong>Category:</strong> ${appointment.category}</p>
          <p><strong>Region:</strong> ${appointment.region}</p>
          ${appointment.message ? `<p><strong>Client Message:</strong> ${appointment.message}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

function getActionSubject(actionType) {
  const subjects = {
    accept: 'Confirmed Successfully',
    reject: 'Cancellation Notice',
    change: 'Rescheduling Request',
    ban: 'Important Update'
  };
  return subjects[actionType] || 'Update';
}

module.exports = router;