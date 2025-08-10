package com.hyderabadinfra.property.controller;

import com.hyderabadinfra.common.dto.ApiResponse;
import com.hyderabadinfra.property.dto.PropertyRequest;
import com.hyderabadinfra.property.dto.PropertyResponse;
import com.hyderabadinfra.property.service.PropertyService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PropertyController {
    
    private static final Logger logger = LoggerFactory.getLogger(PropertyController.class);
    
    @Autowired
    private PropertyService propertyService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<PropertyResponse>> createProperty(
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody PropertyRequest request) {
        try {
            PropertyResponse property = propertyService.createProperty(request, userId);
            logger.info("Property created successfully by user: {}", userId);
            return ResponseEntity.ok(ApiResponse.success("Property created successfully", property));
        } catch (Exception e) {
            logger.error("Failed to create property for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create property", e.getMessage()));
        }
    }
    
    @PutMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<PropertyResponse>> updateProperty(
            @PathVariable String propertyId,
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody PropertyRequest request) {
        try {
            PropertyResponse property = propertyService.updateProperty(propertyId, request, userId);
            logger.info("Property updated successfully: {} by user: {}", propertyId, userId);
            return ResponseEntity.ok(ApiResponse.success("Property updated successfully", property));
        } catch (Exception e) {
            logger.error("Failed to update property: {} by user: {} - {}", propertyId, userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update property", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<String>> deleteProperty(
            @PathVariable String propertyId,
            @RequestHeader("X-User-Id") String userId) {
        try {
            propertyService.deleteProperty(propertyId, userId);
            logger.info("Property deleted successfully: {} by user: {}", propertyId, userId);
            return ResponseEntity.ok(ApiResponse.success("Property deleted successfully"));
        } catch (Exception e) {
            logger.error("Failed to delete property: {} by user: {} - {}", propertyId, userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to delete property", e.getMessage()));
        }
    }
    
    @GetMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<PropertyResponse>> getPropertyById(@PathVariable String propertyId) {
        try {
            PropertyResponse property = propertyService.getPropertyById(propertyId);
            return ResponseEntity.ok(ApiResponse.success(property));
        } catch (Exception e) {
            logger.error("Failed to get property: {} - {}", propertyId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get property", e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<PropertyResponse>>> getAllProperties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        try {
            Page<PropertyResponse> properties = propertyService.getAllProperties(page, size, sortBy, sortDir);
            return ResponseEntity.ok(ApiResponse.success(properties));
        } catch (Exception e) {
            logger.error("Failed to get properties - {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get properties", e.getMessage()));
        }
    }
    
    @GetMapping("/my-properties")
    public ResponseEntity<ApiResponse<Page<PropertyResponse>>> getMyProperties(
            @RequestHeader("X-User-Id") String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<PropertyResponse> properties = propertyService.getPropertiesByOwner(userId, page, size);
            return ResponseEntity.ok(ApiResponse.success(properties));
        } catch (Exception e) {
            logger.error("Failed to get properties for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get properties", e.getMessage()));
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<PropertyResponse>>> searchProperties(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<PropertyResponse> properties = propertyService.searchProperties(query, page, size);
            return ResponseEntity.ok(ApiResponse.success(properties));
        } catch (Exception e) {
            logger.error("Failed to search properties with query: {} - {}", query, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to search properties", e.getMessage()));
        }
    }
    
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<Page<PropertyResponse>>> getPropertiesWithFilters(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) String listingType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer minArea,
            @RequestParam(required = false) Integer maxArea,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy) {
        try {
            Page<PropertyResponse> properties = propertyService.getPropertiesWithFilters(
                city, propertyType, listingType, minPrice, maxPrice, bedrooms, minArea, maxArea, page, size, sortBy
            );
            return ResponseEntity.ok(ApiResponse.success(properties));
        } catch (Exception e) {
            logger.error("Failed to get properties with filters - {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get properties", e.getMessage()));
        }
    }
    
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<Page<PropertyResponse>>> getFeaturedProperties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<PropertyResponse> properties = propertyService.getFeaturedProperties(page, size);
            return ResponseEntity.ok(ApiResponse.success(properties));
        } catch (Exception e) {
            logger.error("Failed to get featured properties - {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get featured properties", e.getMessage()));
        }
    }
    
    @GetMapping("/{propertyId}/similar")
    public ResponseEntity<ApiResponse<List<PropertyResponse>>> getSimilarProperties(
            @PathVariable String propertyId,
            @RequestParam(defaultValue = "5") int limit) {
        try {
            List<PropertyResponse> properties = propertyService.getSimilarProperties(propertyId, limit);
            return ResponseEntity.ok(ApiResponse.success(properties));
        } catch (Exception e) {
            logger.error("Failed to get similar properties for: {} - {}", propertyId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get similar properties", e.getMessage()));
        }
    }
    
    @PostMapping("/{propertyId}/favorite")
    public ResponseEntity<ApiResponse<String>> toggleFavorite(
            @PathVariable String propertyId,
            @RequestHeader("X-User-Id") String userId) {
        try {
            propertyService.toggleFavorite(propertyId, userId);
            return ResponseEntity.ok(ApiResponse.success("Property favorited successfully"));
        } catch (Exception e) {
            logger.error("Failed to toggle favorite for property: {} by user: {} - {}", propertyId, userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to toggle favorite", e.getMessage()));
        }
    }
    
    @PatchMapping("/{propertyId}/status")
    public ResponseEntity<ApiResponse<String>> updatePropertyStatus(
            @PathVariable String propertyId,
            @RequestHeader("X-User-Id") String userId,
            @RequestParam String status) {
        try {
            propertyService.updatePropertyStatus(propertyId, status, userId);
            logger.info("Property status updated: {} to {} by user: {}", propertyId, status, userId);
            return ResponseEntity.ok(ApiResponse.success("Property status updated successfully"));
        } catch (Exception e) {
            logger.error("Failed to update property status: {} by user: {} - {}", propertyId, userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update property status", e.getMessage()));
        }
    }
}