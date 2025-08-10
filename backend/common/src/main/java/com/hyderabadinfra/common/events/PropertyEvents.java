package com.hyderabadinfra.common.events;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * Property-related domain events for Event Sourcing
 */
public class PropertyEvents {

    public static class PropertyCreatedEvent implements DomainEvent {
        private UUID eventId;
        private String aggregateId;
        private String userId;
        private Instant timestamp;
        private Long version;
        
        // Property details
        private String title;
        private String description;
        private String location;
        private BigDecimal price;
        private String propertyType;
        private Integer bedrooms;
        private Integer bathrooms;
        private BigDecimal areaSqft;

        public PropertyCreatedEvent() {
            this.eventId = UUID.randomUUID();
            this.timestamp = Instant.now();
        }

        public PropertyCreatedEvent(String propertyId, String userId, String title, String description,
                                   String location, BigDecimal price, String propertyType, 
                                   Integer bedrooms, Integer bathrooms, BigDecimal areaSqft) {
            this();
            this.aggregateId = propertyId;
            this.userId = userId;
            this.title = title;
            this.description = description;
            this.location = location;
            this.price = price;
            this.propertyType = propertyType;
            this.bedrooms = bedrooms;
            this.bathrooms = bathrooms;
            this.areaSqft = areaSqft;
        }

        @Override
        public UUID getEventId() { return eventId; }

        @Override
        public String getAggregateId() { return aggregateId; }

        @Override
        public String getUserId() { return userId; }

        @Override
        public Instant getTimestamp() { return timestamp; }

        @Override
        public String getEventType() { return "PropertyCreated"; }

        @Override
        public Long getVersion() { return version; }

        // Getters and Setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        
        public String getPropertyType() { return propertyType; }
        public void setPropertyType(String propertyType) { this.propertyType = propertyType; }
        
        public Integer getBedrooms() { return bedrooms; }
        public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }
        
        public Integer getBathrooms() { return bathrooms; }
        public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }
        
        public BigDecimal getAreaSqft() { return areaSqft; }
        public void setAreaSqft(BigDecimal areaSqft) { this.areaSqft = areaSqft; }

        public void setEventId(UUID eventId) { this.eventId = eventId; }
        public void setAggregateId(String aggregateId) { this.aggregateId = aggregateId; }
        public void setUserId(String userId) { this.userId = userId; }
        public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
        public void setVersion(Long version) { this.version = version; }
    }

    public static class PropertyViewedEvent implements DomainEvent {
        private UUID eventId;
        private String aggregateId;
        private String userId;
        private Instant timestamp;
        private Long version;
        private String viewerUserId;

        public PropertyViewedEvent() {
            this.eventId = UUID.randomUUID();
            this.timestamp = Instant.now();
        }

        public PropertyViewedEvent(String propertyId, String ownerUserId, String viewerUserId) {
            this();
            this.aggregateId = propertyId;
            this.userId = ownerUserId;
            this.viewerUserId = viewerUserId;
        }

        @Override
        public UUID getEventId() { return eventId; }

        @Override
        public String getAggregateId() { return aggregateId; }

        @Override
        public String getUserId() { return userId; }

        @Override
        public Instant getTimestamp() { return timestamp; }

        @Override
        public String getEventType() { return "PropertyViewed"; }

        @Override
        public Long getVersion() { return version; }

        public String getViewerUserId() { return viewerUserId; }
        public void setViewerUserId(String viewerUserId) { this.viewerUserId = viewerUserId; }

        public void setEventId(UUID eventId) { this.eventId = eventId; }
        public void setAggregateId(String aggregateId) { this.aggregateId = aggregateId; }
        public void setUserId(String userId) { this.userId = userId; }
        public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
        public void setVersion(Long version) { this.version = version; }
    }

    public static class PropertySearchedEvent implements DomainEvent {
        private UUID eventId;
        private String aggregateId;
        private String userId;
        private Instant timestamp;
        private Long version;
        
        private String searchLocation;
        private String propertyType;
        private BigDecimal minPrice;
        private BigDecimal maxPrice;
        private Integer resultsCount;

        public PropertySearchedEvent() {
            this.eventId = UUID.randomUUID();
            this.timestamp = Instant.now();
        }

        public PropertySearchedEvent(String userId, String searchLocation, String propertyType,
                                   BigDecimal minPrice, BigDecimal maxPrice, Integer resultsCount) {
            this();
            this.aggregateId = UUID.randomUUID().toString(); // Search session ID
            this.userId = userId;
            this.searchLocation = searchLocation;
            this.propertyType = propertyType;
            this.minPrice = minPrice;
            this.maxPrice = maxPrice;
            this.resultsCount = resultsCount;
        }

        @Override
        public UUID getEventId() { return eventId; }

        @Override
        public String getAggregateId() { return aggregateId; }

        @Override
        public String getUserId() { return userId; }

        @Override
        public Instant getTimestamp() { return timestamp; }

        @Override
        public String getEventType() { return "PropertySearched"; }

        @Override
        public Long getVersion() { return version; }

        // Getters and Setters
        public String getSearchLocation() { return searchLocation; }
        public void setSearchLocation(String searchLocation) { this.searchLocation = searchLocation; }
        
        public String getPropertyType() { return propertyType; }
        public void setPropertyType(String propertyType) { this.propertyType = propertyType; }
        
        public BigDecimal getMinPrice() { return minPrice; }
        public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }
        
        public BigDecimal getMaxPrice() { return maxPrice; }
        public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }
        
        public Integer getResultsCount() { return resultsCount; }
        public void setResultsCount(Integer resultsCount) { this.resultsCount = resultsCount; }

        public void setEventId(UUID eventId) { this.eventId = eventId; }
        public void setAggregateId(String aggregateId) { this.aggregateId = aggregateId; }
        public void setUserId(String userId) { this.userId = userId; }
        public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
        public void setVersion(Long version) { this.version = version; }
    }
}