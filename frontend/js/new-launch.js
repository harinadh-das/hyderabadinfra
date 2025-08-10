// New Launch page JavaScript - Real Hyderabad Projects

document.addEventListener('DOMContentLoaded', function() {
    initializeNewLaunchTabs();
    loadAllProjects();
});

// Real new launch projects data from top Hyderabad builders
const newLaunchProjects = [
    {
        id: 1,
        title: "Prestige Lakeside Habitat",
        developer: "Prestige Group",
        location: "Varthur Road, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK", "4 BHK"],
        priceRange: "₹85 Lac - ₹2.5 Cr",
        areaRange: "1,200 - 2,800 sq ft",
        possession: "Dec 2026",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["featured", "rera"],
        amenities: ["Club House", "Swimming Pool", "Gym", "Children's Play Area", "Landscaped Gardens"],
        status: "Under Construction",
        reraId: "P52100004770",
        totalUnits: "1,200 units",
        floors: "G+29"
    },
    {
        id: 2,
        title: "Brigade Meadows",
        developer: "Brigade Group",
        location: "Kokapet, Hyderabad",
        type: "residential",
        configurations: ["3 BHK", "4 BHK", "5 BHK"],
        priceRange: "₹1.2 Cr - ₹3.8 Cr",
        areaRange: "1,800 - 3,500 sq ft",
        possession: "Mar 2027",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["launching", "premium"],
        amenities: ["Clubhouse", "Tennis Court", "Jogging Track", "Multi-tier Security"],
        status: "Pre-Launch",
        reraId: "P52100004771",
        totalUnits: "850 units",
        floors: "G+25"
    },
    {
        id: 3,
        title: "Godrej Reflections",
        developer: "Godrej Properties",
        location: "Financial District, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK"],
        priceRange: "₹95 Lac - ₹1.8 Cr",
        areaRange: "1,080 - 1,950 sq ft",
        possession: "Jun 2026",
        image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["rera", "ready"],
        amenities: ["Swimming Pool", "Gymnasium", "Indoor Games", "Meditation Hall"],
        status: "Ready to Move",
        reraId: "P52100004772",
        totalUnits: "650 units",
        floors: "G+18"
    },
    {
        id: 4,
        title: "Embassy Lake Terraces",
        developer: "Embassy Group",
        location: "Hebbal, Hyderabad",
        type: "villa",
        configurations: ["3 BHK Villa", "4 BHK Villa"],
        priceRange: "₹2.5 Cr - ₹4.2 Cr",
        areaRange: "2,800 - 3,800 sq ft",
        possession: "Sep 2027",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["premium", "new"],
        amenities: ["Private Garden", "Clubhouse", "Tennis Court", "Lake View"],
        status: "Pre-Launch",
        reraId: "P52100004773",
        totalUnits: "180 villas",
        floors: "G+2"
    },
    {
        id: 5,
        title: "Mantri WebCity Phase 3",
        developer: "Mantri Developers",
        location: "Kondapur, Hyderabad",
        type: "commercial",
        configurations: ["Office Spaces", "Retail"],
        priceRange: "₹65 Lac - ₹3.5 Cr",
        areaRange: "600 - 5,000 sq ft",
        possession: "Nov 2025",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["rera", "commercial"],
        amenities: ["Food Court", "High-speed Elevators", "24x7 Security", "Power Backup"],
        status: "Ready to Move",
        reraId: "C52100004774",
        totalUnits: "400 offices",
        floors: "G+20"
    },
    {
        id: 6,
        title: "Sobha City - Gurgaon Road",
        developer: "Sobha Developers",
        location: "Narsingi, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK", "4 BHK"],
        priceRange: "₹75 Lac - ₹2.8 Cr",
        areaRange: "1,250 - 2,950 sq ft",
        possession: "Dec 2027",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["luxury", "new"],
        amenities: ["Central Park", "Sports Complex", "Shopping Center", "Hospital"],
        status: "Under Construction",
        reraId: "P52100004775",
        totalUnits: "2,000 units",
        floors: "G+35"
    },
    {
        id: 7,
        title: "Purva Windermere",
        developer: "Puravankara",
        location: "Kokapet, Hyderabad",
        type: "residential",
        configurations: ["3 BHK", "4 BHK"],
        priceRange: "₹1.8 Cr - ₹3.2 Cr",
        areaRange: "1,900 - 2,800 sq ft",
        possession: "Aug 2026",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["premium", "rera"],
        amenities: ["Golf Course View", "Spa", "Business Center", "Concierge Service"],
        status: "Under Construction",
        reraId: "P52100004776",
        totalUnits: "500 units",
        floors: "G+22"
    },
    {
        id: 8,
        title: "DLF Cyber City Phase 4",
        developer: "DLF Limited",
        location: "Gachibowli, Hyderabad",
        type: "commercial",
        configurations: ["Office Spaces"],
        priceRange: "₹1.2 Cr - ₹8.5 Cr",
        areaRange: "1,200 - 10,000 sq ft",
        possession: "Jan 2026",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["premium", "commercial"],
        amenities: ["Metro Connectivity", "Food Courts", "Conference Rooms", "Parking"],
        status: "Under Construction",
        reraId: "C52100004777",
        totalUnits: "300 offices",
        floors: "G+25"
    },
    {
        id: 9,
        title: "Phoenix Kessaku",
        developer: "Phoenix Mills",
        location: "Nanakramguda, Hyderabad",
        type: "residential",
        configurations: ["3 BHK", "4 BHK", "5 BHK"],
        priceRange: "₹2.5 Cr - ₹6.8 Cr",
        areaRange: "2,200 - 4,500 sq ft",
        possession: "May 2027",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["luxury", "featured"],
        amenities: ["Infinity Pool", "Sky Lounge", "Private Elevator", "Wine Cellar"],
        status: "Pre-Launch",
        reraId: "P52100004778",
        totalUnits: "350 units",
        floors: "G+40"
    },
    {
        id: 10,
        title: "Salarpuria Sattva East Crest",
        developer: "Salarpuria Sattva",
        location: "Budigere Cross, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK"],
        priceRange: "₹65 Lac - ₹1.4 Cr",
        areaRange: "1,050 - 1,750 sq ft",
        possession: "Oct 2026",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["affordable", "rera"],
        amenities: ["Clubhouse", "Swimming Pool", "Kids Play Area", "Jogging Track"],
        status: "Under Construction",
        reraId: "P52100004779",
        totalUnits: "800 units",
        floors: "G+15"
    },
    {
        id: 11,
        title: "Lodha Meridian",
        developer: "Lodha Group",
        location: "Kukatpally, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK", "4 BHK"],
        priceRange: "₹80 Lac - ₹2.2 Cr",
        areaRange: "1,150 - 2,400 sq ft",
        possession: "Feb 2027",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["new", "rera"],
        amenities: ["Rooftop Garden", "Gymnasium", "Library", "Multipurpose Hall"],
        status: "Launching Soon",
        reraId: "P52100004780",
        totalUnits: "950 units",
        floors: "G+20"
    },
    {
        id: 12,
        title: "Ozone Urbana Avenue",
        developer: "Ozone Group",
        location: "Devanahalli, Hyderabad",
        type: "residential",
        configurations: ["1 BHK", "2 BHK", "3 BHK"],
        priceRange: "₹45 Lac - ₹1.2 Cr",
        areaRange: "650 - 1,500 sq ft",
        possession: "Dec 2025",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["affordable", "ready"],
        amenities: ["Swimming Pool", "Gym", "Children's Play Area", "Security"],
        status: "Ready to Move",
        reraId: "P52100004781",
        totalUnits: "600 units",
        floors: "G+12"
    },
    {
        id: 13,
        title: "Shapoorji Pallonji Joyville",
        developer: "Shapoorji Pallonji",
        location: "Hinjawadi, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK"],
        priceRange: "₹70 Lac - ₹1.6 Cr",
        areaRange: "1,100 - 1,800 sq ft",
        possession: "Sep 2026",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["family", "rera"],
        amenities: ["Kids Play Zone", "Elderly Corner", "Yoga Pavilion", "Community Hall"],
        status: "Under Construction",
        reraId: "P52100004782",
        totalUnits: "450 units",
        floors: "G+14"
    },
    {
        id: 14,
        title: "Tata Promont",
        developer: "Tata Housing",
        location: "Banashankari, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK", "4 BHK"],
        priceRange: "₹85 Lac - ₹2.5 Cr",
        areaRange: "1,200 - 2,600 sq ft",
        possession: "Nov 2027",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["premium", "new"],
        amenities: ["Smart Home Features", "Solar Panels", "Rainwater Harvesting", "EV Charging"],
        status: "Pre-Launch",
        reraId: "P52100004783",
        totalUnits: "700 units",
        floors: "G+18"
    },
    {
        id: 15,
        title: "L&T Raintree Boulevard",
        developer: "L&T Realty",
        location: "Hebbal, Hyderabad",
        type: "villa",
        configurations: ["4 BHK Villa", "5 BHK Villa"],
        priceRange: "₹3.2 Cr - ₹5.8 Cr",
        areaRange: "3,200 - 4,800 sq ft",
        possession: "Jul 2028",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["luxury", "villa"],
        amenities: ["Private Pool", "Home Automation", "Landscaped Gardens", "Security"],
        status: "Pre-Launch",
        reraId: "P52100004784",
        totalUnits: "120 villas",
        floors: "G+2"
    },
    {
        id: 16,
        title: "Mahindra Lifespaces Happinest",
        developer: "Mahindra Lifespaces",
        location: "Palghar, Hyderabad",
        type: "residential",
        configurations: ["1 BHK", "2 BHK"],
        priceRange: "₹35 Lac - ₹75 Lac",
        areaRange: "500 - 1,100 sq ft",
        possession: "Mar 2026",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["affordable", "first-home"],
        amenities: ["Community Center", "Playground", "Grocery Store", "Medical Center"],
        status: "Under Construction",
        reraId: "P52100004785",
        totalUnits: "1,200 units",
        floors: "G+10"
    },
    {
        id: 17,
        title: "Hiranandani Fortune City",
        developer: "Hiranandani Group",
        location: "Panvel, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK", "4 BHK"],
        priceRange: "₹90 Lac - ₹2.8 Cr",
        areaRange: "1,300 - 2,900 sq ft",
        possession: "Apr 2027",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["integrated", "rera"],
        amenities: ["Shopping Mall", "Hospital", "School", "Business Park"],
        status: "Under Construction",
        reraId: "P52100004786",
        totalUnits: "3,000 units",
        floors: "Various"
    },
    {
        id: 18,
        title: "Runwal Forests",
        developer: "Runwal Group",
        location: "Khandala Road, Hyderabad",
        type: "villa",
        configurations: ["3 BHK Villa", "4 BHK Villa"],
        priceRange: "₹2.8 Cr - ₹4.5 Cr",
        areaRange: "2,900 - 3,800 sq ft",
        possession: "Jun 2027",
        image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["nature", "villa"],
        amenities: ["Forest Views", "Adventure Sports", "Clubhouse", "Nature Trails"],
        status: "Launching Soon",
        reraId: "P52100004787",
        totalUnits: "200 villas",
        floors: "G+2"
    },
    {
        id: 19,
        title: "Birla Navya",
        developer: "Birla Estates",
        location: "Gurgaon Road, Hyderabad",
        type: "residential",
        configurations: ["3 BHK", "4 BHK"],
        priceRange: "₹1.5 Cr - ₹2.8 Cr",
        areaRange: "1,700 - 2,500 sq ft",
        possession: "Oct 2026",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["premium", "rera"],
        amenities: ["Clubhouse", "Swimming Pool", "Tennis Court", "Banquet Hall"],
        status: "Under Construction",
        reraId: "P52100004788",
        totalUnits: "400 units",
        floors: "G+16"
    },
    {
        id: 20,
        title: "Adani Western Heights",
        developer: "Adani Realty",
        location: "Andheri West, Hyderabad",
        type: "residential",
        configurations: ["2 BHK", "3 BHK", "4 BHK"],
        priceRange: "₹1.2 Cr - ₹3.5 Cr",
        areaRange: "1,400 - 2,800 sq ft",
        possession: "Jan 2028",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badges: ["luxury", "new"],
        amenities: ["Sky Garden", "Infinity Pool", "Spa", "Business Lounge"],
        status: "Pre-Launch",
        reraId: "P52100004789",
        totalUnits: "600 units",
        floors: "G+28"
    }
];

