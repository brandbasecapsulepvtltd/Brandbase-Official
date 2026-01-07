const express = require('express');
const router = express.Router();
const {
    getAboutContent,
    updateAboutContent,
    updateSection,
    getSection,
    initializeContent
} = require('../controllers/aboutSectionController');

// @route   GET /api/about-section
// @desc    Get all about content (single document)
router.get('/', getAboutContent);

// @route   GET /api/about-section/:section
// @desc    Get a specific section (hero, aboutSection, mission, etc.)
router.get('/:section', getSection);

// @route   PUT /api/about-section
// @desc    Update the entire about content
router.put('/', updateAboutContent);

// @route   PUT /api/about-section/:section
// @desc    Update a specific section only
router.put('/:section', updateSection);

// @route   POST /api/about-section/initialize
// @desc    Initialize/Reset content to defaults
router.post('/initialize', initializeContent);

module.exports = router;