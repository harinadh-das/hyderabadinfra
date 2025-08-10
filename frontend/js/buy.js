// Buy page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializePropertyGrid();
    initializePagination();
    initializeRangeSliders();
    initializeBHKButtons();
    generatePropertyCards();
});

// Sample property data for demonstration
const sampleProperties = [
    {
        id: 1,
        title: "Luxury 3BHK Apartment in Gachibowli",
        location: "Gachibowli, Hyderabad",
        price: 12000000,
        beds: 3,
        baths: 3,
        area: 1450,
        type: "apartment",
        amenities: ["Parking", "Gym", "Security"],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "featured",
        age: "2 years old"
    },
    {
        id: 2,
        title: "Modern Villa in Jubilee Hills",
        location: "Jubilee Hills, Hyderabad",
        price: 35000000,
        beds: 4,
        baths: 4,
        area: 2800,
        type: "villa",
        amenities: ["Pool", "Garden", "Parking"],
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "new",
        age: "Under construction"
    },
    {
        id: 3,
        title: "Spacious 2BHK in Kondapur",
        location: "Kondapur, Hyderabad",
        price: 8500000,
        beds: 2,
        baths: 2,
        area: 1200,
        type: "apartment",
        amenities: ["Lift", "Security", "Parking"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "hot",
        age: "Ready to move"
    },
    {
        id: 4,
        title: "Independent House in Banjara Hills",
        location: "Banjara Hills, Hyderabad",
        price: 45000000,
        beds: 5,
        baths: 4,
        area: 3500,
        type: "house",
        amenities: ["Garden", "Parking", "Security"],
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "featured",
        age: "5 years old"
    },
    {
        id: 5,
        title: "Premium 4BHK Apartment in Madhapur",
        location: "Madhapur, Hyderabad",
        price: 18500000,
        beds: 4,
        baths: 3,
        area: 2100,
        type: "apartment",
        amenities: ["Gym", "Pool", "Security", "Lift"],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "new",
        age: "1 year old"
    },
    {
        id: 6,
        title: "Luxury Villa in Miyapur",
        location: "Miyapur, Hyderabad",
        price: 22000000,
        beds: 4,
        baths: 4,
        area: 2650,
        type: "villa",
        amenities: ["Pool", "Garden", "Gym", "Parking"],
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "hot",
        age: "Ready to move"
    }
];

// Initialize filter functionality
function initializeFilters() {
    const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const sortSelect = document.querySelector('.sort-select');
    
    // Filter change handler with debouncing
    filterOptions.forEach(filter => {
        filter.addEventListener('change', function() {
            debouncedApplyFilters();
        });
    });
    
    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterOptions.forEach(filter => {
                filter.checked = false;
            });
            
            // Reset BHK buttons
            document.querySelectorAll('.bhk-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Reset range sliders
            const minRange = document.querySelector('.min-range');
            const maxRange = document.querySelector('.max-range');
            if (minRange) minRange.value = 50;
            if (maxRange) maxRange.value = 200;
            updateRangeValues();
            
            debouncedApplyFilters();
        });
    }
    
    // Sort change handler
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProperties(this.value);
        });
    }
}

// Apply filters to property listings
function applyFilters() {
    const locationFilters = getCheckedValues('input[value="gachibowli"], input[value="kondapur"], input[value="jubilee-hills"], input[value="banjara-hills"], input[value="miyapur"], input[value="madhapur"]');
    const typeFilters = getCheckedValues('input[value="apartment"], input[value="villa"], input[value="house"], input[value="plot"]');
    const amenityFilters = getCheckedValues('input[value="parking"], input[value="gym"], input[value="pool"], input[value="security"], input[value="lift"]');
    const activeBHK = document.querySelector('.bhk-btn.active')?.dataset.value;
    
    // Get budget range from sliders
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    const minBudget = minRange ? parseInt(minRange.value) * 100000 : 0; // Convert to actual price
    const maxBudget = maxRange ? parseInt(maxRange.value) * 100000 : 100000000;
    
    let filteredProperties = sampleProperties.filter(property => {
        // Budget filter
        if (property.price < minBudget || property.price > maxBudget) {
            return false;
        }
        
        // Location filter
        if (locationFilters.length > 0) {
            const locationMatch = locationFilters.some(location => 
                property.location.toLowerCase().includes(location.replace('-', ' '))
            );
            if (!locationMatch) return false;
        }
        
        // Type filter
        if (typeFilters.length > 0) {
            if (!typeFilters.includes(property.type)) return false;
        }
        
        // BHK filter
        if (activeBHK) {
            if (activeBHK === '4+') {
                if (property.beds < 4) return false;
            } else {
                if (property.beds !== parseInt(activeBHK)) return false;
            }
        }
        
        // Amenity filter
        if (amenityFilters.length > 0) {
            const hasAmenities = amenityFilters.every(amenity => 
                property.amenities.some(propAmenity => 
                    propAmenity.toLowerCase().includes(amenity)
                )
            );
            if (!hasAmenities) return false;
        }
        
        return true;
    });
    
    renderProperties(filteredProperties);
    updateResultsCount(filteredProperties.length);
    
    // Show "no results" message if no properties found
    if (filteredProperties.length === 0) {
        showNoResults();
    }
}

