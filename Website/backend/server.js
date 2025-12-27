const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'http://127.0.0.1:5173', 
    'http://localhost:5174', 
    'http://localhost:3000',
    'https://brandbase-nu.vercel.app', 
    'https://brandbase1.netlify.app',
    'https://bcpl-admin.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Key Middleware
const apiKeyAuth = (req, res, next) => {
  // List of public endpoints that don't require API key
  const publicEndpoints = [
    '/',
    '/api/health',
    '/api/generate-key' // Keep this for initial setup, remove later
  ];
  
  // Check if current path is public
  if (publicEndpoints.includes(req.path)) {
    return next();
  }
  
  // Get API key from headers
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required. Please include X-API-Key header.',
      hint: 'Use: X-API-Key: YOUR_API_KEY or Authorization: Bearer YOUR_API_KEY'
    });
  }

  // Remove 'Bearer ' prefix if present
  const providedKey = apiKey.replace('Bearer ', '').trim();
  const validApiKey = process.env.API_KEY;
  
  if (!validApiKey) {
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: API key not set'
    });
  }
  
  // Compare keys
  if (providedKey === validApiKey) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Invalid API key',
      hint: 'Check your API key or contact administrator'
    });
  }
};

// Apply API key middleware to all routes (except public ones)
app.use(apiKeyAuth);

// Import Routes
const appointmentRoutes = require("./routes/appointments");
const homePageRoutes = require('./routes/homePageRoutes');
const employeeRoutes = require("./routes/employees");
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes'); // 1. Add this

const serviceCategoryRoutes = require('./routes/serviceCategoryRoutes');


// Routes (all protected by API key except health check)
app.use("/api/appointments", appointmentRoutes);
app.use('/api/homepage', homePageRoutes);
app.use("/api/employees", employeeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/service-categories', serviceCategoryRoutes); // Add this


// Health check route (public)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'Connected',
    memory: process.memoryUsage(),
    apiSecurity: 'Enabled',
    publicEndpoint: true
  });
});

// Generate API key endpoint (for initial setup - remove in production)
app.get('/api/generate-key', (req, res) => {
  const crypto = require('crypto');
  const apiKey = crypto.randomBytes(32).toString('hex');
  
  res.json({
    success: true,
    message: 'API Key Generated',
    note: 'Add this to your .env file as API_KEY=...',
    apiKey: apiKey,
    warning: 'This endpoint should be disabled in production',
    instructions: [
      '1. Copy the API key above',
      '2. Add to .env file: API_KEY=your_generated_key',
      '3. Restart server',
      '4. Use in requests: X-API-Key: your_generated_key'
    ]
  });
});

// Verify API key endpoint
app.get('/api/verify-key', (req, res) => {
  res.json({
    success: true,
    message: 'API key is valid',
    timestamp: new Date().toISOString(),
    security: {
      enabled: true,
      method: 'API Key',
      header: 'X-API-Key or Authorization'
    }
  });
});

// API Documentation route (protected)
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'BrandBase API Documentation',
    version: '2.0.0',
    security: {
      enabled: true,
      authentication: 'API Key Required',
      headers: ['X-API-Key', 'Authorization (Bearer token)'],
      publicEndpoints: ['GET /', 'GET /api/health']
    },
    endpoints: {
      health: {
        method: 'GET',
        path: '/api/health',
        description: 'Server health check',
        authRequired: false
      },
      verify: {
        method: 'GET',
        path: '/api/verify-key',
        description: 'Verify your API key',
        authRequired: true
      },
      services: {
        base: {
          method: 'GET, POST',
          path: '/api/services',
          description: 'Get all services or create new service',
          authRequired: true
        },
        byCategorySlug: {
          method: 'GET',
          path: '/api/services/:category/:slug',
          description: 'Get service by category and slug',
          authRequired: true
        },
        byId: {
          method: 'GET, PUT, DELETE',
          path: '/api/services/:id',
          description: 'Get, update, or delete service by ID',
          authRequired: true
        },
        categories: {
          method: 'GET',
          path: '/api/services/categories',
          description: 'Get all unique categories',
          authRequired: true
        },
        bulk: {
          method: 'POST',
          path: '/api/services/bulk',
          description: 'Bulk create services',
          authRequired: true
        }
      },
      appointments: {
        method: 'GET, POST, PUT, DELETE',
        path: '/api/appointments',
        description: 'Manage appointments',
        authRequired: true
      },
      homepage: {
        method: 'GET, POST, PUT, DELETE, PATCH',
        path: '/api/homepage',
        description: 'Manage homepage content',
        authRequired: true
      },
      employees: {
        method: 'GET, POST, PUT, DELETE',
        path: '/api/employees',
        description: 'Manage employees',
        authRequired: true
      },
      blogs: {
        method: 'GET, POST, PUT, DELETE',
        path: '/api/blogs',
        description: 'Manage blog posts',
        authRequired: true
      }
    },
    usage: {
      curlExample: 'curl -H "X-API-Key: your_key" https://brandbase.onrender.com/api/appointments',
      javascriptExample: `fetch('/api/appointments', {
  headers: { 'X-API-Key': 'your_key' }
})`
    }
  });
});

