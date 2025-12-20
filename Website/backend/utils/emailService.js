const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "vinayak.brandbasecapsule@gmail.com",
    pass: "zyjd rgry rvch dsax"
  }
});

/**
 * Send reply email to contact form submitter
 * @param {Object} contact - Contact document
 * @param {String} replyMessage - Admin's reply message
 * @param {String} adminName - Name of the admin replying
 * @returns {Promise}
 */
exports.sendReplyEmail = async (contact, replyMessage, adminName = 'Support Team') => {
  const mailOptions = {
    from: `"${adminName}" <${process.env.EMAIL_USER}>`,
    to: contact.email,
    subject: `Re: Your contact form submission - ${contact.category}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 5px; }
          .content { padding: 20px; background: #fff; border: 1px solid #dee2e6; border-radius: 5px; margin-top: 20px; }
          .footer { margin-top: 20px; font-size: 12px; color: #6c757d; text-align: center; }
          .reply-box { background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Reply to Your Contact Form Submission</h2>
            <p>Dear ${contact.firstName} ${contact.lastName},</p>
          </div>
          <div class="content">
            <p>Thank you for contacting us regarding: <strong>${contact.category}</strong></p>
            
            <div class="reply-box">
              <p><strong>Our Response:</strong></p>
              <p>${replyMessage.replace(/\n/g, '<br>')}</p>
              <p style="margin-top: 10px; font-style: italic;">
                — ${adminName}
              </p>
            </div>
            
            <p><strong>Your Original Message:</strong></p>
            <p>${contact.message}</p>
            
            <hr style="margin: 30px 0;">
            
            <p><strong>Submission Details:</strong></p>
            <ul>
              <li><strong>Date:</strong> ${new Date(contact.createdAt).toLocaleDateString()}</li>
              <li><strong>Organization:</strong> ${contact.organization}</li>
              <li><strong>Contact Number:</strong> ${contact.contactNumber}</li>
              <li><strong>Region:</strong> ${contact.region}</li>
              <li><strong>Industry:</strong> ${contact.industry}</li>
            </ul>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>If you have further questions, please contact us through our contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Reply to Your Contact Form Submission

Dear ${contact.firstName} ${contact.lastName},

Thank you for contacting us regarding: ${contact.category}

Our Response:
${replyMessage}

— ${adminName}

Your Original Message:
${contact.message}

Submission Details:
- Date: ${new Date(contact.createdAt).toLocaleDateString()}
- Organization: ${contact.organization}
- Contact Number: ${contact.contactNumber}
- Region: ${contact.region}
- Industry: ${contact.industry}

This is an automated message. Please do not reply to this email.
If you have further questions, please contact us through our contact form.
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

/**
 * Send notification email to admin about new contact form submission
 */
exports.sendNewSubmissionNotification = async (contact) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to admin
    subject: `New Contact Form Submission - ${contact.category}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Organization:</strong> ${contact.organization}</p>
      <p><strong>Category:</strong> ${contact.category}</p>
      <p><strong>Message:</strong> ${contact.message.substring(0, 200)}${contact.message.length > 200 ? '...' : ''}</p>
      <p><strong>Submitted at:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};