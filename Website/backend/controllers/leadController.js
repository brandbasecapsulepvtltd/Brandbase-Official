const Lead = require('../models/Lead');
const mongoose = require('mongoose');

// Helper function for pagination
const getPagination = (page, limit) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};

// Helper function for filtering
const buildFilterQuery = (filters) => {
  let query = {};
  
  // Text search
  if (filters.search) {
    query.$or = [
      { exhibitionName: { $regex: filters.search, $options: 'i' } },
      { companyName: { $regex: filters.search, $options: 'i' } },
      { fullName: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } }
    ];
  }
  
  // Status filter
  if (filters.status && filters.status !== 'all') {
    query.status = filters.status;
  }
  
  // Priority filter
  if (filters.priority && filters.priority !== 'all') {
    query.priority = filters.priority;
  }
  
  // Date range filters
  if (filters.startDate) {
    query.createdAt = { $gte: new Date(filters.startDate) };
  }
  if (filters.endDate) {
    query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) };
  }
  
  // Exhibition date filter
  if (filters.exhibitionDate) {
    query.exhibitionDate = new Date(filters.exhibitionDate);
  }
  
  // Budget range filter
  if (filters.budgetRange && filters.budgetRange !== 'all') {
    query.budgetRange = filters.budgetRange;
  }
  
  return query;
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public (or Protected based on your auth)
exports.createLead = async (req, res) => {
  try {
    const {
      exhibitionName,
      exhibitionLocation,
      exhibitionDate,
      fullName,
      companyName,
      email,
      phoneNumber,
      preferredStallSize,
      budgetRange,
      additionalMessage
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'exhibitionName', 'exhibitionLocation', 'exhibitionDate',
      'fullName', 'companyName', 'email', 'phoneNumber',
      'preferredStallSize', 'budgetRange'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Check if lead already exists (same email for same exhibition)
    const existingLead = await Lead.findOne({
      email,
      exhibitionName,
      exhibitionDate: new Date(exhibitionDate)
    });

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a lead for this exhibition'
      });
    }

    // Create lead
    const lead = await Lead.create({
      exhibitionName,
      exhibitionLocation,
      exhibitionDate: new Date(exhibitionDate),
      fullName,
      companyName,
      email: email.toLowerCase(),
      phoneNumber,
      preferredStallSize,
      budgetRange,
      additionalMessage: additionalMessage || '',
      source: req.headers.referer || 'direct_form'
    });

    // Send email notification (optional)
    // await sendLeadNotificationEmail(lead);

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating lead',
      error: error.message
    });
  }
};

// @desc    Get all leads with filtering and pagination
// @route   GET /api/leads
// @access  Protected
exports.getAllLeads = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      priority,
      startDate,
      endDate,
      exhibitionDate,
      budgetRange,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter query
    const filterQuery = buildFilterQuery({
      search, status, priority, startDate, endDate, exhibitionDate, budgetRange
    });

    // Get pagination
    const { skip, limit: limitNum } = getPagination(page, limit);

    // Get sorting
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Execute query with pagination
    const [leads, total] = await Promise.all([
      Lead.find(filterQuery)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate('assignedTo', 'name email')
        .lean(),
      Lead.countDocuments(filterQuery)
    ]);

    // Get stats
    const stats = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusStats = {};
    stats.forEach(stat => {
      statusStats[stat._id] = stat.count;
    });

    // Get unique values for filters
    const [uniqueExhibitions, uniqueBudgetRanges] = await Promise.all([
      Lead.distinct('exhibitionName'),
      Lead.distinct('budgetRange')
    ]);

    res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: parseInt(page),
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      },
      filters: {
        exhibitions: uniqueExhibitions.sort(),
        budgetRanges: uniqueBudgetRanges.sort()
      },
      stats: {
        total,
        byStatus: statusStats,
        new: statusStats.new || 0,
        contacted: statusStats.contacted || 0
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leads',
      error: error.message
    });
  }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Protected
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'name email avatar')
      .populate('notes.createdBy', 'name email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lead',
      error: error.message
    });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Protected
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    // Update allowed fields
    const allowedUpdates = [
      'status',
      'priority',
      'assignedTo',
      'followUpDate',
      'notes'
    ];

    const updates = Object.keys(req.body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    // Handle notes addition
    if (req.body.noteContent) {
      updates.$push = {
        notes: {
          content: req.body.noteContent,
          createdBy: req.user?._id || null
        }
      };
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: updatedLead
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating lead',
      error: error.message
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Protected
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    await lead.deleteOne();

    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting lead',
      error: error.message
    });
  }
};

