const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Middleware for validation (optional - you can add JWT/auth middleware here)
// const auth = require('../middleware/auth');

// GET all events with filtering
router.get('/', eventController.getAllEvents);

// GET single event by ID
router.get('/:id', eventController.getEventById);

// POST create new event
router.post('/', eventController.createEvent);

// PUT update event
router.put('/:id', eventController.updateEvent);

// DELETE event
router.delete('/:id', eventController.deleteEvent);

// GET events for specific month
router.get('/month/:year/:month', eventController.getEventsForMonth);

// GET events for specific date
router.get('/date/:date', eventController.getEventsForDate);

// GET similar events
router.get('/:id/similar', eventController.getSimilarEvents);

// GET all cities
router.get('/cities/all', eventController.getAllCities);

// GET all industries
router.get('/industries/all', eventController.getAllIndustries);

// POST bulk import
router.post('/bulk-import', eventController.bulkImport);

module.exports = router;