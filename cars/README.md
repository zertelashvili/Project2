# Car Management System

A beautiful and modern car management application built with Node.js Express backend and vanilla JavaScript frontend. Features user authentication, car CRUD operations, and a responsive design with a well-organized modular architecture.

## Features

- 🔐 **User Authentication**: Register and login with JWT tokens
- 🚗 **Car Management**: Add, view, update, and delete cars
- 🎨 **Beautiful UI**: Modern design with gradients and animations
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 🔒 **Secure**: Password hashing and JWT authentication
- 💾 **JSON Storage**: Data stored in JSON files (no database required)
- 🏗️ **Modular Architecture**: Well-organized backend with separate modules

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **Vanilla JavaScript** - No frameworks
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## Project Structure

```
cars/
├── server/
│   ├── config/
│   │   └── database.js          # Database configuration & JSON operations
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── carController.js     # Car CRUD operations
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── validation.js        # Request validation middleware
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication endpoints
│   │   └── carRoutes.js         # Car management endpoints
│   ├── data/                    # JSON data storage
│   │   ├── users.json
│   │   └── cars.json
│   ├── package.json
│   └── server.js                # Main server file
├── client/
│   ├── index.html               # Main HTML file
│   ├── styles.css               # CSS styles
│   ├── script.js                # Frontend JavaScript
│   └── server.js                # Frontend development server
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Start the frontend server:
```bash
node server.js
```

The frontend will run on `http://localhost:8000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Cars (`/api/cars`)
- `GET /api/cars` - Get all cars (requires auth)
- `POST /api/cars` - Create new car (requires auth)
- `GET /api/cars/:id` - Get single car (requires auth)
- `PUT /api/cars/:id` - Update car (requires auth)
- `DELETE /api/cars/:id` - Delete car (requires auth)

### Health Check
- `GET /api/health` - API health status

## Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Add Cars**: Click "Add Car" to create new car entries with:
   - Brand and model
   - Year and price
   - Image URL (optional)
   - Description (optional)
3. **View Cars**: All your cars are displayed in beautiful cards
4. **Delete Cars**: Remove cars you no longer want to track

## Backend Architecture

### Modules Overview

#### Config (`/config`)
- **database.js**: Handles JSON file operations and data persistence

#### Controllers (`/controllers`)
- **authController.js**: User registration, login, and profile management
- **carController.js**: Car CRUD operations with user ownership validation

#### Middleware (`/middleware`)
- **auth.js**: JWT token validation and generation
- **validation.js**: Request data validation for all endpoints

#### Routes (`/routes`)
- **authRoutes.js**: Authentication endpoints with validation
- **carRoutes.js**: Car management endpoints with authentication

### Key Features

- **Modular Design**: Each feature is separated into its own module
- **Middleware Chain**: Authentication and validation are applied consistently
- **Error Handling**: Comprehensive error handling throughout the application
- **Data Validation**: Input validation for all user inputs
- **Security**: JWT tokens, password hashing, and user ownership validation

## Data Storage

The application uses JSON files for data storage:
- `server/data/users.json` - User accounts with hashed passwords
- `server/data/cars.json` - Car data with user ownership

//დავალება
client:
    1) დალოგინების ფუნქციონალი: 2 ქულა
    2) მაქანების ლისტის დახატვის ფუნქცინალია: 3 ქულა
    3) მაქანის წაშლის ფუნქცინალი: 2 ქულა
server:
    1) დალოგინების ლოგიკა დასაწერი: 5 ქულა
        შეამოწმო პაროლი და ლოგინი.
        დაჰეშო პაროლი და ისე შეამოწმო.
    2) მაქანების წამოღების ფუნქცინალი: 2 ქულა
        მხოლოდ იუზერის მაქანები უნდა წამოვიდეს და არა სხვა უზერის
    3) მაქანის წაშლი ფუნქციაში დამატეთ შემოწმება რო ეს ნადვილად თქვენი მაქანა: 1 ქულა