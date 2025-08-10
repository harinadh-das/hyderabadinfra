package com.hyderabadinfra.common.events;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PropertyEvent {
    
    public enum EventType {
        PROPERTY_CREATED,
        PROPERTY_UPDATED,
        PROPERTY_DELETED,
        PROPERTY_VIEWED,
        PROPERTY_FAVORITED
    }
    
    private String propertyId;
    private String title;
    private String ownerId;
    private BigDecimal price;
    private String location;
    private String propertyType;
    private EventType eventType;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    private String details;
    
    public PropertyEvent() {
        this.timestamp = LocalDateTime.now();
    }
    
    public PropertyEvent(String propertyId, String title, String ownerId, EventType eventType, String details) {
        this();
        this.propertyId = propertyId;
        this.title = title;
        this.ownerId = ownerId;
        this.eventType = eventType;
        this.details = details;
    }
    
    // Getters and setters
    public String getPropertyId() {
        return propertyId;
    }
    
    public void setPropertyId(String propertyId) {
        this.propertyId = propertyId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getOwnerId() {
        return ownerId;
    }
    
    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getPropertyType() {
        return propertyType;
    }
    
    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
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