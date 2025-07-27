// UI management and DOM manipulation
import utils from './utils.js';

class UIManager {
    constructor() {
        this.elements = this.initializeElements();
        this.currentView = 'loading';
    }

    // Initialize all DOM elements
    initializeElements() {
        return {
            // Initial Loading
            initialLoading: document.getElementById('initialLoading'),
            
            // Header
            header: document.querySelector('.header'),
            loginBtn: document.getElementById('loginBtn'),
            registerBtn: document.getElementById('registerBtn'),
            logoutBtn: document.getElementById('logoutBtn'),
            
            // Auth Forms
            authForms: document.getElementById('authForms'),
            loginFormElement: document.getElementById('loginFormElement'),
            registerFormElement: document.getElementById('registerFormElement'),
            switchToRegister: document.getElementById('switchToRegister'),
            switchToLogin: document.getElementById('switchToLogin'),
            
            // Dashboard
            dashboard: document.getElementById('dashboard'),
            userName: document.getElementById('userName'),
            carsGrid: document.getElementById('carsGrid'),
            addCarBtn: document.getElementById('addCarBtn'),
            
            // Modal
            addCarModal: document.getElementById('addCarModal'),
            addCarForm: document.getElementById('addCarForm'),
            closeModal: document.getElementById('closeModal'),
            cancelAddCar: document.getElementById('cancelAddCar'),
            
            // Loading and Toast
            loading: document.getElementById('loading'),
            toast: document.getElementById('toast')
        };
    }

    // Show loading state
    showLoading() {
        utils.showElement(this.elements.loading);
    }

    hideLoading() {
        utils.hideElement(this.elements.loading);
    }

    // Show initial loading
    showInitialLoading() {
        utils.showElement(this.elements.initialLoading);
    }

    hideInitialLoading() {
        utils.hideElement(this.elements.initialLoading);
    }

    // Show toast notification
    showToast(message, type = 'success') {
        this.elements.toast.textContent = message;
        this.elements.toast.className = `toast ${type}`;
        utils.showElement(this.elements.toast);
        
        setTimeout(() => {
            this.elements.toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            this.elements.toast.classList.remove('show');
            setTimeout(() => {
                utils.hideElement(this.elements.toast);
            }, 300);
        }, 3000);
    }

    // Show auth forms
    showAuthForms() {
        this.hideInitialLoading();
        utils.hideElement(this.elements.header);
        utils.showElement(this.elements.authForms);
        utils.hideElement(this.elements.dashboard);
        utils.showElement(this.elements.loginBtn);
        utils.showElement(this.elements.registerBtn);
        utils.hideElement(this.elements.logoutBtn);
        this.currentView = 'auth';
    }

    // Show dashboard
    showDashboard() {
        this.hideInitialLoading();
        utils.showElement(this.elements.header);
        utils.hideElement(this.elements.authForms);
        utils.showElement(this.elements.dashboard);
        utils.hideElement(this.elements.loginBtn);
        utils.hideElement(this.elements.registerBtn);
        utils.showElement(this.elements.logoutBtn);
        this.currentView = 'dashboard';
    }

    // Switch between auth forms
    switchAuthForm(form) {
        if (form === 'login') {
            this.elements.loginFormElement.classList.add('active');
            this.elements.registerFormElement.classList.remove('active');
            this.elements.switchToLogin.classList.add('active');
            this.elements.switchToRegister.classList.remove('active');
        } else {
            this.elements.registerFormElement.classList.add('active');
            this.elements.loginFormElement.classList.remove('active');
            this.elements.switchToRegister.classList.add('active');
            this.elements.switchToLogin.classList.remove('active');
        }
    }

    // Update user name in dashboard
    updateUserName(username) {
        if (this.elements.userName) {
            this.elements.userName.textContent = username;
        }
    }

    // Modal management
    showAddCarModal() {
        utils.showElement(this.elements.addCarModal);
        this.elements.addCarModal.classList.add('show');
        this.elements.addCarForm.reset();
    }

    hideAddCarModal() {
        this.elements.addCarModal.classList.remove('show');
        setTimeout(() => {
            utils.hideElement(this.elements.addCarModal);
        }, 300); // Wait for the transition to complete
    }

