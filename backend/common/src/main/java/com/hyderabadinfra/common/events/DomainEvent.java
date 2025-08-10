package com.hyderabadinfra.common.events;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.time.Instant;
import java.util.UUID;

/**
 * Base interface for all domain events in Event Sourcing
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, property = "@type")
public interface DomainEvent {
    UUID getEventId();
    String getAggregateId();
    String getUserId();
    Instant getTimestamp();
    String getEventType();
    Long getVersion();
}