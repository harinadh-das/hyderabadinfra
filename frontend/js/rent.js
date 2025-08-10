// Rent page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeRentFilters();
    initializeRentPropertyGrid();
    initializeRentPagination();
    initializeRentRangeSliders();
    initializeRentBHKButtons();
    generateRentPropertyCards();
});

// Sample rental property data
const sampleRentProperties = [
    {
        id: 1,
        title: "Spacious 2BHK Apartment in Gachibowli",
        location: "Gachibowli, Hyderabad",
        rent: 35000,
        deposit: 70000,
        beds: 2,
        baths: 2,
        area: 1200,
        type: "apartment",
        furnishing: "semi-furnished",
        amenities: ["Parking", "Gym", "Security", "Lift"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "featured",
        availability: "Immediate"
    },
    {
        id: 2,
        title: "Luxury 3BHK Villa in Jubilee Hills",
        location: "Jubilee Hills, Hyderabad",
        rent: 85000,
        deposit: 170000,
        beds: 3,
        baths: 3,
        area: 2400,
        type: "villa",
        furnishing: "furnished",
        amenities: ["Pool", "Garden", "Parking", "Security"],
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "new",
        availability: "From 15th Jan"
    },
    {
        id: 3,
        title: "Modern 1BHK in Kondapur",
        location: "Kondapur, Hyderabad",
        rent: 18000,
        deposit: 36000,
        beds: 1,
        baths: 1,
        area: 650,
        type: "apartment",
        furnishing: "furnished",
        amenities: ["Lift", "Security", "Parking"],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "hot",
        availability: "Immediate"
    },
    {
        id: 4,
        title: "Independent House in Banjara Hills",
        location: "Banjara Hills, Hyderabad",
        rent: 120000,
        deposit: 240000,
        beds: 4,
        baths: 3,
        area: 3000,
        type: "house",
        furnishing: "semi-furnished",
        amenities: ["Garden", "Parking", "Security"],
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "featured",
        availability: "From 1st Feb"
    },
    {
        id: 5,
        title: "Premium 2BHK Apartment in Madhapur",
        location: "Madhapur, Hyderabad",
        rent: 42000,
        deposit: 84000,
        beds: 2,
        baths: 2,
        area: 1350,
        type: "apartment",
        furnishing: "furnished",
        amenities: ["Gym", "Pool", "Security", "Lift"],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "new",
        availability: "Immediate"
    },
    {
        id: 6,
        title: "Cozy 1BHK in Miyapur",
        location: "Miyapur, Hyderabad",
        rent: 15000,
        deposit: 30000,
        beds: 1,
        baths: 1,
        area: 580,
        type: "apartment",
        furnishing: "unfurnished",
        amenities: ["Security", "Parking"],
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "hot",
        availability: "Immediate"
    },
    {
        id: 7,
        title: "Serviced Apartment in Gachibowli",
        location: "Gachibowli, Hyderabad",
        rent: 55000,
        deposit: 55000,
        beds: 2,
        baths: 2,
        area: 1100,
        type: "apartment",
        furnishing: "furnished",
        amenities: ["Gym", "Pool", "Housekeeping", "Security"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "featured",
        availability: "Immediate"
    },
    {
        id: 8,
        title: "PG for Working Professionals",
        location: "Kondapur, Hyderabad",
        rent: 8500,
        deposit: 8500,
        beds: 1,
        baths: 1,
        area: 200,
        type: "pg",
        furnishing: "furnished",
        amenities: ["Food", "WiFi", "Laundry", "Security"],
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "new",
        availability: "Immediate"
    }
];

// Initialize filter functionality for rent
function initializeRentFilters() {
    const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const sortSelect = document.querySelector('.sort-select');
    
    filterOptions.forEach(filter => {
        filter.addEventListener('change', function() {
            applyRentFilters();
        });
    });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterOptions.forEach(filter => {
                filter.checked = false;
            });
            
            document.querySelectorAll('.bhk-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const minRange = document.querySelector('.min-range');
            const maxRange = document.querySelector('.max-range');
            if (minRange) minRange.value = 10;
            if (maxRange) maxRange.value = 50;
            updateRentRangeValues();
            
            applyRentFilters();
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortRentProperties(this.value);
        });
    }
}