    // Create car card element
    createCarCard(car) {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${car.imageUrl}" alt="${car.brand} ${car.model}" class="car-image" onerror="this.src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'">
            <div class="car-content">
                <div class="car-header">
                    <div class="car-title">
                        <h3>${car.brand} ${car.model}</h3>
                        <div class="car-year">${car.year}</div>
                    </div>
                    <div class="car-price">${utils.formatPrice(car.price)}</div>
                </div>
                ${car.description ? `<div class="car-description">${car.description}</div>` : ''}
                <div class="car-actions">
                    <button class="btn-delete" data-car-id="${car.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                    <button class="btn-sell" data-car-id="${car.id}" ${car.isSell ? 'disabled' : ''}>
            <i class="fas fa-dollar-sign"></i> Sell
        </button>
                </div>
            </div>
        `;
        return card;
    }

    // Render cars grid
    renderCars(cars) {
        this.elements.carsGrid.innerHTML = '';
        
        if (cars.length === 0) {
            this.elements.carsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: white; padding: 2rem;">
                    <i class="fas fa-car" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No cars yet</h3>
                    <p>Add your first car to get started!</p>
                </div>
            `;
        } else {
            cars.forEach(car => {
                this.elements.carsGrid.appendChild(this.createCarCard(car));
            });
        }
    }

    // Get form data
    getFormData(formId) {
        const form = document.getElementById(formId);
        if (!form) return null;

        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    // Get car form data
    getCarFormData() {
        return {
            brand: document.getElementById('carBrand').value,
            model: document.getElementById('carModel').value,
            year: document.getElementById('carYear').value,
            price: document.getElementById('carPrice').value,
            imageUrl: document.getElementById('carImageUrl').value,
            description: document.getElementById('carDescription').value
        };
    }

    // Add event listeners
    addEventListeners(handlers) {
        // Auth form submissions
        if (this.elements.loginFormElement) {
            this.elements.loginFormElement.addEventListener('submit', handlers.onLogin);
        }
        
        if (this.elements.registerFormElement) {
            this.elements.registerFormElement.addEventListener('submit', handlers.onRegister);
        }

        // Auth form switching
        if (this.elements.switchToRegister) {
            this.elements.switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchAuthForm('register');
            });
        }

        if (this.elements.switchToLogin) {
            this.elements.switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchAuthForm('login');
            });
        }

        // Logout
        if (this.elements.logoutBtn) {
            this.elements.logoutBtn.addEventListener('click', handlers.onLogout);
        }

        // Add car
        if (this.elements.addCarBtn) {
            this.elements.addCarBtn.addEventListener('click', this.showAddCarModal.bind(this));
        }

        // Modal controls
        if (this.elements.closeModal) {
            this.elements.closeModal.addEventListener('click', this.hideAddCarModal.bind(this));
        }

        if (this.elements.cancelAddCar) {
            this.elements.cancelAddCar.addEventListener('click', this.hideAddCarModal.bind(this));
        }

        // Car form submission
        if (this.elements.addCarForm) {
            this.elements.addCarForm.addEventListener('submit', handlers.onAddCar);
        }

        // Close modal when clicking outside
        if (this.elements.addCarModal) {
            this.elements.addCarModal.addEventListener('click', (e) => {
                if (e.target === this.elements.addCarModal) {
                    this.hideAddCarModal();
                }
            });
        }

        // Car delete buttons (delegated event)
        if (this.elements.carsGrid) {
            this.elements.carsGrid.addEventListener('click', (e) => {
                if (e.target.closest('.btn-delete')) {
                    const carId = e.target.closest('.btn-delete').dataset.carId;
                    if (carId && handlers.onDeleteCar) {
                        handlers.onDeleteCar(carId);
                    }
                }
            });
        }
       
          // Car sell button (delegated event)
if (this.elements.carsGrid) {
    this.elements.carsGrid.addEventListener('click', (e) => {
        const sellBtn = e.target.closest('.btn-sell');
        if (sellBtn) {
            const carId = sellBtn.dataset.carId;
            if (carId && handlers.onSellCar) {
                handlers.onSellCar(carId);
            }
        }
    });
}
          

    
    }

    // Get current view
    getCurrentView() {
        return this.currentView;
    }

    // Check if element exists
    elementExists(id) {
        return !!document.getElementById(id);
    }
}

// Export singleton instance
const uiManager = new UIManager();
export default uiManager; 