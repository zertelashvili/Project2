// API Configuration
const API_BASE_URL = 'http://localhost:3500/api';

// API Functions
class ApiService {
    constructor() {
        this.authToken = localStorage.getItem('authToken');
    }

    setAuthToken(token) {
        this.authToken = token;
        localStorage.setItem('authToken', token);
    }

    clearAuthToken() {
        this.authToken = null;
        localStorage.removeItem('authToken');
    }

    async apiCall(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        if (this.authToken) {
            config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            
            return data;
        } catch (error) {
            throw error;
        }
    }

    // Auth API calls
    async register(userData) {
        const data = await this.apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        this.setAuthToken(data.token);
        return data;
    }

    async login(credentials) {
        const data = await this.apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        this.setAuthToken(data.token);
        return data;
    }

    async getProfile() {
        return await this.apiCall('/auth/profile');
    }

    async createCar(carData) {
        return await this.apiCall('/cars', {
            method: 'POST',
            body: JSON.stringify(carData)
        });
    }

    async updateCar(carId, carData) {
        return await this.apiCall(`/cars/${carId}`, {
            method: 'PUT',
            body: JSON.stringify(carData)
        });
    }

    async getCar(carId) {
        return await this.apiCall(`/cars/${carId}`);
    }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService; 