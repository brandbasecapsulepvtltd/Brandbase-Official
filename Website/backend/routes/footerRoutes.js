const express = require('express');
const router = express.Router();
const { getFooter, updateFooter } = require('../controllers/footerController');

router.route('/').get(getFooter).post(updateFooter);

module.exports = router;
