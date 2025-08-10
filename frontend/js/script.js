// Main JavaScript functionality for HyderabadInfra.com

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeSearchTabs();
    initializeDropdowns();
    initializeLocationSearch();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeAuthenticatedNavigation();
    initializeAreaFilters();
    initializeLocationHover();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Search tabs functionality
function initializeSearchTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchForm = document.querySelector('.search-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update search form based on selected tab
            const selectedTab = this.dataset.tab;
            updateSearchForm(selectedTab);
            
            // Add a subtle animation to show the change
            if (searchForm) {
                searchForm.style.transform = 'scale(0.98)';
                searchForm.style.opacity = '0.7';
                setTimeout(() => {
                    searchForm.style.transform = 'scale(1)';
                    searchForm.style.opacity = '1';
                }, 150);
            }
        });
    });
}

// Update search form based on selected tab
function updateSearchForm(tabType) {
    const budgetField = document.querySelector('.budget-field .dropdown-btn span');
    const propertyTypeField = document.querySelector('.property-type-field .dropdown-btn span');
    const propertyTypeDropdown = document.querySelector('.property-type-field .dropdown-menu');
    const budgetDropdown = document.querySelector('.budget-field .dropdown-menu');
    
    // Update property type dropdown options and default selection
    if (propertyTypeDropdown && propertyTypeField) {
        switch(tabType) {
            case 'buy':
                propertyTypeField.textContent = 'Residential';
                propertyTypeDropdown.innerHTML = `
                    <div class="dropdown-item" data-value="residential"><i class="fas fa-home"></i> Residential</div>
                    <div class="dropdown-item" data-value="apartment"><i class="fas fa-building"></i> Apartment</div>
                    <div class="dropdown-item" data-value="villa"><i class="fas fa-home"></i> Villa</div>
                    <div class="dropdown-item" data-value="house"><i class="fas fa-home"></i> Independent House</div>
                    <div class="dropdown-item" data-value="plot"><i class="fas fa-map"></i> Plot/Land</div>
                `;
                break;
            case 'rent':
                propertyTypeField.textContent = 'Apartment';
                propertyTypeDropdown.innerHTML = `
                    <div class="dropdown-item" data-value="apartment"><i class="fas fa-building"></i> Apartment</div>
                    <div class="dropdown-item" data-value="villa"><i class="fas fa-home"></i> Villa</div>
                    <div class="dropdown-item" data-value="house"><i class="fas fa-home"></i> Independent House</div>
                    <div class="dropdown-item" data-value="pg"><i class="fas fa-bed"></i> PG/Hostel</div>
                    <div class="dropdown-item" data-value="office"><i class="fas fa-briefcase"></i> Office Space</div>
                `;
                break;
            case 'sell':
                propertyTypeField.textContent = 'Residential';
                propertyTypeDropdown.innerHTML = `
                    <div class="dropdown-item" data-value="residential"><i class="fas fa-home"></i> Residential</div>
                    <div class="dropdown-item" data-value="apartment"><i class="fas fa-building"></i> Apartment</div>
                    <div class="dropdown-item" data-value="villa"><i class="fas fa-home"></i> Villa</div>
                    <div class="dropdown-item" data-value="house"><i class="fas fa-home"></i> Independent House</div>
                    <div class="dropdown-item" data-value="plot"><i class="fas fa-map"></i> Plot/Land</div>
                    <div class="dropdown-item" data-value="commercial"><i class="fas fa-briefcase"></i> Commercial</div>
                `;
                break;
        }
        
        // Re-initialize dropdown functionality for updated options
        initializeUpdatedDropdown(propertyTypeDropdown);
    }
    
    // Update budget dropdown options and default selection
    if (budgetDropdown && budgetField) {
        switch(tabType) {
            case 'buy':
                budgetField.textContent = '₹50 Lac - ₹1 Cr';
                budgetDropdown.innerHTML = `
                    <div class="dropdown-item" data-value="under-50">Under ₹50 Lac</div>
                    <div class="dropdown-item" data-value="50-100">₹50 Lac - ₹1 Cr</div>
                    <div class="dropdown-item" data-value="100-200">₹1 Cr - ₹2 Cr</div>
                    <div class="dropdown-item" data-value="200-500">₹2 Cr - ₹5 Cr</div>
                    <div class="dropdown-item" data-value="above-500">Above ₹5 Cr</div>
                `;
                break;
            case 'rent':
                budgetField.textContent = '₹10K - ₹50K';
                budgetDropdown.innerHTML = `
                    <div class="dropdown-item" data-value="under-10">Under ₹10K</div>
                    <div class="dropdown-item" data-value="10-25">₹10K - ₹25K</div>
                    <div class="dropdown-item" data-value="25-50">₹25K - ₹50K</div>
                    <div class="dropdown-item" data-value="50-100">₹50K - ₹1L</div>
                    <div class="dropdown-item" data-value="above-100">Above ₹1L</div>
                `;
                break;
            case 'sell':
                budgetField.textContent = '₹50 Lac - ₹1 Cr';
                budgetDropdown.innerHTML = `
                    <div class="dropdown-item" data-value="under-50">Under ₹50 Lac</div>
                    <div class="dropdown-item" data-value="50-100">₹50 Lac - ₹1 Cr</div>
                    <div class="dropdown-item" data-value="100-200">₹1 Cr - ₹2 Cr</div>
                    <div class="dropdown-item" data-value="200-500">₹2 Cr - ₹5 Cr</div>
                    <div class="dropdown-item" data-value="above-500">Above ₹5 Cr</div>
                `;
                break;
        }
        
        // Re-initialize dropdown functionality for updated options
        initializeUpdatedDropdown(budgetDropdown);
    }
}

