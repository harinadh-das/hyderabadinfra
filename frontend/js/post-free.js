// Post Free page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePostFreeForm();
    initializePropertyTypes();
    initializeBHKSelection();
    initializePhotoUpload();
});

// Initialize the post free form functionality
function initializePostFreeForm() {
    const form = document.getElementById('propertyForm');
    const listingTypeRadios = document.querySelectorAll('input[name="listingType"]');
    
    // Handle listing type change (Sell/Rent)
    listingTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormForListingType(this.value);
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitPropertyForm();
    });
}

// Update form based on listing type (sell/rent)
function updateFormForListingType(listingType) {
    const priceLabel = document.querySelector('.form-label');
    const priceInput = document.querySelector('input[name="price"]');
    
    if (listingType === 'rent') {
        // Update labels and options for rent
        const priceLabelElement = priceInput.closest('.form-group').querySelector('.form-label');
        priceLabelElement.textContent = 'Expected Rent (Monthly)';
        priceInput.placeholder = '25';
        
        // Update price unit options
        const priceUnit = document.querySelector('select[name="priceUnit"]');
        priceUnit.innerHTML = `
            <option value="thousand">Thousand</option>
            <option value="lac">Lac</option>
        `;
    } else {
        // Update labels and options for sale
        const priceLabelElement = priceInput.closest('.form-group').querySelector('.form-label');
        priceLabelElement.textContent = 'Expected Price';
        priceInput.placeholder = '85';
        
        // Update price unit options
        const priceUnit = document.querySelector('select[name="priceUnit"]');
        priceUnit.innerHTML = `
            <option value="lac">Lac</option>
            <option value="crore">Crore</option>
            <option value="thousand">Thousand</option>
        `;
    }
}

// Initialize property type selection
function initializePropertyTypes() {
    const typeButtons = document.querySelectorAll('.type-btn');
    const propertySubType = document.getElementById('propertySubType');
    const bhkGroup = document.getElementById('bhkGroup');
    
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update sub-type options based on selected type
            const selectedType = this.dataset.type;
            updateSubTypeOptions(selectedType, propertySubType);
            
            // Show/hide BHK group based on property type
            if (selectedType === 'residential') {
                bhkGroup.style.display = 'block';
            } else {
                bhkGroup.style.display = 'none';
            }
        });
    });
}

// Update sub-type dropdown based on property type
function updateSubTypeOptions(propertyType, selectElement) {
    let options = '';
    
    switch(propertyType) {
        case 'residential':
            options = `
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">Independent House</option>
                <option value="builder-floor">Builder Floor</option>
                <option value="penthouse">Penthouse</option>
            `;
            break;
        case 'commercial':
            options = `
                <option value="office">Office Space</option>
                <option value="retail">Retail Space</option>
                <option value="warehouse">Warehouse</option>
                <option value="coworking">Co-working Space</option>
                <option value="industrial">Industrial Building</option>
            `;
            break;
        case 'land':
            options = `
                <option value="residential-plot">Residential Plot</option>
                <option value="commercial-plot">Commercial Plot</option>
                <option value="agricultural">Agricultural Land</option>
                <option value="industrial-plot">Industrial Plot</option>
            `;
            break;
    }
    
    selectElement.innerHTML = options;
}

// Initialize BHK selection
function initializeBHKSelection() {
    const bhkButtons = document.querySelectorAll('.bhk-btn');
    
    bhkButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            bhkButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Store selected BHK value
            const selectedBHK = this.dataset.value;
            
            // You can store this value in a hidden input or use it as needed
            let bhkInput = document.querySelector('input[name="bhk"]');
            if (!bhkInput) {
                bhkInput = document.createElement('input');
                bhkInput.type = 'hidden';
                bhkInput.name = 'bhk';
                document.getElementById('propertyForm').appendChild(bhkInput);
            }
            bhkInput.value = selectedBHK;
        });
    });
}

// Initialize photo upload functionality
function initializePhotoUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    let uploadedFiles = [];
    
    // Click to upload
    uploadArea.addEventListener('click', function() {
        photoInput.click();
    });
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2563eb';
        this.style.backgroundColor = '#eff6ff';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#d1d5db';
        this.style.backgroundColor = 'transparent';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#d1d5db';
        this.style.backgroundColor = 'transparent';
        
        const files = Array.from(e.dataTransfer.files);
        handleFileSelection(files);
    });
    
    // File input change
    photoInput.addEventListener('change', function() {
        const files = Array.from(this.files);
        handleFileSelection(files);
    });
    
    // Handle file selection
    function handleFileSelection(files) {
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                if (uploadedFiles.length < 10) { // Limit to 10 photos
                    uploadedFiles.push(file);
                    displayPhotoPreview(file, uploadedFiles.length - 1);
                }
            }
        });
    }
    
    // Display photo preview
    function displayPhotoPreview(file, index) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <img src="${e.target.result}" alt="Property Photo">
                <button type="button" class="photo-remove" onclick="removePhoto(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            photoPreview.appendChild(photoItem);
        };
        reader.readAsDataURL(file);
    }
    
    // Remove photo function (global scope)
    window.removePhoto = function(index) {
        uploadedFiles.splice(index, 1);
        refreshPhotoPreview();
    };
    
    // Refresh photo preview
    function refreshPhotoPreview() {
        photoPreview.innerHTML = '';
        uploadedFiles.forEach((file, index) => {
            displayPhotoPreview(file, index);
        });
    }
}

