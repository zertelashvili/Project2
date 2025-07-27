// Main application controller
import apiService from './api.js';
import storageService from './storage.js';
import uiManager from './ui.js';
import utils from './utils.js';

class CarApp {
    constructor() {
        this.currentUser = null;
        this.cars = [];
        this.isInitialized = false;
    }

    // Initialize the application
    async init() {
        try {
            // Add event listeners
            this.setupEventListeners();
            
            // Check authentication status
            await this.checkAuthStatus();
            
            this.isInitialized = true;
        } catch (error) {
            console.error('App initialization error:', error);
            uiManager.showToast('Failed to initialize application', 'error');
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        uiManager.addEventListeners({
            onLogin: this.handleLogin.bind(this),
            onRegister: this.handleRegister.bind(this),
            onLogout: this.handleLogout.bind(this),
            onAddCar: this.handleAddCar.bind(this),
            onDeleteCar: this.handleDeleteCar.bind(this),
            onSellCar: this.sellCar.bind(this)
        });
    }

    // Check authentication status on app start
    async checkAuthStatus() {
        // Add a small delay to show the loading animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const authToken = storageService.getAuthToken();
        
        if (authToken) {
            try {
                const userData = await apiService.getProfile();
                this.currentUser = userData;
                this.showDashboard();
                await this.loadCars();
            } catch (error) {
                // Token is invalid, clear it and show login
                storageService.clearSession();
                apiService.clearAuthToken();
                this.showAuthForms();
            }
        } else {
            this.showAuthForms();
        }
    }

    // Handle user login
    async handleLogin(e) {
       // TODO: Implement login functionality
       e.preventDefault();

       const email = document.getElementById('loginEmail').value;
       const password = document.getElementById('loginPassword').value;

       if(!utils.validateEmail(email)){
        uiManager.showToast('Please enter a valid email address', 'error');
        return;
       }
       try{
        uiManager.showLoading();
        const data = await apiService.login({email, password});
        localStorage.setItem('token', data.token);

        this.currentUser = data.user;
        storageService.setUserData(data.user);
        uiManager.showToast('Login successfully');
        this.showDashboard();
        await this.loadCars();


       }catch(error){
        uiManager.showToast(error.message, 'error');
       }finally{
        uiManager.hideLoading();
       }

    }

    // Handle user registration
    async handleRegister(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        // Validate input
        if (!utils.validateEmail(email)) {
            uiManager.showToast('Please enter a valid email address', 'error');
            return;
        }
        
        const passwordValidation = utils.validatePassword(password);
        if (!passwordValidation.isValid) {
            uiManager.showToast('Password must be at least 6 characters long', 'error');
            return;
        }
        
        try {
            uiManager.showLoading();
            const data = await apiService.register({ username, email, password });
            
            this.currentUser = data.user;
            storageService.setUserData(data.user);
            
            uiManager.showToast('Registration successful');
            this.showDashboard();
            await this.loadCars();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        } finally {
            uiManager.hideLoading();
        }
    }

    //sell car
    async sellCar(carId) {
        const token = localStorage.getItem("token");
        if (!token) {
            uiManager.showToast('Please log in first', 'error');
            return;
        }
    
        try {
            const res = await fetch(`http://localhost:3500/api/cars/${carId}/sell`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await res.json();
    
            if (res.ok) {
                uiManager.showToast('Car marked as sold successfully');
                await this.loadCars();  // მანქანების სია განახლდეს
            } else {
                uiManager.showToast(data.error || 'Failed to mark car as sold', 'error');
            }
        } catch (error) {
            console.error('Sell car error:', error);
            uiManager.showToast('Failed to mark car as sold', 'error');
        }
    }

    // Handle user logout
    handleLogout() {
        this.currentUser = null;
        this.cars = [];
        storageService.clearSession();
        apiService.clearAuthToken();
        
        uiManager.showToast('Logged out successfully');
        this.showAuthForms();
    }

    // Handle adding a new car
    async handleAddCar(e) {
        e.preventDefault();
        
        const carData = uiManager.getCarFormData();
        
        // Validate required fields
        if (!carData.brand || !carData.model || !carData.year || !carData.price) {
            uiManager.showToast('Please fill in all required fields', 'error');
            return;
        }
        
        try {
            uiManager.showLoading();
            await apiService.createCar(carData);
            
            uiManager.showToast('Car added successfully');
            uiManager.hideAddCarModal();
            await this.loadCars();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        } finally {
            uiManager.hideLoading();
        }
    }

    // Handle deleting a car
    async handleDeleteCar(carId) {
        // TODO: Implement delete car functionality
        try{
            const token = localStorage.getItem('token');
            if(!token){
                uiManager.showToast('Please login first', 'error');
            }

            const response = await fetch(`http://localhost:3500/api/cars/${carId}`,{
                method: 'DELETE',
                headers:{
                   'Authorization': `Bearer ${token}`
                }
            });

            const cars = await response.json();
            if(response.ok){
                uiManager.showToast('Car delete successfuly');
                await this.loadCars(cars);
            }else{
                uiManager.showToast('Delete error');
            }

        }catch(error){
            console.error('can not delete cars', error);
         uiManager.showToast('Delete error', 'error');
        }
    }

    // Load cars from API
    async loadCars() {
        // TODO: Implement load cars functionality
 
        try{
         uiManager.showLoading();
 
         const token = localStorage.getItem('token');
         if(!token){
             uiManager.showToast('Please log in first', 'error');
             return;
         }
           const respons = await fetch('http://localhost:3500/api/cars',{
             headers: {
                 'Authorization': `Bearer ${token}`
             }
           });
           const cars = await respons.json();
 
           uiManager.renderCars(cars);
        } catch(error){
         console.error('Load cars error:', error);
         uiManager.showToast('Faild to load cars', 'error')
        } finally{
         uiManager.hideLoading();
        }
     }
    // Show authentication forms
    showAuthForms() {
        uiManager.showAuthForms();
    }

    // Show dashboard
    showDashboard() {
        uiManager.showDashboard();
        
        if (this.currentUser) {
            uiManager.updateUserName(this.currentUser.username);
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get cars
    getCars() {
        return this.cars;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.currentUser;
    }

    // Get app status
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            isAuthenticated: this.isAuthenticated(),
            currentUser: this.currentUser,
            carsCount: this.cars.length,
            currentView: uiManager.getCurrentView()
        };
    }
 
}

// Create and export app instance
const app = new CarApp();

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});


export default app; 
