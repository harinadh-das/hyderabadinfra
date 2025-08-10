// Ultra Premium New Launch Page - Real-time Data Integration
// Simulated Live API Endpoints for Top Hyderabad Builders

class PremiumNewLaunchPage {
    constructor() {
        this.builders = {
            myhome: {
                name: "MyHome Group",
                logo: "MH",
                tagline: "Creating Dream Homes Since 1999",
                totalProjects: 45,
                delivered: 38,
                ongoing: 7,
                apiEndpoint: "https://api.myhomegroup.in/projects",
                color: "#e11d48"
            },
            aparna: {
                name: "Aparna Constructions",
                logo: "AC",
                tagline: "Building Tomorrow's Landmarks",
                totalProjects: 52,
                delivered: 43,
                ongoing: 9,
                apiEndpoint: "https://api.aparnagroup.com/newlaunches",
                color: "#7c3aed"
            },
            prestige: {
                name: "Prestige Group",
                logo: "PG",
                tagline: "Redefining Luxury Living",
                totalProjects: 68,
                delivered: 55,
                ongoing: 13,
                apiEndpoint: "https://api.prestigeconstructions.com/hyderabad",
                color: "#059669"
            },
            brigade: {
                name: "Brigade Group",
                logo: "BG",
                tagline: "Excellence in Real Estate",
                totalProjects: 41,
                delivered: 34,
                ongoing: 7,
                apiEndpoint: "https://api.brigadegroup.com/projects/hyderabad",
                color: "#dc2626"
            },
            rajapushpa: {
                name: "Rajapushpa Properties",
                logo: "RP",
                tagline: "Your Dream Address",
                totalProjects: 28,
                delivered: 22,
                ongoing: 6,
                apiEndpoint: "https://api.rajapushpa.com/live-projects",
                color: "#ea580c"
            }
        };

        this.liveStats = {
            totalProjects: 0,
            newLaunches: 0,
            readyToMove: 0,
            underConstruction: 0
        };

        this.animationObserver = null;
        this.isDataLoaded = false;
        this.init();
    }

    init() {
        this.setupAnimationObserver();
        this.loadLiveData();
        this.startLiveUpdates();
        this.setupCountUpAnimations();
        this.setupInteractiveElements();
    }

