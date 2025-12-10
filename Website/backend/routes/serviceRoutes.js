// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/categories', serviceController.getCategories);
router.get('/category/:category', serviceController.getServicesByCategory);
router.get('/search/:query', serviceController.searchServices);
router.get('/:category/:slug', serviceController.getServiceByCategorySlug);
router.get('/:id', serviceController.getServiceById);

// Protected routes (Add authentication middleware later)
router.post('/', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.post('/bulk', serviceController.bulkCreateServices);
router.patch('/order', serviceController.updateServiceOrder);

module.exports = router;