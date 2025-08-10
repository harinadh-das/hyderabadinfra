package com.hyderabadinfra.common.events;

import java.time.Instant;
import java.util.UUID;

/**
 * Event for tracking all user activities for history/audit purposes
 */
public class UserActivityEvent implements DomainEvent {
    private UUID eventId;
    private String aggregateId;
    private String userId;
    private Instant timestamp;
    private String activityType;
    private String description;
    private Object activityData;
    private Long version;

    // Constructors
    public UserActivityEvent() {
        this.eventId = UUID.randomUUID();
        this.timestamp = Instant.now();
    }

    public UserActivityEvent(String userId, String activityType, String description, Object activityData) {
        this();
        this.userId = userId;
        this.aggregateId = userId; // User is the aggregate
        this.activityType = activityType;
        this.description = description;
        this.activityData = activityData;
    }

    @Override
    public UUID getEventId() {
        return eventId;
    }

    @Override
    public String getAggregateId() {
        return aggregateId;
    }

    @Override
    public String getUserId() {
        return userId;
    }

    @Override
    public Instant getTimestamp() {
        return timestamp;
    }

    @Override
    public String getEventType() {
        return "UserActivity";
    }

    @Override
    public Long getVersion() {
        return version;
    }

    // Getters and Setters
    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Object getActivityData() {
        return activityData;
    }

    public void setActivityData(Object activityData) {
        this.activityData = activityData;
    }

    public void setEventId(UUID eventId) {
        this.eventId = eventId;
    }

    public void setAggregateId(String aggregateId) {
        this.aggregateId = aggregateId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}