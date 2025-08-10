// Dashboard JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication state
    const user = checkAuthState();
    if (!user) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize dashboard components
    initializeUserMenu();
    initializeDashboard(user);
    loadUserData(user);
});

// Initialize user menu dropdown - use same floating system as other pages
function initializeUserMenu() {
    const userMenuItem = document.querySelector('.nav-item.user-menu');
    if (userMenuItem) {
        // Use the same initialization as other pages
        initializeUserDropdown(userMenuItem);
    }
}

// Initialize dashboard with user data
function initializeDashboard(user) {
    // Set user name in UI
    const userNameElements = document.querySelectorAll('#userName, #welcomeUserName');
    userNameElements.forEach(element => {
        if (element) {
            element.textContent = user.name || 'User';
        }
    });
    
    // Initialize dashboard sections
    loadRecentActivity();
    loadSavedProperties();
    loadRecommendations();
    updateStats();
}

// Load user-specific data
function loadUserData(user) {
    console.log('Loading data for user:', user);
    
    // Simulate loading user-specific data
    setTimeout(() => {
        // Update stats with simulated data
        updateStatCard('wishlistCount', Math.floor(Math.random() * 15) + 5);
        updateStatCard('searchCount', Math.floor(Math.random() * 25) + 10);
        updateStatCard('viewedCount', Math.floor(Math.random() * 50) + 20);
    }, 500);
}

// Update stat cards
function updateStatCard(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        // Animate counter
        animateCounter(element, parseInt(element.textContent) || 0, value);
    }
}

// Animate counter
function animateCounter(element, start, end) {
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    const current = start;
    const increment = end > start ? 1 : -1;
    
    const timer = setInterval(() => {
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
        current += increment;
    }, stepTime);
}

