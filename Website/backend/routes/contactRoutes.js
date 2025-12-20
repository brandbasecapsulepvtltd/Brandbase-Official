const express = require('express');
const router = express.Router();
const { submitContactForm, getContacts } = require('../controllers/contactController');

router
  .route('/')
  .get(getContacts)        // For your admin dashboard
  .post(submitContactForm); // For the public contact form

module.exports = router;