// Initialize filter tabs
function initializeNewLaunchTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter projects based on selected tab
            const filterType = this.dataset.filter;
            filterProjects(filterType);
        });
    });
}

// Filter projects based on type
function filterProjects(filterType) {
    let filteredProjects = newLaunchProjects;
    
    if (filterType !== 'all') {
        filteredProjects = newLaunchProjects.filter(project => project.type === filterType);
    }
    
    renderProjects(filteredProjects);
}

// Load all projects initially
function loadAllProjects() {
    renderProjects(newLaunchProjects);
}

// Render projects in the list
function renderProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    
    if (!projectsList) return;
    
    projectsList.innerHTML = projects.map(project => `
        <div class="project-card-list" data-id="${project.id}">
            <div class="project-image-list">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-badges">
                    ${project.badges.map(badge => `
                        <span class="badge ${badge}">${getBadgeText(badge)}</span>
                    `).join('')}
                </div>
                <div class="project-overlay">
                    <div class="project-stats">
                        <div class="stat-item">
                            <i class="fas fa-building"></i>
                            <span>${project.floors}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-home"></i>
                            <span>${project.totalUnits}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="project-info-list">
                <div class="project-header">
                    <div class="developer-info">
                        <div class="developer-name">${project.developer}</div>
                        <div class="rera-id">RERA: ${project.reraId}</div>
                    </div>
                    <div class="project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</div>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${project.location}
                </p>
                <div class="project-details-grid">
                    <div class="detail-item">
                        <div class="detail-label">Configuration</div>
                        <div class="detail-value">${project.configurations.join(', ')}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Price Range</div>
                        <div class="detail-value price-highlight">${project.priceRange}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Area Range</div>
                        <div class="detail-value">${project.areaRange}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Possession</div>
                        <div class="detail-value">${project.possession}</div>
                    </div>
                </div>
                <div class="project-amenities">
                    <h4>Key Amenities</h4>
                    <div class="amenity-tags">
                        ${project.amenities.slice(0, 5).map(amenity => `
                            <span class="amenity-tag">
                                <i class="fas fa-check"></i>
                                ${amenity}
                            </span>
                        `).join('')}
                        ${project.amenities.length > 5 ? `<span class="more-amenities">+${project.amenities.length - 5} more</span>` : ''}
                    </div>
                </div>
                <div class="project-actions">
                    <button class="action-btn primary" onclick="getProjectDetails(${project.id})">
                        <i class="fas fa-download"></i>
                        Get Brochure
                    </button>
                    <button class="action-btn secondary" onclick="scheduleVisit(${project.id})">
                        <i class="fas fa-calendar"></i>
                        Schedule Visit
                    </button>
                    <button class="action-btn tertiary" onclick="callProject(${project.id})">
                        <i class="fas fa-phone"></i>
                        Call Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for project cards
    projectsList.querySelectorAll('.project-card-list').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn')) {
                const projectId = this.dataset.id;
                viewProjectDetails(projectId);
            }
        });
    });
}

// Get badge text based on badge type
function getBadgeText(badge) {
    const badgeTexts = {
        'featured': 'Featured',
        'new': 'New',
        'rera': 'RERA',
        'launching': 'Launching Soon',
        'premium': 'Premium',
        'luxury': 'Luxury',
        'ready': 'Ready',
        'commercial': 'Commercial',
        'affordable': 'Affordable',
        'first-home': 'First Home',
        'integrated': 'Integrated',
        'nature': 'Nature',
        'villa': 'Villa',
        'family': 'Family'
    };
    
    return badgeTexts[badge] || badge;
}

// Project action handlers
function getProjectDetails(projectId) {
    const project = newLaunchProjects.find(p => p.id === projectId);
    if (project) {
        showNotification(`Downloading brochure for ${project.title}...`, 'info');
        // In real app, this would trigger download
        setTimeout(() => {
            showNotification('Brochure downloaded successfully!', 'success');
        }, 2000);
    }
}

function scheduleVisit(projectId) {
    const project = newLaunchProjects.find(p => p.id === projectId);
    if (project) {
        showNotification(`Opening visit scheduler for ${project.title}...`, 'info');
        // In real app, this would open a scheduling modal
    }
}

function callProject(projectId) {
    const project = newLaunchProjects.find(p => p.id === projectId);
    if (project) {
        showNotification('Connecting you to the sales team...', 'info');
        setTimeout(() => {
            window.location.href = 'tel:+919876543210';
        }, 1000);
    }
}

function viewProjectDetails(projectId) {
    const project = newLaunchProjects.find(p => p.id === projectId);
    if (project) {
        showNotification(`Loading details for ${project.title}...`, 'info');
        // In real app, navigate to project detail page
        setTimeout(() => {
            window.location.href = 'property-detail.html';
        }, 1000);
    }
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        font-size: 0.875rem;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
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
    }, 4000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#2563eb';
    }
}