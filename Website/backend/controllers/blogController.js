const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ 'metadata.publishDate': -1 });
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findBySlug(req.params.slug);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog not found with slug of ${req.params.slug}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blogs by category
// @route   GET /api/blogs/category/:category
// @access  Public
exports.getBlogsByCategory = async (req, res, next) => {
  try {
    const blogs = await Blog.findByCategory(req.params.category);
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get editor's picks
// @route   GET /api/blogs/editors-picks
// @access  Public
exports.getEditorsPicks = async (req, res, next) => {
  try {
    const blogs = await Blog.findEditorsPicks();
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get slider blogs
// @route   GET /api/blogs/slider
// @access  Public
exports.getSliderBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findSliderBlogs();
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get helpful resources
// @route   GET /api/blogs/helpful-resources
// @access  Public
exports.getHelpfulResources = async (req, res, next) => {
  try {
    const blogs = await Blog.findHelpfulResources();
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all unique categories
// @route   GET /api/blogs/categories
// @access  Public
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Blog.distinct('metadata.category');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    
    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog not found with id of ${req.params.id}`
      });
    }
    
    // Check if slug is being updated and if it's unique
    if (req.body.metadata && req.body.metadata.slug && req.body.metadata.slug !== blog.metadata.slug) {
      const existingBlog = await Blog.findOne({ 'metadata.slug': req.body.metadata.slug });
      if (existingBlog && existingBlog._id.toString() !== req.params.id) {
        return res.status(400).json({
          success: false,
          message: `Slug ${req.body.metadata.slug} is already in use`
        });
      }
    }
    
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog not found with id of ${req.params.id}`
      });
    }
    
    await blog.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk create blogs (for initial data import)
// @route   POST /api/blogs/bulk
// @access  Private/Admin
exports.bulkCreateBlogs = async (req, res, next) => {
  try {
    // Validate that request body is an array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Request body must be an array of blog objects'
      });
    }
    
    // Process each blog to ensure proper formatting
    const blogsToCreate = req.body.map(blog => {
      // Convert publishDate string to Date object if needed
      if (blog.metadata && blog.metadata.publishDate && typeof blog.metadata.publishDate === 'string') {
        blog.metadata.publishDate = new Date(blog.metadata.publishDate);
      }
      return blog;
    });
    
    const createdBlogs = await Blog.insertMany(blogsToCreate, { ordered: false });
    
    res.status(201).json({
      success: true,
      count: createdBlogs.length,
      data: createdBlogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search blogs
// @route   GET /api/blogs/search
// @access  Public
exports.searchBlogs = async (req, res, next) => {
  try {
    const { q, category, author, sort = '-metadata.publishDate' } = req.query;
    let query = {};
    
    // Text search
    if (q) {
      query.$or = [
        { 'metadata.title': { $regex: q, $options: 'i' } },
        { 'metadata.description': { $regex: q, $options: 'i' } },
        { 'metadata.author.name': { $regex: q, $options: 'i' } },
        { 'sections.content': { $regex: q, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      query['metadata.category'] = category;
    }
    
    // Filter by author name
    if (author) {
      query['metadata.author.name'] = { $regex: author, $options: 'i' };
    }
    
    const blogs = await Blog.find(query).sort(sort);
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};