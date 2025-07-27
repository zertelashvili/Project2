const db = require('../config/database');


// Get all cars for the authenticated user
const getCars = (req, res) => {
    // TODO: Implement get cars functionality
    try{
        const cars = db.getCars();
        const userCars = cars.filter(car => car.createdBy === req.user.userId);
        res.json(userCars);
    } catch(error){
        console.log('Get cars error', error);
        res.status(500).json({error: 'Server error'})
    }
};

// Create new car
const createCar = (req, res) => {
    try {
        const { brand, model, year, price, imageUrl, description } = req.body;

        const cars = db.getCars();
        
        const newCar = {
            id: Date.now().toString(),
            brand,
            model,
            year: parseInt(year),
            price: parseFloat(price),
            imageUrl: imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
            description: description || '',
            createdBy: req.user.userId,
            createdAt: new Date().toISOString()
        };

        cars.push(newCar);
        db.saveCars(cars);

        res.status(201).json({
            message: 'Car created successfully',
            car: newCar
        });
    } catch (error) {
        console.error('Create car error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete car
const deleteCar = (req, res) => {
    try {
        const { id } = req.params;
        const cars = db.getCars();
        
        const carIndex = cars.findIndex(car => car.id === id);
        
        if (carIndex === -1) {
            return res.status(404).json({ error: 'Car not found' });
        }

        //TODO missing check if user owns the car
        if(cars[carIndex].createdBy !== req.user.userId){
            res.status(403).json({error:'Not authorized to delete this car'});
        }

        cars.splice(carIndex, 1);
        db.saveCars(cars);

        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Delete car error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update car
const updateCar = (req, res) => {
    try {
        const { id } = req.params;
        const { brand, model, year, price, imageUrl, description } = req.body;
        
        const cars = db.getCars();
        const carIndex = cars.findIndex(car => car.id === id);
        
        if (carIndex === -1) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Check if user owns the car
        if (cars[carIndex].createdBy !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to update this car' });
        }

        // Update car data
        cars[carIndex] = {
            ...cars[carIndex],
            brand: brand || cars[carIndex].brand,
            model: model || cars[carIndex].model,
            year: year ? parseInt(year) : cars[carIndex].year,
            price: price ? parseFloat(price) : cars[carIndex].price,
            imageUrl: imageUrl || cars[carIndex].imageUrl,
            description: description !== undefined ? description : cars[carIndex].description,
            updatedAt: new Date().toISOString()
        };

        db.saveCars(cars);

        res.json({
            message: 'Car updated successfully',
            car: cars[carIndex]
        });
    } catch (error) {
        console.error('Update car error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

//sold
const markCarAsSold = (req, res) => {
    try {
        const cars = db.getCars();
        const carId = req.params.id;
        const carIndex = cars.findIndex(car => car.id === carId);

        if (carIndex === -1) {
            return res.status(404).json({ error: "Car not found" });
        }

        if (cars[carIndex].createdBy !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        cars[carIndex].isSell = true;

        db.saveCars(cars);
        res.json(cars[carIndex]);
    } catch (error) {
        console.log('Mark as sold error', error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Get single car
const getCar = (req, res) => {
    try {
        const { id } = req.params;
        const cars = db.getCars();
        
        const car = cars.find(car => car.id === id);
        
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Check if user owns the car
        if (car.createdBy !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to view this car' });
        }

        res.json(car);
    } catch (error) {
        console.error('Get car error:', error);
        res.status(500).json({ error: 'Server error' });
    }
    
};

module.exports = {
    getCars,
    createCar,
    deleteCar,
    updateCar,
    getCar,
    markCarAsSold
}; 
