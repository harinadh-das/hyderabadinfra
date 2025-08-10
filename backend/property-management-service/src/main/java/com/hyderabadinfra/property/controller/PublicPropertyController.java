package com.hyderabadinfra.property.controller;

import com.hyderabadinfra.common.dto.ApiResponse;
import com.hyderabadinfra.property.dto.PropertyResponse;
import com.hyderabadinfra.property.service.PropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/public/properties")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PublicPropertyController {
    
    private static final Logger logger = LoggerFactory.getLogger(PublicPropertyController.class);
    
    @Autowired
    private PropertyService propertyService;
    
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
}