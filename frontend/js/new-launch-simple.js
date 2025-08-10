// Simple New Launch Page - Virtual Tour Style Builder Boxes

class SimpleNewLaunch {
    constructor() {
        this.builders = [
            {
                id: 'myhome',
                name: 'MyHome Group',
                logo: 'MH',
                description: 'Premium luxury villas and apartments in Hyderabad',
                projects: '78+ Projects',
                established: 'Since 1999',
                speciality: 'Luxury Villas & Premium Apartments'
            },
            {
                id: 'aparna',
                name: 'Aparna Constructions',
                logo: 'AC',
                description: 'Sustainable and innovative residential developments',
                projects: '52+ Projects',
                established: 'Since 1996',
                speciality: 'Green Buildings & Smart Homes'
            },
            {
                id: 'prestige',
                name: 'Prestige Group',
                logo: 'PG',
                description: 'Ultra luxury residences and commercial complexes',
                projects: '185+ Projects',
                established: 'Since 1986',
                speciality: 'Ultra Luxury Residences'
            },
            {
                id: 'brigade',
                name: 'Brigade Group',
                logo: 'BG',
                description: 'Integrated communities and mixed-use developments',
                projects: '98+ Projects',
                established: 'Since 1986',
                speciality: 'Integrated Townships'
            },
            {
                id: 'rajapushpa',
                name: 'Rajapushpa Properties',
                logo: 'RP',
                description: 'Affordable premium homes in strategic locations',
                projects: '28+ Projects',
                established: 'Since 2008',
                speciality: 'Premium Affordable Housing'
            }
        ];

        this.init();
    }

    init() {
        console.log('🏗️ Initializing Simple New Launch Page...');
        this.setupHeroSection();
        this.createBuilderBoxes();
        this.setupAnimations();
    }

    setupHeroSection() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.innerHTML = `
                <h1 class="hero-title">New Launch Properties</h1>
                <p class="hero-subtitle">Explore premium projects from Hyderabad's top builders</p>
            `;
        }
    }

    createBuilderBoxes() {
        const buildersGrid = document.querySelector('#buildersGrid');
        if (!buildersGrid) return;

        buildersGrid.innerHTML = this.builders.map(builder => this.createBuilderBox(builder)).join('');
    }

    createBuilderBox(builder) {
        return `
            <div class="builder-wizard-box fade-in" onclick="simpleNewLaunch.openBuilder('${builder.id}')">
                <div class="wizard-icon-section">
                    <div class="builder-logo-icon">${builder.logo}</div>
                </div>
                <div class="wizard-content-section">
                    <div class="builder-name">${builder.name}</div>
                    <div class="builder-description">${builder.description}</div>
                    <div class="builder-stats">
                        <div class="builder-stat">
                            <span class="stat-value">${builder.projects}</span>
                        </div>
                        <div class="builder-stat">
                            <span class="stat-value">${builder.established}</span>
                        </div>
                    </div>
                    <div class="builder-speciality">${builder.speciality}</div>
                </div>
                <div class="wizard-action-section">
                    <button class="builder-explore-btn">
                        <i class="fas fa-play-circle"></i>
                        Explore Projects
                    </button>
                </div>
            </div>
        `;
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

    openBuilder(builderId) {
        const builder = this.builders.find(b => b.id === builderId);
        if (builder) {
            console.log('🏢 Opening builder:', builder.name);
            
            // Create modal similar to Virtual Tour style
            this.createBuilderModal(builder);
        }
    }

    createBuilderModal(builder) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('builderModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'builderModal';
            modal.className = 'builder-modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="builder-modal-content">
                <div class="virtual-tour-header">
                    <div class="tour-icon-large">
                        <div class="builder-logo-3d">${builder.logo}</div>
                    </div>
                    <div class="tour-title-large">${builder.name}</div>
                    <div class="tour-description-large">${builder.description}</div>
                    <button class="tour-close-btn" onclick="simpleNewLaunch.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="virtual-tour-body">
                    <div class="tour-message">
                        <div class="tour-message-icon">
                            <i class="fas fa-vr-cardboard"></i>
                        </div>
                        <div class="tour-message-title">Virtual Builder Experience</div>
                        <div class="tour-message-text">
                            Take an immersive virtual tour of ${builder.name}'s premium projects and office spaces. 
                            Explore properties, meet the team, and discover why we're the trusted choice for your dream home.
                        </div>
                        <div class="tour-actions">
                            <button class="tour-button primary" onclick="simpleNewLaunch.startVirtualTour('${builder.id}')">
                                <i class="fas fa-play"></i> Start Virtual Experience
                            </button>
                            <button class="tour-button secondary" onclick="simpleNewLaunch.viewProjects('${builder.id}')">
                                <i class="fas fa-home"></i> View Projects
                            </button>
                            <button class="tour-button secondary" onclick="simpleNewLaunch.contactBuilder('${builder.id}')">
                                <i class="fas fa-phone"></i> Contact Builder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Show modal
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('builderModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    startVirtualTour(builderId) {
        const builder = this.builders.find(b => b.id === builderId);
        console.log('🥽 Starting virtual tour for:', builder.name);
        alert(`Virtual Tour Experience Starting...\n\nWelcome to ${builder.name}!\n\nExplore our office, meet our team, and take virtual property tours. This immersive experience will give you a complete understanding of our company and projects.`);
        this.closeModal();
    }

    viewProjects(builderId) {
        const builder = this.builders.find(b => b.id === builderId);
        console.log('🏠 Viewing projects for:', builder.name);
        alert(`${builder.name} Projects:\n\n• Premium residential developments\n• Modern amenities and features\n• Prime locations in Hyderabad\n• Competitive pricing\n\nContact us to schedule a site visit!`);
        this.closeModal();
    }

    contactBuilder(builderId) {
        const builder = this.builders.find(b => b.id === builderId);
        console.log('📞 Contacting:', builder.name);
        
        if (confirm(`Connect with ${builder.name}?\n\nWe'll help you find the perfect property that matches your requirements.`)) {
            window.location.href = 'tel:+919876543210';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.simpleNewLaunch = new SimpleNewLaunch();
});