// Apply filters to rental property listings
function applyRentFilters() {
    const locationFilters = getCheckedValues('input[value="gachibowli"], input[value="kondapur"], input[value="jubilee-hills"], input[value="banjara-hills"], input[value="miyapur"], input[value="madhapur"]');
    const typeFilters = getCheckedValues('input[value="apartment"], input[value="villa"], input[value="house"], input[value="pg"]');
    const furnishingFilters = getCheckedValues('input[value="furnished"], input[value="semi-furnished"], input[value="unfurnished"]');
    const amenityFilters = getCheckedValues('input[value="parking"], input[value="gym"], input[value="pool"], input[value="security"], input[value="lift"]');
    const activeBHK = document.querySelector('.bhk-btn.active')?.dataset.value;
    
    // Get rent range values
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    const minRent = minRange ? parseInt(minRange.value) * 1000 : 5000;
    const maxRent = maxRange ? parseInt(maxRange.value) * 1000 : 150000;
    
    let filteredProperties = sampleRentProperties.filter(property => {
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
        
        // Furnishing filter
        if (furnishingFilters.length > 0) {
            if (!furnishingFilters.includes(property.furnishing)) return false;
        }
        
        // Rent range filter
        if (property.rent < minRent || property.rent > maxRent) return false;
        
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
    
    renderRentProperties(filteredProperties);
    updateRentResultsCount(filteredProperties.length);
}

// Get checked filter values
function getCheckedValues(selector) {
    const checkedInputs = document.querySelectorAll(selector + ':checked');
    return Array.from(checkedInputs).map(input => input.value);
}

// Initialize BHK buttons for rent
function initializeRentBHKButtons() {
    const bhkButtons = document.querySelectorAll('.bhk-btn');
    
    bhkButtons.forEach(button => {
        button.addEventListener('click', function() {
            bhkButtons.forEach(btn => btn.classList.remove('active'));
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
            
            applyRentFilters();
        });
    });
}

// Initialize range sliders for rent
function initializeRentRangeSliders() {
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    
    if (minRange && maxRange) {
        minRange.addEventListener('input', function() {
            if (parseInt(this.value) > parseInt(maxRange.value)) {
                this.value = maxRange.value;
            }
            updateRentRangeValues();
            applyRentFilters();
        });
        
        maxRange.addEventListener('input', function() {
            if (parseInt(this.value) < parseInt(minRange.value)) {
                this.value = minRange.value;
            }
            updateRentRangeValues();
            applyRentFilters();
        });
        
        updateRentRangeValues();
    }
}

// Update range slider display values for rent
function updateRentRangeValues() {
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    const minValue = document.querySelector('.min-value');
    const maxValue = document.querySelector('.max-value');
    
    if (minRange && maxRange && minValue && maxValue) {
        const min = parseInt(minRange.value);
        const max = parseInt(maxRange.value);
        
        minValue.textContent = min < 100 ? `₹${min}K` : `₹${(min/100).toFixed(1)}L`;
        maxValue.textContent = max < 100 ? `₹${max}K` : `₹${(max/100).toFixed(1)}L`;
    }
}

// Generate rental property cards
function generateRentPropertyCards() {
    renderRentProperties(sampleRentProperties);
    updateRentResultsCount(sampleRentProperties.length);
}

// Render rental properties in grid
function renderRentProperties(properties) {
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
                <div class="property-price">₹${(property.rent/1000)}K/month</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-details">
                    <span class="detail-item">
                        <i class="fas fa-bed"></i>
                        ${property.beds} Bed${property.beds > 1 ? 's' : ''}
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-bath"></i>
                        ${property.baths} Bath${property.baths > 1 ? 's' : ''}
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        ${formatArea(property.area)}
                    </span>
                </div>
                <div class="rent-details">
                    <div class="rent-info">
                        <span class="deposit-info">
                            <i class="fas fa-money-bill-wave"></i>
                            Deposit: ₹${(property.deposit/1000)}K
                        </span>
                        <span class="furnishing-info">
                            <i class="fas fa-couch"></i>
                            ${property.furnishing.charAt(0).toUpperCase() + property.furnishing.slice(1).replace('-', ' ')}
                        </span>
                    </div>
                </div>
                <div class="property-amenities">
                    ${property.amenities.slice(0, 3).map(amenity => `
                        <span class="amenity-tag">${amenity}</span>
                    `).join('')}
                </div>
                <div class="property-footer">
                    <button class="contact-agent">Contact Owner</button>
                    <span class="property-age">${property.availability}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    propertiesGrid.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn') && !e.target.closest('.contact-agent')) {
                const propertyId = this.dataset.id;
                console.log('View rental property details for ID:', propertyId);
            }
        });
    });
    
    // Add handlers for action buttons
    propertiesGrid.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-heart')) {
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
                this.classList.toggle('active');
            }
        });
    });
}

// Initialize property grid for rent
function initializeRentPropertyGrid() {
    // Additional grid functionality specific to rent
}

// Sort rental properties
function sortRentProperties(sortBy) {
    let sortedProperties = [...sampleRentProperties];
    
    switch(sortBy) {
        case 'price-low':
            sortedProperties.sort((a, b) => a.rent - b.rent);
            break;
        case 'price-high':
            sortedProperties.sort((a, b) => b.rent - a.rent);
            break;
        case 'area-low':
            sortedProperties.sort((a, b) => a.area - b.area);
            break;
        case 'area-high':
            sortedProperties.sort((a, b) => b.area - a.area);
            break;
        case 'newest':
            sortedProperties.sort((a, b) => b.id - a.id);
            break;
        default:
            break;
    }
    
    renderRentProperties(sortedProperties);
}

// Update results count for rent
function updateRentResultsCount(count) {
    const resultsInfo = document.getElementById('resultsCount');
    if (resultsInfo) {
        resultsInfo.textContent = `${count.toLocaleString()} Properties for Rent in Hyderabad`;
    }
}

// Initialize pagination for rent
function initializeRentPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const pageNum = parseInt(this.textContent);
                if (prevBtn) prevBtn.disabled = pageNum === 1;
                if (nextBtn) nextBtn.disabled = pageNum === 18;
                
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

// Format area (reusing from main script)
function formatArea(area) {
    return area.toLocaleString() + ' sq ft';
}

// Add CSS for rent-specific elements
const rentStyles = `
.rent-details {
    margin-bottom: 1rem;
}

.rent-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.deposit-info,
.furnishing-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
}

.deposit-info i,
.furnishing-info i {
    font-size: 0.75rem;
    color: #9ca3af;
}

.contact-agent {
    background: #10b981;
}

.contact-agent:hover {
    background: #059669;
}
`;

// Inject rent-specific styles
const rentStyleSheet = document.createElement('style');
rentStyleSheet.textContent = rentStyles;
document.head.appendChild(rentStyleSheet);