// Property Detail page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeImageGallery();
    initializeEMICalculator();
    initializeContactForm();
});

// Sample gallery images
const galleryImages = [
    {
        main: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Main View'
    },
    {
        main: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Living Room'
    },
    {
        main: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Master Bedroom'
    },
    {
        main: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Kitchen'
    },
    {
        main: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Bathroom'
    },
    {
        main: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Balcony'
    },
    {
        main: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Building View'
    },
    {
        main: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        thumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        alt: 'Amenities'
    }
];

// Initialize image gallery functionality
function initializeImageGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    
    let currentIndex = 0;
    
    // Set total images count
    if (totalImagesSpan) {
        totalImagesSpan.textContent = galleryImages.length;
    }
    
    // Update main image
    function updateMainImage(index) {
        if (mainImage && galleryImages[index]) {
            mainImage.src = galleryImages[index].main;
            mainImage.alt = galleryImages[index].alt;
        }
        
        // Update current image counter
        if (currentImageSpan) {
            currentImageSpan.textContent = index + 1;
        }
        
        // Update active thumbnail
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Thumbnail click handlers
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
            updateMainImage(newIndex);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
            updateMainImage(newIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (mainImage) {
        mainImage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        mainImage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextBtn.click();
            } else {
                // Swipe right - previous image
                prevBtn.click();
            }
        }
    }
}

// Initialize EMI Calculator
function initializeEMICalculator() {
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const tenureInput = document.getElementById('tenure');
    const emiAmountSpan = document.getElementById('emiAmount');
    const calcBtn = document.querySelector('.calc-btn');
    
    // Calculate EMI function
    function calculateEMI() {
        const principal = parseFloat(loanAmountInput.value) || 0;
        const annualRate = parseFloat(interestRateInput.value) || 0;
        const tenureYears = parseFloat(tenureInput.value) || 0;
        
        if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
            emiAmountSpan.textContent = '₹0';
            return;
        }
        
        // Convert annual rate to monthly rate
        const monthlyRate = annualRate / (12 * 100);
        
        // Convert years to months
        const tenureMonths = tenureYears * 12;
        
        // EMI calculation formula
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                   (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        
        // Display formatted EMI
        emiAmountSpan.textContent = '₹' + Math.round(emi).toLocaleString();
    }
    
    // Calculate button click
    if (calcBtn) {
        calcBtn.addEventListener('click', calculateEMI);
    }
    
    // Auto-calculate on input change
    [loanAmountInput, interestRateInput, tenureInput].forEach(input => {
        if (input) {
            input.addEventListener('input', calculateEMI);
        }
    });
    
    // Initial calculation
    calculateEMI();
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const contactButtons = document.querySelectorAll('.contact-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const nameInput = document.querySelector('input[placeholder="Your Name"]');
    const mobileInput = document.querySelector('input[placeholder="Your Mobile"]');
    
    // Contact button handlers
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            switch(action) {
                case 'Call Agent':
                    // Simulate phone call
                    showNotification('Connecting you to the agent...', 'info');
                    setTimeout(() => {
                        window.location.href = 'tel:+919876543210';
                    }, 1000);
                    break;
                    
                case 'Chat':
                    // Simulate chat initiation
                    showNotification('Starting chat with agent...', 'info');
                    break;
                    
                case 'Email':
                    // Simulate email
                    const subject = encodeURIComponent('Inquiry about Luxury 3BHK Apartment in Gachibowli');
                    const body = encodeURIComponent('Hi, I am interested in the property and would like more details.');
                    window.location.href = `mailto:agent@hyderabadinfra.com?subject=${subject}&body=${body}`;
                    break;
            }
        });
    });
    
    // Submit form handler
    if (submitBtn && contactForm) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = nameInput.value.trim();
            const mobile = mobileInput.value.trim();
            
            // Basic validation
            if (!name) {
                showNotification('Please enter your name', 'error');
                nameInput.focus();
                return;
            }
            
            if (!mobile || mobile.length < 10) {
                showNotification('Please enter a valid mobile number', 'error');
                mobileInput.focus();
                return;
            }
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Your request has been sent! Agent will contact you soon.', 'success');
                
                // Reset form
                nameInput.value = '';
                mobileInput.value = '';
                
                // Reset button
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    }
    
    // Mobile number formatting
    if (mobileInput) {
        mobileInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            this.value = value;
        });
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
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

// Initialize wishlist functionality
document.addEventListener('DOMContentLoaded', function() {
    const wishlistBtn = document.querySelector('.action-btn[title="Add to Wishlist"]');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isWishlisted = icon.classList.contains('fas');
            
            if (isWishlisted) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = 'white';
                this.style.color = '#6b7280';
                showNotification('Removed from wishlist', 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.background = '#ef4444';
                this.style.color = 'white';
                this.style.borderColor = '#ef4444';
                showNotification('Added to wishlist', 'success');
            }
        });
    }
});

// Initialize share functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.querySelector('.action-btn[title="Share"]');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                // Use native share API if available
                navigator.share({
                    title: 'Luxury 3BHK Apartment in Gachibowli',
                    text: 'Check out this amazing property on HyderabadInfra.com',
                    url: window.location.href
                }).then(() => {
                    showNotification('Property shared successfully', 'success');
                }).catch(() => {
                    fallbackShare();
                });
            } else {
                fallbackShare();
            }
        });
    }
    
    function fallbackShare() {
        // Copy link to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Property link copied to clipboard', 'success');
        }).catch(() => {
            showNotification('Unable to copy link', 'error');
        });
    }
});

// Initialize similar properties click handlers
document.addEventListener('DOMContentLoaded', function() {
    const similarItems = document.querySelectorAll('.similar-item');
    
    similarItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real app, this would navigate to the clicked property
            showNotification('Loading property details...', 'info');
            console.log('Navigate to similar property');
        });
    });
});