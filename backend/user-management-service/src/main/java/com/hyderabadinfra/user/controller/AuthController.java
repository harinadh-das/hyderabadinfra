package com.hyderabadinfra.user.controller;

import com.hyderabadinfra.common.dto.ApiResponse;
import com.hyderabadinfra.user.dto.AuthResponse;
import com.hyderabadinfra.user.dto.RefreshTokenRequest;
import com.hyderabadinfra.user.dto.UserLoginRequest;
import com.hyderabadinfra.user.dto.UserRegistrationRequest;
import com.hyderabadinfra.user.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            logger.info("User registration attempt for email: {}", request.getEmail());
            AuthResponse response = userService.registerUser(request);
            logger.info("User registered successfully: {}", request.getEmail());
            return ResponseEntity.ok(ApiResponse.success("User registered successfully", response));
        } catch (Exception e) {
            logger.error("Registration failed for email: {} - {}", request.getEmail(), e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Registration failed", e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody UserLoginRequest request) {
        try {
            logger.info("User login attempt for: {}", request.getEmailOrUsername());
            AuthResponse response = userService.loginUser(request);
            logger.info("User logged in successfully: {}", request.getEmailOrUsername());
            return ResponseEntity.ok(ApiResponse.success("Login successful", response));
        } catch (Exception e) {
            logger.error("Login failed for: {} - {}", request.getEmailOrUsername(), e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Login failed", e.getMessage()));
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        try {
            AuthResponse response = userService.refreshToken(request.getRefreshToken());
            return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
        } catch (Exception e) {
            logger.error("Token refresh failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Token refresh failed", e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(@RequestHeader("X-User-Id") String userId) {
        try {
            userService.logout(userId);
            return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
        } catch (Exception e) {
            logger.error("Logout failed for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Logout failed", e.getMessage()));
        }
    }
    
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<String>> verifyEmail(
            @RequestParam String userId, 
            @RequestParam String verificationCode) {
        try {
            boolean verified = userService.verifyEmail(userId, verificationCode);
            if (verified) {
                return ResponseEntity.ok(ApiResponse.success("Email verified successfully"));
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.error("Email verification failed"));
            }
        } catch (Exception e) {
            logger.error("Email verification failed for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Email verification failed", e.getMessage()));
        }
    }
}