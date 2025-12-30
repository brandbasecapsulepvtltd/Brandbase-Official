const Event = require('../models/Event');

// Helper functions
const getIndustryLabel = (industry) => {
  const labels = {
    tech: 'Technology',
    healthcare: 'Healthcare',
    manufacturing: 'Manufacturing',
    retail: 'Retail & Consumer',
    food: 'Food & Beverage',
    auto: 'Automotive',
    fashion: 'Fashion & Lifestyle',
    pharma: 'Pharmaceutical',
  };
  return labels[industry] || industry;
};

// Get all events with filtering
exports.getAllEvents = async (req, res) => {
  try {
    const {
      search,
      city,
      industry,
      venueType,
      startDate,
      endDate,
      page = 1,
      limit = 20,
      sortBy = 'startDate',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    let query = {};

    // Search query
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { venue: searchRegex },
        { organizer: searchRegex },
        { city: searchRegex }
      ];
    }

    // City filter
    if (city && city !== 'all') {
      query.city = city;
    }

    // Industry filter
    if (industry && industry !== 'all') {
      query.industry = industry;
    }

    // Venue type filter
    if (venueType && venueType !== 'all') {
      if (venueType === 'indoor') query.isIndoor = true;
      if (venueType === 'outdoor') query.isIndoor = false;
    }

    // Date range filter
    if (startDate) {
      query.startDate = { $gte: new Date(startDate) };
    }
    if (endDate) {
      query.endDate = { $lte: new Date(endDate) };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [events, total] = await Promise.all([
      Event.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Event.countDocuments(query)
    ]);

    // Get unique cities and industries for filters
    const [cities, industries] = await Promise.all([
      Event.distinct('city').sort(),
      Event.distinct('industry')
    ]);

    res.json({
      success: true,
      data: events,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      filters: {
        cities,
        industries: industries.map(ind => ({
          value: ind,
          label: getIndustryLabel(ind)
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events',
      error: error.message
    });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event',
      error: error.message
    });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  try {
    // Generate unique ID if not provided
    if (!req.body.id) {
      const lastEvent = await Event.findOne().sort({ id: -1 });
      const lastId = lastEvent ? parseInt(lastEvent.id) : 0;
      req.body.id = (lastId + 1).toString();
    }

    // Validate required fields
    const requiredFields = [
      'name', 'startDate', 'endDate', 'venue', 'city',
      'organizer', 'organizerWebsite', 'industry', 'isIndoor',
      'expectedFootfall', 'stallSizes', 'description', 'whyParticipate'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Check if event with same ID already exists
    const existingEvent = await Event.findOne({ id: req.body.id });
    if (existingEvent) {
      return res.status(400).json({
        success: false,
        message: `Event with ID ${req.body.id} already exists`
      });
    }

    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating event',
      error: error.message
    });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating event',
      error: error.message
    });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ id: req.params.id });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Remove this event from similarEvents of other events
    await Event.updateMany(
      { similarEvents: req.params.id },
      { $pull: { similarEvents: req.params.id } }
    );

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting event',
      error: error.message
    });
  }
};

// Get events for specific month
exports.getEventsForMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    
    // Validate year and month
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    
    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 0 || monthNum > 11) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year or month'
      });
    }

    // Create date range for the month
    const startDate = new Date(yearNum, monthNum, 1);
    const endDate = new Date(yearNum, monthNum + 1, 0);

    const events = await Event.find({
      startDate: { $gte: startDate },
      endDate: { $lte: endDate }
    }).sort({ startDate: 1 });

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching monthly events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching monthly events',
      error: error.message
    });
  }
};

// Get events for specific date
exports.getEventsForDate = async (req, res) => {
  try {
    const { date } = req.params;
    const checkDate = new Date(date);

    if (isNaN(checkDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    const startOfDay = new Date(checkDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(checkDate);
    endOfDay.setHours(23, 59, 59, 999);

    const events = await Event.find({
      $or: [
        // Events starting on or before this day and ending on or after this day
        {
          startDate: { $lte: endOfDay },
          endDate: { $gte: startOfDay }
        }
      ]
    }).sort({ startDate: 1 });

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching daily events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching daily events',
      error: error.message
    });
  }
};

// Get similar events
exports.getSimilarEvents = async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (!event.similarEvents || event.similarEvents.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    const similarEvents = await Event.find({
      id: { $in: event.similarEvents },
      id: { $ne: event.id } // Exclude the current event
    }).limit(3);

    res.json({
      success: true,
      data: similarEvents
    });
  } catch (error) {
    console.error('Error fetching similar events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching similar events',
      error: error.message
    });
  }
};

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await Event.distinct('city').sort();
    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cities',
      error: error.message
    });
  }
};

// Get all industries with labels
exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await Event.distinct('industry');
    const industriesWithLabels = industries.map(industry => ({
      value: industry,
      label: getIndustryLabel(industry)
    }));

    res.json({
      success: true,
      data: industriesWithLabels
    });
  } catch (error) {
    console.error('Error fetching industries:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching industries',
      error: error.message
    });
  }
};

// Bulk import events (for initial data seeding)
exports.bulkImport = async (req, res) => {
  try {
    const { events } = req.body;

    if (!Array.isArray(events)) {
      return res.status(400).json({
        success: false,
        message: 'Events must be an array'
      });
    }

    // Validate each event
    for (const event of events) {
      if (!event.id) {
        return res.status(400).json({
          success: false,
          message: 'Each event must have an id'
        });
      }
    }

    // Use bulk write for better performance
    const operations = events.map(event => ({
      updateOne: {
        filter: { id: event.id },
        update: { $set: event },
        upsert: true
      }
    }));

    const result = await Event.bulkWrite(operations);

    res.json({
      success: true,
      message: 'Events imported successfully',
      data: {
        inserted: result.upsertedCount,
        modified: result.modifiedCount,
        total: events.length
      }
    });
  } catch (error) {
    console.error('Error importing events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while importing events',
      error: error.message
    });
  }
};