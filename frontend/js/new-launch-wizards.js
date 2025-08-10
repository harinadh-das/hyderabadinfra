// 10 Modular Wizards for New Launch Page
// Clean, Professional Implementation with Real Property Data

class NewLaunchWizards {
    constructor() {
        this.wizards = {};
        this.properties = [];
        this.builders = [
            { 
                id: 'myhome', 
                name: 'MyHome Group', 
                projects: 45, 
                logo: 'MH',
                established: '1999',
                headquarters: 'Hyderabad, Telangana',
                founder: 'Jupally Rameshwar Rao',
                totalProjects: 127,
                completedProjects: 78,
                ongoingProjects: 31,
                upcomingProjects: 18,
                landBank: '2,800 acres',
                employeeCount: '2,500+',
                reraRegistered: 'Yes',
                iso9001Certified: 'Yes',
                description: 'MyHome Group stands as a pioneering force in South Indian real estate since 1999, transforming skylines across Hyderabad, Chennai, and Vizag. Founded by visionary leader Jupally Rameshwar Rao, we have consistently delivered excellence in luxury living through innovative design, superior construction quality, and unwavering commitment to customer satisfaction.',
                vision: 'To be the most trusted and preferred real estate brand in South India, creating iconic landmarks that enrich lives and communities.',
                mission: 'Delivering exceptional living experiences through innovative construction, sustainable practices, and customer-centric approach while maintaining the highest standards of quality and integrity.',
                coreValues: [
                    'Customer First Approach',
                    'Quality Excellence',
                    'Innovation & Design',
                    'Transparency & Trust',
                    'Sustainability Focus',
                    'Timely Delivery'
                ],
                achievements: [
                    'CREDAI Developer of the Year 2022',
                    'Best Luxury Developer - South India 2021', 
                    'Excellence in Construction Quality Award 2020',
                    'Customer Satisfaction Award - CREDAI 2019',
                    'Best Villa Development Project 2018',
                    'Green Building Excellence Award 2017',
                    'Emerging Developer Award 2016',
                    'Quality Construction Award 2015'
                ],
                certifications: [
                    'ISO 9001:2015 Quality Management',
                    'ISO 14001:2015 Environmental Management',
                    'RERA Registered Projects',
                    'IGBC Green Building Certified',
                    'CREDAI Member Since 2001'
                ],
                specialties: ['Luxury Villas', 'Premium Apartments', 'Gated Communities', 'Plotted Developments', 'Commercial Spaces'],
                timeline: [
                    { year: '1999', event: 'MyHome Group founded by Jupally Rameshwar Rao' },
                    { year: '2001', event: 'First residential project launched in Hyderabad' },
                    { year: '2005', event: 'Expanded operations to Chennai market' },
                    { year: '2010', event: 'Completed 25 successful projects, 5000+ happy families' },
                    { year: '2015', event: 'Launched luxury villa segment with MyHome Bhooja' },
                    { year: '2018', event: 'Entered Vizag market with premium projects' },
                    { year: '2020', event: 'Achieved milestone of 50 completed projects' },
                    { year: '2022', event: 'Received CREDAI Developer of the Year award' },
                    { year: '2024', event: 'Currently developing 31 projects across 3 cities' }
                ],
                keyPeople: [
                    {
                        name: 'Jupally Rameshwar Rao',
                        designation: 'Chairman & Managing Director',
                        experience: '25+ years in Real Estate',
                        description: 'Visionary leader who transformed MyHome into South India\'s premium real estate brand'
                    },
                    {
                        name: 'Jupally Sunil Kumar',
                        designation: 'Executive Director',
                        experience: '15+ years',
                        description: 'Leads project development and customer relations'
                    },
                    {
                        name: 'Jupally Hanmanth Rao',
                        designation: 'Director - Operations',
                        experience: '12+ years',
                        description: 'Oversees construction quality and project delivery'
                    }
                ],
                serviceAreas: ['Hyderabad', 'Chennai', 'Vizag', 'Warangal'],
                totalCustomers: '15,000+',
                totalSqFtDelivered: '25 million+',
                avgProjectSize: '5-50 acres',
                priceRange: '₹45L - ₹15 Cr'
            },
            { 
                id: 'aparna', 
                name: 'Aparna Constructions', 
                projects: 52, 
                logo: 'AC',
                established: '1996',
                headquarters: 'Hyderabad, Telangana',
                founder: 'Aparna Enterprises',
                totalProjects: 78,
                completedProjects: 52,
                ongoingProjects: 18,
                upcomingProjects: 8,
                description: 'Aparna Constructions has been building tomorrow\'s landmarks with innovative designs and sustainable construction practices for over 25 years.',
                achievements: [
                    'IGBC Green Building Certification',
                    'Real Estate Developer of the Year 2021',
                    'Customer Satisfaction Award 2020'
                ],
                specialties: ['Green Buildings', 'Smart Homes', 'Integrated Townships']
            },
            { 
                id: 'prestige', 
                name: 'Prestige Group', 
                projects: 68, 
                logo: 'PG',
                established: '1986',
                headquarters: 'Bangalore, Karnataka',
                founder: 'Razack Sattar',
                totalProjects: 275,
                completedProjects: 185,
                ongoingProjects: 48,
                upcomingProjects: 42,
                description: 'Prestige Group is a leading real estate developer in South India, renowned for luxury residential and commercial projects across major cities.',
                achievements: [
                    'Developer of the Decade Award 2020',
                    'Excellence in Innovation Award 2019',
                    'Best Mixed-Use Development 2018'
                ],
                specialties: ['Ultra Luxury Residences', 'Commercial Complexes', 'Mixed-Use Developments']
            },
            { 
                id: 'brigade', 
                name: 'Brigade Group', 
                projects: 41, 
                logo: 'BG',
                established: '1986',
                headquarters: 'Bangalore, Karnataka',
                founder: 'M.R. Jaishankar',
                totalProjects: 150,
                completedProjects: 98,
                ongoingProjects: 32,
                upcomingProjects: 20,
                description: 'Brigade Group is known for excellence in real estate development, creating integrated communities that combine residential, commercial and hospitality segments.',
                achievements: [
                    'FIABCI India Award for Excellence',
                    'Best Developer - Mixed Use Project 2021',
                    'Green Building Council Recognition'
                ],
                specialties: ['Integrated Townships', 'Hospitality Projects', 'IT Parks']
            },
            { 
                id: 'rajapushpa', 
                name: 'Rajapushpa Properties', 
                projects: 28, 
                logo: 'RP',
                established: '2008',
                headquarters: 'Hyderabad, Telangana',
                founder: 'Rajapushpa Group',
                totalProjects: 42,
                completedProjects: 28,
                ongoingProjects: 10,
                upcomingProjects: 4,
                description: 'Rajapushpa Properties focuses on creating premium residential spaces that offer modern amenities and strategic locations in Hyderabad.',
                achievements: [
                    'Rising Star Developer Award 2022',
                    'Best Affordable Housing Project 2021',
                    'Customer Choice Award 2020'
                ],
                specialties: ['Premium Apartments', 'Affordable Housing', 'Plotted Developments']
            }
        ];
        
        this.init();
    }

