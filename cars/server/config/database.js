const fs = require('fs');
const path = require('path');

// Data files configuration
const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CARS_FILE = path.join(DATA_DIR, 'cars.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
};

// Initialize data files if they don't exist
const initializeDataFiles = () => {
    ensureDataDirectory();
    
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
    }
    
    if (!fs.existsSync(CARS_FILE)) {
        fs.writeFileSync(CARS_FILE, JSON.stringify([], null, 2));
    }
};

// Helper functions for reading and writing JSON files
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return [];
    }
};

const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error.message);
        return false;
    }
};

// Database operations
const db = {
    // Users operations
    getUsers: () => readJsonFile(USERS_FILE),
    saveUsers: (users) => writeJsonFile(USERS_FILE, users),
    
    // Cars operations
    getCars: () => readJsonFile(CARS_FILE),
    saveCars: (cars) => writeJsonFile(CARS_FILE, cars),
    
    // Initialize database
    initialize: () => {
        initializeDataFiles();
        console.log('Database initialized successfully');
    }
};

module.exports = db; 