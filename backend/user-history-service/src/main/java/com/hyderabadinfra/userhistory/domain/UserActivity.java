package com.hyderabadinfra.userhistory.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

/**
 * Read Model for User Activity - Optimized for queries (CQRS Query side)
 */
@Entity
@Table(name = "user_activities", indexes = {
    @Index(name = "idx_user_timestamp", columnList = "userId,timestamp DESC"),
    @Index(name = "idx_activity_type", columnList = "activityType"),
    @Index(name = "idx_timestamp", columnList = "timestamp DESC")
})
public class UserActivity {
    
    @Id
    @Column(columnDefinition = "UUID")
    private UUID activityId;
    
    @Column(nullable = false)
    private String userId;
    
    @Column(nullable = false)
    private Instant timestamp;
    
    @Column(nullable = false)
    private String activityType;
    
    @Column(length = 500)
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String activityData;
    
    @Column
    private String relatedEntityId;
    
    @Column
    private String relatedEntityType;
    
    @Column
    private String sessionId;
    
    @Column
    private String ipAddress;
    
    @Column
    private String userAgent;
    
    // Constructors
    public UserActivity() {
        this.activityId = UUID.randomUUID();
        this.timestamp = Instant.now();
    }
    
    public UserActivity(String userId, String activityType, String description, String activityData) {
        this();
        this.userId = userId;
        this.activityType = activityType;
        this.description = description;
        this.activityData = activityData;
    }
    
    // Getters and Setters
    public UUID getActivityId() { return activityId; }
    public void setActivityId(UUID activityId) { this.activityId = activityId; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    
    public String getActivityType() { return activityType; }
    public void setActivityType(String activityType) { this.activityType = activityType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getActivityData() { return activityData; }
    public void setActivityData(String activityData) { this.activityData = activityData; }
    
    public String getRelatedEntityId() { return relatedEntityId; }
    public void setRelatedEntityId(String relatedEntityId) { this.relatedEntityId = relatedEntityId; }
    
    public String getRelatedEntityType() { return relatedEntityType; }
    public void setRelatedEntityType(String relatedEntityType) { this.relatedEntityType = relatedEntityType; }
    
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
}