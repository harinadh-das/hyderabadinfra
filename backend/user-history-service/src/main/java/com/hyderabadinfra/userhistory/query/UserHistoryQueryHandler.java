package com.hyderabadinfra.userhistory.query;

import com.hyderabadinfra.userhistory.domain.UserActivity;
import com.hyderabadinfra.userhistory.repository.UserActivityRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * CQRS Query Handler for User History - handles all read operations
 */
@Service
public class UserHistoryQueryHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(UserHistoryQueryHandler.class);
    
    @Autowired
    private UserActivityRepository userActivityRepository;
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private static final String CACHE_PREFIX = "user_history:";
    private static final int CACHE_TTL_MINUTES = 5;
    
    /**
     * Get complete user activity history with caching
     */
    public UserHistoryResponse getUserHistory(String userId, int page, int size) {
        String cacheKey = CACHE_PREFIX + userId + ":" + page + ":" + size;
        
        try {
            // Try cache first
            Object cached = redisTemplate.opsForValue().get(cacheKey);
            if (cached != null) {
                logger.debug("Retrieved user history from cache for user: {}", userId);
                return objectMapper.convertValue(cached, UserHistoryResponse.class);
            }
        } catch (Exception e) {
            logger.warn("Cache error, fetching from database: {}", e.getMessage());
        }
        
        // Fetch from database
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<UserActivity> activities = userActivityRepository.findByUserIdOrderByTimestampDesc(userId, pageable);
        
        UserHistoryResponse response = new UserHistoryResponse();
        response.setUserId(userId);
        response.setActivities(activities.getContent());
        response.setTotalActivities(activities.getTotalElements());
        response.setCurrentPage(page);
        response.setTotalPages(activities.getTotalPages());
        response.setSummary(generateActivitySummary(userId));
        
        // Cache the result
        try {
            redisTemplate.opsForValue().set(cacheKey, response, CACHE_TTL_MINUTES, TimeUnit.MINUTES);
        } catch (Exception e) {
            logger.warn("Failed to cache user history: {}", e.getMessage());
        }
        
        logger.info("Retrieved history for user {} - {} activities", userId, activities.getTotalElements());
        return response;
    }
    
    /**
     * Get recent user activities (last 24 hours)
     */
    public List<UserActivity> getRecentActivities(String userId, int limit) {
        Instant since = Instant.now().minus(24, ChronoUnit.HOURS);
        Pageable pageable = PageRequest.of(0, limit, Sort.by("timestamp").descending());
        return userActivityRepository.findByUserIdAndTimestampAfterOrderByTimestampDesc(userId, since, pageable).getContent();
    }
    
    /**
     * Get activities by type
     */
    public List<UserActivity> getActivitiesByType(String userId, String activityType, int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by("timestamp").descending());
        return userActivityRepository.findByUserIdAndActivityTypeOrderByTimestampDesc(userId, activityType, pageable).getContent();
    }
    
    /**
     * Get user's property-related activities
     */
    public List<UserActivity> getPropertyActivities(String userId, int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by("timestamp").descending());
        List<String> propertyActivityTypes = Arrays.asList("PROPERTY_CREATED", "PROPERTY_VIEWED", "PROPERTY_SEARCHED");
        return userActivityRepository.findByUserIdAndActivityTypeInOrderByTimestampDesc(userId, propertyActivityTypes, pageable).getContent();
    }
    
    /**
     * Get user's search history
     */
    public List<UserActivity> getSearchHistory(String userId, int limit) {
        return getActivitiesByType(userId, "PROPERTY_SEARCHED", limit);
    }
    
    /**
     * Generate activity summary for the user
     */
    private UserActivitySummary generateActivitySummary(String userId) {
        Instant last30Days = Instant.now().minus(30, ChronoUnit.DAYS);
        
        UserActivitySummary summary = new UserActivitySummary();
        summary.setUserId(userId);
        
        // Count activities by type in last 30 days
        Map<String, Long> activityCounts = new HashMap<>();
        List<Object[]> counts = userActivityRepository.countActivitiesByTypeForUserSince(userId, last30Days);
        
        for (Object[] count : counts) {
            activityCounts.put((String) count[0], (Long) count[1]);
        }
        
        summary.setActivityCounts(activityCounts);
        summary.setTotalActivitiesLast30Days(activityCounts.values().stream().mapToLong(Long::longValue).sum());
        summary.setMostActiveDay(userActivityRepository.findMostActiveDayForUser(userId, last30Days));
        summary.setLastActivityTimestamp(userActivityRepository.findLastActivityTimestampForUser(userId));
        
        return summary;
    }
    
    /**
     * Response wrapper for user history
     */
    public static class UserHistoryResponse {
        private String userId;
        private List<UserActivity> activities;
        private long totalActivities;
        private int currentPage;
        private int totalPages;
        private UserActivitySummary summary;
        
        // Getters and Setters
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        
        public List<UserActivity> getActivities() { return activities; }
        public void setActivities(List<UserActivity> activities) { this.activities = activities; }
        
        public long getTotalActivities() { return totalActivities; }
        public void setTotalActivities(long totalActivities) { this.totalActivities = totalActivities; }
        
        public int getCurrentPage() { return currentPage; }
        public void setCurrentPage(int currentPage) { this.currentPage = currentPage; }
        
        public int getTotalPages() { return totalPages; }
        public void setTotalPages(int totalPages) { this.totalPages = totalPages; }
        
        public UserActivitySummary getSummary() { return summary; }
        public void setSummary(UserActivitySummary summary) { this.summary = summary; }
    }
    
    /**
     * User activity summary
     */
    public static class UserActivitySummary {
        private String userId;
        private Map<String, Long> activityCounts;
        private long totalActivitiesLast30Days;
        private String mostActiveDay;
        private Instant lastActivityTimestamp;
        
        // Getters and Setters
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        
        public Map<String, Long> getActivityCounts() { return activityCounts; }
        public void setActivityCounts(Map<String, Long> activityCounts) { this.activityCounts = activityCounts; }
        
        public long getTotalActivitiesLast30Days() { return totalActivitiesLast30Days; }
        public void setTotalActivitiesLast30Days(long totalActivitiesLast30Days) { this.totalActivitiesLast30Days = totalActivitiesLast30Days; }
        
        public String getMostActiveDay() { return mostActiveDay; }
        public void setMostActiveDay(String mostActiveDay) { this.mostActiveDay = mostActiveDay; }
        
        public Instant getLastActivityTimestamp() { return lastActivityTimestamp; }
        public void setLastActivityTimestamp(Instant lastActivityTimestamp) { this.lastActivityTimestamp = lastActivityTimestamp; }
    }
}