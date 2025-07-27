const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import database configuration
const db = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth-routes');
const carRoutes = require('./routes/car-routes');

const app = express();
const PORT = process.env.PORT || 3500;

// Initialize database
db.initialize();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Car Management API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚗 Car Management Server running on port ${PORT}`);
    console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`\n🔗 API Endpoints:`);
    console.log(`   Authentication:`);
    console.log(`   - POST /api/auth/register - Register new user`);
    console.log(`   - POST /api/auth/login - Login user`);
    console.log(`   - GET /api/auth/profile - Get user profile (requires auth)`);
    console.log(`   \n   Cars:`);
    console.log(`   - GET /api/cars - Get all cars (requires auth)`);
    console.log(`   - POST /api/cars - Create new car (requires auth)`);
    console.log(`   - GET /api/cars/:id - Get single car (requires auth)`);
    console.log(`   - PUT /api/cars/:id - Update car (requires auth)`);
    console.log(`   - DELETE /api/cars/:id - Delete car (requires auth)`);
}); 