// Get checked filter values
function getCheckedValues(selector) {
    const checkedInputs = document.querySelectorAll(selector + ':checked');
    return Array.from(checkedInputs).map(input => input.value);
}

// Initialize BHK buttons
function initializeBHKButtons() {
    const bhkButtons = document.querySelectorAll('.bhk-btn');
    
    bhkButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            bhkButtons.forEach(btn => btn.classList.remove('active'));
            
            // Toggle active class on clicked button
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
            
            debouncedApplyFilters();
        });
    });
}

// Initialize range sliders
function initializeRangeSliders() {
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    
    if (minRange && maxRange) {
        minRange.addEventListener('input', function() {
            if (parseInt(this.value) > parseInt(maxRange.value)) {
                this.value = maxRange.value;
            }
            updateRangeValues();
            debouncedApplyFilters();
        });
        
        maxRange.addEventListener('input', function() {
            if (parseInt(this.value) < parseInt(minRange.value)) {
                this.value = minRange.value;
            }
            updateRangeValues();
            debouncedApplyFilters();
        });
        
        // Initial update
        updateRangeValues();
    }
}

// Update range slider display values
function updateRangeValues() {
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    const minValue = document.querySelector('.min-value');
    const maxValue = document.querySelector('.max-value');
    
    if (minRange && maxRange && minValue && maxValue) {
        const min = parseInt(minRange.value);
        const max = parseInt(maxRange.value);
        
        minValue.textContent = min < 100 ? `₹${min} Lac` : `₹${(min/100).toFixed(1)} Cr`;
        maxValue.textContent = max < 100 ? `₹${max} Lac` : `₹${(max/100).toFixed(1)} Cr`;
    }
}

// Generate property cards
function generatePropertyCards() {
    // Get user-posted properties from localStorage
    const userProperties = JSON.parse(localStorage.getItem('hyderabadinfra_properties') || '[]');
    
    // Convert user properties to display format
    const formattedUserProperties = userProperties.map(prop => ({
        id: prop.id,
        title: `${prop.bhk || ''} ${prop.propertyType || 'Property'} in ${prop.location || 'Hyderabad'}`,
        location: prop.location || 'Hyderabad',
        price: parseFloat(prop.price) * (prop.priceUnit === 'lac' ? 100000 : prop.priceUnit === 'crore' ? 10000000 : 1000) || 0,
        beds: prop.bhk ? parseInt(prop.bhk) : 2,
        baths: prop.bhk ? parseInt(prop.bhk) : 2,
        area: parseInt(prop.area) || 1000,
        type: prop.propertyType || 'apartment',
        amenities: Array.isArray(prop.amenities) ? prop.amenities : [],
        image: prop.images && prop.images.length > 0 ? prop.images[0] : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badge: "your-property",
        age: "Recently posted",
        description: prop.description || '',
        postedBy: prop.postedBy || 'You',
        postedDate: prop.postedDate,
        features: prop.features || [],
        ownerName: prop.ownerName || '',
        mobile: prop.mobile || '',
        listingType: prop.listingType || 'sell'
    }));
    
    // Combine user properties with sample properties
    const allProperties = [...formattedUserProperties, ...sampleProperties];
    
    renderProperties(allProperties);
    updateResultsCount(allProperties.length);
}

