const express = require('express');
const router = express.Router();
const { login, getMe, updatePassword, requestPasswordReset } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/request-password-reset', protect, requestPasswordReset);
router.put('/update-password', protect, updatePassword);

module.exports = router;
