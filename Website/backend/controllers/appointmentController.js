const express = require("express");
const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");

const router = express.Router();

// ✅ POST - Create appointment with email notification
router.post("/", async (req, res) => {
  try {
    console.log("Received appointment data:", req.body);

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
      appointmentDate,  // From frontend
      appointmentTime   // From frontend
    } = req.body;

    // Map frontend fields to backend schema
    const appointmentData = {
      firstName,
      lastName,
      email,
      organization,
      region,
      industry: industry === 'other' ? (otherIndustry || industry) : industry,
      category: category === 'other' ? (otherCategory || category) : category,
      message,
      country,
      state,
      city,
      consent,
      marketing,
      date: appointmentDate,      // Map to schema field
      time: appointmentTime       // Map to schema field
    };

    console.log("Mapped appointment data:", appointmentData);

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    console.log("Appointment saved successfully:", appointment._id);

    // Set up nodemailer transporter for notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_PASS,
        pass: process.env.EMAIL_USER,
      },
    });

    // Format the appointment date for better readability
    const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create user-friendly email template
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .appointment-details { background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .detail-row { display: flex; margin-bottom: 8px; }
          .detail-label { font-weight: bold; width: 150px; color: #555; }
          .detail-value { flex: 1; }
          .footer { background-color: #f1f1f1; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          .highlight { background-color: #e8f5e8; padding: 10px; border-left: 4px solid #4CAF50; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🗓️ New Appointment Request</h2>
            <p>You have received a new appointment booking</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <strong>📅 Appointment scheduled for:</strong> ${formattedDate} at ${appointment.time}
            </div>
            
            <div class="appointment-details">
              <h3>👤 Contact Information</h3>
              <div class="detail-row">
                <span class="detail-label">Full Name:</span>
                <span class="detail-value">${appointment.firstName} ${appointment.lastName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${appointment.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Organization:</span>
                <span class="detail-value">${appointment.organization || 'Not provided'}</span>
              </div>
            </div>

            <div class="appointment-details">
              <h3>🌍 Location & Business Details</h3>
              <div class="detail-row">
                <span class="detail-label">Region:</span>
                <span class="detail-value">${appointment.region || 'Not provided'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Country:</span>
                <span class="detail-value">${appointment.country || 'Not provided'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">State:</span>
                <span class="detail-value">${appointment.state || 'Not provided'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">City:</span>
                <span class="detail-value">${appointment.city || 'Not provided'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Industry:</span>
                <span class="detail-value">${appointment.industry || 'Not provided'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Category:</span>
                <span class="detail-value">${appointment.category || 'Not provided'}</span>
              </div>
            </div>

            ${appointment.message ? `
            <div class="appointment-details">
              <h3>💬 Message</h3>
              <p style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; margin: 0;">${appointment.message}</p>
            </div>
            ` : ''}

            <div class="appointment-details">
              <h3>✅ Preferences</h3>
              <div class="detail-row">
                <span class="detail-label">Consent Given:</span>
                <span class="detail-value">${appointment.consent ? '✅ Yes' : '❌ No'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Marketing Emails:</span>
                <span class="detail-value">${appointment.marketing ? '✅ Accepted' : '❌ Declined'}</span>
              </div>
            </div>

            <div class="appointment-details">
              <h3>⏰ Booking Details</h3>
              <div class="detail-row">
                <span class="detail-label">Request Time:</span>
                <span class="detail-value">${new Date(appointment.createdAt).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Appointment ID:</span>
                <span class="detail-value">${appointment._id}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Please review and respond to this appointment request in your admin dashboard.</p>
            <small>This is an automated notification from your appointment booking system.</small>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send notification email
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: "vinayakandhere4@gmail.com",
      subject: `🗓️ New Appointment Request - ${appointment.firstName} ${appointment.lastName}`,
      html: notificationEmailHtml,
    };

    await transporter.sendMail(notificationMailOptions);

    res.status(201).json({ 
      success: true,
      message: "Appointment booked successfully!",
      data: {
        id: appointment._id,
        date: appointment.date,
        time: appointment.time
      }
    });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
});

// ✅ GET - Fetch all appointments (Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
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

// ✅ DELETE - Delete appointment by ID
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

// ✅ POST - Respond to appointment (send emails based on action type)
router.post("/:id/respond", async (req, res) => {
  const { id } = req.params;
  const {
    actionType,
    message,
    meetingLink,
    contact,
    email, // user's email
    assignedEmployee, // { name, email }
  } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: "Appointment not found" 
      });
    }

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Base email content for user
    let userEmailHtml = `
      <p>Hello ${appointment.firstName},</p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    // If accepted, append meeting link, contact, and assigned employee info
    if (actionType === "accept") {
      userEmailHtml += `
        <p><strong>Meeting Details:</strong></p>
        <ul>
          <li><strong>Meeting Link:</strong> ${meetingLink}</li>
          <li><strong>Contact Number:</strong> ${contact}</li>
          <li><strong>Assigned Employee:</strong> ${assignedEmployee?.name || "Not Assigned"}</li>
        </ul>
      `;
    }

    userEmailHtml += `<p>Thank you!</p>`;

    // Send email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Appointment has been ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}`,
      html: userEmailHtml,
    };

    await transporter.sendMail(userMailOptions);

    // Send email to assigned employee ONLY in accept case
    if (actionType === "accept" && assignedEmployee?.email) {
      const employeeMailOptions = {
        from: process.env.EMAIL_USER,
        to: assignedEmployee.email,
        subject: "New Appointment Assigned to You",
        html: `
          <p>Hello ${assignedEmployee.name},</p>
          <p>You have been assigned a new appointment. Please find the details below:</p>
          <ul>
            <li><strong>User Name:</strong> ${appointment.firstName} ${appointment.lastName}</li>
            <li><strong>Email:</strong> ${appointment.email}</li>
            <li><strong>Organization:</strong> ${appointment.organization}</li>
            <li><strong>Region:</strong> ${appointment.region}</li>
            <li><strong>Industry:</strong> ${appointment.industry}</li>
            <li><strong>Category:</strong> ${appointment.category}</li>
            <li><strong>Date:</strong> ${appointment.date}</li>
            <li><strong>Time:</strong> ${appointment.time}</li>
            <li><strong>Meeting Link:</strong> ${meetingLink}</li>
          </ul>
        `,
      };

      await transporter.sendMail(employeeMailOptions);
    }

    res.status(200).json({ 
      success: true,
      message: `Appointment ${actionType}ed and email(s) sent.` 
    });
  } catch (error) {
    console.error("Error responding to appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
});

module.exports = router;