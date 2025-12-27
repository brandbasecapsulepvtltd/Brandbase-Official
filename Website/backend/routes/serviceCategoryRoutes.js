const express = require('express');
const router = express.Router();
const {
  getServiceCategories,
  getServiceCategory,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  bulkCreateServiceCategories,
  updateCategoryOrder,
  getCategorySlugs,
  toggleCategoryStatus,
  getServiceCategoryById
} = require('../controllers/serviceCategoryController');

// GET all categories
router.get('/', getServiceCategories);

// GET category slugs
router.get('/slugs', getCategorySlugs);

// GET single category by ID
router.get('/id/:id', getServiceCategoryById);

// GET single category by slug
router.get('/:category', getServiceCategory);

// POST create new category
router.post('/', createServiceCategory);

// PUT update category
router.put('/:id', updateServiceCategory);

// DELETE category
router.delete('/:id', deleteServiceCategory);

// PATCH toggle category status
router.patch('/:id/toggle-status', toggleCategoryStatus);

// POST bulk create categories
router.post('/bulk', bulkCreateServiceCategories);

// PATCH update category order
router.patch('/order', updateCategoryOrder);

module.exports = router;