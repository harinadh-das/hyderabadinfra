package com.hyderabadinfra.search.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyderabadinfra.search.dto.PropertySearchResult;
import com.hyderabadinfra.search.dto.SearchRequest;
import com.hyderabadinfra.search.entity.SearchHistory;
import com.hyderabadinfra.search.repository.SearchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SearchService {
    
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;
    
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private static final String PROPERTY_SERVICE_URL = "http://localhost:8082/api/public/properties";
    
    public Page<PropertySearchResult> searchProperties(SearchRequest searchRequest, String userId, String ipAddress, String userAgent) {
        try {
            // Build query parameters for property service
            StringBuilder urlBuilder = new StringBuilder(PROPERTY_SERVICE_URL);
            
            if (searchRequest.getQuery() != null && !searchRequest.getQuery().isEmpty()) {
                urlBuilder.append("/search?query=").append(searchRequest.getQuery());
            } else {
                urlBuilder.append("/filter?dummy=true");
            }
            
            // Add filters
            if (searchRequest.getCity() != null) {
                urlBuilder.append("&city=").append(searchRequest.getCity());
            }
            if (searchRequest.getPropertyType() != null) {
                urlBuilder.append("&propertyType=").append(searchRequest.getPropertyType());
            }
            if (searchRequest.getListingType() != null) {
                urlBuilder.append("&listingType=").append(searchRequest.getListingType());
            }
            if (searchRequest.getMinPrice() != null) {
                urlBuilder.append("&minPrice=").append(searchRequest.getMinPrice());
            }
            if (searchRequest.getMaxPrice() != null) {
                urlBuilder.append("&maxPrice=").append(searchRequest.getMaxPrice());
            }
            if (searchRequest.getBedrooms() != null) {
                urlBuilder.append("&bedrooms=").append(searchRequest.getBedrooms());
            }
            if (searchRequest.getMinArea() != null) {
                urlBuilder.append("&minArea=").append(searchRequest.getMinArea());
            }
            if (searchRequest.getMaxArea() != null) {
                urlBuilder.append("&maxArea=").append(searchRequest.getMaxArea());
            }
            
            // Add pagination and sorting
            urlBuilder.append("&page=").append(searchRequest.getPage());
            urlBuilder.append("&size=").append(searchRequest.getSize());
            urlBuilder.append("&sortBy=").append(searchRequest.getSortBy());
            
            // Call property service
            ResponseEntity<Map> response = restTemplate.getForEntity(urlBuilder.toString(), Map.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                Map<String, Object> data = (Map<String, Object>) responseBody.get("data");
                
                if (data != null) {
                    List<Map<String, Object>> content = (List<Map<String, Object>>) data.get("content");
                    List<PropertySearchResult> searchResults = content.stream()
                            .map(this::mapToSearchResult)
                            .toList();
                    
                    // Apply relevance scoring
                    searchResults = applyRelevanceScoring(searchResults, searchRequest);
                    
                    // Save search history
                    saveSearchHistory(searchRequest, userId, searchResults.size(), ipAddress, userAgent);
                    
                    // Create page info
                    Map<String, Object> pageable = (Map<String, Object>) data.get("pageable");
                    int totalElements = (Integer) data.get("totalElements");
                    
                    return new PageImpl<>(searchResults, 
                            PageRequest.of(searchRequest.getPage(), searchRequest.getSize()), 
                            totalElements);
                }
            }
            
            return new PageImpl<>(List.of(), PageRequest.of(searchRequest.getPage(), searchRequest.getSize()), 0);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to search properties: " + e.getMessage());
        }
    }
    
    public List<PropertySearchResult> getRecommendations(String userId, int limit) {
        // Get user's search history to understand preferences
        List<SearchHistory> recentSearches = searchHistoryRepository.findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(0, 10));
        
        if (recentSearches.isEmpty()) {
            // If no history, return featured properties
            return getFeaturedProperties(limit);
        }
        
        // Analyze search patterns and get recommendations
        SearchRequest recommendationRequest = analyzeUserPreferences(recentSearches);
        Page<PropertySearchResult> recommendations = searchProperties(recommendationRequest, userId, null, null);
        
        return recommendations.getContent().stream()
                .limit(limit)
                .toList();
    }
    
    public List<String> getSearchSuggestions(String query, int limit) {
        // Get popular search terms
        List<String> suggestions = searchHistoryRepository.findPopularSearchTerms(PageRequest.of(0, limit));
        
        // Filter by query if provided
        if (query != null && !query.isEmpty()) {
            return suggestions.stream()
                    .filter(suggestion -> suggestion.toLowerCase().contains(query.toLowerCase()))
                    .limit(limit)
                    .toList();
        }
        
        return suggestions;
    }
    
    public List<PropertySearchResult> getFeaturedProperties(int limit) {
        try {
            String url = PROPERTY_SERVICE_URL + "/featured?page=0&size=" + limit;
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                Map<String, Object> data = (Map<String, Object>) responseBody.get("data");
                
                if (data != null) {
                    List<Map<String, Object>> content = (List<Map<String, Object>>) data.get("content");
                    return content.stream()
                            .map(this::mapToSearchResult)
                            .toList();
                }
            }
            
            return List.of();
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to get featured properties: " + e.getMessage());
        }
    }
    
    private PropertySearchResult mapToSearchResult(Map<String, Object> propertyMap) {
        PropertySearchResult result = new PropertySearchResult();
        result.setId((String) propertyMap.get("id"));
        result.setTitle((String) propertyMap.get("title"));
        result.setDescription((String) propertyMap.get("description"));
        // Handle BigDecimal properly
        if (propertyMap.get("price") != null) {
            result.setPrice(new java.math.BigDecimal(propertyMap.get("price").toString()));
        }
        result.setLocation((String) propertyMap.get("location"));
        result.setAddress((String) propertyMap.get("address"));
        result.setCity((String) propertyMap.get("city"));
        result.setState((String) propertyMap.get("state"));
        result.setPropertyType((String) propertyMap.get("propertyType"));
        result.setListingType((String) propertyMap.get("listingType"));
        result.setBedrooms((Integer) propertyMap.get("bedrooms"));
        result.setBathrooms((Integer) propertyMap.get("bathrooms"));
        result.setAreaSqft((Integer) propertyMap.get("areaSqft"));
        result.setFurnishedStatus((String) propertyMap.get("furnishedStatus"));
        result.setContactName((String) propertyMap.get("contactName"));
        result.setContactPhone((String) propertyMap.get("contactPhone"));
        result.setIsFeatured((Boolean) propertyMap.get("isFeatured"));
        result.setIsVerified((Boolean) propertyMap.get("isVerified"));
        if (propertyMap.get("viewsCount") != null) {
            result.setViewsCount(Long.valueOf(propertyMap.get("viewsCount").toString()));
        }
        if (propertyMap.get("favoritesCount") != null) {
            result.setFavoritesCount(Long.valueOf(propertyMap.get("favoritesCount").toString()));
        }
        result.setLatitude((Double) propertyMap.get("latitude"));
        result.setLongitude((Double) propertyMap.get("longitude"));
        
        // Extract images
        List<Map<String, Object>> images = (List<Map<String, Object>>) propertyMap.get("images");
        if (images != null) {
            List<String> imageUrls = images.stream()
                    .map(img -> (String) img.get("imageUrl"))
                    .toList();
            result.setImages(imageUrls);
        }
        
        return result;
    }
    
    private List<PropertySearchResult> applyRelevanceScoring(List<PropertySearchResult> results, SearchRequest searchRequest) {
        return results.stream()
                .peek(result -> {
                    double score = calculateRelevanceScore(result, searchRequest);
                    result.setRelevanceScore(score);
                })
                .sorted((a, b) -> Double.compare(b.getRelevanceScore(), a.getRelevanceScore()))
                .toList();
    }
    
    private double calculateRelevanceScore(PropertySearchResult result, SearchRequest searchRequest) {
        double score = 0.0;
        
        // Base score for active listings
        score += 10.0;
        
        // Featured properties get higher score
        if (Boolean.TRUE.equals(result.getIsFeatured())) {
            score += 20.0;
        }
        
        // Verified properties get bonus
        if (Boolean.TRUE.equals(result.getIsVerified())) {
            score += 15.0;
        }
        
        // View count contributes to score
        if (result.getViewsCount() != null) {
            score += Math.min(result.getViewsCount() * 0.1, 10.0);
        }
        
        // Favorites count contributes to score
        if (result.getFavoritesCount() != null) {
            score += Math.min(result.getFavoritesCount() * 0.5, 15.0);
        }
        
        // Text relevance (simple keyword matching)
        if (searchRequest.getQuery() != null && !searchRequest.getQuery().isEmpty()) {
            String query = searchRequest.getQuery().toLowerCase();
            String title = result.getTitle() != null ? result.getTitle().toLowerCase() : "";
            String description = result.getDescription() != null ? result.getDescription().toLowerCase() : "";
            String location = result.getLocation() != null ? result.getLocation().toLowerCase() : "";
            
            if (title.contains(query)) score += 25.0;
            if (description.contains(query)) score += 15.0;
            if (location.contains(query)) score += 20.0;
        }
        
        return score;
    }
    
    private void saveSearchHistory(SearchRequest searchRequest, String userId, int resultsCount, String ipAddress, String userAgent) {
        try {
            SearchHistory history = new SearchHistory();
            history.setUserId(userId);
            history.setSearchQuery(searchRequest.getQuery());
            history.setSearchFilters(objectMapper.writeValueAsString(searchRequest));
            history.setResultsCount(resultsCount);
            history.setIpAddress(ipAddress);
            history.setUserAgent(userAgent);
            
            searchHistoryRepository.save(history);
            
            // Publish search event
            Map<String, Object> searchEvent = Map.of(
                "userId", userId != null ? userId : "anonymous",
                "query", searchRequest.getQuery() != null ? searchRequest.getQuery() : "",
                "filters", searchRequest,
                "resultsCount", resultsCount,
                "timestamp", java.time.LocalDateTime.now()
            );
            kafkaTemplate.send("search-events", searchEvent);
            
        } catch (Exception e) {
            // Log error but don't fail the search
            System.err.println("Failed to save search history: " + e.getMessage());
        }
    }
    
    private SearchRequest analyzeUserPreferences(List<SearchHistory> searchHistory) {
        SearchRequest preferences = new SearchRequest();
        
        // Analyze most common city
        Map<String, Long> cityCount = searchHistory.stream()
                .filter(h -> h.getSearchFilters() != null)
                .map(h -> {
                    try {
                        return objectMapper.readValue(h.getSearchFilters(), SearchRequest.class);
                    } catch (Exception e) {
                        return null;
                    }
                })
                .filter(r -> r != null && r.getCity() != null)
                .collect(java.util.stream.Collectors.groupingBy(SearchRequest::getCity, java.util.stream.Collectors.counting()));
        
        if (!cityCount.isEmpty()) {
            String mostSearchedCity = cityCount.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .map(Map.Entry::getKey)
                    .orElse(null);
            preferences.setCity(mostSearchedCity);
        }
        
        // Set default parameters for recommendations
        preferences.setSize(10);
        preferences.setSortBy("createdAt");
        preferences.setSortOrder("desc");
        
        return preferences;
    }
}