// Load recent activity
function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const sampleActivities = [
        {
            icon: 'fas fa-heart',
            title: 'Property Added to Wishlist',
            description: 'Luxury 3BHK Apartment in Gachibowli',
            time: '2 hours ago'
        },
        {
            icon: 'fas fa-search',
            title: 'New Search Performed',
            description: 'Searched for 2BHK in Kondapur under ₹50 Lac',
            time: '5 hours ago'
        },
        {
            icon: 'fas fa-eye',
            title: 'Property Viewed',
            description: 'Modern Villa in Jubilee Hills',
            time: '1 day ago'
        },
        {
            icon: 'fas fa-phone',
            title: 'Agent Contacted',
            description: 'Called about Independent House in Banjara Hills',
            time: '2 days ago'
        },
        {
            icon: 'fas fa-share-alt',
            title: 'Property Shared',
            description: 'Shared Premium Office Space in Hitech City',
            time: '3 days ago'
        }
    ];
    
    if (sampleActivities.length === 0) {
        activityList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clock"></i>
                <h3>No Recent Activity</h3>
                <p>Start exploring properties to see your activity here</p>
                <a href="buy.html" class="action-btn">Browse Properties</a>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = sampleActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

// Load saved properties
function loadSavedProperties() {
    const savedPropertiesGrid = document.getElementById('savedPropertiesGrid');
    if (!savedPropertiesGrid) return;
    
    const sampleSavedProperties = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: '₹1.2 Cr',
            title: 'Luxury 3BHK Apartment',
            location: 'Gachibowli, Hyderabad',
            beds: '3 Beds',
            baths: '3 Baths',
            area: '1,450 sq ft'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: '₹3.5 Cr',
            title: 'Modern Villa',
            location: 'Jubilee Hills, Hyderabad',
            beds: '4 Beds',
            baths: '4 Baths',
            area: '2,800 sq ft'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: '₹85 Lac',
            title: 'Spacious 2BHK',
            location: 'Kondapur, Hyderabad',
            beds: '2 Beds',
            baths: '2 Baths',
            area: '1,200 sq ft'
        }
    ];
    
    if (sampleSavedProperties.length === 0) {
        savedPropertiesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>No Saved Properties</h3>
                <p>Save properties you're interested in to view them here</p>
                <a href="buy.html" class="action-btn">Explore Properties</a>
            </div>
        `;
        return;
    }
    
    savedPropertiesGrid.innerHTML = sampleSavedProperties.map(property => `
        <div class="saved-property-card" onclick="viewProperty(${property.id})">
            <div class="saved-property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="saved-badge">Saved</div>
            </div>
            <div class="saved-property-info">
                <div class="saved-property-price">${property.price}</div>
                <h4 class="saved-property-title">${property.title}</h4>
                <p class="saved-property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="saved-property-details">
                    <span>${property.beds}</span>
                    <span>${property.baths}</span>
                    <span>${property.area}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load recommendations
function loadRecommendations() {
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    if (!recommendationsGrid) return;
    
    const sampleRecommendations = [
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: '₹1.8 Cr',
            title: 'Premium 4BHK Apartment',
            location: 'Madhapur, Hyderabad',
            beds: '4 Beds',
            baths: '3 Baths',
            area: '2,100 sq ft'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: '₹2.2 Cr',
            title: 'Luxury Villa',
            location: 'Miyapur, Hyderabad',
            beds: '4 Beds',
            baths: '4 Baths',
            area: '2,650 sq ft'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: '₹4.5 Cr',
            title: 'Independent House',
            location: 'Banjara Hills, Hyderabad',
            beds: '5 Beds',
            baths: '4 Baths',
            area: '3,500 sq ft'
        }
    ];
    
    recommendationsGrid.innerHTML = sampleRecommendations.map(property => `
        <div class="saved-property-card" onclick="viewProperty(${property.id})">
            <div class="saved-property-image">
                <img src="${property.image}" alt="${property.title}">
            </div>
            <div class="saved-property-info">
                <div class="saved-property-price">${property.price}</div>
                <h4 class="saved-property-title">${property.title}</h4>
                <p class="saved-property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="saved-property-details">
                    <span>${property.beds}</span>
                    <span>${property.baths}</span>
                    <span>${property.area}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update stats with random data
function updateStats() {
    // Simulate loading stats from API
    setTimeout(() => {
        const wishlistCount = Math.floor(Math.random() * 20) + 5;
        const searchCount = Math.floor(Math.random() * 30) + 10;
        const viewedCount = Math.floor(Math.random() * 50) + 25;
        
        updateStatCard('wishlistCount', wishlistCount);
        updateStatCard('searchCount', searchCount);
        updateStatCard('viewedCount', viewedCount);
    }, 1000);
}

// View property function
function viewProperty(propertyId) {
    console.log('Viewing property:', propertyId);
    // In a real app, this would navigate to the property detail page
    if (window.HyderabadInfraAuth) {
        window.HyderabadInfraAuth.showNotification('Loading property details...', 'info');
    }
    
    setTimeout(() => {
        window.location.href = 'property-detail.html';
    }, 1000);
}

// Check authentication state (using function from auth.js)
function checkAuthState() {
    const userData = localStorage.getItem('hyderabadinfra_user');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            return user;
        } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('hyderabadinfra_user');
            return null;
        }
    }
    
    return null;
}

// Global logout function
function logout() {
    if (window.HyderabadInfraAuth && window.HyderabadInfraAuth.logout) {
        window.HyderabadInfraAuth.logout();
    } else {
        // Fallback logout
        localStorage.removeItem('hyderabadinfra_user');
        window.location.href = '../index.html';
    }
}

// Handle navigation for authenticated users
function initializeAuthenticatedNavigation() {
    // Update navigation links to show authenticated state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add any authenticated user specific navigation logic here
        });
    });
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthenticatedNavigation();
    
    // Handle view all buttons
    const viewAllButtons = document.querySelectorAll('.view-all-btn');
    viewAllButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('section');
            const sectionClass = section.className;
            
            if (sectionClass.includes('activity')) {
                console.log('View all activity');
            } else if (sectionClass.includes('saved')) {
                console.log('View all saved properties');
            } else if (sectionClass.includes('recommendations')) {
                console.log('View all recommendations');
            }
        });
    });
    
    // Handle quick action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
});

// Utility function to show notifications (if auth.js is not loaded)
function showNotification(message, type = 'info') {
    if (window.HyderabadInfraAuth && window.HyderabadInfraAuth.showNotification) {
        window.HyderabadInfraAuth.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-size: 0.875rem;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}