// Initialize dropdown functionality for dynamically updated dropdowns
function initializeUpdatedDropdown(dropdownMenu) {
    const dropdown = dropdownMenu.closest('.dropdown');
    const button = dropdown.querySelector('.dropdown-btn');
    const items = dropdownMenu.querySelectorAll('.dropdown-item');
    
    // Remove old event listeners and add new ones
    items.forEach(item => {
        // Create a new event listener
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        newItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const span = button.querySelector('span');
            if (span) {
                span.textContent = this.textContent.trim();
            }
            
            // Store selected value
            button.dataset.value = this.dataset.value || this.textContent.trim();
            
            // Close dropdown with animation
            dropdownMenu.classList.remove('dropdown-menu-visible');
            dropdownMenu.classList.add('dropdown-menu-hidden');
            setTimeout(() => {
                dropdownMenu.style.display = 'none';
            }, 200);
            
            // Add selected state
            dropdownMenu.querySelectorAll('.dropdown-item').forEach(otherItem => otherItem.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Dropdown functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        if (button && menu) {
            // Make sure menu is initially hidden
            menu.style.display = 'none';
            menu.classList.add('dropdown-menu-hidden');
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.display = 'none';
                        otherMenu.classList.add('dropdown-menu-hidden');
                        otherMenu.classList.remove('dropdown-menu-visible');
                    }
                });
                
                // Toggle current dropdown with smooth animation
                const isVisible = menu.style.display === 'block';
                if (isVisible) {
                    menu.classList.remove('dropdown-menu-visible');
                    menu.classList.add('dropdown-menu-hidden');
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 200);
                } else {
                    menu.style.display = 'block';
                    menu.classList.remove('dropdown-menu-hidden');
                    menu.classList.add('dropdown-menu-visible');
                }
            });
            
            // Handle item selection
            items.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const span = button.querySelector('span');
                    if (span) {
                        span.textContent = this.textContent.trim();
                    }
                    
                    // Store selected value
                    button.dataset.value = this.dataset.value || this.textContent.trim();
                    
                    // Close dropdown with animation
                    menu.classList.remove('dropdown-menu-visible');
                    menu.classList.add('dropdown-menu-hidden');
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 200);
                    
                    // Add selected state
                    items.forEach(otherItem => otherItem.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('dropdown-menu-visible');
                menu.classList.add('dropdown-menu-hidden');
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 200);
            });
        }
    });
}

