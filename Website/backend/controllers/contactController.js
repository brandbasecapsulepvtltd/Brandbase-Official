const Contact = require('../models/Contact');
const { sendReplyEmail, sendNewSubmissionNotification } = require('../utils/emailService');

// @desc    Submit a contact form
// @route   POST /api/contacts
// @access  Protected (Requires API Key)
exports.submitContactForm = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Send notification email to admin (optional)
    try {
      await sendNewSubmissionNotification(contact);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the main request if email notification fails
    }
    
    res.status(201).json({
      success: true,
      data: contact,
      message: "Message sent successfully!"
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Protected (Requires API Key)
exports.getContacts = async (req, res, next) => {
  try {
    const { status, category, search, page = 1, limit = 10 } = req.query;
    
    // Build filter
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Get total count for pagination
    const total = await Contact.countDocuments(filter);
    
    // Get contacts with pagination and sorting
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact submission
// @route   GET /api/contacts/:id
// @access  Protected (Requires API Key)
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to contact submission
// @route   POST /api/contacts/:id/reply
// @access  Protected (Requires API Key)
exports.replyToContact = async (req, res, next) => {
  try {
    const { message, adminName = 'Support Team' } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }
    
    // Find contact
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    // Add reply to contact
    const reply = {
      message: message.trim(),
      repliedBy: req.user ? req.user._id : null // Assuming you have user authentication
    };
    
    contact.replies.push(reply);
    contact.status = 'replied';
    
    await contact.save();
    
    // Send email reply
    try {
      await sendReplyEmail(contact, message, adminName);
      
      res.status(200).json({
        success: true,
        data: contact,
        message: 'Reply sent successfully'
      });
    } catch (emailError) {
      // If email fails, still save the reply but notify admin
      await contact.save();
      
      res.status(200).json({
        success: true,
        data: contact,
        message: 'Reply saved but failed to send email. Please check email configuration.',
        warning: 'Email sending failed'
      });
    }
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contacts/:id/status
// @access  Protected (Requires API Key)
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'replied', 'resolved', 'spam'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact,
      message: `Status updated to ${status}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact submission
// @route   DELETE /api/contacts/:id
// @access  Protected (Requires API Key)
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    await contact.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Contact submission deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact statistics
// @route   GET /api/contacts/stats
// @access  Protected (Requires API Key)
exports.getContactStats = async (req, res, next) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$count' },
          byStatus: { $push: { status: '$_id', count: '$count' } }
        }
      },
      {
        $project: {
          _id: 0,
          total: 1,
          byStatus: 1
        }
      }
    ]);
    
    const categoryStats = await Contact.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    const monthlyStats = await Contact.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        ...stats[0] || { total: 0, byStatus: [] },
        byCategory: categoryStats,
        monthly: monthlyStats
      }
    });
  } catch (error) {
    next(error);
  }
};