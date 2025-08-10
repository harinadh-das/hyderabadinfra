package com.hyderabadinfra.userhistory.controller;

import com.hyderabadinfra.common.dto.ApiResponse;
import com.hyderabadinfra.userhistory.domain.UserActivity;
import com.hyderabadinfra.userhistory.query.UserHistoryQueryHandler;
import com.hyderabadinfra.userhistory.query.UserHistoryQueryHandler.UserHistoryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for User History queries (CQRS Query side)
 * Handles all read operations for user activity history
 */
@RestController
@RequestMapping("/api/user-history")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserHistoryController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserHistoryController.class);
    
    @Autowired
    private UserHistoryQueryHandler queryHandler;
    
    /**
     * GET /api/user-history/{userId}
     * Get complete user activity history with pagination
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserHistoryResponse>> getUserHistory(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestHeader(value = "X-User-Id", required = false) String requestingUserId) {
        
        try {
            logger.info("Fetching user history for userId: {}, page: {}, size: {}", userId, page, size);
            
            // In production, add authorization check here
            // if (!userId.equals(requestingUserId) && !isAdmin(requestingUserId)) {
            //     return ResponseEntity.status(403).body(ApiResponse.error("Access denied"));
            // }
            
            UserHistoryResponse history = queryHandler.getUserHistory(userId, page, size);
            
            logger.info("Retrieved {} activities for user {}", history.getTotalActivities(), userId);
            return ResponseEntity.ok(ApiResponse.success("User history retrieved successfully", history));
            
        } catch (Exception e) {
            logger.error("Failed to get user history for user: {} - {}", userId, e.getMessage(), e);
            return ResponseEntity.badRequest().body(
                ApiResponse.error("Failed to retrieve user history", e.getMessage()));
        }
    }
    
    /**
     * GET /api/user-history/{userId}/recent
     * Get recent activities (last 24 hours)
     */
    @GetMapping("/{userId}/recent")
    public ResponseEntity<ApiResponse<List<UserActivity>>> getRecentActivities(
            @PathVariable String userId,
            @RequestParam(defaultValue = "10") int limit) {
        
        try {
            logger.info("Fetching recent activities for userId: {}, limit: {}", userId, limit);
            
            List<UserActivity> activities = queryHandler.getRecentActivities(userId, limit);
            
            return ResponseEntity.ok(ApiResponse.success(
                "Recent activities retrieved successfully", activities));
            
        } catch (Exception e) {
            logger.error("Failed to get recent activities for user: {} - {}", userId, e.getMessage(), e);
            return ResponseEntity.badRequest().body(
                ApiResponse.error("Failed to retrieve recent activities", e.getMessage()));
        }
    }
    
    /**
     * GET /api/user-history/{userId}/properties
     * Get user's property-related activities
     */
    @GetMapping("/{userId}/properties")
    public ResponseEntity<ApiResponse<List<UserActivity>>> getPropertyActivities(
            @PathVariable String userId,
            @RequestParam(defaultValue = "20") int limit) {
        
        try {
            logger.info("Fetching property activities for userId: {}, limit: {}", userId, limit);
            
            List<UserActivity> activities = queryHandler.getPropertyActivities(userId, limit);
            
            return ResponseEntity.ok(ApiResponse.success(
                "Property activities retrieved successfully", activities));
            
        } catch (Exception e) {
            logger.error("Failed to get property activities for user: {} - {}", userId, e.getMessage(), e);
            return ResponseEntity.badRequest().body(
                ApiResponse.error("Failed to retrieve property activities", e.getMessage()));
        }
    }
    
    /**
     * GET /api/user-history/{userId}/searches
     * Get user's search history
     */
    @GetMapping("/{userId}/searches")
    public ResponseEntity<ApiResponse<List<UserActivity>>> getSearchHistory(
            @PathVariable String userId,
            @RequestParam(defaultValue = "10") int limit) {
        
        try {
            logger.info("Fetching search history for userId: {}, limit: {}", userId, limit);
            
            List<UserActivity> searches = queryHandler.getSearchHistory(userId, limit);
            
            return ResponseEntity.ok(ApiResponse.success(
                "Search history retrieved successfully", searches));
            
        } catch (Exception e) {
            logger.error("Failed to get search history for user: {} - {}", userId, e.getMessage(), e);
            return ResponseEntity.badRequest().body(
                ApiResponse.error("Failed to retrieve search history", e.getMessage()));
        }
    }
    
    /**
     * GET /api/user-history/{userId}/activities/{activityType}
     * Get activities by specific type
     */
    @GetMapping("/{userId}/activities/{activityType}")
    public ResponseEntity<ApiResponse<List<UserActivity>>> getActivitiesByType(
            @PathVariable String userId,
            @PathVariable String activityType,
            @RequestParam(defaultValue = "10") int limit) {
        
        try {
            logger.info("Fetching activities by type for userId: {}, type: {}, limit: {}", 
                       userId, activityType, limit);
            
            List<UserActivity> activities = queryHandler.getActivitiesByType(userId, activityType, limit);
            
            return ResponseEntity.ok(ApiResponse.success(
                "Activities by type retrieved successfully", activities));
            
        } catch (Exception e) {
            logger.error("Failed to get activities by type for user: {} - {}", userId, e.getMessage(), e);
            return ResponseEntity.badRequest().body(
                ApiResponse.error("Failed to retrieve activities by type", e.getMessage()));
        }
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success("User History Service is healthy"));
    }
}