// Render properties in grid
function renderProperties(properties) {
    const propertiesGrid = document.getElementById('propertiesGrid');
    
    if (!propertiesGrid) return;
    
    propertiesGrid.innerHTML = properties.map(property => `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-badges">
                    <span class="badge ${property.badge}">${property.badge}</span>
                </div>
                <div class="property-actions">
                    <button class="action-btn" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="action-btn" title="View Photos">
                        <i class="fas fa-images"></i>
                    </button>
                </div>
            </div>
            <div class="property-info">
                <div class="property-price">${formatPrice(property.price)}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-details">
                    <span class="detail-item">
                        <i class="fas fa-bed"></i>
                        ${property.beds} Beds
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-bath"></i>
                        ${property.baths} Baths
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        ${formatArea(property.area)}
                    </span>
                </div>
                <div class="property-amenities">
                    ${property.amenities.slice(0, 3).map(amenity => `
                        <span class="amenity-tag">${amenity}</span>
                    `).join('')}
                </div>
                <div class="property-footer">
                    <button class="contact-agent">Contact Agent</button>
                    <span class="property-age">${property.age}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to property cards
    propertiesGrid.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn') && !e.target.closest('.contact-agent')) {
                const propertyId = parseInt(this.dataset.id);
                const property = properties.find(p => p.id === propertyId);
                if (property) {
                    showPropertyDetailModal(property);
                }
            }
        });
    });
    
    // Add handlers for action buttons
    propertiesGrid.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-heart')) {
                // Toggle wishlist
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
                this.classList.toggle('active');
            } else if (icon.classList.contains('fa-share-alt')) {
                // Share functionality
                console.log('Share property');
            } else if (icon.classList.contains('fa-images')) {
                // View photos
                console.log('View property photos');
            }
        });
    });
}

// Initialize property grid
function initializePropertyGrid() {
    // Add any additional grid functionality here
}

// Sort properties
function sortProperties(sortBy) {
    let sortedProperties = [...sampleProperties];
    
    switch(sortBy) {
        case 'price-low':
            sortedProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProperties.sort((a, b) => b.price - a.price);
            break;
        case 'area-low':
            sortedProperties.sort((a, b) => a.area - b.area);
            break;
        case 'area-high':
            sortedProperties.sort((a, b) => b.area - a.area);
            break;
        case 'newest':
            // Sort by ID (assuming higher ID = newer)
            sortedProperties.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original order for relevance
            break;
    }
    
    renderProperties(sortedProperties);
}

// Update results count
function updateResultsCount(count) {
    const resultsInfo = document.querySelector('.results-info h2');
    if (resultsInfo) {
        resultsInfo.textContent = `${count.toLocaleString()} Properties for Sale in Hyderabad`;
    }
}

// Initialize pagination
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update prev/next button states
                const pageNum = parseInt(this.textContent);
                if (prevBtn) prevBtn.disabled = pageNum === 1;
                if (nextBtn) nextBtn.disabled = pageNum === 25;
                
                // Scroll to top of listings
                document.querySelector('.listings-content').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            const prevPage = activePage.previousElementSibling;
            if (prevPage && prevPage.classList.contains('page-btn')) {
                prevPage.click();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            const nextPage = activePage.nextElementSibling;
            if (nextPage && nextPage.classList.contains('page-btn')) {
                nextPage.click();
            }
        });
    }
}

// Utility functions (already defined in script.js, but including for completeness)
function formatPrice(price) {
    if (price >= 10000000) {
        return '₹' + (price / 10000000).toFixed(1) + ' Cr';
    } else if (price >= 100000) {
        return '₹' + (price / 100000).toFixed(0) + ' Lac';
    } else {
        return '₹' + price.toLocaleString();
    }
}

function formatArea(area) {
    return area.toLocaleString() + ' sq ft';
}

// Show no results message
function showNoResults() {
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>No Properties Found</h3>
                    <p>Try adjusting your filters to see more properties.</p>
                    <button class="clear-all-btn" onclick="clearAllFilters()">Clear All Filters</button>
                </div>
            </div>
        `;
    }
}

