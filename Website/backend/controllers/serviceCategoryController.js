const ServiceCategory = require('../models/ServiceCategory');

// @desc    Get all service categories
// @route   GET /api/service-categories
// @access  Protected
exports.getServiceCategories = async (req, res, next) => {
  try {
    const { active, sort, fields, search } = req.query;
    
    let query = {};
    
    // Filter by active status
    if (active === 'true' || active === 'false') {
      query.isActive = active === 'true';
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { category: { $regex: search, $options: 'i' } },
        { 'hero.title': { $regex: search, $options: 'i' } },
        { 'hero.subtitle': { $regex: search, $options: 'i' } }
      ];
    }
    
    let queryBuilder = ServiceCategory.find(query);
    
    // Select specific fields
    if (fields) {
      const fieldsList = fields.split(',').join(' ');
      queryBuilder = queryBuilder.select(fieldsList);
    }
    
    // Sort
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      queryBuilder = queryBuilder.sort(sortBy);
    } else {
      queryBuilder = queryBuilder.sort('order category');
    }
    
    const categories = await queryBuilder;
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service category by slug
// @route   GET /api/service-categories/:category
// @access  Protected
exports.getServiceCategory = async (req, res, next) => {
  try {
    const category = await ServiceCategory.findOne({
      category: req.params.category.toLowerCase()
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Service category not found with slug: ${req.params.category}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service category
// @route   POST /api/service-categories
// @access  Protected
exports.createServiceCategory = async (req, res, next) => {
  try {
    // Check if category already exists
    const existingCategory = await ServiceCategory.findOne({
      category: req.body.category.toLowerCase()
    });
    
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: `Service category with slug '${req.body.category}' already exists`
      });
    }
    
    const category = await ServiceCategory.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Service category created successfully',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service category
// @route   PUT /api/service-categories/:id
// @access  Protected
exports.updateServiceCategory = async (req, res, next) => {
  try {
    let category = await ServiceCategory.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Service category not found with id: ${req.params.id}`
      });
    }
    
    // Check if category slug is being changed and if it conflicts
    if (req.body.category && req.body.category.toLowerCase() !== category.category) {
      const existingCategory = await ServiceCategory.findOne({
        category: req.body.category.toLowerCase(),
        _id: { $ne: req.params.id }
      });
      
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: `Service category with slug '${req.body.category}' already exists`
        });
      }
    }
    
    category = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Service category updated successfully',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service category
// @route   DELETE /api/service-categories/:id
// @access  Protected
exports.deleteServiceCategory = async (req, res, next) => {
  try {
    const category = await ServiceCategory.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Service category not found with id: ${req.params.id}`
      });
    }
    
    await category.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Service category deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk create service categories
// @route   POST /api/service-categories/bulk
// @access  Protected
exports.bulkCreateServiceCategories = async (req, res, next) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Request body must be an array of categories'
      });
    }
    
    const categories = req.body;
    const results = {
      created: 0,
      skipped: 0,
      errors: []
    };
    
    for (const categoryData of categories) {
      try {
        // Check if category already exists
        const existingCategory = await ServiceCategory.findOne({
          category: categoryData.category.toLowerCase()
        });
        
        if (existingCategory) {
          results.skipped++;
          results.errors.push({
            category: categoryData.category,
            message: 'Category already exists',
            error: 'DUPLICATE'
          });
          continue;
        }
        
        await ServiceCategory.create(categoryData);
        results.created++;
      } catch (error) {
        results.skipped++;
        results.errors.push({
          category: categoryData.category || 'unknown',
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }
    }
    
    res.status(201).json({
      success: true,
      message: `Bulk operation completed. Created: ${results.created}, Skipped: ${results.skipped}`,
      results: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category order
// @route   PATCH /api/service-categories/order
// @access  Protected
exports.updateCategoryOrder = async (req, res, next) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Request body must be an array of objects with id and order'
      });
    }
    
    const updates = req.body;
    const bulkOps = [];
    
    for (const update of updates) {
      if (!update.id || update.order === undefined) {
        continue;
      }
      
      bulkOps.push({
        updateOne: {
          filter: { _id: update.id },
          update: { $set: { order: update.order } }
        }
      });
    }
    
    if (bulkOps.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid updates provided'
      });
    }
    
    await ServiceCategory.bulkWrite(bulkOps);
    
    res.status(200).json({
      success: true,
      message: 'Category order updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all category slugs
// @route   GET /api/service-categories/slugs
// @access  Protected
exports.getCategorySlugs = async (req, res, next) => {
  try {
    const categories = await ServiceCategory.find({ isActive: true })
      .select('category')
      .sort('order category');
    
    const slugs = categories.map(cat => cat.category);
    
    res.status(200).json({
      success: true,
      count: slugs.length,
      data: slugs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle category status
// @route   PATCH /api/service-categories/:id/toggle-status
// @access  Protected
exports.toggleCategoryStatus = async (req, res, next) => {
  try {
    const category = await ServiceCategory.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Service category not found with id: ${req.params.id}`
      });
    }
    
    category.isActive = !category.isActive;
    await category.save();
    
    res.status(200).json({
      success: true,
      message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        id: category._id,
        category: category.category,
        isActive: category.isActive
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category by ID
// @route   GET /api/service-categories/id/:id
// @access  Protected
exports.getServiceCategoryById = async (req, res, next) => {
  try {
    const category = await ServiceCategory.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Service category not found with id: ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};