// Plots & Land page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    generatePlotProperties();
});

const plotProperties = [
    {
        id: 1,
        title: "DTCP Approved Plot in Shamshabad",
        location: "Shamshabad, Hyderabad",
        price: 3500000,
        area: 300,
        areaUnit: "sq yard",
        pricePerSqYd: 11667,
        type: "residential",
        amenities: ["DTCP Approved", "Gated Community", "Road Touch"],
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "approved",
        facing: "East Facing",
        dimensions: "30x40 sq yard"
    },
    {
        id: 2,
        title: "Corner Plot in Outer Ring Road",
        location: "Outer Ring Road, Hyderabad",
        price: 8500000,
        area: 500,
        areaUnit: "sq yard",
        pricePerSqYd: 17000,
        type: "residential",
        amenities: ["Corner Plot", "Venture", "Road Touch"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "premium",
        facing: "North East Facing",
        dimensions: "40x50 sq yard"
    },
    {
        id: 3,
        title: "Agricultural Land in Mokila",
        location: "Mokila, Hyderabad",
        price: 12000000,
        area: 2,
        areaUnit: "acre",
        pricePerSqYd: 1238,  // Calculated for acre
        type: "agricultural",
        amenities: ["Bore Well", "Electricity", "Road Access"],
        image: "https://images.unsplash.com/photo-1574263867128-ccdc1c5d4e88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "investment",
        facing: "Multiple Facing",
        dimensions: "2 Acres"
    },
    {
        id: 4,
        title: "Commercial Plot in Shankarpally",
        location: "Shankarpally, Hyderabad",
        price: 15000000,
        area: 800,
        areaUnit: "sq yard",
        pricePerSqYd: 18750,
        type: "commercial",
        amenities: ["Highway Touch", "High Visibility", "Approved"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "featured",
        facing: "Main Road Facing",
        dimensions: "50x64 sq yard"
    },
    {
        id: 5,
        title: "Gated Community Plot in Tukkuguda",
        location: "Tukkuguda, Hyderabad",
        price: 4500000,
        area: 250,
        areaUnit: "sq yard",
        pricePerSqYd: 18000,
        type: "residential",
        amenities: ["Gated Community", "Security", "Park Facing"],
        image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "new",
        facing: "Park Facing",
        dimensions: "25x40 sq yard"
    },
    {
        id: 6,
        title: "Industrial Plot near Shamirpet",
        location: "Shamirpet, Hyderabad",
        price: 25000000,
        area: 1200,
        areaUnit: "sq yard",
        pricePerSqYd: 20833,
        type: "industrial",
        amenities: ["Industrial Zone", "Power Supply", "Water Connection"],
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "ready",
        facing: "North Facing",
        dimensions: "60x80 sq yard"
    }
];

function generatePlotProperties() {
    renderPlotProperties(plotProperties);
}

function renderPlotProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    grid.innerHTML = properties.map(property => `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-badges">
                    <span class="badge ${property.badge}">${getBadgeText(property.badge)}</span>
                </div>
            </div>
            <div class="property-info">
                <div class="property-price">${formatPrice(property.price)}</div>
                <div class="price-per-unit">₹${property.pricePerSqYd.toLocaleString()}/${property.areaUnit === 'acre' ? 'acre' : 'sq yd'}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-details">
                    <span class="detail-item">
                        <i class="fas fa-expand-arrows-alt"></i>
                        ${formatPlotArea(property.area, property.areaUnit)}
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-compass"></i>
                        ${property.facing}
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-ruler"></i>
                        ${property.dimensions}
                    </span>
                </div>
                <div class="plot-details">
                    <div class="detail-row">
                        <span class="label">Type:</span>
                        <span class="value">${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                    </div>
                </div>
                <div class="property-amenities">
                    ${property.amenities.slice(0, 3).map(amenity => `
                        <span class="amenity-tag">${amenity}</span>
                    `).join('')}
                </div>
                <div class="property-footer">
                    <button class="contact-agent">Contact Owner</button>
                    <span class="property-age">Plot/Land</span>
                </div>
            </div>
        </div>
    `).join('');
}

function formatPrice(price) {
    if (price >= 10000000) {
        return '₹' + (price / 10000000).toFixed(1) + ' Cr';
    } else if (price >= 100000) {
        return '₹' + (price / 100000).toFixed(0) + ' Lac';
    }
    return '₹' + price.toLocaleString();
}

function formatPlotArea(area, unit) {
    if (unit === 'acre') {
        return area + ' Acre' + (area > 1 ? 's' : '');
    } else if (unit === 'sq yard') {
        return area.toLocaleString() + ' Sq Yard';
    } else {
        return area.toLocaleString() + ' Sq Ft';
    }
}

function getBadgeText(badge) {
    const badgeTexts = {
        'approved': 'DTCP Approved',
        'premium': 'Premium',
        'investment': 'Investment',
        'featured': 'Featured',
        'new': 'New',
        'ready': 'Ready'
    };
    return badgeTexts[badge] || badge;
}

const plotStyles = `
.price-per-unit {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.75rem;
    font-weight: 500;
}

.plot-details {
    margin-bottom: 1rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
}

.detail-row .label {
    color: #6b7280;
}

.detail-row .value {
    color: #1f2937;
    font-weight: 500;
    text-transform: capitalize;
}

.badge.approved {
    background: #059669;
}

.badge.investment {
    background: #dc2626;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = plotStyles;
document.head.appendChild(styleSheet);