// Clear all filters function
function clearAllFilters() {
    // Clear checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear BHK selection
    document.querySelectorAll('.bhk-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset range sliders
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    if (minRange) minRange.value = 50;
    if (maxRange) maxRange.value = 200;
    updateRangeValues();
    
    // Reset area inputs
    document.querySelectorAll('.area-input').forEach(input => {
        input.value = '';
    });
    
    // Apply filters to show all properties
    applyFilters();
}

// Add loading state to search
function showLoading() {
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Searching properties...</p>
            </div>
        `;
    }
}

// Add debounced filter application for better performance
let filterTimeout;
function debouncedApplyFilters() {
    clearTimeout(filterTimeout);
    showLoading();
    filterTimeout = setTimeout(() => {
        applyFilters();
    }, 300);
}

// Show property detail modal
function showPropertyDetailModal(property) {
    const modal = document.createElement('div');
    modal.className = 'property-modal-overlay';
    modal.innerHTML = `
        <div class="property-modal">
            <div class="modal-header">
                <h2>${property.title}</h2>
                <button class="modal-close" onclick="this.closest('.property-modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="modal-left">
                    <div class="property-image-gallery">
                        <img src="${property.image}" alt="${property.title}" class="main-image">
                        ${property.images ? property.images.slice(0, 3).map((img, index) => `
                            <img src="${img}" alt="Property ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                                onclick="document.querySelector('.main-image').src = this.src; 
                                        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active')); 
                                        this.classList.add('active');">
                        `).join('') : ''}
                    </div>
                    
                    <div class="property-description">
                        <h3>Description</h3>
                        <p>${property.description || 'Beautiful property in a prime location.'}</p>
                    </div>
                    
                    <div class="property-features">
                        <h3>Features</h3>
                        <div class="features-list">
                            ${property.features && property.features.length > 0 ? 
                                property.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('') :
                                `<span class="feature-tag">${property.beds} Bedroom</span>
                                 <span class="feature-tag">${property.baths} Bathroom</span>
                                 <span class="feature-tag">${formatArea(property.area)}</span>`
                            }
                        </div>
                    </div>
                    
                    <div class="property-amenities-full">
                        <h3>Amenities</h3>
                        <div class="amenities-grid">
                            ${property.amenities && property.amenities.length > 0 ? 
                                property.amenities.map(amenity => `<div class="amenity-item"><i class="fas fa-check"></i> ${amenity}</div>`).join('') :
                                `<div class="amenity-item"><i class="fas fa-check"></i> Security</div>
                                 <div class="amenity-item"><i class="fas fa-check"></i> Parking</div>
                                 <div class="amenity-item"><i class="fas fa-check"></i> Water Supply</div>`
                            }
                        </div>
                    </div>
                </div>
                
                <div class="modal-right">
                    <div class="price-section">
                        <div class="property-price-large">${formatPrice(property.price)}</div>
                        <div class="property-type">${property.type} • ${property.listingType === 'rent' ? 'For Rent' : 'For Sale'}</div>
                    </div>
                    
                    <div class="property-stats">
                        <div class="stat">
                            <i class="fas fa-bed"></i>
                            <span>${property.beds} Bedrooms</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-bath"></i>
                            <span>${property.baths} Bathrooms</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${formatArea(property.area)}</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${property.location}</span>
                        </div>
                    </div>
                    
                    <div class="contact-section">
                        <h3>Contact Owner</h3>
                        <div class="owner-info">
                            <div class="owner-name">
                                <i class="fas fa-user"></i>
                                <span>${property.ownerName || property.postedBy || 'Property Owner'}</span>
                            </div>
                            ${property.mobile ? `
                                <div class="owner-contact">
                                    <i class="fas fa-phone"></i>
                                    <span>${property.mobile}</span>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="contact-buttons">
                            <button class="btn-primary" onclick="callOwner('${property.mobile || '+91 9876543210'}')">
                                <i class="fas fa-phone"></i> Call Now
                            </button>
                            <button class="btn-secondary" onclick="showInterestForm(${property.id})">
                                <i class="fas fa-heart"></i> Show Interest
                            </button>
                        </div>
                    </div>
                    
                    <div class="property-meta">
                        <div class="posted-date">
                            <i class="fas fa-calendar"></i>
                            Posted: ${property.postedDate ? new Date(property.postedDate).toLocaleDateString() : property.age}
                        </div>
                        <div class="property-id">
                            <i class="fas fa-tag"></i>
                            Property ID: #${property.id}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
}

// Call owner function
function callOwner(phone) {
    window.location.href = `tel:${phone}`;
}

// Show interest form
function showInterestForm(propertyId) {
    alert(`Interest shown for property #${propertyId}! The owner will be notified.`);
}