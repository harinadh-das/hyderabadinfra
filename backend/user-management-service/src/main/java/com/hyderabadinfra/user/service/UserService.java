package com.hyderabadinfra.user.service;

import com.hyderabadinfra.common.events.NotificationEvent;
import com.hyderabadinfra.common.events.UserEvent;
import com.hyderabadinfra.common.util.JwtUtil;
import com.hyderabadinfra.user.dto.*;
import com.hyderabadinfra.user.entity.User;
import com.hyderabadinfra.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public AuthResponse registerUser(UserRegistrationRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }
        
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("User with this username already exists");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        
        if (request.getRole() != null) {
            try {
                user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                user.setRole(User.Role.USER);
            }
        }
        
        user.setStatus(User.UserStatus.PENDING_VERIFICATION);
        
        // Save user
        User savedUser = userRepository.save(user);
        
        // Generate tokens
        String accessToken = jwtUtil.generateAccessToken(
            savedUser.getId(), 
            savedUser.getEmail(), 
            savedUser.getRole().name()
        );
        String refreshToken = jwtUtil.generateRefreshToken(savedUser.getId());
        
        // Publish user created event
        UserEvent userEvent = new UserEvent(
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getUsername(),
            UserEvent.EventType.USER_CREATED,
            "User registered successfully"
        );
        kafkaTemplate.send("user-events", userEvent);
        
        // Send welcome notification
        NotificationEvent notificationEvent = new NotificationEvent(
            savedUser.getId(),
            savedUser.getEmail(),
            NotificationEvent.NotificationType.EMAIL,
            NotificationEvent.EventType.WELCOME_EMAIL,
            "Welcome to Hyderabad Infra",
            "Thank you for registering with us!"
        );
        kafkaTemplate.send("notification-events", notificationEvent);
        
        return new AuthResponse(accessToken, refreshToken, 86400, new UserResponse(savedUser));
    }
    
    public AuthResponse loginUser(UserLoginRequest request) {
        // Find user by email or username
        User user = userRepository.findByEmailOrUsername(request.getEmailOrUsername())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Check if user is active
        if (user.getStatus() != User.UserStatus.ACTIVE && user.getStatus() != User.UserStatus.PENDING_VERIFICATION) {
            throw new RuntimeException("Account is " + user.getStatus().name().toLowerCase());
        }
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        // Generate tokens
        String accessToken = jwtUtil.generateAccessToken(
            user.getId(), 
            user.getEmail(), 
            user.getRole().name()
        );
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());
        
        // Publish login event
        UserEvent userEvent = new UserEvent(
            user.getId(),
            user.getEmail(),
            user.getUsername(),
            UserEvent.EventType.USER_LOGIN,
            "User logged in successfully"
        );
        kafkaTemplate.send("user-events", userEvent);
        
        return new AuthResponse(accessToken, refreshToken, 86400, new UserResponse(user));
    }
    
    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        
        String tokenType = jwtUtil.getTokenTypeFromToken(refreshToken);
        if (!"refresh".equals(tokenType)) {
            throw new RuntimeException("Invalid token type");
        }
        
        String userId = jwtUtil.getUserIdFromToken(refreshToken);
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        String newAccessToken = jwtUtil.generateAccessToken(
            user.getId(), 
            user.getEmail(), 
            user.getRole().name()
        );
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getId());
        
        return new AuthResponse(newAccessToken, newRefreshToken, 86400, new UserResponse(user));
    }
    
    public UserResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(user);
    }
    
    public UserResponse updateUserProfile(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }
        if (request.getCity() != null) {
            user.setCity(request.getCity());
        }
        if (request.getState() != null) {
            user.setState(request.getState());
        }
        if (request.getPincode() != null) {
            user.setPincode(request.getPincode());
        }
        if (request.getDateOfBirth() != null) {
            user.setDateOfBirth(request.getDateOfBirth());
        }
        
        User updatedUser = userRepository.save(user);
        
        // Publish user updated event
        UserEvent userEvent = new UserEvent(
            updatedUser.getId(),
            updatedUser.getEmail(),
            updatedUser.getUsername(),
            UserEvent.EventType.USER_UPDATED,
            "User profile updated"
        );
        kafkaTemplate.send("user-events", userEvent);
        
        return new UserResponse(updatedUser);
    }
    
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        userRepository.delete(user);
        
        // Publish user deleted event
        UserEvent userEvent = new UserEvent(
            user.getId(),
            user.getEmail(),
            user.getUsername(),
            UserEvent.EventType.USER_DELETED,
            "User account deleted"
        );
        kafkaTemplate.send("user-events", userEvent);
    }
    
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
            .map(UserResponse::new);
    }
    
    public Page<UserResponse> searchUsers(String searchTerm, Pageable pageable) {
        return userRepository.searchUsers(searchTerm, pageable)
            .map(UserResponse::new);
    }
    
    public boolean verifyEmail(String userId, String verificationCode) {
        // Implementation for email verification
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // In a real implementation, you would verify the code against a stored value
        user.setEmailVerified(true);
        if (user.getStatus() == User.UserStatus.PENDING_VERIFICATION) {
            user.setStatus(User.UserStatus.ACTIVE);
        }
        userRepository.save(user);
        
        return true;
    }
    
    public void logout(String userId) {
        // Publish logout event
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        UserEvent userEvent = new UserEvent(
            user.getId(),
            user.getEmail(),
            user.getUsername(),
            UserEvent.EventType.USER_LOGOUT,
            "User logged out"
        );
        kafkaTemplate.send("user-events", userEvent);
    }
}