// Location search with suggestions
function initializeLocationSearch() {
    const locationInputs = document.querySelectorAll('.location-input');
    
    const hyderabadLocations = [
        'Gachibowli', 'Kondapur', 'Jubilee Hills', 'Banjara Hills', 'Madhapur',
        'Miyapur', 'Kukatpally', 'Begumpet', 'Secunderabad', 'Hitech City',
        'Financial District', 'Kokapet', 'Nanakramguda', 'Manikonda', 'Tellapur',
        'Puppalaguda', 'Narsingi', 'Raidurg', 'Cyberabad', 'Shamshabad',
        'Ameerpet', 'Somajiguda', 'Panjagutta', 'Raj Bhavan Road', 'Lakdi Ka Pul',
        'Malakpet', 'Dilsukhnagar', 'LB Nagar', 'Uppal', 'Kompally',
        'Bachupally', 'Nizampet', 'Chandanagar', 'Lingampally', 'Tolichowki',
        'Mehdipatnam', 'Attapur', 'Rajendranagar', 'Shamsher Guda', 'Gandipet'
    ];
    
    locationInputs.forEach(locationInput => {
        const inputWrapper = locationInput.closest('.input-wrapper');
        let suggestionsDropdown = inputWrapper.querySelector('.suggestions-dropdown');
        
        // Create suggestions dropdown if it doesn't exist
        if (!suggestionsDropdown) {
            suggestionsDropdown = document.createElement('div');
            suggestionsDropdown.className = 'suggestions-dropdown';
            suggestionsDropdown.style.display = 'none';
            inputWrapper.appendChild(suggestionsDropdown);
        }
        
        locationInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length > 0) {
                const filteredLocations = hyderabadLocations.filter(location => 
                    location.toLowerCase().includes(query)
                );
                
                if (filteredLocations.length > 0) {
                    suggestionsDropdown.innerHTML = filteredLocations
                        .slice(0, 8)
                        .map(location => `
                            <div class="suggestion-item" data-location="${location}">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${location}, Hyderabad</span>
                            </div>
                        `).join('');
                    
                    suggestionsDropdown.style.display = 'block';
                    suggestionsDropdown.classList.add('suggestions-visible');
                } else {
                    suggestionsDropdown.style.display = 'none';
                    suggestionsDropdown.classList.remove('suggestions-visible');
                }
            } else {
                suggestionsDropdown.style.display = 'none';
                suggestionsDropdown.classList.remove('suggestions-visible');
            }
        });
        
        // Handle suggestion selection
        suggestionsDropdown.addEventListener('click', function(e) {
            const suggestionItem = e.target.closest('.suggestion-item');
            if (suggestionItem) {
                const location = suggestionItem.dataset.location;
                locationInput.value = location;
                suggestionsDropdown.style.display = 'none';
                suggestionsDropdown.classList.remove('suggestions-visible');
                
                // Trigger search or filter update if needed
                locationInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
        
        // Handle keyboard navigation
        locationInput.addEventListener('keydown', function(e) {
            const items = suggestionsDropdown.querySelectorAll('.suggestion-item');
            const activeItem = suggestionsDropdown.querySelector('.suggestion-item.active');
            let activeIndex = activeItem ? Array.from(items).indexOf(activeItem) : -1;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, items.length - 1);
                updateActiveItem(items, activeIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, -1);
                updateActiveItem(items, activeIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeItem) {
                    activeItem.click();
                }
            } else if (e.key === 'Escape') {
                suggestionsDropdown.style.display = 'none';
                suggestionsDropdown.classList.remove('suggestions-visible');
            }
        });
        
        function updateActiveItem(items, activeIndex) {
            items.forEach((item, index) => {
                item.classList.toggle('active', index === activeIndex);
            });
        }
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!inputWrapper.contains(e.target)) {
                suggestionsDropdown.style.display = 'none';
                suggestionsDropdown.classList.remove('suggestions-visible');
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('nav-menu-active');
            this.classList.toggle('menu-btn-active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('nav-menu-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav-menu-active');
                mobileMenuBtn.classList.remove('menu-btn-active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('nav-menu-active');
                mobileMenuBtn.classList.remove('menu-btn-active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('nav-menu-active');
                mobileMenuBtn.classList.remove('menu-btn-active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Search functionality
function performSearch() {
    const locationInput = document.querySelector('.location-input');
    const propertyType = document.querySelector('.property-type-field .dropdown-btn span');
    const budget = document.querySelector('.budget-field .dropdown-btn span');
    const activeTab = document.querySelector('.tab-btn.active');
    
    if (locationInput && locationInput.value.trim()) {
        const searchParams = {
            location: locationInput.value,
            propertyType: propertyType ? propertyType.textContent : '',
            budget: budget ? budget.textContent : '',
            searchType: activeTab ? activeTab.dataset.tab : 'buy'
        };
        
        // Show search results on the same page
        showSearchResults(searchParams);
    } else {
        // Show validation message
        showSearchMessage('Please enter a location to search');
    }
}

// Show search results function
function showSearchResults(searchParams) {
    // Create or show results section
    let resultsSection = document.getElementById('search-results-section');
    if (!resultsSection) {
        resultsSection = createSearchResultsSection();
        // Insert after hero section
        const heroSection = document.querySelector('.hero');
        heroSection.insertAdjacentElement('afterend', resultsSection);
    }
    
    // Populate results
    populateSearchResults(resultsSection, searchParams);
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Show success message
    showSearchMessage(`Found properties in ${searchParams.location} for ${searchParams.searchType}`);
}

// Create search results section
function createSearchResultsSection() {
    const section = document.createElement('section');
    section.id = 'search-results-section';
    section.className = 'search-results';
    section.style.cssText = `
        padding: 3rem 0;
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
    `;
    
    section.innerHTML = `
        <div class="container">
            <div class="results-header">
                <h2 class="section-title">Search Results</h2>
                <div class="search-filters">
                    <div class="active-filters" id="active-filters"></div>
                    <div class="refine-search">
                        <button class="refine-btn" onclick="showRefineSearch()">Refine Search</button>
                    </div>
                </div>
            </div>
            <div class="results-grid" id="results-grid">
                <!-- Results will be populated here -->
            </div>
        </div>
    `;
    
    return section;
}

// Show search message
function showSearchMessage(message) {
    // Create or update message element
    let messageEl = document.getElementById('search-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'search-message';
        messageEl.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.opacity = '1';
    messageEl.style.transform = 'translateX(0)';
    
    // Hide after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100%)';
    }, 3000);
}

// Populate search results
function populateSearchResults(section, searchParams) {
    const resultsGrid = section.querySelector('#results-grid');
    const activeFilters = section.querySelector('#active-filters');
    
    // Show active filters
    activeFilters.innerHTML = `
        <span class="filter-tag">Location: ${searchParams.location}</span>
        <span class="filter-tag">Type: ${searchParams.propertyType}</span>
        <span class="filter-tag">Budget: ${searchParams.budget}</span>
        <span class="filter-tag">Category: ${searchParams.searchType.toUpperCase()}</span>
    `;
    
    // Generate sample results based on search
    const sampleResults = generateSampleResults(searchParams);
    
    resultsGrid.innerHTML = sampleResults.map(property => `
        <div class="property-result-card" onclick="viewPropertyDetails(${property.id})">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <div class="property-badges">
                    ${property.badges.map(badge => `<span class="badge ${badge.type}">${badge.text}</span>`).join('')}
                </div>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="property-details">
                    <span class="detail-item"><i class="fas fa-bed"></i> ${property.beds} Beds</span>
                    <span class="detail-item"><i class="fas fa-bath"></i> ${property.baths} Baths</span>
                    <span class="detail-item"><i class="fas fa-ruler-combined"></i> ${property.area} sq ft</span>
                </div>
                <div class="property-pricing">
                    <div class="property-price">${property.price}</div>
                    <div class="price-per-sqft">${property.pricePerSqft} per sq ft</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate sample results
function generateSampleResults(searchParams) {
    const baseResults = [
        {
            id: 1,
            title: `Premium ${searchParams.propertyType} in ${searchParams.location}`,
            location: searchParams.location,
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            beds: 3, baths: 2, area: 1450,
            price: '₹1.2 Cr', pricePerSqft: '₹8,276',
            badges: [{type: 'featured', text: 'Featured'}, {type: 'rera', text: 'RERA'}]
        },
        {
            id: 2,
            title: `Luxury ${searchParams.propertyType} near ${searchParams.location}`,
            location: `Near ${searchParams.location}`,
            image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            beds: 2, baths: 2, area: 1200,
            price: '₹95 Lac', pricePerSqft: '₹7,916',
            badges: [{type: 'new', text: 'New Launch'}, {type: 'verified', text: 'Verified'}]
        },
        {
            id: 3,
            title: `Modern ${searchParams.propertyType} in ${searchParams.location}`,
            location: searchParams.location,
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            beds: 4, baths: 3, area: 1800,
            price: '₹1.8 Cr', pricePerSqft: '₹10,000',
            badges: [{type: 'premium', text: 'Premium'}, {type: 'ready', text: 'Ready to Move'}]
        }
    ];
    
    return baseResults;
}

// Add search button event listener
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Handle Enter key in search input
    const searchInput = document.querySelector('.location-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Utility functions
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

// Add CSS for suggestions dropdown
const suggestionStyles = `
.suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    display: none;
    max-height: 200px;
    overflow-y: auto;
}

.suggestion-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    color: #374151;
}

.suggestion-item:hover {
    background: #f3f4f6;
}

.suggestion-item:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
}

.nav-menu.active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 8px 8px;
}

.nav-menu.active .nav-list {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
}

.mobile-menu-btn.active .hamburger {
    transform: rotate(45deg);
}

.mobile-menu-btn.active .hamburger::before {
    transform: rotate(90deg);
    top: 0;
}

.mobile-menu-btn.active .hamburger::after {
    transform: rotate(90deg);
    bottom: 0;
}

.header.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .mobile-menu-btn {
        display: flex;
    }
}
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = suggestionStyles;
document.head.appendChild(styleSheet);

// Initialize authenticated navigation
function initializeAuthenticatedNavigation() {
    const user = checkAuthenticationState();
    updateNavigationForUser(user);
}

// Check authentication state
function checkAuthenticationState() {
    const userData = localStorage.getItem('hyderabadinfra_user');
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (e) {
            localStorage.removeItem('hyderabadinfra_user');
            return null;
        }
    }
    return null;
}

