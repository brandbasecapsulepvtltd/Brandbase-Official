const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// Public routes (no authentication required)
router.post('/', leadController.createLead);

// Protected routes (add authentication middleware as needed)
router.get('/', leadController.getAllLeads);
router.get('/stats/overview', leadController.getLeadsStats);
router.get('/export/csv', leadController.exportLeadsToCSV);
router.get('/exhibition/:exhibitionName', leadController.getLeadsByExhibition);
router.get('/status/:status', leadController.getLeadsByStatus);
router.get('/:id', leadController.getLeadById);

router.put('/:id', leadController.updateLead);
router.patch('/:id/status', leadController.updateLeadStatus);
router.patch('/:id/assign', leadController.assignLead);
router.patch('/bulk/status', leadController.bulkUpdateStatus);

router.post('/:id/notes', leadController.addNote);

router.delete('/:id', leadController.deleteLead);

module.exports = router;