// Submit property form
function submitPropertyForm() {
    const form = document.getElementById('propertyForm');
    const formData = new FormData(form);
    
    // Add uploaded files to form data
    const photoInput = document.getElementById('photoInput');
    if (photoInput.files.length > 0) {
        for (let i = 0; i < photoInput.files.length; i++) {
            formData.append('photos', photoInput.files[i]);
        }
    }
    
    // Get all form data
    const propertyData = {};
    for (let [key, value] of formData.entries()) {
        if (propertyData[key]) {
            // Handle multiple values (like amenities)
            if (Array.isArray(propertyData[key])) {
                propertyData[key].push(value);
            } else {
                propertyData[key] = [propertyData[key], value];
            }
        } else {
            propertyData[key] = value;
        }
    }
    
    // Validate required fields
    const requiredFields = ['listingType', 'area', 'location', 'price', 'ownerName', 'mobile'];
    const missingFields = requiredFields.filter(field => !propertyData[field]);
    
    if (missingFields.length > 0) {
        alert('Please fill all required fields: ' + missingFields.join(', '));
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting Property...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        console.log('Property Data:', propertyData);
        
        // Save property to localStorage
        const savedProperty = savePropertyData(propertyData);
        
        // Show success message with redirect
        showSuccessMessage(savedProperty);
        
        // Reset form
        document.getElementById('propertyForm').reset();
        document.getElementById('photoPreview').innerHTML = '';
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset active states
        document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.type-btn[data-type="residential"]').classList.add('active');
        document.querySelectorAll('.bhk-btn').forEach(btn => btn.classList.remove('active'));
        
    }, 2000);
}

// Save property data to localStorage
function savePropertyData(propertyData) {
    // Get current user
    const user = JSON.parse(localStorage.getItem('hyderabadinfra_user') || '{}');
    
    // Create property object with ID and additional data
    const property = {
        id: Date.now(), // Simple ID generation
        ...propertyData,
        postedBy: user.name || 'Anonymous User',
        postedDate: new Date().toISOString(),
        status: 'active',
        views: 0,
        // Default images if none uploaded
        images: [
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        // Additional property details
        description: propertyData.description || `Beautiful ${propertyData.bhk || ''} property in ${propertyData.location || 'Hyderabad'}. ${propertyData.listingType === 'rent' ? 'Available for rent' : 'For sale'}.`,
        amenities: propertyData.amenities || [],
        features: generatePropertyFeatures(propertyData)
    };
    
    // Get existing properties
    const existingProperties = JSON.parse(localStorage.getItem('hyderabadinfra_properties') || '[]');
    
    // Add new property
    existingProperties.unshift(property); // Add to beginning
    
    // Save back to localStorage
    localStorage.setItem('hyderabadinfra_properties', JSON.stringify(existingProperties));
    
    console.log('Property saved:', property);
    return property;
}

// Generate property features based on form data
function generatePropertyFeatures(data) {
    const features = [];
    
    if (data.propertyType) features.push(data.propertyType.charAt(0).toUpperCase() + data.propertyType.slice(1));
    if (data.bhk) features.push(`${data.bhk} BHK`);
    if (data.area) features.push(`${data.area} sq ft`);
    if (data.parking) features.push('Parking Available');
    if (data.furnished) features.push(data.furnished.charAt(0).toUpperCase() + data.furnished.slice(1));
    
    return features;
}

// Show success message
function showSuccessMessage(savedProperty) {
    // Create success modal/message
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 12px; text-align: center; max-width: 500px; margin: 1rem; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                <h3 style="color: #1f2937; margin-bottom: 1rem; font-size: 1.5rem;">🎉 Property Posted Successfully!</h3>
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
                    <p style="color: #166534; margin: 0; font-weight: 500;">Your ${savedProperty.bhk || ''} ${savedProperty.propertyType || 'property'} in ${savedProperty.location || 'Hyderabad'} is now live!</p>
                </div>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">Property ID: #${savedProperty.id}</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="viewProperty()" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; font-weight: 500;">
                        <i class="fas fa-eye"></i> View Property
                    </button>
                    <button onclick="closeAndStay()" style="background: #6b7280; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add click handlers
    window.viewProperty = function() {
        successMessage.remove();
        // Redirect to buy page to see the property
        window.location.href = 'buy.html';
    };
    
    window.closeAndStay = function() {
        successMessage.remove();
    };
    
    document.body.appendChild(successMessage);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (document.body.contains(successMessage)) {
            successMessage.remove();
        }
    }, 10000);
}