// Update navigation based on user state
function updateNavigationForUser(user) {
    const navList = document.querySelector('.nav-list');
    if (!navList) return;
    
    // Find existing sign in link or user menu
    let signInLink = navList.querySelector('a[href*="login.html"]');
    let userMenu = navList.querySelector('.user-menu');
    
    // Determine correct login path based on current page
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const loginPath = isInPagesFolder ? 'login.html' : 'pages/login.html';
    const dashboardPath = isInPagesFolder ? 'dashboard.html' : 'pages/dashboard.html';
    
    if (user) {
        // User is logged in - show user menu
        if (userMenu) {
            // User menu already exists, update it
            const userName = userMenu.querySelector('.user-name');
            if (userName) {
                userName.textContent = user.name || 'User';
            }
        } else if (signInLink) {
            // Replace sign in link with user menu
            const userMenuItem = createUserMenuItem(user, dashboardPath);
            signInLink.parentElement.replaceWith(userMenuItem);
        } else {
            // Add user menu if it doesn't exist
            const postFreeItem = navList.querySelector('a[href*="post-free"]')?.parentElement;
            const userMenuItem = createUserMenuItem(user, dashboardPath);
            if (postFreeItem) {
                postFreeItem.after(userMenuItem);
            } else {
                navList.appendChild(userMenuItem);
            }
        }
    } else {
        // User is not logged in
        if (userMenu) {
            // Remove user menu and add sign in link
            const signInItem = document.createElement('li');
            signInItem.className = 'nav-item';
            signInItem.innerHTML = `<a href="${loginPath}" class="nav-link">Sign In</a>`;
            userMenu.replaceWith(signInItem);
        } else if (!signInLink) {
            // Add sign in link if it doesn't exist
            const postFreeItem = navList.querySelector('a[href*="post-free"]')?.parentElement;
            const signInItem = document.createElement('li');
            signInItem.className = 'nav-item';
            signInItem.innerHTML = `<a href="${loginPath}" class="nav-link">Sign In</a>`;
            if (postFreeItem) {
                postFreeItem.after(signInItem);
            } else {
                navList.appendChild(signInItem);
            }
        }
    }
}

