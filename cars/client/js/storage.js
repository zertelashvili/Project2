// Storage management for user session and preferences
class StorageService {
    constructor() {
        this.AUTH_TOKEN_KEY = 'authToken';
        this.USER_DATA_KEY = 'userData';
        this.THEME_KEY = 'theme';
        this.LANGUAGE_KEY = 'language';
    }

    // Auth token management
    getAuthToken() {
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }

    setAuthToken(token) {
        localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    }

    removeAuthToken() {
        localStorage.removeItem(this.AUTH_TOKEN_KEY);
    }

    hasAuthToken() {
        return !!this.getAuthToken();
    }

    // User data management
    getUserData() {
        const userData = localStorage.getItem(this.USER_DATA_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    setUserData(userData) {
        localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    }

    removeUserData() {
        localStorage.removeItem(this.USER_DATA_KEY);
    }

    // Session management
    clearSession() {
        this.removeAuthToken();
        this.removeUserData();
    }

    // Theme management
    getTheme() {
        return localStorage.getItem(this.THEME_KEY) || 'light';
    }

    setTheme(theme) {
        localStorage.setItem(this.THEME_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Language management
    getLanguage() {
        return localStorage.getItem(this.LANGUAGE_KEY) || 'en';
    }

    setLanguage(language) {
        localStorage.setItem(this.LANGUAGE_KEY, language);
    }

    // Car data caching (optional)
    cacheCars(cars) {
        localStorage.setItem('cachedCars', JSON.stringify({
            data: cars,
            timestamp: Date.now()
        }));
    }

    getCachedCars() {
        const cached = localStorage.getItem('cachedCars');
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        const cacheAge = now - timestamp;
        const maxAge = 5 * 60 * 1000; // 5 minutes

        if (cacheAge > maxAge) {
            localStorage.removeItem('cachedCars');
            return null;
        }

        return data;
    }

    clearCachedCars() {
        localStorage.removeItem('cachedCars');
    }

    // Utility methods
    clearAll() {
        localStorage.clear();
    }

    getStorageSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return total;
    }
}

// Export singleton instance
const storageService = new StorageService();
export default storageService; 