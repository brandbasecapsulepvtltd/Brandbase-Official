const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contacts
// @access  Protected (Requires API Key)
exports.submitContactForm = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    
    res.status(201).json({
      success: true,
      data: contact,
      message: "Message sent successfully!"
    });
  } catch (error) {
    // Passes error to your existing errorMiddleware
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Protected (Requires API Key)
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};