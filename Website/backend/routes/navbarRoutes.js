const express = require('express');
const router = express.Router();
const { getNavbar, updateNavbar } = require('../controllers/navbarController');

router.route('/').get(getNavbar).post(updateNavbar);

module.exports = router;