// Create user menu item
function createUserMenuItem(user, dashboardPath = 'pages/dashboard.html') {
    const userMenuItem = document.createElement('li');
    userMenuItem.className = 'nav-item user-menu';
    userMenuItem.innerHTML = `
        <div class="user-dropdown">
            <button class="user-btn">
                <i class="fas fa-user-circle"></i>
                <span class="user-name">${user.name || 'User'}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="user-dropdown-menu">
                <a href="${dashboardPath}" class="dropdown-item">
                    <i class="fas fa-tachometer-alt"></i>
                    Dashboard
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-user"></i>
                    Profile
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-heart"></i>
                    Wishlist
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-history"></i>
                    Search History
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-cog"></i>
                    Settings
                </a>
                <hr class="dropdown-divider">
                <button class="dropdown-item logout-btn" onclick="logoutUser()">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        </div>
    `;
    
    // Initialize dropdown functionality
    setTimeout(() => {
        console.log('Initializing user dropdown for:', user.name);
        initializeUserDropdown(userMenuItem);
    }, 100);
    
    return userMenuItem;
}

// Initialize user dropdown - Simple and reliable approach
function initializeUserDropdown(userMenuItem) {
    const userDropdown = userMenuItem.querySelector('.user-dropdown');
    const userBtn = userMenuItem.querySelector('.user-btn');
    const dropdownMenu = userMenuItem.querySelector('.user-dropdown-menu');
    
    if (userBtn && dropdownMenu && userDropdown) {
        // Prevent multiple initializations
        if (userBtn.hasAttribute('data-dropdown-initialized')) {
            return;
        }
        userBtn.setAttribute('data-dropdown-initialized', 'true');
        
        console.log('Setting up user dropdown for:', userMenuItem);
        
        // Simple click handler
        userBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('User button clicked');
            
            // Close all other dropdowns
            document.querySelectorAll('.user-dropdown.show').forEach(otherDropdown => {
                if (otherDropdown !== userDropdown) {
                    otherDropdown.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            const isCurrentlyShown = userDropdown.classList.contains('show');
            
            // Always clean up any existing floating dropdown first
            const existingFloating = document.getElementById('floating-user-dropdown');
            if (existingFloating) {
                existingFloating.remove();
            }
            
            if (isCurrentlyShown) {
                userDropdown.classList.remove('show');
                console.log('Dropdown hidden');
            } else {
                userDropdown.classList.add('show');
                console.log('Dropdown shown');
                
                // Original dropdown is always hidden in CSS
                
                // Position dropdown at body level for maximum z-index
                const rect = userBtn.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                
                // Create floating dropdown at body level
                const floatingDropdown = document.createElement('div');
                floatingDropdown.id = 'floating-user-dropdown';
                floatingDropdown.className = 'floating-dropdown-menu';
                floatingDropdown.innerHTML = dropdownMenu.innerHTML;
                
                // Position it exactly under the button, right-aligned
                floatingDropdown.style.position = 'fixed';
                floatingDropdown.style.top = (rect.bottom + 8) + 'px';
                floatingDropdown.style.zIndex = '999999';
                
                // Left-align the dropdown with the button's left edge
                floatingDropdown.style.left = rect.left + 'px';
                floatingDropdown.style.right = 'auto';
                
                // Add click handlers for floating dropdown items
                const dropdownItems = floatingDropdown.querySelectorAll('a.dropdown-item');
                dropdownItems.forEach(item => {
                    item.addEventListener('click', function(e) {
                        // Close dropdown immediately for smooth transition
                        floatingDropdown.remove();
                        userDropdown.classList.remove('show');
                    });
                });
                
                const logoutBtn = floatingDropdown.querySelector('.logout-btn');
                if (logoutBtn) {
                    logoutBtn.onclick = function() {
                        floatingDropdown.remove();
                        userDropdown.classList.remove('show');
                        logoutUser();
                    };
                }
                
                document.body.appendChild(floatingDropdown);
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const floatingDropdown = document.getElementById('floating-user-dropdown');
            if (!userDropdown.contains(e.target) && (!floatingDropdown || !floatingDropdown.contains(e.target))) {
                userDropdown.classList.remove('show');
                if (floatingDropdown) {
                    floatingDropdown.remove();
                }
                // Original dropdown stays hidden
            }
        });
        
        // Prevent dropdown menu clicks from closing the dropdown  
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                userDropdown.classList.remove('show');
                const floatingDropdown = document.getElementById('floating-user-dropdown');
                if (floatingDropdown) {
                    floatingDropdown.remove();
                }
            }
        });
        
        // Close dropdown before page unload to prevent shaking
        window.addEventListener('beforeunload', function() {
            userDropdown.classList.remove('show');
            const floatingDropdown = document.getElementById('floating-user-dropdown');
            if (floatingDropdown) {
                floatingDropdown.remove();
            }
        });
    } else {
        console.log('User dropdown elements not found:', { userBtn, dropdownMenu, userDropdown });
    }
}

