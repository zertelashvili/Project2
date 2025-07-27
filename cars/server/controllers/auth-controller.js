const bcrypt = require('bcryptjs');

const db = require('../config/database');
const { generateToken } = require('../middleware/auth');

// Register new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const users = db.getUsers();
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === email || user.username === username);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        db.saveUsers(users);

        // Generate JWT token
        const token = generateToken(newUser);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login user
const login = async (req, res) => {
    // TODO: Implement login functionality
    try{
        const {email, password} = req.body;
        const users = db.getUsers();

        const user = users.find(user => user.email === email || user.password === password);
        if(!user){
           return res.status(400).json({error: 'User does not exist'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
           return res.status(400).json({error:'Invalid password'})
        }

        const token = generateToken({
            id:user.id,
            email: user.email
        });

        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user.id,
                email:user.email
            }
        });

    }catch(error){
        console.error('Login error:', 'error');
        res.status(500).json({error: 'Server error'});
    }
};

// Get user profile
const getProfile = (req, res) => {
    try {
        const users = db.getUsers();
        const user = users.find(u => u.id === req.user.userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    getProfile
}; 
