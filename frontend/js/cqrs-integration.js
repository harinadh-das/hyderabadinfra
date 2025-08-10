// CQRS Integration for Hyderabad Infra Frontend
// Handles user-specific data history with event sourcing

class CQRSHyderabadAPI {
    constructor() {
        this.baseURL = 'http://localhost:8080';
        this.currentUserId = null;
        this.sessionId = this.generateSessionId();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    setCurrentUser(userId) {
        this.currentUserId = userId;
        console.log(`🔐 User session started: ${userId}`);
        this.trackUserActivity('USER_LOGIN', 'User logged in', { sessionId: this.sessionId });
    }

    // ==================== COMMAND OPERATIONS (Write Side) ====================
    
    /**
     * Create property with full event tracking
     */
    async createProperty(propertyData) {
        try {
            console.log('📝 Creating property with CQRS...', propertyData);
            
            const enrichedData = {
                ...propertyData,
                userId: this.currentUserId,
                sessionId: this.sessionId,
                timestamp: new Date().toISOString()
            };

            const response = await this.makeRequest('/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Id': this.currentUserId,
                    'X-Session-Id': this.sessionId
                },
                body: JSON.stringify(enrichedData)
            });

            if (response.success) {
                this.showNotification('✅ Property created successfully! Activity logged to your history.', 'success');
                
                // Immediately fetch updated user history
                setTimeout(() => {
                    this.fetchUserHistory();
                }, 1000);
            }

            return response;
        } catch (error) {
            console.error('❌ Failed to create property:', error);
            this.showNotification('❌ Failed to create property: ' + error.message, 'error');
            throw error;
        }
    }

    /**
     * Search properties with history tracking
     */
    async searchProperties(searchParams) {
        try {
            console.log('🔍 Searching properties with history tracking...', searchParams);
            
            const response = await this.makeRequest('/api/search/properties?' + new URLSearchParams(searchParams), {
                headers: {
                    'X-User-Id': this.currentUserId,
                    'X-Session-Id': this.sessionId
                }
            });

            // Track search activity
            this.trackUserActivity('PROPERTY_SEARCHED', 'User searched for properties', {
                searchParams,
                resultsCount: response.data?.length || 0
            });

            return response;
        } catch (error) {
            console.error('❌ Property search failed:', error);
            throw error;
        }
    }

    /**
     * View property with tracking
     */
    async viewProperty(propertyId) {
        try {
            console.log('👁️ Viewing property with tracking:', propertyId);
            
            const response = await this.makeRequest(`/api/properties/${propertyId}`, {
                headers: {
                    'X-User-Id': this.currentUserId,
                    'X-Session-Id': this.sessionId
                }
            });

            // This will automatically trigger PROPERTY_VIEWED event in backend
            
            return response;
        } catch (error) {
            console.error('❌ Failed to view property:', error);
            throw error;
        }
    }

    // ==================== QUERY OPERATIONS (Read Side) ====================
    
    /**
     * Get user's complete activity history
     */
    async getUserHistory(page = 0, size = 20) {
        try {
            console.log(`📊 Fetching user history for ${this.currentUserId}...`);
            
            const response = await this.makeRequest(
                `/api/user-history/${this.currentUserId}?page=${page}&size=${size}`,
                {
                    headers: {
                        'X-User-Id': this.currentUserId
                    }
                }
            );

            if (response.success) {
                this.displayUserHistory(response.data);
            }

            return response;
        } catch (error) {
            console.error('❌ Failed to fetch user history:', error);
            throw error;
        }
    }

    /**
     * Get user's recent activities (last 24 hours)
     */
    async getRecentActivities(limit = 10) {
        try {
            const response = await this.makeRequest(
                `/api/user-history/${this.currentUserId}/recent?limit=${limit}`,
                {
                    headers: {
                        'X-User-Id': this.currentUserId
                    }
                }
            );

            return response;
        } catch (error) {
            console.error('❌ Failed to fetch recent activities:', error);
            throw error;
        }
    }

    /**
     * Get user's property-related activities
     */
    async getPropertyActivities(limit = 20) {
        try {
            const response = await this.makeRequest(
                `/api/user-history/${this.currentUserId}/properties?limit=${limit}`,
                {
                    headers: {
                        'X-User-Id': this.currentUserId
                    }
                }
            );

            return response;
        } catch (error) {
            console.error('❌ Failed to fetch property activities:', error);
            throw error;
        }
    }

    /**
     * Get user's search history
     */
    async getSearchHistory(limit = 10) {
        try {
            const response = await this.makeRequest(
                `/api/user-history/${this.currentUserId}/searches?limit=${limit}`,
                {
                    headers: {
                        'X-User-Id': this.currentUserId
                    }
                }
            );

            return response;
        } catch (error) {
            console.error('❌ Failed to fetch search history:', error);
            throw error;
        }
    }

    // ==================== INTERNAL METHODS ====================

    /**
     * Track user activity manually
     */
    async trackUserActivity(activityType, description, activityData = {}) {
        if (!this.currentUserId) return;

        try {
            // This could be sent to a dedicated activity tracking endpoint
            console.log(`📈 Tracking activity: ${activityType} - ${description}`);
        } catch (error) {
            console.warn('⚠️ Failed to track activity:', error);
        }
    }

    /**
     * Generic API request method
     */
    async makeRequest(endpoint, options = {}) {
        try {
            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors'
            };

            const requestOptions = { ...defaultOptions, ...options };
            
            const response = await fetch(`${this.baseURL}${endpoint}`, requestOptions);
            
            console.log(`API ${requestOptions.method || 'GET'} ${endpoint}: ${response.status}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                const text = await response.text();
                return { message: text };
            }
        } catch (error) {
            console.error(`API Error for ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Display user history in UI
     */
    displayUserHistory(historyData) {
        console.log('📋 User History Data:', historyData);

        // Create or update history display
        this.removeExistingHistoryDisplay();

        const historyContainer = document.createElement('div');
        historyContainer.id = 'user-history-display';
        historyContainer.style.cssText = `
            position: fixed;
            top: 60px;
            right: 10px;
            width: 350px;
            max-height: 500px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            overflow-y: auto;
            font-family: Inter, sans-serif;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            padding: 15px;
            background: #f8f9fa;
            border-bottom: 1px solid #ddd;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <span>📊 Your Activity History</span>
            <button onclick="this.parentElement.parentElement.remove()" style="border:none;background:none;font-size:18px;cursor:pointer;">×</button>
        `;

        const content = document.createElement('div');
        content.style.padding = '10px';

        // Summary
        if (historyData.summary) {
            const summary = document.createElement('div');
            summary.style.cssText = 'padding: 10px; background: #e3f2fd; border-radius: 6px; margin-bottom: 15px;';
            summary.innerHTML = `
                <div><strong>Total Activities (30 days):</strong> ${historyData.summary.totalActivitiesLast30Days}</div>
                <div><strong>Last Activity:</strong> ${historyData.summary.lastActivityTimestamp ? new Date(historyData.summary.lastActivityTimestamp).toLocaleString() : 'N/A'}</div>
            `;
            content.appendChild(summary);
        }

        // Activities list
        if (historyData.activities && historyData.activities.length > 0) {
            historyData.activities.forEach(activity => {
                const activityDiv = document.createElement('div');
                activityDiv.style.cssText = `
                    padding: 8px;
                    border-bottom: 1px solid #eee;
                    font-size: 14px;
                `;
                
                const timeAgo = this.timeAgo(new Date(activity.timestamp));
                activityDiv.innerHTML = `
                    <div style="font-weight: 500; color: #1976d2;">${activity.activityType}</div>
                    <div style="color: #666; font-size: 12px; margin-top: 2px;">${activity.description}</div>
                    <div style="color: #999; font-size: 11px; margin-top: 4px;">${timeAgo}</div>
                `;
                content.appendChild(activityDiv);
            });
        } else {
            content.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No activities found</div>';
        }

        historyContainer.appendChild(header);
        historyContainer.appendChild(content);
        document.body.appendChild(historyContainer);

        // Auto-hide after 30 seconds
        setTimeout(() => {
            if (historyContainer.parentNode) {
                historyContainer.remove();
            }
        }, 30000);
    }

    removeExistingHistoryDisplay() {
        const existing = document.getElementById('user-history-display');
        if (existing) {
            existing.remove();
        }
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * Format timestamp as "time ago"
     */
    timeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    }

    /**
     * Initialize user session and fetch history on login
     */
    async initializeUserSession(userId) {
        this.setCurrentUser(userId);
        
        // Fetch and display recent activities
        try {
            await this.fetchUserHistory();
        } catch (error) {
            console.warn('Could not fetch user history on login:', error);
        }
    }

    /**
     * Convenience method to fetch and display history
     */
    async fetchUserHistory(showInUI = true) {
        const history = await this.getUserHistory(0, 10);
        if (showInUI && history.success) {
            // Automatically show history for a few seconds
            setTimeout(() => {
                this.removeExistingHistoryDisplay();
            }, 10000);
        }
        return history;
    }
}

// Create global instance with CQRS support
window.cqrsAPI = new CQRSHyderabadAPI();

// Auto-initialize with a demo user on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CQRS-enabled Hyderabad Infra frontend loaded');
    
    // For demo purposes, simulate user login
    setTimeout(() => {
        const demoUserId = 'user_' + Math.random().toString(36).substr(2, 9);
        console.log(`🎭 Demo user login: ${demoUserId}`);
        window.cqrsAPI.initializeUserSession(demoUserId);
    }, 2000);
});