// Global cleanup function to ensure no floating dropdowns remain
window.addEventListener('DOMContentLoaded', function() {
    // Clean up any leftover floating dropdowns
    const existingFloating = document.getElementById('floating-user-dropdown');
    if (existingFloating) {
        existingFloating.remove();
    }
});

// Global logout function
function logoutUser() {
    if (window.HyderabadInfraAuth && window.HyderabadInfraAuth.logout) {
        window.HyderabadInfraAuth.logout();
    } else {
        // Fallback logout
        localStorage.removeItem('hyderabadinfra_user');
        showSimpleNotification('Logged out successfully!', 'success');
        setTimeout(() => {
            // Determine correct path to index
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            window.location.href = isInPagesFolder ? '../index.html' : 'index.html';
        }, 1500);
    }
}

// Simple notification function
function showSimpleNotification(message, type = 'info') {
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
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add user menu styles
const userMenuStyles = `
.header {
    position: sticky !important;
    top: 0;
    z-index: 1000 !important;
}

.user-menu {
    position: relative;
    z-index: 10001;
}

.user-dropdown {
    position: relative;
    z-index: 10001;
}

.user-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: #374151;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-size: 0.875rem;
}

.user-btn:hover {
    background: #f3f4f6;
    color: #2563eb;
}

.user-btn i.fa-user-circle {
    font-size: 1.25rem;
    color: #2563eb;
}

.user-btn i.fa-chevron-down {
    font-size: 0.75rem;
    transition: transform 0.3s ease;
}

.user-dropdown.show .user-btn i.fa-chevron-down {
    transform: rotate(180deg);
}

.user-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    margin-top: 0.5rem;
    max-height: 400px;
    overflow-y: auto;
}

.user-dropdown.show .user-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.user-dropdown-menu .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: #374151;
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
}

.user-dropdown-menu .dropdown-item:hover {
    background: #f3f4f6;
    color: #2563eb;
}

.user-dropdown-menu .dropdown-item.active {
    background: #eff6ff;
    color: #2563eb;
    font-weight: 500;
}

.user-dropdown-menu .dropdown-item i {
    width: 16px;
    font-size: 0.875rem;
}

.dropdown-divider {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 0.5rem 0;
}

.logout-btn {
    color: #dc2626 !important;
}

.logout-btn:hover {
    background: #fef2f2 !important;
    color: #dc2626 !important;
}

@media (max-width: 768px) {
    .user-dropdown-menu {
        right: -50px;
        min-width: 220px;
    }
    
    .nav-menu-active .user-menu {
        order: -1;
        width: 100%;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
    }
    
    .nav-menu-active .user-btn {
        width: 100%;
        justify-content: center;
        background: #f3f4f6;
        border-radius: 8px;
    }
}
`;

// Inject user menu styles
const userMenuStyleSheet = document.createElement('style');
userMenuStyleSheet.textContent = userMenuStyles;
document.head.appendChild(userMenuStyleSheet);

// Property Details and Area Filtering Functions

// Initialize area filters
function initializeAreaFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const locationCards = document.querySelectorAll('.location-card');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.dataset.filter;
            
            // Filter location cards
            locationCards.forEach(card => {
                if (filterType === 'all') {
                    card.style.display = 'block';
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                } else {
                    if (card.dataset.category === filterType) {
                        card.style.display = 'block';
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    } else {
                        card.style.transform = 'scale(0.8)';
                        card.style.opacity = '0.3';
                        setTimeout(() => {
                            if (card.style.opacity === '0.3') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                }
            });
            
            // Add animation effect
            setTimeout(() => {
                locationCards.forEach(card => {
                    if (card.style.display !== 'none') {
                        card.style.transition = 'all 0.4s ease';
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }
                });
            }, 50);
        });
    });
}

// Initialize location hover effects
function initializeLocationHover() {
    const locationCards = document.querySelectorAll('.location-card');
    const hoverTrigger = document.querySelector('.hover-areas-trigger');
    
    if (hoverTrigger) {
        // Add hover instruction animation
        setInterval(() => {
            hoverTrigger.classList.add('pulse');
            setTimeout(() => {
                hoverTrigger.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }
    
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Hide hover trigger after first interaction
            if (hoverTrigger) {
                hoverTrigger.style.opacity = '0.5';
            }
            
            // Enhance current card
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
            
            // Dim other cards
            locationCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            locationCards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '';
                card.style.zIndex = '';
            });
            
            // Show hover trigger again
            if (hoverTrigger) {
                hoverTrigger.style.opacity = '1';
            }
        });
    });
}

