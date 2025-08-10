// Commercial page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    generateCommercialProperties();
});

const commercialProperties = [
    {
        id: 1,
        title: "Premium Office Space in Hitech City",
        location: "Hitech City, Hyderabad",
        price: 28000000,
        area: 3500,
        type: "office",
        amenities: ["Parking", "Power Backup", "Security", "AC"],
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "premium",
        floors: "5th & 6th Floor",
        parking: "15 Spaces"
    },
    {
        id: 2,
        title: "Modern Retail Space in Gachibowli",
        location: "Gachibowli, Hyderabad",
        price: 15000000,
        area: 2200,
        type: "retail",
        amenities: ["Parking", "Security", "High Visibility"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "new",
        floors: "Ground Floor",
        parking: "8 Spaces"
    },
    {
        id: 3,
        title: "Warehouse in Financial District",
        location: "Financial District, Hyderabad",
        price: 45000000,
        area: 8500,
        type: "warehouse",
        amenities: ["Loading Dock", "Security", "Power Backup"],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "featured",
        floors: "Ground + Mezzanine",
        parking: "Truck Parking"
    },
    {
        id: 4,
        title: "Co-working Space in Madhapur",
        location: "Madhapur, Hyderabad",
        price: 8500000,
        area: 1800,
        type: "coworking",
        amenities: ["Furnished", "WiFi", "Meeting Rooms", "Cafeteria"],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        badge: "ready",
        floors: "3rd Floor",
        parking: "10 Spaces"
    }
];

function generateCommercialProperties() {
    renderCommercialProperties(commercialProperties);
}

function renderCommercialProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    grid.innerHTML = properties.map(property => `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-badges">
                    <span class="badge ${property.badge}">${property.badge}</span>
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
                        <i class="fas fa-building"></i>
                        ${property.type}
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        ${formatArea(property.area)}
                    </span>
                    <span class="detail-item">
                        <i class="fas fa-layer-group"></i>
                        ${property.floors}
                    </span>
                </div>
                <div class="commercial-details">
                    <div class="detail-row">
                        <span class="label">Parking:</span>
                        <span class="value">${property.parking}</span>
                    </div>
                </div>
                <div class="property-amenities">
                    ${property.amenities.slice(0, 3).map(amenity => `
                        <span class="amenity-tag">${amenity}</span>
                    `).join('')}
                </div>
                <div class="property-footer">
                    <button class="contact-agent">Contact Agent</button>
                    <span class="property-age">Commercial</span>
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

function formatArea(area) {
    return area.toLocaleString() + ' sq ft';
}

const commercialStyles = `
.commercial-details {
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
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = commercialStyles;
document.head.appendChild(styleSheet);