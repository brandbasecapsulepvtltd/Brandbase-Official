// controllers/serviceController.js
const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getAllServices = async (req, res, next) => {
  try {
    const { category, published } = req.query;
    
    // Build query
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (published !== undefined) {
      query.published = published === 'true';
    }
    
    // Get services
    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean(); // Use lean() for better performance
    
    // Convert Map to Object for JSON response
    const formattedServices = services.map(service => {
      const serviceObj = service;
      
      // Convert packages Map to object
      if (serviceObj.data && 
          serviceObj.data.packages && 
          serviceObj.data.packages.packages instanceof Map) {
        serviceObj.data.packages.packages = Object.fromEntries(
          serviceObj.data.packages.packages
        );
      }
      
      return serviceObj;
    });
    
    res.status(200).json({
      success: true,
      count: formattedServices.length,
      data: formattedServices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).lean();
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: `Service not found with id of ${req.params.id}`
      });
    }
    
    // Convert packages Map to object
    if (service.data && 
        service.data.packages && 
        service.data.packages.packages instanceof Map) {
      service.data.packages.packages = Object.fromEntries(
        service.data.packages.packages
      );
    }
    
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get service by category and slug
// @route   GET /api/services/:category/:slug
// @access  Public
exports.getServiceByCategorySlug = async (req, res, next) => {
  try {
    const { category, slug } = req.params;
    
    const service = await Service.findOne({
      category: category,
      slug: slug.toLowerCase(),
      published: true
    }).lean();
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: `Service not found with category: ${category} and slug: ${slug}`
      });
    }
    
    // Convert packages Map to object
    if (service.data && 
        service.data.packages && 
        service.data.packages.packages instanceof Map) {
      service.data.packages.packages = Object.fromEntries(
        service.data.packages.packages
      );
    }
    
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/services/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Service.getCategories();
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Add auth middleware later)
exports.createService = async (req, res, next) => {
  try {
    // Convert packages object to Map if provided
    if (req.body.data && 
        req.body.data.packages && 
        req.body.data.packages.packages &&
        !(req.body.data.packages.packages instanceof Map)) {
      
      // Validate packages structure
      const packagesObj = req.body.data.packages.packages;
      if (typeof packagesObj === 'object' && packagesObj !== null) {
        req.body.data.packages.packages = new Map(Object.entries(packagesObj));
      }
    }
    
    const service = await Service.create(req.body);
    
    // Convert Map to object for response
    const serviceObj = service.toObject();
    if (serviceObj.data && 
        serviceObj.data.packages && 
        serviceObj.data.packages.packages instanceof Map) {
      serviceObj.data.packages.packages = Object.fromEntries(
        serviceObj.data.packages.packages
      );
    }
    
    res.status(201).json({
      success: true,
      data: serviceObj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Add auth middleware later)
exports.updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: `Service not found with id of ${req.params.id}`
      });
    }
    
    // Convert packages object to Map if provided in update
    if (req.body.data && 
        req.body.data.packages && 
        req.body.data.packages.packages &&
        !(req.body.data.packages.packages instanceof Map)) {
      
      const packagesObj = req.body.data.packages.packages;
      if (typeof packagesObj === 'object' && packagesObj !== null) {
        req.body.data.packages.packages = new Map(Object.entries(packagesObj));
      }
    }
    
    // Update service
    service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).lean();
    
    // Convert Map to object for response
    if (service.data && 
        service.data.packages && 
        service.data.packages.packages instanceof Map) {
      service.data.packages.packages = Object.fromEntries(
        service.data.packages.packages
      );
    }
    
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Add auth middleware later)
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: `Service not found with id of ${req.params.id}`
      });
    }
    
    await service.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk create services (for initial data import)
// @route   POST /api/services/bulk
// @access  Private (Add auth middleware later)
exports.bulkCreateServices = async (req, res, next) => {
  try {
    const servicesData = req.body;
    
    if (!Array.isArray(servicesData)) {
      return res.status(400).json({
        success: false,
        error: 'Request body must be an array of services'
      });
    }
    
    // Convert packages objects to Maps
    const formattedServices = servicesData.map(service => {
      const serviceCopy = { ...service };
      
      if (serviceCopy.data && 
          serviceCopy.data.packages && 
          serviceCopy.data.packages.packages &&
          typeof serviceCopy.data.packages.packages === 'object' &&
          !(serviceCopy.data.packages.packages instanceof Map)) {
        
        serviceCopy.data.packages.packages = new Map(
          Object.entries(serviceCopy.data.packages.packages)
        );
      }
      
      return serviceCopy;
    });
    
    // Clear existing services (optional - remove if you want to keep existing)
    // await Service.deleteMany({});
    
    // Insert all services
    const services = await Service.insertMany(formattedServices);
    
    // Convert Maps to objects for response
    const formattedResponse = services.map(service => {
      const serviceObj = service.toObject();
      
      if (serviceObj.data && 
          serviceObj.data.packages && 
          serviceObj.data.packages.packages instanceof Map) {
        serviceObj.data.packages.packages = Object.fromEntries(
          serviceObj.data.packages.packages
        );
      }
      
      return serviceObj;
    });
    
    res.status(201).json({
      success: true,
      count: formattedResponse.length,
      data: formattedResponse
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
exports.getServicesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { published = 'true' } = req.query;
    
    const query = {
      category: category,
      published: published === 'true'
    };
    
    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    // Convert Map to object for JSON response
    const formattedServices = services.map(service => {
      const serviceObj = service;
      
      if (serviceObj.data && 
          serviceObj.data.packages && 
          serviceObj.data.packages.packages instanceof Map) {
        serviceObj.data.packages.packages = Object.fromEntries(
          serviceObj.data.packages.packages
        );
      }
      
      return serviceObj;
    });
    
    res.status(200).json({
      success: true,
      count: formattedServices.length,
      category: category,
      data: formattedServices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search services
// @route   GET /api/services/search/:query
// @access  Public
exports.searchServices = async (req, res, next) => {
  try {
    const { query } = req.params;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Search query must be at least 2 characters long'
      });
    }
    
    const services = await Service.find({
      $text: { $search: query },
      published: true
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(20)
    .lean();
    
    // Convert Map to object for JSON response
    const formattedServices = services.map(service => {
      const serviceObj = service;
      
      if (serviceObj.data && 
          serviceObj.data.packages && 
          serviceObj.data.packages.packages instanceof Map) {
        serviceObj.data.packages.packages = Object.fromEntries(
          serviceObj.data.packages.packages
        );
      }
      
      return serviceObj;
    });
    
    res.status(200).json({
      success: true,
      count: formattedServices.length,
      query: query,
      data: formattedServices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service order
// @route   PATCH /api/services/order
// @access  Private (Add auth middleware later)
exports.updateServiceOrder = async (req, res, next) => {
  try {
    const { services } = req.body;
    
    if (!Array.isArray(services)) {
      return res.status(400).json({
        success: false,
        error: 'Request body must contain a services array'
      });
    }
    
    // Update each service's order
    const updatePromises = services.map(async (service) => {
      const { id, order } = service;
      return Service.findByIdAndUpdate(
        id,
        { order: order },
        { new: true }
      );
    });
    
    await Promise.all(updatePromises);
    
    res.status(200).json({
      success: true,
      message: 'Service order updated successfully'
    });
  } catch (error) {
    next(error);
  }
};