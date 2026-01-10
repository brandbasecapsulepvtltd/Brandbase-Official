const express = require('express');
const router = express.Router();
const { getFloatingLatest, updateFloatingLatest } = require('../controllers/floatingLatestController');

router.route('/').get(getFloatingLatest).post(updateFloatingLatest);

module.exports = router;
