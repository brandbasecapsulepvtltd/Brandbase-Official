const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContacts,
  getContact,
  replyToContact,
  updateContactStatus,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');

// Public route (for contact form submission)
router.post('/', submitContactForm);

// Admin routes (protected - add your authentication middleware)
router.get('/', getContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContact);
router.post('/:id/reply', replyToContact);
router.put('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;