// Property details modal data
const propertyDetailsData = {
    1: {
        title: "Prestige Lakeside Habitat - 3BHK",
        developer: "Prestige Group",
        location: "Financial District, Gachibowli",
        price: "₹1.2 Cr",
        pricePerSqft: "₹8,276 per sq ft",
        area: "1,450 sq ft",
        beds: 3,
        baths: 3,
        parking: 1,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["Swimming Pool", "Gymnasium", "Children's Play Area", "Landscaped Gardens", "Club House", "Security", "Power Backup", "Elevator", "Intercom", "Rainwater Harvesting", "Earthquake Resistant", "Fire Safety", "CCTV", "Visitor Parking", "Maintenance Staff"],
        description: "Experience luxury living at Prestige Lakeside Habitat, strategically located in the heart of Gachibowli's Financial District. This premium residential complex offers world-class amenities and modern architecture.",
        reraId: "P52100004770",
        possession: "Ready to Move",
        furnishing: "Semi-Furnished",
        facing: "East",
        floor: "12th of 25 floors"
    },
    2: {
        title: "Brigade Golden Triangle - Villa",
        developer: "Brigade Group",
        location: "Road No. 45, Jubilee Hills",
        price: "₹3.5 Cr",
        pricePerSqft: "₹12,500 per sq ft",
        area: "2,800 sq ft",
        beds: 4,
        baths: 4,
        parking: 2,
        images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["Private Garden", "Home Theater", "Swimming Pool", "Gymnasium", "Tennis Court", "Club House", "Security", "Power Backup", "Elevator", "Intercom", "Landscaped Gardens", "Children's Play Area", "Visitor Parking", "Maintenance Staff", "CCTV", "Fire Safety", "Earthquake Resistant", "Rainwater Harvesting", "Solar Panels", "Smart Home Features"],
        description: "Discover unparalleled luxury at Brigade Golden Triangle, an exclusive villa project in the prestigious Jubilee Hills. These independent villas offer premium amenities and sophisticated living.",
        reraId: "P52100004771",
        possession: "Under Construction - Dec 2026",
        furnishing: "Unfurnished",
        facing: "North-East",
        floor: "G+2 Independent Villa"
    },
    3: {
        title: "DLF Cyber City - Office Space",
        developer: "DLF Limited",
        location: "HITEC City, Madhapur",
        price: "₹2.8 Cr",
        pricePerSqft: "₹8,000 per sq ft",
        area: "3,500 sq ft",
        beds: "Commercial",
        baths: 4,
        parking: 10,
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["Metro Access", "Food Court", "Conference Rooms", "High-Speed Internet", "Power Backup", "Security", "CCTV", "Fire Safety", "Elevator", "Parking", "Maintenance", "Reception"],
        description: "Prime commercial space at DLF Cyber City, located in the heart of HITEC City. Perfect for IT companies and corporate offices with excellent connectivity and modern infrastructure.",
        reraId: "C52100004777",
        possession: "Ready to Move",
        furnishing: "Bare Shell",
        facing: "South",
        floor: "15th of 25 floors"
    },
    4: {
        title: "Godrej Reflections - 2BHK",
        developer: "Godrej Properties",
        location: "Botanical Garden Road, Kondapur",
        price: "₹85 Lac",
        pricePerSqft: "₹7,083 per sq ft",
        area: "1,200 sq ft",
        beds: 2,
        baths: 2,
        parking: 1,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["Club House", "Garden", "Swimming Pool", "Gymnasium", "Children's Play Area", "Security", "Power Backup", "Elevator", "Intercom"],
        description: "Affordable luxury at Godrej Reflections in Kondapur. Well-designed 2BHK apartments with modern amenities and excellent connectivity to IT hubs.",
        reraId: "P52100004772",
        possession: "Ready to Move",
        furnishing: "Semi-Furnished",
        facing: "West",
        floor: "8th of 18 floors"
    },
    5: {
        title: "Phoenix Kessaku - Penthouse",
        developer: "Phoenix Mills",
        location: "Nanakramguda Road, Narsingi",
        price: "₹2.4 Cr",
        pricePerSqft: "₹7,500 per sq ft",
        area: "3,200 sq ft",
        beds: 4,
        baths: 4,
        parking: 2,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["Sky Lounge", "Infinity Pool", "Private Elevator", "Home Automation", "Spa", "Wine Cellar", "Gymnasium", "Security", "Power Backup", "Landscaped Gardens", "Club House", "Children's Play Area", "Tennis Court", "Jogging Track", "Meditation Area", "Library", "Banquet Hall", "Guest Rooms", "Concierge Service", "Valet Parking", "CCTV", "Fire Safety", "Earthquake Resistant", "Rainwater Harvesting", "Solar Panels"],
        description: "Ultra-luxury penthouse at Phoenix Kessaku, offering unparalleled luxury in the serene environment of Narsingi. Features world-class amenities and stunning views.",
        reraId: "P52100004778",
        possession: "Pre-Launch - May 2027",
        furnishing: "Luxury Furnished",
        facing: "North-East",
        floor: "40th floor Penthouse"
    },
    6: {
        title: "Salarpuria East Crest - 3BHK",
        developer: "Salarpuria Sattva",
        location: "Outer Ring Road, Kokapet",
        price: "₹95 Lac",
        pricePerSqft: "₹7,037 per sq ft",
        area: "1,350 sq ft",
        beds: 3,
        baths: 3,
        parking: 1,
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["Metro Nearby", "Schools", "Swimming Pool", "Gymnasium", "Children's Play Area", "Club House", "Security", "Power Backup", "Elevator", "Intercom", "Landscaped Gardens", "Jogging Track"],
        description: "Value-for-money investment at Salarpuria East Crest in Kokapet. Strategic location with excellent connectivity to Financial District and IT corridors.",
        reraId: "P52100004779",
        possession: "Under Construction - Oct 2026",
        furnishing: "Unfurnished",
        facing: "South-East",
        floor: "10th of 15 floors"
    }
};

