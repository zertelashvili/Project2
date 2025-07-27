const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const { login, getProfile, register } = require('../controllers/auth-controller');

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

module.exports = router; 
