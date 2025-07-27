const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { validateCar } = require('../middleware/validation');
const { getCars, createCar, getCar, deleteCar, updateCar, markCarAsSold } = require('../controllers/car-controller');


// All car routes require authentication
router.use(authenticateToken);

// Car CRUD operations
router.get('/', getCars);
router.post('/', validateCar, createCar);
router.get('/:id', getCar);
router.put('/:id', validateCar, updateCar);
router.delete('/:id', deleteCar);
router.post('/:id/sell', markCarAsSold);


module.exports = router; 