// Enhanced form handlers with CQRS
window.handleCQRSPropertySearch = async function(event) {
    event.preventDefault();
    
    try {
        const searchParams = {
            location: document.querySelector('[name="location"]')?.value || '',
            propertyType: document.querySelector('[name="propertyType"]')?.value || '',
            minPrice: document.querySelector('[name="minPrice"]')?.value || '',
            maxPrice: document.querySelector('[name="maxPrice"]')?.value || ''
        };

        console.log('🔍 CQRS Property Search:', searchParams);
        const results = await window.cqrsAPI.searchProperties(searchParams);
        
        window.cqrsAPI.showNotification(
            `Found ${results.data?.length || 0} properties. Search saved to your history!`, 
            'success'
        );
        
    } catch (error) {
        console.error('Search failed:', error);
        window.cqrsAPI.showNotification('Search failed: ' + error.message, 'error');
    }
};

window.handleCQRSPropertyCreate = async function(event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(event.target);
        const propertyData = Object.fromEntries(formData.entries());
        
        console.log('📝 CQRS Property Create:', propertyData);
        await window.cqrsAPI.createProperty(propertyData);
        
    } catch (error) {
        console.error('Property creation failed:', error);
    }
};

// Utility function to show user history on demand
window.showMyHistory = function() {
    window.cqrsAPI.fetchUserHistory();
};

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CQRSHyderabadAPI;
}