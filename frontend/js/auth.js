// Authentication JavaScript functionality for HyderabadInfra.com

document.addEventListener('DOMContentLoaded', function() {
    initializeAuthForms();
    initializePasswordToggle();
    initializePasswordStrength();
    initializeFormValidation();
});

// Initialize authentication forms
function initializeAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Initialize social login buttons
    initializeSocialLogin();
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
        remember: formData.get('remember') === 'on'
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, you would make an API call here
        console.log('Login attempt:', loginData);
        
        // Simulate successful login
        if (loginData.email && loginData.password) {
            // Store user data in localStorage (for demo purposes)
            const userData = {
                email: loginData.email,
                name: loginData.email.split('@')[0],
                loginTime: new Date().toISOString(),
                remember: loginData.remember
            };
            
            localStorage.setItem('hyderabadinfra_user', JSON.stringify(userData));
            
            // Show success message
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Show error message
            showNotification('Please check your credentials and try again.', 'error');
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
        }
    }, 2000);
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registerData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        mobile: formData.get('mobile'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        userType: formData.get('userType'),
        terms: formData.get('terms') === 'on',
        newsletter: formData.get('newsletter') === 'on'
    };
    
    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Validate terms acceptance
    if (!registerData.terms) {
        showNotification('Please accept the Terms of Service to continue.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.auth-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, you would make an API call here
        console.log('Registration attempt:', registerData);
        
        // Simulate successful registration
        if (registerData.email && registerData.password && registerData.firstName) {
            // Store user data in localStorage (for demo purposes)
            const userData = {
                email: registerData.email,
                name: registerData.firstName + ' ' + registerData.lastName,
                mobile: registerData.mobile,
                userType: registerData.userType,
                registrationTime: new Date().toISOString(),
                newsletter: registerData.newsletter
            };
            
            localStorage.setItem('hyderabadinfra_user', JSON.stringify(userData));
            
            // Show success message
            showNotification('Account created successfully! Please sign in to continue.', 'success');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            // Show error message
            showNotification('Please fill in all required fields and try again.', 'error');
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
        }
    }, 2500);
}

// Initialize social login buttons
function initializeSocialLogin() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting to ${provider}...`;
            
            // Simulate social login
            setTimeout(() => {
                // In a real app, you would integrate with OAuth providers
                console.log(`${provider} login attempted`);
                
                // Simulate successful social login
                const userData = {
                    email: 'user@example.com',
                    name: 'Social User',
                    provider: provider.toLowerCase(),
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('hyderabadinfra_user', JSON.stringify(userData));
                
                showNotification(`Successfully signed in with ${provider}!`, 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        });
    });
}

// Initialize password toggle functionality
function initializePasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const passwordField = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('far', 'fa-eye');
                icon.classList.add('fas', 'fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fas', 'fa-eye-slash');
                icon.classList.add('far', 'fa-eye');
            }
        });
    });
}

// Initialize password strength indicator
function initializePasswordStrength() {
    const passwordField = document.getElementById('password');
    const strengthMeter = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordField && strengthMeter) {
        passwordField.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            updatePasswordStrength(strengthMeter, strengthText, strength);
        });
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    // Award points for each check
    Object.values(checks).forEach(check => {
        if (check) score++;
    });
    
    // Determine strength level
    if (score < 2) return { level: 'weak', percentage: 25, text: 'Weak password' };
    if (score < 3) return { level: 'fair', percentage: 50, text: 'Fair password' };
    if (score < 4) return { level: 'good', percentage: 75, text: 'Good password' };
    return { level: 'strong', percentage: 100, text: 'Strong password' };
}

// Update password strength visual indicator
function updatePasswordStrength(meter, text, strength) {
    meter.className = `strength-fill ${strength.level}`;
    meter.style.width = `${strength.percentage}%`;
    text.textContent = strength.text;
}

// Initialize form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
    
    // Real-time email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', debounce(validateEmail, 500));
    });
    
    // Real-time password confirmation
    const confirmPasswordField = document.getElementById('confirmPassword');
    const passwordField = document.getElementById('password');
    
    if (confirmPasswordField && passwordField) {
        confirmPasswordField.addEventListener('input', function() {
            validatePasswordMatch(passwordField.value, this.value, this);
        });
    }
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        return validateEmailFormat(field, value);
    }
    
    if (field.name === 'mobile' && value) {
        return validateMobile(field, value);
    }
    
    if (field.name === 'password' && value) {
        return validatePasswordMinLength(field, value);
    }
    
    return true;
}

// Validate email format
function validateEmailFormat(field, email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// Validate mobile number
function validateMobile(field, mobile) {
    const mobileRegex = /^[6-9]\d{9}$/;
    
    if (!mobileRegex.test(mobile)) {
        showFieldError(field, 'Please enter a valid 10-digit mobile number');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// Validate password minimum length
function validatePasswordMinLength(field, password) {
    if (password.length < 8) {
        showFieldError(field, 'Password must be at least 8 characters long');
        return false;
    }
    
    return true;
}

// Validate email availability (simulate API call)
function validateEmail(e) {
    const field = e.target;
    const email = field.value.trim();
    
    if (!email || !validateEmailFormat(field, email)) {
        return;
    }
    
    const statusElement = document.getElementById('emailStatus');
    if (!statusElement) return;
    
    statusElement.textContent = 'Checking availability...';
    statusElement.className = 'input-status';
    
    // Simulate API call to check email availability
    setTimeout(() => {
        // In a real app, you would make an API call here
        const isAvailable = !email.includes('taken'); // Simple simulation
        
        if (isAvailable) {
            statusElement.textContent = '✓ Available';
            statusElement.className = 'input-status success';
        } else {
            statusElement.textContent = '✗ Email already registered';
            statusElement.className = 'input-status error';
        }
    }, 1000);
}

// Validate password match
function validatePasswordMatch(password, confirmPassword, field) {
    const statusElement = document.getElementById('confirmPasswordStatus');
    
    if (!confirmPassword) {
        if (statusElement) statusElement.textContent = '';
        return;
    }
    
    if (password !== confirmPassword) {
        if (statusElement) {
            statusElement.textContent = '✗ Passwords do not match';
            statusElement.className = 'input-status error';
        }
        showFieldError(field, 'Passwords do not match');
        return false;
    } else {
        if (statusElement) {
            statusElement.textContent = '✓ Passwords match';
            statusElement.className = 'input-status success';
        }
        showFieldSuccess(field);
        return true;
    }
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Show field success
function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error', 'success');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Utility function: debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if user is already logged in
function checkAuthState() {
    const userData = localStorage.getItem('hyderabadinfra_user');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            console.log('User is logged in:', user);
            
            // If on login/register page and user is logged in, redirect to dashboard
            if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
                window.location.href = 'dashboard.html';
            }
            
            return user;
        } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('hyderabadinfra_user');
        }
    }
    
    return null;
}

// Logout functionality
function logout() {
    localStorage.removeItem('hyderabadinfra_user');
    showNotification('Logged out successfully!', 'success');
    
    setTimeout(() => {
        // Redirect to home page
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 1500);
}

// Initialize auth state check on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();
});

// Export functions for use in other scripts
window.HyderabadInfraAuth = {
    checkAuthState,
    logout,
    showNotification
};