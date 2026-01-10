const express = require('express');
const router = express.Router();
const { getTopBar, updateTopBar } = require('../controllers/topBarController');

router.route('/').get(getTopBar).post(updateTopBar);

module.exports = router;
