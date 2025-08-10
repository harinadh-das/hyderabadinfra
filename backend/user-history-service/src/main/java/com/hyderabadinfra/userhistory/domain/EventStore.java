package com.hyderabadinfra.userhistory.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

/**
 * Event Store entity for Event Sourcing - stores all domain events
 */
@Entity
@Table(name = "event_store", indexes = {
    @Index(name = "idx_user_id", columnList = "userId"),
    @Index(name = "idx_aggregate_id", columnList = "aggregateId"),
    @Index(name = "idx_timestamp", columnList = "timestamp"),
    @Index(name = "idx_event_type", columnList = "eventType")
})
public class EventStore {
    
    @Id
    @Column(columnDefinition = "UUID")
    private UUID eventId;
    
    @Column(nullable = false)
    private String aggregateId;
    
    @Column(nullable = false)
    private String userId;
    
    @Column(nullable = false)
    private Instant timestamp;
    
    @Column(nullable = false)
    private String eventType;
    
    @Column(columnDefinition = "TEXT")
    private String eventData;
    
    @Column(nullable = false)
    private Long version;
    
    @Column
    private String correlationId;
    
    @Column
    private String causationId;
    
    // Constructors
    public EventStore() {}
    
    public EventStore(UUID eventId, String aggregateId, String userId, Instant timestamp, 
                     String eventType, String eventData, Long version) {
        this.eventId = eventId;
        this.aggregateId = aggregateId;
        this.userId = userId;
        this.timestamp = timestamp;
        this.eventType = eventType;
        this.eventData = eventData;
        this.version = version;
    }
    
    // Getters and Setters
    public UUID getEventId() { return eventId; }
    public void setEventId(UUID eventId) { this.eventId = eventId; }
    
    public String getAggregateId() { return aggregateId; }
    public void setAggregateId(String aggregateId) { this.aggregateId = aggregateId; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    
    public String getEventData() { return eventData; }
    public void setEventData(String eventData) { this.eventData = eventData; }
    
    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
    
    public String getCorrelationId() { return correlationId; }
    public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }
    
    public String getCausationId() { return causationId; }
    public void setCausationId(String causationId) { this.causationId = causationId; }
}