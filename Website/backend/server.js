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
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Import Routes
const appointmentRoutes = require("./routes/appointments");
const homePageRoutes = require('./routes/homePageRoutes');
const employeeRoutes = require("./routes/employees");
const serviceRoutes = require('./routes/serviceRoutes'); // Add service routes

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use('/api/homepage', homePageRoutes);
app.use("/api/employees", employeeRoutes);
app.use('/api/services', serviceRoutes); // Add service routes

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'Connected',
    memory: process.memoryUsage()
  });
});

// API Documentation route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'BrandBase API Documentation',
    version: '2.0.0',
    endpoints: {
      health: {
        method: 'GET',
        path: '/api/health',
        description: 'Server health check'
      },
      services: {
        base: {
          method: 'GET, POST',
          path: '/api/services',
          description: 'Get all services or create new service'
        },
        byCategorySlug: {
          method: 'GET',
          path: '/api/services/:category/:slug',
          description: 'Get service by category and slug'
        },
        byId: {
          method: 'GET, PUT, DELETE',
          path: '/api/services/:id',
          description: 'Get, update, or delete service by ID'
        },
        categories: {
          method: 'GET',
          path: '/api/services/categories',
          description: 'Get all unique categories'
        },
        bulk: {
          method: 'POST',
          path: '/api/services/bulk',
          description: 'Bulk create services (Admin only)'
        }
      },
      appointments: {
        method: 'GET, POST, PUT, DELETE',
        path: '/api/appointments',
        description: 'Manage appointments'
      },
      homepage: {
        method: 'GET, POST, PUT, DELETE, PATCH',
        path: '/api/homepage',
        description: 'Manage homepage content'
      },
      employees: {
        method: 'GET, POST, PUT, DELETE',
        path: '/api/employees',
        description: 'Manage employees'
      }
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'BrandBase API is running...',
    version: '2.0.0',
    documentation: '/api',
    status: 'operational',
    timestamp: new Date().toISOString()
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
    availableEndpoints: [
      'GET /',
      'GET /api',
      'GET /api/health',
      'GET/POST/PUT/DELETE /api/appointments',
      'GET/POST/PUT/DELETE/PATCH /api/homepage',
      'GET/POST/PUT/DELETE /api/employees',
      'GET/POST/PUT/DELETE /api/services',
      'GET /api/services/categories',
      'GET /api/services/:category/:slug',
      'POST /api/services/bulk'
    ]
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
  
  🌐 CORS Enabled for:
  --------------------------
  - http://localhost:5173
  - http://localhost:5174
  - http://localhost:3000
  - https://brandbase-nu.vercel.app
  - https://brandbase1.netlify.app
  
  📊 API Endpoints:
  --------------------------
  - Health Check: http://localhost:${PORT}/api/health
  - API Docs: http://localhost:${PORT}/api
  - Services API: http://localhost:${PORT}/api/services
  - Appointments: http://localhost:${PORT}/api/appointments
  - Homepage: http://localhost:${PORT}/api/homepage
  - Employees: http://localhost:${PORT}/api/employees
  
  ⚡ Server ready at: http://localhost:${PORT}
  `);
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