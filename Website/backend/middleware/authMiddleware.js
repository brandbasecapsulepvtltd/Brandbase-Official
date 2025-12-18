const API_KEY = process.env.API_KEY;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// Middleware to validate API key
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required'
    });
  }

  // Remove 'Bearer ' prefix if present
  const key = apiKey.replace('Bearer ', '');
  
  // Check if key matches either regular or admin key
  if (key === API_KEY || key === ADMIN_API_KEY) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Invalid API key'
    });
  }
};

// Middleware for admin-only endpoints
const adminApiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required'
    });
  }

  const key = apiKey.replace('Bearer ', '');
  
  // Only allow admin key
  if (key === ADMIN_API_KEY) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
};

// Generate a secure API key (for initial setup)
const generateApiKey = () => {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  apiKeyAuth,
  adminApiKeyAuth,
  generateApiKey
};