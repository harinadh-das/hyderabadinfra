package com.hyderabadinfra.user.controller;

import com.hyderabadinfra.common.dto.ApiResponse;
import com.hyderabadinfra.user.dto.UserResponse;
import com.hyderabadinfra.user.dto.UserUpdateRequest;
import com.hyderabadinfra.user.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getUserProfile(@RequestHeader("X-User-Id") String userId) {
        try {
            UserResponse user = userService.getUserById(userId);
            return ResponseEntity.ok(ApiResponse.success(user));
        } catch (Exception e) {
            logger.error("Failed to get user profile for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get user profile", e.getMessage()));
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserProfile(
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody UserUpdateRequest request) {
        try {
            UserResponse updatedUser = userService.updateUserProfile(userId, request);
            logger.info("User profile updated successfully for user: {}", userId);
            return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updatedUser));
        } catch (Exception e) {
            logger.error("Failed to update user profile for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update profile", e.getMessage()));
        }
    }
    
    @DeleteMapping("/profile")
    public ResponseEntity<ApiResponse<String>> deleteUserAccount(@RequestHeader("X-User-Id") String userId) {
        try {
            userService.deleteUser(userId);
            logger.info("User account deleted successfully for user: {}", userId);
            return ResponseEntity.ok(ApiResponse.success("Account deleted successfully"));
        } catch (Exception e) {
            logger.error("Failed to delete user account for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to delete account", e.getMessage()));
        }
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable String userId,
            @RequestHeader("X-User-Role") String userRole) {
        try {
            // Only allow admins to view other user profiles
            if (!"ADMIN".equals(userRole)) {
                return ResponseEntity.status(403).body(ApiResponse.error("Access denied"));
            }
            
            UserResponse user = userService.getUserById(userId);
            return ResponseEntity.ok(ApiResponse.success(user));
        } catch (Exception e) {
            logger.error("Failed to get user by id: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get user", e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getAllUsers(
            @RequestHeader("X-User-Role") String userRole,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        try {
            // Only allow admins to view all users
            if (!"ADMIN".equals(userRole)) {
                return ResponseEntity.status(403).body(ApiResponse.error("Access denied"));
            }
            
            Pageable pageable = PageRequest.of(page, size);
            Page<UserResponse> users;
            
            if (search != null && !search.trim().isEmpty()) {
                users = userService.searchUsers(search.trim(), pageable);
            } else {
                users = userService.getAllUsers(pageable);
            }
            
            return ResponseEntity.ok(ApiResponse.success(users));
        } catch (Exception e) {
            logger.error("Failed to get users - {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get users", e.getMessage()));
        }
    }
}