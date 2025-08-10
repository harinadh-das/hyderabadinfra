package com.hyderabadinfra.search.controller;

import com.hyderabadinfra.common.dto.ApiResponse;
import com.hyderabadinfra.search.dto.PropertySearchResult;
import com.hyderabadinfra.search.dto.SearchRequest;
import com.hyderabadinfra.search.service.SearchService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SearchController {
    
    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    
    @Autowired
    private SearchService searchService;
    
    @PostMapping("/properties")
    public ResponseEntity<ApiResponse<Page<PropertySearchResult>>> searchProperties(
            @RequestBody SearchRequest searchRequest,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            HttpServletRequest request) {
        try {
            String ipAddress = getClientIpAddress(request);
            String userAgent = request.getHeader("User-Agent");
            
            Page<PropertySearchResult> results = searchService.searchProperties(searchRequest, userId, ipAddress, userAgent);
            return ResponseEntity.ok(ApiResponse.success(results));
        } catch (Exception e) {
            logger.error("Failed to search properties - {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to search properties", e.getMessage()));
        }
    }
    
    @GetMapping("/recommendations")
    public ResponseEntity<ApiResponse<List<PropertySearchResult>>> getRecommendations(
            @RequestHeader("X-User-Id") String userId,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            List<PropertySearchResult> recommendations = searchService.getRecommendations(userId, limit);
            return ResponseEntity.ok(ApiResponse.success(recommendations));
        } catch (Exception e) {
            logger.error("Failed to get recommendations for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get recommendations", e.getMessage()));
        }
    }
    
    @GetMapping("/suggestions")
    public ResponseEntity<ApiResponse<List<String>>> getSearchSuggestions(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            List<String> suggestions = searchService.getSearchSuggestions(query, limit);
            return ResponseEntity.ok(ApiResponse.success(suggestions));
        } catch (Exception e) {
            logger.error("Failed to get search suggestions - {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get suggestions", e.getMessage()));
        }
    }
    
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<PropertySearchResult>>> getFeaturedProperties(
            @RequestParam(defaultValue = "10") int limit) {
        try {
            List<PropertySearchResult> featured = searchService.getFeaturedProperties(limit);
            return ResponseEntity.ok(ApiResponse.success(featured));
        } catch (Exception e) {
            logger.error("Failed to get featured properties - {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to get featured properties", e.getMessage()));
        }
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return xForwardedForHeader.split(",")[0];
        }
    }
}