// View property details function
function viewPropertyDetails(propertyId) {
    const property = propertyDetailsData[propertyId];
    if (!property) {
        showSimpleNotification('Property details not found', 'error');
        return;
    }
    
    // Create and show property details modal
    createPropertyModal(property);
}

// Create property details modal
function createPropertyModal(property) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.property-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closePropertyModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${property.title}</h2>
                <button class="close-btn" onclick="closePropertyModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="property-images">
                    <div class="main-image">
                        <img src="${property.images[0]}" alt="${property.title}" id="mainPropertyImage">
                    </div>
                    <div class="image-thumbnails">
                        ${property.images.map((img, index) => `
                            <img src="${img}" alt="Image ${index + 1}" 
                                 onclick="changeMainImage('${img}')" 
                                 class="${index === 0 ? 'active' : ''}">
                        `).join('')}
                    </div>
                </div>
                <div class="property-details-modal">
                    <div class="property-header-modal">
                        <div class="property-title-modal">${property.title}</div>
                        <div class="property-developer-modal">By ${property.developer}</div>
                        <div class="property-location-modal">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.location}
                        </div>
                    </div>
                    
                    <div class="property-pricing-modal">
                        <div class="main-price">${property.price}</div>
                        <div class="price-per-sqft">${property.pricePerSqft}</div>
                    </div>
                    
                    <div class="property-overview">
                        <div class="overview-item">
                            <div class="overview-label">Area</div>
                            <div class="overview-value">${property.area}</div>
                        </div>
                        <div class="overview-item">
                            <div class="overview-label">Bedrooms</div>
                            <div class="overview-value">${property.beds}</div>
                        </div>
                        <div class="overview-item">
                            <div class="overview-label">Bathrooms</div>
                            <div class="overview-value">${property.baths}</div>
                        </div>
                        <div class="overview-item">
                            <div class="overview-label">Parking</div>
                            <div class="overview-value">${property.parking}</div>
                        </div>
                        <div class="overview-item">
                            <div class="overview-label">Possession</div>
                            <div class="overview-value">${property.possession}</div>
                        </div>
                        <div class="overview-item">
                            <div class="overview-label">RERA ID</div>
                            <div class="overview-value">${property.reraId}</div>
                        </div>
                    </div>
                    
                    <div class="property-description-modal">
                        <h3>About Property</h3>
                        <p>${property.description}</p>
                    </div>
                    
                    <div class="property-amenities-modal">
                        <h3>Amenities</h3>
                        <div class="amenities-grid">
                            ${property.amenities.map(amenity => `
                                <div class="amenity-item">
                                    <i class="fas fa-check-circle"></i>
                                    ${amenity}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="property-actions-modal">
                        <button class="action-btn primary" onclick="contactForProperty('${property.title}')">
                            <i class="fas fa-phone"></i>
                            Contact Agent
                        </button>
                        <button class="action-btn secondary" onclick="scheduleVisitModal('${property.title}')">
                            <i class="fas fa-calendar"></i>
                            Schedule Visit
                        </button>
                        <button class="action-btn tertiary" onclick="saveProperty('${property.title}')">
                            <i class="fas fa-heart"></i>
                            Save Property
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close property modal
function closePropertyModal() {
    const modal = document.querySelector('.property-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Change main image in modal
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainPropertyImage');
    const thumbnails = document.querySelectorAll('.image-thumbnails img');
    
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === imageSrc) {
            thumb.classList.add('active');
        }
    });
}

// Property action functions
function contactForProperty(propertyTitle) {
    showSimpleNotification(`Connecting you with agent for ${propertyTitle}...`, 'info');
    setTimeout(() => {
        window.location.href = 'tel:+919876543210';
    }, 1500);
}

function scheduleVisitModal(propertyTitle) {
    showSimpleNotification(`Opening visit scheduler for ${propertyTitle}...`, 'info');
    // In real app, this would open a scheduling interface
}

function saveProperty(propertyTitle) {
    showSimpleNotification(`${propertyTitle} saved to your wishlist!`, 'success');
    // In real app, this would save to user's account
}