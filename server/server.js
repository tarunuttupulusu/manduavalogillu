const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve Static Product & Brand Images from client/public/images
const imagesPath = path.join(__dirname, '../client/public/images');
app.use('/images', express.static(imagesPath));

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    name: 'Manduva Logillu Furnitures API',
    location: 'Moinabad, Hyderabad',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Serve Production React Frontend from client/dist if present
const distPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Global 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🛋️  MANDUVA LOGILLU FURNITURES - MERN API SERVER`);
  console.log(`📍  Resort & Farm Furnitures — Moinabad, Hyderabad`);
  console.log(`🚀  Server running on http://localhost:${PORT}`);
  console.log(`📡  Local IPv4: http://127.0.0.1:${PORT}`);
  console.log(`📡  API Base: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
});
