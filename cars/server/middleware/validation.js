// Validation middleware for request data

const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    next();
};

const validateCar = (req, res, next) => {
    const { brand, model, year, price } = req.body;

    if (!brand || !model || !year || !price) {
        return res.status(400).json({ error: 'Brand, model, year, and price are required' });
    }

    if (year < 1900 || year > new Date().getFullYear() + 1) {
        return res.status(400).json({ error: 'Invalid year' });
    }

    if (price <= 0) {
        return res.status(400).json({ error: 'Price must be greater than 0' });
    }

    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateCar
}; 