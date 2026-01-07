const express = require('express');
const router = express.Router();
const {
    getAllSections,
    getSectionById,
    getSectionByName,
    createSection,
    updateSection,
    updateSectionByName,
    deleteSection,
    deleteSectionByName,
    getAllSectionNames
} = require('../controllers/aboutSectionController');

// @route   GET /api/sections
// @desc    Get all sections
router.get('/', getAllSections);

// @route   GET /api/sections/names
// @desc    Get all section names
router.get('/names', getAllSectionNames);

// @route   GET /api/sections/id/:id
// @desc    Get single section by ID
router.get('/id/:id', getSectionById);

// @route   GET /api/sections/name/:name
// @desc    Get single section by name
router.get('/name/:name', getSectionByName);

// @route   POST /api/sections
// @desc    Create a new section
router.post('/', createSection);

// @route   PUT /api/sections/id/:id
// @desc    Update section by ID
router.put('/id/:id', updateSection);

// @route   PUT /api/sections/name/:name
// @desc    Update section by name
router.put('/name/:name', updateSectionByName);

// @route   DELETE /api/sections/id/:id
// @desc    Delete section by ID
router.delete('/id/:id', deleteSection);

// @route   DELETE /api/sections/name/:name
// @desc    Delete section by name
router.delete('/name/:name', deleteSectionByName);

module.exports = router;