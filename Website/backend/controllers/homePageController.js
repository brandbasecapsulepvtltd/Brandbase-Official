const HomePage = require('../models/HomePage');

// @desc    Get all home page data
// @route   GET /api/homepage
// @access  Public
const getHomePageData = async (req, res) => {
  try {
    const homePageData = await HomePage.findOne();
    
    if (!homePageData) {
      return res.status(404).json({
        success: false,
        message: 'Home page data not found'
      });
    }

    res.status(200).json({
      success: true,
      data: homePageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create home page data
// @route   POST /api/homepage
// @access  Private
const createHomePageData = async (req, res) => {
  try {
    // Check if home page data already exists
    const existingData = await HomePage.findOne();
    if (existingData) {
      return res.status(400).json({
        success: false,
        message: 'Home page data already exists. Use update instead.'
      });
    }

    const homePageData = await HomePage.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Home page data created successfully',
      data: homePageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating home page data',
      error: error.message
    });
  }
};

// @desc    Update home page data
// @route   PUT /api/homepage
// @access  Private
const updateHomePageData = async (req, res) => {
  try {
    const homePageData = await HomePage.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!homePageData) {
      return res.status(404).json({
        success: false,
        message: 'Home page data not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Home page data updated successfully',
      data: homePageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating home page data',
      error: error.message
    });
  }
};

// @desc    Update specific section of home page data
// @route   PATCH /api/homepage/section/:sectionName
// @access  Private
const updateHomePageSection = async (req, res) => {
  try {
    const { sectionName } = req.params;
    const updateData = req.body;

    const validSections = [
      'heroSection',
      'brandElevation',
      'recentWork',
      'clients',
      'testimonials',
      'faqs'
    ];

    if (!validSections.includes(sectionName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid section name'
      });
    }

    const updateObj = {};
    updateObj[sectionName] = updateData;

    const homePageData = await HomePage.findOneAndUpdate(
      {},
      { $set: updateObj },
      {
        new: true,
        runValidators: true
      }
    );

    if (!homePageData) {
      return res.status(404).json({
        success: false,
        message: 'Home page data not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `${sectionName} updated successfully`,
      data: homePageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating section',
      error: error.message
    });
  }
};

// @desc    Delete home page data
// @route   DELETE /api/homepage
// @access  Private
const deleteHomePageData = async (req, res) => {
  try {
    const homePageData = await HomePage.findOneAndDelete();

    if (!homePageData) {
      return res.status(404).json({
        success: false,
        message: 'Home page data not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Home page data deleted successfully',
      data: homePageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting home page data',
      error: error.message
    });
  }
};

module.exports = {
  getHomePageData,
  createHomePageData,
  updateHomePageData,
  updateHomePageSection,
  deleteHomePageData
};