// Root route (public)
app.get('/', (req, res) => {
  res.json({
    message: 'BrandBase API is running...',
    version: '2.0.0',
    documentation: '/api',
    status: 'operational',
    timestamp: new Date().toISOString(),
    security: {
      enabled: true,
      note: 'API key required for all endpoints except / and /api/health'
    },
    nextSteps: [
      '1. Visit /api/health to check server status',
      '2. Include X-API-Key header in your requests',
      '3. Visit /api for documentation'
    ]
  });
});

// Error handler middleware
app.use(errorHandler);

// 404 handler - Handle all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    security: {
      apiKeyRequired: true,
      headers: ['X-API-Key', 'Authorization']
    },
    availableEndpoints: {
      public: [
        'GET /',
        'GET /api/health'
      ],
      protected: [
        'GET /api',
        'GET /api/verify-key',
        'GET/POST/PUT/DELETE /api/appointments',
        'GET/POST/PUT/DELETE/PATCH /api/homepage',
        'GET/POST/PUT/DELETE /api/employees',
        'GET/POST/PUT/DELETE /api/services',
        'GET/POST/PUT/DELETE /api/blogs',
        'GET /api/services/categories',
        'GET /api/services/:category/:slug',
        'POST /api/services/bulk'
      ]
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  🚀 Server Information:
  --------------------------
  Port: ${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  Database: ${process.env.MONGODB_URI ? 'Connected' : 'Not configured'}
  API Security: ${process.env.API_KEY ? '🔐 Enabled' : '⚠️  DISABLED - Set API_KEY in .env'}
  
  🔐 API Key Authentication:
  --------------------------
  Status: ${process.env.API_KEY ? 'Active' : 'Inactive'}
  Public Endpoints: /, /api/health
  Protected Endpoints: All other endpoints
  Header: X-API-Key or Authorization: Bearer <key>
  
  ${!process.env.API_KEY ? `
  ⚠️  IMPORTANT: API key not configured!
  ----------------------------------------
  1. Visit http://localhost:${PORT}/api/generate-key
  2. Copy the generated key
  3. Add to .env file: API_KEY=your_generated_key
  4. Restart the server
  ` : ''}
  
  🌐 CORS Enabled for:
  --------------------------
  - http://localhost:5173
  - http://localhost:5174
  - http://localhost:3000
  - https://brandbase-nu.vercel.app
  - https://brandbase1.netlify.app
  
  📊 API Endpoints:
  --------------------------
  - Root: http://localhost:${PORT}/ (Public)
  - Health: http://localhost:${PORT}/api/health (Public)
  ${!process.env.API_KEY ? '- Generate Key: http://localhost:${PORT}/api/generate-key (Public)' : ''}
  - Verify Key: http://localhost:${PORT}/api/verify-key (Protected)
  - API Docs: http://localhost:${PORT}/api (Protected)
  - Appointments: http://localhost:${PORT}/api/appointments (Protected)
  - Homepage: http://localhost:${PORT}/api/homepage (Protected)
  - Employees: http://localhost:${PORT}/api/employees (Protected)
  - Services: http://localhost:${PORT}/api/services (Protected)
  - Blogs: http://localhost:${PORT}/api/blogs (Protected)
  
  ⚡ Server ready at: http://localhost:${PORT}
  `);
  
  // Warning if API key is not set
  if (!process.env.API_KEY) {
    console.warn('\n⚠️  WARNING: API_KEY is not set in environment variables!');
    console.warn('   Your API is currently unprotected.');
    console.warn('   Run: curl http://localhost:' + PORT + '/api/generate-key');
    console.warn('   Then add the key to your .env file as API_KEY=generated_key\n');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Unhandled Rejection: ${err.message}`);
  console.error(err.stack);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`💥 Uncaught Exception: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});