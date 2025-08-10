package com.hyderabadinfra.common.events;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class UserEvent {
    
    public enum EventType {
        USER_CREATED,
        USER_UPDATED,
        USER_DELETED,
        USER_LOGIN,
        USER_LOGOUT
    }
    
    private String userId;
    private String email;
    private String username;
    private EventType eventType;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    private String details;
    
    public UserEvent() {
        this.timestamp = LocalDateTime.now();
    }
    
    public UserEvent(String userId, String email, String username, EventType eventType, String details) {
        this();
        this.userId = userId;
        this.email = email;
        this.username = username;
        this.eventType = eventType;
        this.details = details;
    }
    
    // Getters and setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public EventType getEventType() {
        return eventType;
    }
    
    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getDetails() {
        return details;
    }
    
    public void setDetails(String details) {
        this.details = details;
    }
}