const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  getBlogsByCategory,
  getEditorsPicks,
  getSliderBlogs,
  getHelpfulResources,
  getAllCategories,
  createBlog,
  updateBlog,
  deleteBlog,
  bulkCreateBlogs,
  searchBlogs
} = require('../controllers/blogController');

// Public routes
router.get('/', getAllBlogs);
router.get('/categories', getAllCategories);
router.get('/editors-picks', getEditorsPicks);
router.get('/slider', getSliderBlogs);
router.get('/helpful-resources', getHelpfulResources);
router.get('/search', searchBlogs);
router.get('/category/:category', getBlogsByCategory);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);

// Admin routes (you can add middleware for authentication/authorization later)
router.post('/', createBlog);
router.post('/bulk', bulkCreateBlogs);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;