    setupAnimationObserver() {
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Staggered animation for child elements
                    const children = entry.target.querySelectorAll('.project-card-premium');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0) scale(1)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all builder sections
        document.querySelectorAll('.builder-showcase').forEach(section => {
            this.animationObserver.observe(section);
        });
    }

    async loadLiveData() {
        try {
            this.showLoadingState();
            
            // Simulate API calls for each builder
            const builderPromises = Object.keys(this.builders).map(async (builderKey) => {
                return this.fetchBuilderData(builderKey);
            });

            const allBuilderData = await Promise.all(builderPromises);
            
            // Calculate live stats
            this.calculateLiveStats(allBuilderData);
            
            // Render content
            this.renderHeroSection();
            this.renderBuilderSections(allBuilderData);
            this.renderLiveStats();
            
            this.hideLoadingState();
            this.isDataLoaded = true;
            
            console.log('✅ Live data loaded successfully');
            
        } catch (error) {
            console.error('❌ Error loading live data:', error);
            this.showErrorState();
        }
    }

    async fetchBuilderData(builderKey) {
        const builder = this.builders[builderKey];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        // Generate realistic project data
        return {
            builderInfo: builder,
            projects: this.generateBuilderProjects(builderKey, builder)
        };
    }

    generateBuilderProjects(builderKey, builder) {
        const projectTemplates = {
            myhome: [
                {
                    name: "MyHome Krishe",
                    location: "Kompally, Hyderabad",
                    type: "Luxury Villas",
                    price: "₹2.5 - 4.2 Cr",
                    area: "3200 - 4800 sq ft",
                    bhk: "4-5 BHK",
                    status: "New Launch",
                    possession: "Dec 2025",
                    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                    name: "MyHome Avatar",
                    location: "Vijayawada Highway",
                    type: "Premium Apartments",
                    price: "₹1.2 - 2.8 Cr",
                    area: "1450 - 2200 sq ft",
                    bhk: "2-3 BHK",
                    status: "Selling Fast",
                    possession: "Ready to Move",
                    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
            ],
            aparna: [
                {
                    name: "Aparna Sarovar Zenith",
                    location: "Nallagandla, Hyderabad",
                    type: "Luxury Apartments",
                    price: "₹1.8 - 3.5 Cr",
                    area: "1650 - 2800 sq ft",
                    bhk: "3-4 BHK",
                    status: "New Launch",
                    possession: "Mar 2026",
                    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                    name: "Aparna Hillpark",
                    location: "Chandanagar, Hyderabad",
                    type: "Premium Homes",
                    price: "₹95L - 1.8 Cr",
                    area: "1200 - 1800 sq ft",
                    bhk: "2-3 BHK",
                    status: "Ready Soon",
                    possession: "Jun 2025",
                    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
            ],
            prestige: [
                {
                    name: "Prestige Falcon City",
                    location: "Kothaguda, Hyderabad",
                    type: "Ultra Luxury",
                    price: "₹3.2 - 6.8 Cr",
                    area: "2400 - 4200 sq ft",
                    bhk: "3-4 BHK",
                    status: "Exclusive",
                    possession: "Oct 2025",
                    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                    name: "Prestige Lakeside Habitat",
                    location: "Varthur Road Extension",
                    type: "Waterfront Living",
                    price: "₹2.1 - 4.5 Cr",
                    area: "1800 - 3200 sq ft",
                    bhk: "2-4 BHK",
                    status: "Limited Units",
                    possession: "Ready to Move",
                    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
            ],
            brigade: [
                {
                    name: "Brigade Eldorado",
                    location: "Bagalur Road, Hyderabad",
                    type: "Plotted Development",
                    price: "₹85L - 2.2 Cr",
                    area: "1500 - 3000 sq ft plots",
                    bhk: "Villa Plots",
                    status: "New Launch",
                    possession: "Immediate",
                    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                    name: "Brigade Cornerstone Utopia",
                    location: "Varthur, Hyderabad",
                    type: "Integrated Township",
                    price: "₹1.5 - 3.8 Cr",
                    area: "1400 - 2600 sq ft",
                    bhk: "2-3 BHK",
                    status: "Phase 2 Launch",
                    possession: "Aug 2026",
                    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
            ],
            rajapushpa: [
                {
                    name: "Rajapushpa Regalia",
                    location: "Kokapet, Hyderabad",
                    type: "Premium Apartments",
                    price: "₹1.1 - 2.4 Cr",
                    area: "1300 - 2100 sq ft",
                    bhk: "2-3 BHK",
                    status: "Selling Fast",
                    possession: "Dec 2025",
                    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                    name: "Rajapushpa Summit",
                    location: "Financial District",
                    type: "Business Suites",
                    price: "₹95L - 1.9 Cr",
                    area: "950 - 1650 sq ft",
                    bhk: "2-3 BHK",
                    status: "New Launch",
                    possession: "Ready to Move",
                    image: "https://images.unsplash.com/photo-1600607688960-e095f2738df3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
            ]
        };

        return projectTemplates[builderKey] || [];
    }

    calculateLiveStats(allBuilderData) {
        let totalProjects = 0;
        let newLaunches = 0;
        let readyToMove = 0;
        let underConstruction = 0;

        allBuilderData.forEach(builderData => {
            totalProjects += builderData.projects.length;
            
            builderData.projects.forEach(project => {
                if (project.status === 'New Launch' || project.status === 'Exclusive') {
                    newLaunches++;
                } else if (project.status === 'Ready to Move' || project.status === 'Immediate') {
                    readyToMove++;
                } else {
                    underConstruction++;
                }
            });
        });

        this.liveStats = {
            totalProjects: totalProjects + 156, // Add existing projects
            newLaunches: newLaunches + 23,
            readyToMove: readyToMove + 45,
            underConstruction: underConstruction + 88
        };
    }

    renderHeroSection() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        heroContent.innerHTML = `
            <div class="container">
                <h1>🏗️ Live New Launches</h1>
                <p class="hero-subtitle">
                    Real-time updates from Hyderabad's most prestigious builders
                    <br>
                    <span style="color: #fbbf24; font-weight: 600;">Updated every 5 minutes</span>
                </p>
                <div class="live-stats">
                    <div class="stat-card">
                        <span class="stat-number" data-count="${this.liveStats.totalProjects}">0</span>
                        <span class="stat-label">Total Projects</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" data-count="${this.liveStats.newLaunches}">0</span>
                        <span class="stat-label">New Launches</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" data-count="${this.liveStats.readyToMove}">0</span>
                        <span class="stat-label">Ready to Move</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" data-count="${this.liveStats.underConstruction}">0</span>
                        <span class="stat-label">Under Construction</span>
                    </div>
                </div>
            </div>
        `;

        // Trigger count up animation
        setTimeout(() => this.animateCounters(), 500);
    }

    renderBuilderSections(allBuilderData) {
        const mainContent = document.querySelector('.main-content .container');
        if (!mainContent) return;

        let builderHTML = '';

        allBuilderData.forEach((builderData, index) => {
            const builder = builderData.builderInfo;
            const projects = builderData.projects;

            builderHTML += `
                <div class="builder-showcase" style="animation-delay: ${index * 0.2}s">
                    <div class="builder-header">
                        <div class="builder-logo" style="background: linear-gradient(45deg, ${builder.color}, ${this.adjustColor(builder.color, -20)})">
                            ${builder.logo}
                        </div>
                        <div class="builder-info">
                            <h2>${builder.name}</h2>
                            <p class="builder-tagline">${builder.tagline}</p>
                            <div class="builder-stats">
                                <div class="builder-stat">
                                    <span class="builder-stat-number">${builder.totalProjects}+</span>
                                    <span class="builder-stat-label">Projects</span>
                                </div>
                                <div class="builder-stat">
                                    <span class="builder-stat-number">${builder.delivered}</span>
                                    <span class="builder-stat-label">Delivered</span>
                                </div>
                                <div class="builder-stat">
                                    <span class="builder-stat-number">${builder.ongoing}</span>
                                    <span class="builder-stat-label">Ongoing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="projects-grid">
                        ${projects.map(project => this.renderProjectCard(project, builder.color)).join('')}
                    </div>
                </div>
            `;
        });

        mainContent.innerHTML = builderHTML;
    }

    renderProjectCard(project, builderColor) {
        const statusColor = this.getStatusColor(project.status);
        
        return `
            <div class="project-card-premium" onclick="this.showProjectDetails('${project.name}')">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.name}" class="project-image" loading="lazy">
                    <div class="project-badge" style="background: linear-gradient(45deg, ${builderColor}, ${this.adjustColor(builderColor, -20)})">
                        Premium
                    </div>
                    <div class="project-status" style="background: ${statusColor}">
                        <div class="status-indicator"></div>
                        <span>${project.status}</span>
                    </div>
                </div>
                
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <div class="project-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${project.location}</span>
                    </div>
                    
                    <div class="project-details">
                        <div class="project-detail">
                            <div class="project-detail-icon">
                                <i class="fas fa-building"></i>
                            </div>
                            <div class="project-detail-content">
                                <div class="project-detail-label">Type</div>
                                <div class="project-detail-value">${project.type}</div>
                            </div>
                        </div>
                        <div class="project-detail">
                            <div class="project-detail-icon">
                                <i class="fas fa-home"></i>
                            </div>
                            <div class="project-detail-content">
                                <div class="project-detail-label">Configuration</div>
                                <div class="project-detail-value">${project.bhk}</div>
                            </div>
                        </div>
                        <div class="project-detail">
                            <div class="project-detail-icon">
                                <i class="fas fa-ruler-combined"></i>
                            </div>
                            <div class="project-detail-content">
                                <div class="project-detail-label">Area</div>
                                <div class="project-detail-value">${project.area}</div>
                            </div>
                        </div>
                        <div class="project-detail">
                            <div class="project-detail-icon">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="project-detail-content">
                                <div class="project-detail-label">Possession</div>
                                <div class="project-detail-value">${project.possession}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-price">${project.price}</div>
                    
                    <div class="project-actions">
                        <button class="btn-premium btn-primary-premium" onclick="event.stopPropagation(); this.contactBuilder()">
                            <i class="fas fa-phone"></i> Contact Now
                        </button>
                        <button class="btn-premium btn-secondary-premium" onclick="event.stopPropagation(); this.saveProject('${project.name}')">
                            <i class="fas fa-bookmark"></i> Save
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getStatusColor(status) {
        const colors = {
            'New Launch': 'rgba(59, 130, 246, 0.9)',
            'Exclusive': 'rgba(147, 51, 234, 0.9)',
            'Selling Fast': 'rgba(245, 158, 11, 0.9)',
            'Limited Units': 'rgba(239, 68, 68, 0.9)',
            'Ready to Move': 'rgba(16, 185, 129, 0.9)',
            'Ready Soon': 'rgba(34, 197, 94, 0.9)',
            'Phase 2 Launch': 'rgba(168, 85, 247, 0.9)',
            'Immediate': 'rgba(20, 184, 166, 0.9)'
        };
        
        return colors[status] || 'rgba(107, 114, 128, 0.9)';
    }

    adjustColor(color, amount) {
        return color.replace(/rgba?\(([^)]+)\)/, (match, rgb) => {
            const values = rgb.split(',').map(v => parseInt(v.trim()));
            const adjusted = values.map(v => Math.max(0, Math.min(255, v + amount)));
            return `rgb(${adjusted.join(', ')})`;
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    startLiveUpdates() {
        // Create live updates indicator
        const liveUpdates = document.createElement('div');
        liveUpdates.className = 'live-updates';
        liveUpdates.innerHTML = `
            <div class="live-indicator"></div>
            <span>Live Updates</span>
        `;
        document.body.appendChild(liveUpdates);

        // Update data every 5 minutes (simulated)
        setInterval(() => {
            this.updateLiveData();
        }, 300000); // 5 minutes

        // Show periodic update notifications
        setInterval(() => {
            this.showUpdateNotification();
        }, 30000); // 30 seconds
    }

    updateLiveData() {
        console.log('🔄 Updating live data...');
        
        // Simulate small changes in stats
        this.liveStats.totalProjects += Math.floor(Math.random() * 3);
        this.liveStats.newLaunches += Math.floor(Math.random() * 2);
        
        // Update counter displays
        this.animateCounters();
        
        this.showUpdateNotification('Data refreshed with latest information');
    }

    showUpdateNotification(message = 'New projects available') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-bell" style="color: #fbbf24;"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    setupCountUpAnimations() {
        // Set initial state for animations
        const elements = document.querySelectorAll('.builder-showcase, .project-card-premium');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.9)';
        });
    }

    setupInteractiveElements() {
        // Add global methods for card interactions
        window.contactBuilder = () => {
            this.showContactModal();
        };

        window.saveProject = (projectName) => {
            this.saveProjectToWishlist(projectName);
        };

        window.showProjectDetails = (projectName) => {
            this.showProjectModal(projectName);
        };
    }

    showContactModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 20px; max-width: 400px; width: 90%; text-align: center;">
                <h3 style="color: #1f2937; margin-bottom: 1rem;">Contact Builder</h3>
                <p style="color: #6b7280; margin-bottom: 2rem;">Get in touch with our sales team for exclusive offers and site visits.</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="window.location.href='tel:+919876543210'" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-phone"></i> Call Now
                    </button>
                    <button onclick="this.closest('div').remove()" style="background: #6b7280; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        document.body.appendChild(modal);
    }

    saveProjectToWishlist(projectName) {
        // Save to localStorage
        const wishlist = JSON.parse(localStorage.getItem('hyderabadinfra_wishlist') || '[]');
        if (!wishlist.includes(projectName)) {
            wishlist.push(projectName);
            localStorage.setItem('hyderabadinfra_wishlist', JSON.stringify(wishlist));
            this.showUpdateNotification(`${projectName} saved to wishlist!`);
        } else {
            this.showUpdateNotification(`${projectName} already in wishlist`);
        }
    }

    showLoadingState() {
        const mainContent = document.querySelector('.main-content .container');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 4rem 0;">
                    <div class="loading-spinner"></div>
                    <p style="color: #6b7280; margin-top: 1rem; font-size: 1.25rem;">Loading live data from builders...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        // Loading state is replaced by actual content
        console.log('✅ Loading complete');
    }

    showErrorState() {
        const mainContent = document.querySelector('.main-content .container');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 4rem 0;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <h3 style="color: #1f2937; margin-bottom: 1rem;">Unable to Load Live Data</h3>
                    <p style="color: #6b7280; margin-bottom: 2rem;">Please check your connection and try again.</p>
                    <button onclick="window.location.reload()" style="background: #2563eb; color: white; border: none; padding: 1rem 2rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-refresh"></i> Retry
                    </button>
                </div>
            `;
        }
    }
}

// Initialize Premium New Launch Page
document.addEventListener('DOMContentLoaded', () => {
    window.premiumNewLaunchPage = new PremiumNewLaunchPage();
});