    init() {
        console.log('🧙‍♂️ Initializing 10 Modular Wizards...');
        this.loadPropertyData();
        this.setupHeroSection();
        this.createAllWizards();
        this.setupAnimations();
    }

    loadPropertyData() {
        // Real property data from builders
        this.properties = [
            {
                id: 1,
                name: 'MyHome Krishe',
                builder: 'MyHome Group',
                location: 'Kompally, Hyderabad',
                type: 'Luxury Villas',
                bhk: '4-5 BHK',
                area: '3200-4800 sq ft',
                price: '₹2.5 - 4.2 Cr',
                status: 'New Launch',
                possession: 'Dec 2025',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 2,
                name: 'Aparna Sarovar Zenith',
                builder: 'Aparna Constructions',
                location: 'Nallagandla, Hyderabad',
                type: 'Luxury Apartments',
                bhk: '3-4 BHK',
                area: '1650-2800 sq ft',
                price: '₹1.8 - 3.5 Cr',
                status: 'Pre Launch',
                possession: 'Mar 2026',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 3,
                name: 'Prestige Falcon City',
                builder: 'Prestige Group',
                location: 'Kothaguda, Hyderabad',
                type: 'Ultra Luxury',
                bhk: '3-4 BHK',
                area: '2400-4200 sq ft',
                price: '₹3.2 - 6.8 Cr',
                status: 'Launching Soon',
                possession: 'Oct 2025',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 4,
                name: 'Brigade Eldorado',
                builder: 'Brigade Group',
                location: 'Bagalur Road, Hyderabad',
                type: 'Plotted Development',
                bhk: 'Villa Plots',
                area: '1500-3000 sq ft',
                price: '₹85L - 2.2 Cr',
                status: 'Open for Sale',
                possession: 'Immediate',
                image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 5,
                name: 'Rajapushpa Regalia',
                builder: 'Rajapushpa Properties',
                location: 'Kokapet, Hyderabad',
                type: 'Premium Apartments',
                bhk: '2-3 BHK',
                area: '1300-2100 sq ft',
                price: '₹1.1 - 2.4 Cr',
                status: 'Selling Fast',
                possession: 'Dec 2025',
                image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 6,
                name: 'MyHome Avatar',
                builder: 'MyHome Group',
                location: 'Vijayawada Highway',
                type: 'Premium Apartments',
                bhk: '2-3 BHK',
                area: '1450-2200 sq ft',
                price: '₹1.2 - 2.8 Cr',
                status: 'Ready to Move',
                possession: 'Ready',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            // Additional MyHome Projects
            {
                id: 7,
                name: 'MyHome Bhooja',
                builder: 'MyHome Group',
                location: 'Gachibowli, Hyderabad',
                type: 'Ultra Luxury Villas',
                bhk: '4-5 BHK',
                area: '4200-6800 sq ft',
                price: '₹4.5 - 8.2 Cr',
                status: 'New Launch',
                possession: 'Dec 2026',
                projectSize: '42 acres',
                totalUnits: '312 villas',
                amenities: 'Clubhouse, Swimming Pool, Spa, Kids Play Area, Jogging Track, 24/7 Security',
                highlights: 'Vastu Compliant, Premium Location, Gated Community',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 8,
                name: 'MyHome Tarkash',
                builder: 'MyHome Group',
                location: 'Shamshabad, Hyderabad',
                type: 'Premium Apartments',
                bhk: '3-4 BHK',
                area: '2100-3200 sq ft',
                price: '₹2.8 - 4.5 Cr',
                status: 'Under Construction',
                possession: 'Jun 2025',
                projectSize: '15 acres',
                totalUnits: '850 apartments',
                amenities: 'Gym, Pool, Indoor Games, Garden, Parking, Power Backup',
                highlights: 'Near Airport, IT Corridor Access, Metro Connectivity',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 17,
                name: 'MyHome Jewel',
                builder: 'MyHome Group',
                location: 'Kokapet, Hyderabad',
                type: 'Luxury Apartments',
                bhk: '2-4 BHK',
                area: '1450-3100 sq ft',
                price: '₹1.8 - 4.2 Cr',
                status: 'Ready to Move',
                possession: 'Ready',
                projectSize: '8.5 acres',
                totalUnits: '624 apartments',
                amenities: 'Clubhouse, Gym, Swimming Pool, Kids Area, Multi-purpose Hall',
                highlights: 'Financial District, Gachibowli Access, Premium Finishes',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 18,
                name: 'MyHome Mangala',
                builder: 'MyHome Group',
                location: 'Kompally, Hyderabad',
                type: 'Premium Villas',
                bhk: '3-4 BHK',
                area: '2800-4200 sq ft',
                price: '₹2.2 - 3.8 Cr',
                status: 'Selling Fast',
                possession: 'Aug 2025',
                projectSize: '28 acres',
                totalUnits: '186 villas',
                amenities: 'Private Gardens, Gated Security, Club House, Tennis Court',
                highlights: 'Independent Villas, Vastu Compliant, Tree-lined Streets',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 19,
                name: 'MyHome Vihanga',
                builder: 'MyHome Group',
                location: 'Gachibowli, Hyderabad',
                type: 'Premium Apartments',
                bhk: '2-3 BHK',
                area: '1200-2200 sq ft',
                price: '₹1.1 - 2.8 Cr',
                status: 'Under Construction',
                possession: 'Dec 2025',
                projectSize: '12 acres',
                totalUnits: '756 apartments',
                amenities: 'Swimming Pool, Gym, Yoga Hall, Children Park, 24x7 Security',
                highlights: 'IT Hub Location, Metro Connectivity, Modern Architecture',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 20,
                name: 'MyHome Abhra',
                builder: 'MyHome Group',
                location: 'Nizampet, Hyderabad',
                type: 'Affordable Luxury',
                bhk: '2-3 BHK',
                area: '1150-1850 sq ft',
                price: '₹75L - 1.6 Cr',
                status: 'New Launch',
                possession: 'Mar 2026',
                projectSize: '18 acres',
                totalUnits: '1024 apartments',
                amenities: 'Community Hall, Gym, Playground, Garden, Ample Parking',
                highlights: 'Affordable Pricing, Quality Construction, Growing Location',
                image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            // Additional Aparna Projects
            {
                id: 9,
                name: 'Aparna Cyber Life',
                builder: 'Aparna Constructions',
                location: 'Nallagandla, Hyderabad',
                type: 'Smart Apartments',
                bhk: '2-4 BHK',
                area: '1200-2800 sq ft',
                price: '₹1.1 - 3.2 Cr',
                status: 'Ready to Move',
                possession: 'Ready',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 10,
                name: 'Aparna Kanopy Marigold',
                builder: 'Aparna Constructions',
                location: 'Miyapur, Hyderabad',
                type: 'Premium Homes',
                bhk: '2-3 BHK',
                area: '1350-2100 sq ft',
                price: '₹95L - 2.1 Cr',
                status: 'Selling Fast',
                possession: 'Mar 2025',
                image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            // Additional Prestige Projects
            {
                id: 11,
                name: 'Prestige Song of the South',
                builder: 'Prestige Group',
                location: 'Begur Road, Hyderabad',
                type: 'Luxury Apartments',
                bhk: '3-4 BHK',
                area: '2200-3800 sq ft',
                price: '₹3.8 - 7.2 Cr',
                status: 'New Launch',
                possession: 'Dec 2025',
                image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 12,
                name: 'Prestige White Meadows',
                builder: 'Prestige Group',
                location: 'Whitefield Extension, Hyderabad',
                type: 'Villa Plots',
                bhk: 'Villa Plots',
                area: '2400-4800 sq ft',
                price: '₹1.8 - 4.2 Cr',
                status: 'Launching Soon',
                possession: 'Immediate',
                image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            // Additional Brigade Projects
            {
                id: 13,
                name: 'Brigade Golden Triangle',
                builder: 'Brigade Group',
                location: 'KR Puram, Hyderabad',
                type: 'Mixed Development',
                bhk: '2-4 BHK',
                area: '1400-3200 sq ft',
                price: '₹1.6 - 4.8 Cr',
                status: 'New Launch',
                possession: 'Aug 2026',
                image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 14,
                name: 'Brigade Orchards',
                builder: 'Brigade Group',
                location: 'Devanahalli, Hyderabad',
                type: 'Plotted Development',
                bhk: 'Villa Plots',
                area: '1200-2400 sq ft',
                price: '₹65L - 1.8 Cr',
                status: 'Ready to Move',
                possession: 'Ready',
                image: 'https://images.unsplash.com/photo-1600607688960-e095f2738df3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            // Additional Rajapushpa Projects
            {
                id: 15,
                name: 'Rajapushpa Atria',
                builder: 'Rajapushpa Properties',
                location: 'Bachupally, Hyderabad',
                type: 'Premium Apartments',
                bhk: '2-3 BHK',
                area: '1100-1900 sq ft',
                price: '₹85L - 1.9 Cr',
                status: 'Under Construction',
                possession: 'Oct 2025',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 16,
                name: 'Rajapushpa Courtyard',
                builder: 'Rajapushpa Properties',
                location: 'Miyapur, Hyderabad',
                type: 'Affordable Housing',
                bhk: '1-2 BHK',
                area: '650-1200 sq ft',
                price: '₹45L - 95L',
                status: 'Selling Fast',
                possession: 'Jun 2025',
                image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }
        ];
    }

    setupHeroSection() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.innerHTML = `
                <h1 class="hero-title">New Launch Properties</h1>
                <p class="hero-subtitle">Discover Premium Projects from Top Builders in Hyderabad</p>
                <div class="hero-stats">
                    <div class="stat-card">
                        <span class="stat-number">${this.properties.length}</span>
                        <span class="stat-label">New Projects</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${this.builders.length}</span>
                        <span class="stat-label">Top Builders</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">234</span>
                        <span class="stat-label">Total Properties</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">₹85L+</span>
                        <span class="stat-label">Starting Price</span>
                    </div>
                </div>
            `;
        }
    }

    createAllWizards() {
        // Create sidebar filters
        this.createSidebarFilters();
        
        // Create main content wizards (excluding search filters)
        const container = document.querySelector('#wizardsContent');
        if (!container) return;

        container.innerHTML = `
            ${this.createWizard2_BuilderShowcase()}
            ${this.createWizard3_PropertiesGrid()}
            ${this.createWizard4_FilterTabs()}
            ${this.createWizard5_PriceCalculator()}
            ${this.createWizard6_LocationMap()}
            ${this.createWizard7_ComparisonTool()}
            ${this.createWizard8_ContactForm()}
            ${this.createWizard9_VirtualTour()}
            ${this.createWizard10_Newsletter()}
        `;

        this.bindEventHandlers();
    }

    createSidebarFilters() {
        const sidebarContainer = document.querySelector('#sidebarFilters');
        if (!sidebarContainer) return;

        sidebarContainer.innerHTML = `
            <div class="sidebar-filter-group">
                <div class="sidebar-filter-title">
                    <i class="fas fa-building"></i>
                    Builder
                </div>
                <select class="sidebar-filter-select" id="sidebarBuilderFilter">
                    <option value="">All Builders</option>
                    ${this.builders.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                </select>
            </div>

            <div class="sidebar-filter-group">
                <div class="sidebar-filter-title">
                    <i class="fas fa-home"></i>
                    Property Type
                </div>
                <select class="sidebar-filter-select" id="sidebarTypeFilter">
                    <option value="">All Types</option>
                    <option value="apartment">Apartments</option>
                    <option value="villa">Villas</option>
                    <option value="plot">Plots</option>
                </select>
            </div>

            <div class="sidebar-filter-group">
                <div class="sidebar-filter-title">
                    <i class="fas fa-bed"></i>
                    BHK
                </div>
                <select class="sidebar-filter-select" id="sidebarBhkFilter">
                    <option value="">Any BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                </select>
            </div>

            <div class="sidebar-filter-group">
                <div class="sidebar-filter-title">
                    <i class="fas fa-rupee-sign"></i>
                    Budget Range
                </div>
                <select class="sidebar-filter-select" id="sidebarBudgetFilter">
                    <option value="">Any Budget</option>
                    <option value="0-100">Under ₹1 Cr</option>
                    <option value="100-200">₹1 - 2 Cr</option>
                    <option value="200-500">₹2 - 5 Cr</option>
                    <option value="500+">Above ₹5 Cr</option>
                </select>
            </div>

            <div class="sidebar-filter-group">
                <div class="sidebar-filter-title">
                    <i class="fas fa-calendar-alt"></i>
                    Possession Status
                </div>
                <select class="sidebar-filter-select" id="sidebarStatusFilter">
                    <option value="">Any Status</option>
                    <option value="new">New Launch</option>
                    <option value="ready">Ready to Move</option>
                    <option value="upcoming">Coming Soon</option>
                    <option value="construction">Under Construction</option>
                </select>
            </div>

            <div class="sidebar-filter-group">
                <button class="sidebar-search-button" onclick="newLaunchWizards.applySidebarFilters()">
                    <i class="fas fa-search"></i>
                    Search Properties
                </button>
            </div>
        `;

        // Add event listener for clear filters
        const clearFiltersBtn = document.querySelector('.clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }
    }

    // Wizard 1: Advanced Search Filters
    createWizard1_SearchFilters() {
        return `
            <div class="wizard-container search-wizard fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-search"></i></div>
                        Advanced Search Filters
                    </div>
                    <div class="wizard-badge">Filter Properties</div>
                </div>
                <div class="wizard-content">
                    <div class="filter-grid">
                        <div class="filter-group">
                            <label class="filter-label">Builder</label>
                            <select class="filter-select" id="builderFilter">
                                <option value="">All Builders</option>
                                ${this.builders.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label">Property Type</label>
                            <select class="filter-select" id="typeFilter">
                                <option value="">All Types</option>
                                <option value="apartment">Apartments</option>
                                <option value="villa">Villas</option>
                                <option value="plot">Plots</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label">BHK</label>
                            <select class="filter-select" id="bhkFilter">
                                <option value="">Any BHK</option>
                                <option value="1">1 BHK</option>
                                <option value="2">2 BHK</option>
                                <option value="3">3 BHK</option>
                                <option value="4">4+ BHK</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label">Budget Range</label>
                            <select class="filter-select" id="budgetFilter">
                                <option value="">Any Budget</option>
                                <option value="0-100">Under ₹1 Cr</option>
                                <option value="100-200">₹1 - 2 Cr</option>
                                <option value="200-500">₹2 - 5 Cr</option>
                                <option value="500+">Above ₹5 Cr</option>
                            </select>
                        </div>
                    </div>
                    <button class="search-button" onclick="newLaunchWizards.applyFilters()">
                        <i class="fas fa-search"></i> Search Properties
                    </button>
                </div>
            </div>
        `;
    }

    // Wizard 2: Builder Showcase
    createWizard2_BuilderShowcase() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-building"></i></div>
                        Premium Builders
                    </div>
                    <div class="wizard-badge">Trusted Partners</div>
                </div>
                <div class="wizard-content">
                    <div class="builder-grid">
                        ${this.builders.map(builder => `
                            <div class="builder-card" onclick="newLaunchWizards.selectBuilder('${builder.id}')">
                                <div class="builder-logo">${builder.logo}</div>
                                <div class="builder-name">${builder.name}</div>
                                <div class="builder-projects">${builder.projects}+ Projects</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Wizard 3: Properties Grid
    createWizard3_PropertiesGrid() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-home"></i></div>
                        Featured New Launches
                    </div>
                    <div class="wizard-badge">${this.properties.length} Properties</div>
                </div>
                <div class="wizard-content">
                    <div class="properties-grid" id="propertiesGrid">
                        ${this.properties.map(property => this.createPropertyCard(property)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Wizard 4: Filter Tabs
    createWizard4_FilterTabs() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-filter"></i></div>
                        Quick Filters
                    </div>
                    <div class="wizard-badge">Filter by Status</div>
                </div>
                <div class="wizard-content">
                    <div class="filter-tabs">
                        <button class="tab-button active" onclick="newLaunchWizards.filterByStatus('all')">All Projects</button>
                        <button class="tab-button" onclick="newLaunchWizards.filterByStatus('new')">New Launch</button>
                        <button class="tab-button" onclick="newLaunchWizards.filterByStatus('ready')">Ready to Move</button>
                        <button class="tab-button" onclick="newLaunchWizards.filterByStatus('upcoming')">Coming Soon</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Wizard 5: EMI Calculator
    createWizard5_PriceCalculator() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-calculator"></i></div>
                        EMI Calculator
                    </div>
                    <div class="wizard-badge">Calculate Loan</div>
                </div>
                <div class="wizard-content">
                    <div class="calculator-grid">
                        <div class="calculator-inputs">
                            <div class="input-group">
                                <label class="input-label">Property Price (₹)</label>
                                <input type="number" class="input-field" id="propertyPrice" placeholder="2,50,00,000" value="25000000">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Down Payment (%)</label>
                                <input type="number" class="input-field" id="downPayment" placeholder="20" value="20">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Loan Tenure (Years)</label>
                                <input type="number" class="input-field" id="loanTenure" placeholder="20" value="20">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Interest Rate (%)</label>
                                <input type="number" class="input-field" id="interestRate" placeholder="8.5" value="8.5" step="0.1">
                            </div>
                            <button class="search-button" onclick="newLaunchWizards.calculateEMI()">Calculate EMI</button>
                        </div>
                        <div class="calculator-result">
                            <div class="result-amount" id="emiResult">₹1,67,891</div>
                            <div class="result-label">Monthly EMI</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Wizard 6: Location Map
    createWizard6_LocationMap() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-map-marker-alt"></i></div>
                        Project Locations
                    </div>
                    <div class="wizard-badge">Interactive Map</div>
                </div>
                <div class="wizard-content">
                    <div class="map-container">
                        <div>
                            <i class="fas fa-map" style="font-size: 3rem; margin-bottom: 1rem; color: #667eea;"></i>
                            <div>Interactive Map Loading...</div>
                            <div style="font-size: 0.875rem; margin-top: 0.5rem; opacity: 0.7;">View all project locations in Hyderabad</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Wizard 7: Property Comparison
    createWizard7_ComparisonTool() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-balance-scale"></i></div>
                        Compare Properties
                    </div>
                    <div class="wizard-badge">Side by Side</div>
                </div>
                <div class="wizard-content">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>MyHome Krishe</th>
                                <th>Prestige Falcon City</th>
                                <th>Aparna Sarovar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Price Range</td>
                                <td>₹2.5 - 4.2 Cr</td>
                                <td>₹3.2 - 6.8 Cr</td>
                                <td>₹1.8 - 3.5 Cr</td>
                            </tr>
                            <tr>
                                <td>Configuration</td>
                                <td>4-5 BHK</td>
                                <td>3-4 BHK</td>
                                <td>3-4 BHK</td>
                            </tr>
                            <tr>
                                <td>Area</td>
                                <td>3200-4800 sq ft</td>
                                <td>2400-4200 sq ft</td>
                                <td>1650-2800 sq ft</td>
                            </tr>
                            <tr>
                                <td>Possession</td>
                                <td>Dec 2025</td>
                                <td>Oct 2025</td>
                                <td>Mar 2026</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Wizard 8: Contact Form
    createWizard8_ContactForm() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-envelope"></i></div>
                        Get in Touch
                    </div>
                    <div class="wizard-badge">Contact Us</div>
                </div>
                <div class="wizard-content">
                    <form class="contact-form" onsubmit="newLaunchWizards.submitContact(event)">
                        <div class="input-group">
                            <label class="input-label">Full Name</label>
                            <input type="text" class="input-field" required placeholder="Your Name">
                        </div>
                        <div class="input-group">
                            <label class="input-label">Phone Number</label>
                            <input type="tel" class="input-field" required placeholder="+91 9876543210">
                        </div>
                        <div class="input-group">
                            <label class="input-label">Email Address</label>
                            <input type="email" class="input-field" required placeholder="your@email.com">
                        </div>
                        <div class="input-group">
                            <label class="input-label">Interested Project</label>
                            <select class="input-field">
                                <option value="">Select Project</option>
                                ${this.properties.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="input-group full-width">
                            <label class="input-label">Message</label>
                            <textarea class="input-field" placeholder="Your message or requirements"></textarea>
                        </div>
                        <div class="input-group full-width">
                            <button type="submit" class="search-button">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Wizard 9: Virtual Tour
    createWizard9_VirtualTour() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-vr-cardboard"></i></div>
                        Virtual Property Tours
                    </div>
                    <div class="wizard-badge">360° Experience</div>
                </div>
                <div class="wizard-content">
                    <div class="virtual-tour">
                        <div class="tour-icon">
                            <i class="fas fa-play-circle"></i>
                        </div>
                        <div class="tour-title">Experience Properties in VR</div>
                        <div class="tour-description">
                            Take immersive virtual tours of our premium properties from the comfort of your home. 
                            Walk through actual units, explore amenities, and get a real feel of the space.
                        </div>
                        <button class="tour-button" onclick="newLaunchWizards.startVirtualTour()">
                            <i class="fas fa-play"></i> Start Virtual Tour
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Wizard 10: Newsletter Signup
    createWizard10_Newsletter() {
        return `
            <div class="wizard-container fade-in">
                <div class="wizard-header">
                    <div class="wizard-title">
                        <div class="wizard-icon"><i class="fas fa-bell"></i></div>
                        Stay Updated
                    </div>
                    <div class="wizard-badge">Newsletter</div>
                </div>
                <div class="wizard-content">
                    <div class="newsletter-signup">
                        <div class="newsletter-title">Get Latest Property Updates</div>
                        <p style="margin-bottom: 2rem; opacity: 0.9;">
                            Subscribe to receive new launch notifications, price updates, and exclusive offers.
                        </p>
                        <form class="newsletter-form" onsubmit="newLaunchWizards.subscribeNewsletter(event)">
                            <input type="email" class="newsletter-input" placeholder="Enter your email" required>
                            <button type="submit" class="newsletter-button">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    createPropertyCard(property) {
        return `
            <div class="property-card" onclick="newLaunchWizards.showPropertyDetails(${property.id})">
                <img src="${property.image}" alt="${property.name}" class="property-image" loading="lazy">
                <div class="property-content">
                    <div class="property-title">${property.name}</div>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </div>
                    <div class="property-details">
                        <div class="detail-item">
                            <div class="detail-value">${property.bhk}</div>
                            <div class="detail-label">Configuration</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${property.area}</div>
                            <div class="detail-label">Area</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${property.status}</div>
                            <div class="detail-label">Status</div>
                        </div>
                    </div>
                    <div class="property-price">${property.price}</div>
                    <div class="property-actions">
                        <button class="btn-primary" onclick="event.stopPropagation(); newLaunchWizards.contactBuilder(${property.id})">
                            <i class="fas fa-phone"></i> Contact
                        </button>
                        <button class="btn-secondary" onclick="event.stopPropagation(); newLaunchWizards.saveProperty(${property.id})">
                            <i class="fas fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Event Handlers and Interactive Functions
    bindEventHandlers() {
        // Auto-calculate EMI on input change
        ['propertyPrice', 'downPayment', 'loanTenure', 'interestRate'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.calculateEMI());
            }
        });
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Wizard Functions
    applyFilters() {
        console.log('🔍 Applying filters...');
        // Implementation for filtering properties
    }

    applySidebarFilters() {
        const builderFilter = document.getElementById('sidebarBuilderFilter')?.value;
        const typeFilter = document.getElementById('sidebarTypeFilter')?.value;
        const bhkFilter = document.getElementById('sidebarBhkFilter')?.value;
        const budgetFilter = document.getElementById('sidebarBudgetFilter')?.value;
        const statusFilter = document.getElementById('sidebarStatusFilter')?.value;

        console.log('🔍 Applying sidebar filters:', {
            builder: builderFilter,
            type: typeFilter,
            bhk: bhkFilter,
            budget: budgetFilter,
            status: statusFilter
        });

        // Filter and update the properties grid
        this.filterProperties({
            builder: builderFilter,
            type: typeFilter,
            bhk: bhkFilter,
            budget: budgetFilter,
            status: statusFilter
        });
    }

    filterProperties(filters) {
        let filteredProperties = this.properties;

        // Apply builder filter
        if (filters.builder) {
            filteredProperties = filteredProperties.filter(property => 
                property.builder.toLowerCase().includes(filters.builder)
            );
        }

        // Apply BHK filter
        if (filters.bhk) {
            filteredProperties = filteredProperties.filter(property => 
                property.bhk.includes(filters.bhk)
            );
        }

        // Apply status filter
        if (filters.status) {
            filteredProperties = filteredProperties.filter(property => {
                const status = property.status.toLowerCase();
                switch (filters.status) {
                    case 'new': return status.includes('new') || status.includes('launch');
                    case 'ready': return status.includes('ready') || status === 'ready';
                    case 'upcoming': return status.includes('soon') || status.includes('pre');
                    case 'construction': return status.includes('construction') || status.includes('selling');
                    default: return true;
                }
            });
        }

        // Update the properties grid with filtered results
        this.updatePropertiesGrid(filteredProperties);
    }

    updatePropertiesGrid(properties) {
        const propertiesGrid = document.getElementById('propertiesGrid');
        if (!propertiesGrid) return;

        if (properties.length === 0) {
            propertiesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 1rem;"></i>
                    <div style="font-size: 1.25rem; font-weight: 600; color: #4a5568; margin-bottom: 0.5rem;">
                        No properties found
                    </div>
                    <div style="color: #718096;">
                        Try adjusting your filters to see more results
                    </div>
                </div>
            `;
        } else {
            propertiesGrid.innerHTML = properties.map(property => this.createPropertyCard(property)).join('');
        }
    }

    selectBuilder(builderId) {
        console.log('🏢 Selected builder:', builderId);
        const builder = this.builders.find(b => b.id === builderId);
        if (builder) {
            this.openBuilderVRExperience(builder);
        }
    }

    openBuilderModal(builder) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('builderModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'builderModal';
            modal.className = 'builder-modal';
            document.body.appendChild(modal);
        }

        // Get builder's projects
        const builderProjects = this.properties.filter(p => 
            p.builder.toLowerCase().includes(builder.id) || 
            p.builder === builder.name
        );

        modal.innerHTML = `
            <div class="builder-modal-content virtual-experience">
                <!-- Virtual Tour Style Header -->
                <div class="vr-header">
                    <div class="vr-title-section">
                        <div class="vr-logo-3d">${builder.logo}</div>
                        <div class="vr-title-content">
                            <div class="vr-company-name">${builder.name}</div>
                            <div class="vr-tagline">Virtual Builder Experience</div>
                            <div class="vr-experience-badge">
                                <i class="fas fa-vr-cardboard"></i>
                                360° Immersive Tour
                            </div>
                        </div>
                    </div>
                    <button class="vr-close-btn" onclick="newLaunchWizards.closeBuilderModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Virtual Experience Navigation -->
                <div class="vr-navigation">
                    <div class="vr-nav-title">
                        <i class="fas fa-compass"></i>
                        Explore Builder Universe
                    </div>
                    <div class="vr-nav-grid">
                        <button class="vr-nav-item active" onclick="newLaunchWizards.switchVRExperience(event, 'office-tour')">
                            <div class="vr-nav-icon"><i class="fas fa-building"></i></div>
                            <div class="vr-nav-label">Virtual Office</div>
                            <div class="vr-nav-desc">360° Office Tour</div>
                        </button>
                        <button class="vr-nav-item" onclick="newLaunchWizards.switchVRExperience(event, 'projects-gallery')">
                            <div class="vr-nav-icon"><i class="fas fa-home"></i></div>
                            <div class="vr-nav-label">Project Gallery</div>
                            <div class="vr-nav-desc">Interactive Walkthrough</div>
                        </button>
                        <button class="vr-nav-item" onclick="newLaunchWizards.switchVRExperience(event, 'company-story')">
                            <div class="vr-nav-icon"><i class="fas fa-history"></i></div>
                            <div class="vr-nav-label">Company Journey</div>
                            <div class="vr-nav-desc">Timeline Experience</div>
                        </button>
                        <button class="vr-nav-item" onclick="newLaunchWizards.switchVRExperience(event, 'meet-team')">
                            <div class="vr-nav-icon"><i class="fas fa-users"></i></div>
                            <div class="vr-nav-label">Meet the Team</div>
                            <div class="vr-nav-desc">Leadership Profiles</div>
                        </button>
                        <button class="vr-nav-item" onclick="newLaunchWizards.switchVRExperience(event, 'awards-gallery')">
                            <div class="vr-nav-icon"><i class="fas fa-trophy"></i></div>
                            <div class="vr-nav-label">Awards Gallery</div>
                            <div class="vr-nav-desc">Recognition Showcase</div>
                        </button>
                        <button class="vr-nav-item" onclick="newLaunchWizards.switchVRExperience(event, 'connect')">
                            <div class="vr-nav-icon"><i class="fas fa-handshake"></i></div>
                            <div class="vr-nav-label">Connect</div>
                            <div class="vr-nav-desc">Get in Touch</div>
                        </button>
                    </div>
                </div>

                <!-- Virtual Experience Content -->
                <div class="vr-content-area">

                    <!-- About Tab -->
                    <div id="about-tab" class="builder-tab-content active">
                        <div class="builder-about">
                            <div>
                                <div class="builder-description">${builder.description}</div>
                                
                                ${builder.vision ? `
                                    <div class="builder-vision">
                                        <h4><i class="fas fa-eye"></i> Our Vision</h4>
                                        <p>${builder.vision}</p>
                                    </div>
                                ` : ''}

                                ${builder.mission ? `
                                    <div class="builder-mission">
                                        <h4><i class="fas fa-bullseye"></i> Our Mission</h4>
                                        <p>${builder.mission}</p>
                                    </div>
                                ` : ''}

                                <div class="builder-specialties">
                                    <h4><i class="fas fa-star"></i> Our Specialties</h4>
                                    <div class="specialties-list">
                                        ${builder.specialties.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
                                    </div>
                                </div>

                                ${builder.coreValues ? `
                                    <div class="builder-values">
                                        <h4><i class="fas fa-heart"></i> Core Values</h4>
                                        <div class="values-grid">
                                            ${builder.coreValues.map(value => `<div class="value-item">${value}</div>`).join('')}
                                        </div>
                                    </div>
                                ` : ''}

                                <div class="company-info">
                                    <div class="info-item">
                                        <div class="info-label">Established</div>
                                        <div class="info-value">${builder.established}</div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">Headquarters</div>
                                        <div class="info-value">${builder.headquarters}</div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">Founder</div>
                                        <div class="info-value">${builder.founder}</div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">Experience</div>
                                        <div class="info-value">${new Date().getFullYear() - parseInt(builder.established)}+ Years</div>
                                    </div>
                                    ${builder.landBank ? `
                                        <div class="info-item">
                                            <div class="info-label">Land Bank</div>
                                            <div class="info-value">${builder.landBank}</div>
                                        </div>
                                    ` : ''}
                                    ${builder.employeeCount ? `
                                        <div class="info-item">
                                            <div class="info-label">Employees</div>
                                            <div class="info-value">${builder.employeeCount}</div>
                                        </div>
                                    ` : ''}
                                    ${builder.totalCustomers ? `
                                        <div class="info-item">
                                            <div class="info-label">Happy Customers</div>
                                            <div class="info-value">${builder.totalCustomers}</div>
                                        </div>
                                    ` : ''}
                                    ${builder.totalSqFtDelivered ? `
                                        <div class="info-item">
                                            <div class="info-label">Total Sq Ft Delivered</div>
                                            <div class="info-value">${builder.totalSqFtDelivered}</div>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                            
                            <div class="builder-achievements">
                                <h4><i class="fas fa-trophy"></i> Awards & Recognition</h4>
                                ${builder.achievements.map(achievement => `
                                    <div class="achievement-item">
                                        <div class="achievement-icon"><i class="fas fa-medal"></i></div>
                                        <div class="achievement-text">${achievement}</div>
                                    </div>
                                `).join('')}

                                ${builder.certifications ? `
                                    <div style="margin-top: 2rem;">
                                        <h4><i class="fas fa-certificate"></i> Certifications</h4>
                                        ${builder.certifications.map(cert => `
                                            <div class="achievement-item">
                                                <div class="achievement-icon"><i class="fas fa-shield-alt"></i></div>
                                                <div class="achievement-text">${cert}</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        ${builder.timeline ? `
                            <div class="builder-timeline">
                                <h3><i class="fas fa-timeline"></i> Company Timeline</h3>
                                <div class="timeline">
                                    ${builder.timeline.map(item => `
                                        <div class="timeline-item">
                                            <div class="timeline-year">${item.year}</div>
                                            <div class="timeline-content">${item.event}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${builder.keyPeople ? `
                            <div class="key-people">
                                <h3><i class="fas fa-users"></i> Key Leadership</h3>
                                <div class="people-grid">
                                    ${builder.keyPeople.map(person => `
                                        <div class="person-card">
                                            <div class="person-name">${person.name}</div>
                                            <div class="person-designation">${person.designation}</div>
                                            <div class="person-experience">${person.experience}</div>
                                            <div class="person-description">${person.description}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Projects Tab -->
                    <div id="projects-tab" class="builder-tab-content">
                        <div class="builder-projects-filter">
                            <button class="projects-filter-btn active" onclick="newLaunchWizards.filterBuilderProjects('all', '${builder.id}')">All Projects</button>
                            <button class="projects-filter-btn" onclick="newLaunchWizards.filterBuilderProjects('new', '${builder.id}')">New Launch</button>
                            <button class="projects-filter-btn" onclick="newLaunchWizards.filterBuilderProjects('ready', '${builder.id}')">Ready to Move</button>
                            <button class="projects-filter-btn" onclick="newLaunchWizards.filterBuilderProjects('ongoing', '${builder.id}')">Under Construction</button>
                        </div>
                        <div class="builder-projects-grid" id="builderProjectsGrid">
                            ${this.renderBuilderProjects(builderProjects)}
                        </div>
                    </div>

                    <!-- Statistics Tab -->
                    <div id="statistics-tab" class="builder-tab-content">
                        <div class="builder-stats-grid">
                            <div class="stat-card-large">
                                <span class="stat-number">${builder.totalProjects}</span>
                                <span class="stat-label">Total Projects</span>
                            </div>
                            <div class="stat-card-large">
                                <span class="stat-number">${builder.completedProjects}</span>
                                <span class="stat-label">Completed Projects</span>
                            </div>
                            <div class="stat-card-large">
                                <span class="stat-number">${builder.ongoingProjects}</span>
                                <span class="stat-label">Ongoing Projects</span>
                            </div>
                            <div class="stat-card-large">
                                <span class="stat-number">${builder.upcomingProjects}</span>
                                <span class="stat-label">Upcoming Projects</span>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Tab -->
                    <div id="contact-tab" class="builder-tab-content">
                        <div class="builder-contact-info">
                            <div class="contact-card">
                                <div class="contact-icon"><i class="fas fa-phone"></i></div>
                                <div class="contact-title">Phone</div>
                                <div class="contact-detail">+91 9876543210</div>
                            </div>
                            <div class="contact-card">
                                <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                                <div class="contact-title">Email</div>
                                <div class="contact-detail">info@${builder.id}.com</div>
                            </div>
                            <div class="contact-card">
                                <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="contact-title">Address</div>
                                <div class="contact-detail">${builder.headquarters}</div>
                            </div>
                            <div class="contact-card">
                                <div class="contact-icon"><i class="fas fa-globe"></i></div>
                                <div class="contact-title">Website</div>
                                <div class="contact-detail">www.${builder.id}.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Show modal
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeBuilderModal();
            }
        });
    }

    closeBuilderModal() {
        const modal = document.getElementById('builderModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    switchBuilderTab(event, tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.builder-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.builder-tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        event.target.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
    }

    renderBuilderProjects(projects) {
        return projects.map(project => `
            <div class="builder-project-card" onclick="newLaunchWizards.showPropertyDetails(${project.id})">
                <img src="${project.image}" alt="${project.name}" class="property-image">
                <div class="property-content">
                    <div class="property-title">${project.name}</div>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${project.location}
                    </div>
                    <div class="property-details">
                        <div class="detail-item">
                            <div class="detail-value">${project.bhk}</div>
                            <div class="detail-label">Configuration</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${project.area}</div>
                            <div class="detail-label">Area</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${project.status}</div>
                            <div class="detail-label">Status</div>
                        </div>
                    </div>
                    <div class="property-price">${project.price}</div>
                </div>
            </div>
        `).join('');
    }

    filterBuilderProjects(filterType, builderId) {
        // Update active filter button
        document.querySelectorAll('.projects-filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Get builder's projects
        let builderProjects = this.properties.filter(p => 
            p.builder.toLowerCase().includes(builderId) || 
            p.builder.includes(this.builders.find(b => b.id === builderId)?.name)
        );

        // Apply filter
        if (filterType !== 'all') {
            builderProjects = builderProjects.filter(project => {
                const status = project.status.toLowerCase();
                switch (filterType) {
                    case 'new': return status.includes('new') || status.includes('launch');
                    case 'ready': return status.includes('ready');
                    case 'ongoing': return status.includes('construction') || status.includes('selling');
                    default: return true;
                }
            });
        }

        // Update grid
        const grid = document.getElementById('builderProjectsGrid');
        if (grid) {
            if (builderProjects.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <i class="fas fa-search" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 1rem;"></i>
                        <div style="font-size: 1.25rem; font-weight: 600; color: #4a5568;">
                            No projects found for this filter
                        </div>
                    </div>
                `;
            } else {
                grid.innerHTML = this.renderBuilderProjects(builderProjects);
            }
        }
    }

    filterByStatus(status) {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        console.log('📊 Filtering by status:', status);
    }

    calculateEMI() {
        const price = parseFloat(document.getElementById('propertyPrice')?.value) || 25000000;
        const downPaymentPercent = parseFloat(document.getElementById('downPayment')?.value) || 20;
        const tenure = parseFloat(document.getElementById('loanTenure')?.value) || 20;
        const rate = parseFloat(document.getElementById('interestRate')?.value) || 8.5;

        const principal = price - (price * downPaymentPercent / 100);
        const monthlyRate = rate / 100 / 12;
        const months = tenure * 12;

        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

        const resultElement = document.getElementById('emiResult');
        if (resultElement) {
            resultElement.textContent = `₹${emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
        }
    }

    showPropertyDetails(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        console.log('🏠 Showing details for:', property?.name);
        // Implementation for property details modal
    }

    contactBuilder(propertyId) {
        console.log('📞 Contacting builder for property:', propertyId);
        window.location.href = 'tel:+919876543210';
    }

    saveProperty(propertyId) {
        console.log('💾 Saving property:', propertyId);
        // Implementation for saving property
    }

    submitContact(event) {
        event.preventDefault();
        console.log('📧 Submitting contact form...');
        alert('Thank you! We will contact you soon.');
    }

    startVirtualTour() {
        console.log('🥽 Starting virtual tour...');
        alert('Virtual tour feature coming soon!');
    }

    subscribeNewsletter(event) {
        event.preventDefault();
        console.log('📧 Newsletter subscription...');
        alert('Successfully subscribed to newsletter!');
    }

    clearAllFilters() {
        // Reset all sidebar filters
        const filters = ['sidebarBuilderFilter', 'sidebarTypeFilter', 'sidebarBhkFilter', 'sidebarBudgetFilter', 'sidebarStatusFilter'];
        filters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) filter.value = '';
        });

        // Show all properties
        this.updatePropertiesGrid(this.properties);
        console.log('🔄 All filters cleared');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.newLaunchWizards = new NewLaunchWizards();
});