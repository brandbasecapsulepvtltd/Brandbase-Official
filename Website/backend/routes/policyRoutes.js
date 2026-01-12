const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

router.get('/:type', policyController.getPolicyByType);
router.get('/', policyController.getAllPolicies);
router.put('/:type', policyController.updatePolicy);

module.exports = router;
