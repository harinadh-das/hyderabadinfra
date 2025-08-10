// API integration for hyderabadinfra frontend
// Connects to the backend microservices through API Gateway at localhost:8080

const API_BASE_URL = 'http://localhost:8080';

class HyderabadInfraAPI {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Generic method to make API calls
    async makeRequest(endpoint, options = {}) {
        try {
            console.log(`Making API call to: ${this.baseURL}${endpoint}`);
            
            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors'
            };

            const requestOptions = { ...defaultOptions, ...options };
            
            const response = await fetch(`${this.baseURL}${endpoint}`, requestOptions);
            
            console.log(`API Response status: ${response.status} for ${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Try to parse as JSON, fallback to text if not JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('API Response data:', data);
                return data;
            } else {
                const text = await response.text();
                console.log('API Response text:', text);
                return { message: text };
            }
        } catch (error) {
            console.error(`API Error for ${endpoint}:`, error);
            throw error;
        }
    }

    // Property-related API calls
    async searchProperties(searchParams = {}) {
        const queryParams = new URLSearchParams(searchParams).toString();
        const endpoint = `/api/search/properties${queryParams ? '?' + queryParams : ''}`;
        return this.makeRequest(endpoint);
    }

    async getProperty(propertyId) {
        return this.makeRequest(`/api/properties/${propertyId}`);
    }

    async postProperty(propertyData) {
        return this.makeRequest('/api/properties', {
            method: 'POST',
            body: JSON.stringify(propertyData)
        });
    }

    // User-related API calls  
    async registerUser(userData) {
        return this.makeRequest('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async loginUser(credentials) {
        return this.makeRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    // Health check
    async healthCheck() {
        return this.makeRequest('/actuator/health');
    }

    // Test connectivity
    async testConnection() {
        try {
            console.log('Testing backend connectivity...');
            const health = await this.healthCheck();
            console.log('✅ Backend is connected and healthy:', health);
            
            // Display connection status on page
            this.showConnectionStatus(true, 'Backend connected successfully!');
            return true;
        } catch (error) {
            console.error('❌ Backend connection failed:', error);
            this.showConnectionStatus(false, `Backend connection failed: ${error.message}`);
            return false;
        }
    }

    // Show connection status on the page
    showConnectionStatus(isConnected, message) {
        // Remove any existing status display
        const existingStatus = document.getElementById('backend-status');
        if (existingStatus) {
            existingStatus.remove();
        }

        // Create status display
        const statusDiv = document.createElement('div');
        statusDiv.id = 'backend-status';
        statusDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 15px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            background-color: ${isConnected ? '#28a745' : '#dc3545'};
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        statusDiv.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin-right: 8px;">${isConnected ? '✅' : '❌'}</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(statusDiv);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.remove();
            }
        }, 5000);
    }
}

// Create global API instance
window.hyderabadAPI = new HyderabadInfraAPI();

// Test connection when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Hyderabad Infra frontend loaded - testing backend connection...');
    
    // Test backend connection after a brief delay
    setTimeout(() => {
        window.hyderabadAPI.testConnection();
    }, 1000);
});

// Example usage for property search (can be called from search forms)
async function handlePropertySearch(event) {
    event.preventDefault();
    
    try {
        // Get search parameters from the form
        const searchParams = {
            location: document.querySelector('[name="location"]')?.value || '',
            propertyType: document.querySelector('[name="propertyType"]')?.value || '',
            budget: document.querySelector('[name="budget"]')?.value || ''
        };

        console.log('Searching properties with params:', searchParams);
        const results = await window.hyderabadAPI.searchProperties(searchParams);
        console.log('Search results:', results);
        
        // Here you would normally update the UI with search results
        alert(`Found ${results?.properties?.length || 0} properties. Check console for details.`);
        
    } catch (error) {
        console.error('Property search failed:', error);
        alert(`Property search failed: ${error.message}`);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HyderabadInfraAPI;
}