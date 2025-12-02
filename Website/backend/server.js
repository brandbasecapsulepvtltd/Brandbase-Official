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
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://localhost:3000'],
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


// Routes
app.use("/api/appointments", appointmentRoutes);
app.use('/api/homepage', homePageRoutes);
app.use("/api/employees", employeeRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'BrandBase API is running...',
    version: '1.0.0',
    endpoints: {
      appointments: '/api/appointments',
      homepage: '/api/homepage',
      employees: '/api/employees',
      health: '/api/health'
    }
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
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET/POST/PUT/DELETE /api/appointments',
      'GET/POST/PUT/DELETE/PATCH /api/homepage'
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: http://localhost:5173, http://localhost:5174`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});