// @desc    Get leads by exhibition
// @route   GET /api/leads/exhibition/:exhibitionName
// @access  Protected
exports.getLeadsByExhibition = async (req, res) => {
  try {
    const leads = await Lead.find({
      exhibitionName: req.params.exhibitionName
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: leads,
      count: leads.length
    });
  } catch (error) {
    console.error('Error fetching exhibition leads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching exhibition leads',
      error: error.message
    });
  }
};

// @desc    Get leads by status
// @route   GET /api/leads/status/:status
// @access  Protected
exports.getLeadsByStatus = async (req, res) => {
  try {
    const leads = await Lead.find({ status: req.params.status })
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name email');

    res.json({
      success: true,
      data: leads,
      count: leads.length
    });
  } catch (error) {
    console.error('Error fetching leads by status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leads by status',
      error: error.message
    });
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Protected
exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead status updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating lead status',
      error: error.message
    });
  }
};

// @desc    Assign lead to user
// @route   PATCH /api/leads/:id/assign
// @access  Protected
exports.assignLead = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required for assignment'
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead assigned successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error assigning lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while assigning lead',
      error: error.message
    });
  }
};

// @desc    Add note to lead
// @route   POST /api/leads/:id/notes
// @access  Protected
exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          notes: {
            content: content.trim(),
            createdBy: req.user?._id || null
          }
        }
      },
      { new: true, runValidators: true }
    ).populate('notes.createdBy', 'name email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Note added successfully',
      data: lead.notes[lead.notes.length - 1]
    });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding note',
      error: error.message
    });
  }
};

// @desc    Get leads statistics
// @route   GET /api/leads/stats/overview
// @access  Protected
exports.getLeadsStats = async (req, res) => {
  try {
    const [statusStats, priorityStats, monthlyStats, exhibitionStats] = await Promise.all([
      // Status statistics
      Lead.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]),

      // Priority statistics
      Lead.aggregate([
        {
          $group: {
            _id: '$priority',
            count: { $sum: 1 }
          }
        }
      ]),

      // Monthly leads (last 6 months)
      Lead.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }
        },
        {
          $limit: 6
        }
      ]),

      // Top exhibitions
      Lead.aggregate([
        {
          $group: {
            _id: '$exhibitionName',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 10
        }
      ])
    ]);

    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const contactedLeads = await Lead.countDocuments({ status: 'contacted' });
    const wonLeads = await Lead.countDocuments({ status: 'won' });

    res.json({
      success: true,
      data: {
        total: totalLeads,
        new: newLeads,
        contacted: contactedLeads,
        won: wonLeads,
        conversionRate: totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(2) : 0,
        byStatus: statusStats,
        byPriority: priorityStats,
        monthlyTrend: monthlyStats,
        topExhibitions: exhibitionStats
      }
    });
  } catch (error) {
    console.error('Error fetching lead statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: error.message
    });
  }
};

// @desc    Export leads to CSV
// @route   GET /api/leads/export/csv
// @access  Protected
exports.exportLeadsToCSV = async (req, res) => {
  try {
    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Convert to CSV format
    const csvData = [
      // Headers
      [
        'Exhibition Name',
        'Exhibition Location',
        'Exhibition Date',
        'Full Name',
        'Company Name',
        'Email',
        'Phone Number',
        'Preferred Stall Size',
        'Budget Range',
        'Status',
        'Priority',
        'Created At'
      ].join(','),
      // Data rows
      ...leads.map(lead => [
        `"${lead.exhibitionName}"`,
        `"${lead.exhibitionLocation}"`,
        `"${new Date(lead.exhibitionDate).toLocaleDateString()}"`,
        `"${lead.fullName}"`,
        `"${lead.companyName}"`,
        `"${lead.email}"`,
        `"${lead.phoneNumber}"`,
        `"${lead.preferredStallSize}"`,
        `"${lead.getBudgetLabel ? lead.getBudgetLabel() : lead.budgetRange}"`,
        `"${lead.status}"`,
        `"${lead.priority}"`,
        `"${new Date(lead.createdAt).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads_export.csv');

    res.send(csvData);
  } catch (error) {
    console.error('Error exporting leads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while exporting leads',
      error: error.message
    });
  }
};

// @desc    Bulk update leads status
// @route   PATCH /api/leads/bulk/status
// @access  Protected
exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { leadIds, status } = req.body;

    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Lead IDs array is required'
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const result = await Lead.updateMany(
      { _id: { $in: leadIds } },
      { status }
    );

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} leads status to ${status}`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    console.error('Error bulk updating leads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while bulk updating leads',
      error: error.message
    });
  }
};