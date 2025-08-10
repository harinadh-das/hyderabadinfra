package com.hyderabadinfra.property.command;

import com.hyderabadinfra.common.events.PropertyEvents;
import com.hyderabadinfra.common.events.UserActivityEvent;
import com.hyderabadinfra.property.domain.Property;
import com.hyderabadinfra.property.repository.PropertyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.UUID;

/**
 * CQRS Command Handler for Property Management
 * Handles all write operations and publishes events
 */
@Service
@Transactional
public class PropertyCommandHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(PropertyCommandHandler.class);
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    // Kafka Topics
    private static final String PROPERTY_EVENTS_TOPIC = "property-events";
    private static final String USER_ACTIVITY_TOPIC = "user-activity";
    
    /**
     * Handle Create Property Command
     */
    public Property handleCreateProperty(CreatePropertyCommand command) {
        try {
            logger.info("Processing create property command for user: {}", command.getUserId());
            
            // Create and save property (Command side)
            Property property = new Property();
            property.setId(UUID.randomUUID().toString());
            property.setUserId(command.getUserId());
            property.setTitle(command.getTitle());
            property.setDescription(command.getDescription());
            property.setLocation(command.getLocation());
            property.setPrice(command.getPrice());
            property.setPropertyType(command.getPropertyType());
            property.setBedrooms(command.getBedrooms());
            property.setBathrooms(command.getBathrooms());
            property.setAreaSqft(command.getAreaSqft());
            property.setCreatedAt(Instant.now());
            property.setUpdatedAt(Instant.now());
            
            Property savedProperty = propertyRepository.save(property);
            
            // Publish Property Created Event
            PropertyEvents.PropertyCreatedEvent propertyEvent = new PropertyEvents.PropertyCreatedEvent(
                savedProperty.getId(),
                savedProperty.getUserId(),
                savedProperty.getTitle(),
                savedProperty.getDescription(),
                savedProperty.getLocation(),
                savedProperty.getPrice(),
                savedProperty.getPropertyType(),
                savedProperty.getBedrooms(),
                savedProperty.getBathrooms(),
                savedProperty.getAreaSqft()
            );
            
            kafkaTemplate.send(PROPERTY_EVENTS_TOPIC, savedProperty.getId(), propertyEvent);
            
            // Publish User Activity Event
            UserActivityEvent activityEvent = new UserActivityEvent(
                command.getUserId(),
                "PROPERTY_CREATED",
                "User created property: " + savedProperty.getTitle(),
                savedProperty
            );
            
            kafkaTemplate.send(USER_ACTIVITY_TOPIC, command.getUserId(), activityEvent);
            
            // Update user profile via RestTemplate (sync communication)
            updateUserPropertyCount(command.getUserId());
            
            logger.info("Property created successfully with ID: {} for user: {}", 
                       savedProperty.getId(), command.getUserId());
            
            return savedProperty;
            
        } catch (Exception e) {
            logger.error("Failed to create property for user: {} - {}", command.getUserId(), e.getMessage(), e);
            throw new RuntimeException("Failed to create property: " + e.getMessage(), e);
        }
    }
    
    /**
     * Handle Property View Command (tracks viewing)
     */
    public void handlePropertyView(String propertyId, String viewerUserId) {
        try {
            Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found: " + propertyId));
            
            // Increment view count
            property.setViewCount(property.getViewCount() + 1);
            property.setLastViewedAt(Instant.now());
            propertyRepository.save(property);
            
            // Publish Property Viewed Event
            PropertyEvents.PropertyViewedEvent viewEvent = new PropertyEvents.PropertyViewedEvent(
                propertyId, property.getUserId(), viewerUserId);
            
            kafkaTemplate.send(PROPERTY_EVENTS_TOPIC, propertyId, viewEvent);
            
            // Publish User Activity Event
            UserActivityEvent activityEvent = new UserActivityEvent(
                viewerUserId,
                "PROPERTY_VIEWED",
                "User viewed property: " + property.getTitle(),
                property
            );
            
            kafkaTemplate.send(USER_ACTIVITY_TOPIC, viewerUserId, activityEvent);
            
            logger.info("Property view recorded - Property: {}, Viewer: {}", propertyId, viewerUserId);
            
        } catch (Exception e) {
            logger.error("Failed to record property view - Property: {}, Viewer: {} - {}", 
                        propertyId, viewerUserId, e.getMessage(), e);
        }
    }
    
    /**
     * Update user property count via RestTemplate
     */
    private void updateUserPropertyCount(String userId) {
        try {
            String userServiceUrl = "http://localhost:8081/api/users/" + userId + "/property-count";
            
            long propertyCount = propertyRepository.countByUserId(userId);
            
            restTemplate.postForObject(userServiceUrl, 
                new PropertyCountUpdate(propertyCount), Void.class);
            
            logger.debug("Updated property count for user {}: {}", userId, propertyCount);
            
        } catch (Exception e) {
            logger.warn("Failed to update user property count for user: {} - {}", userId, e.getMessage());
            // Don't fail the main operation if this sync call fails
        }
    }
    
    /**
     * Command for creating a property
     */
    public static class CreatePropertyCommand {
        private String userId;
        private String title;
        private String description;
        private String location;
        private java.math.BigDecimal price;
        private String propertyType;
        private Integer bedrooms;
        private Integer bathrooms;
        private java.math.BigDecimal areaSqft;
        
        // Constructors
        public CreatePropertyCommand() {}
        
        // Getters and Setters
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        
        public java.math.BigDecimal getPrice() { return price; }
        public void setPrice(java.math.BigDecimal price) { this.price = price; }
        
        public String getPropertyType() { return propertyType; }
        public void setPropertyType(String propertyType) { this.propertyType = propertyType; }
        
        public Integer getBedrooms() { return bedrooms; }
        public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }
        
        public Integer getBathrooms() { return bathrooms; }
        public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }
        
        public java.math.BigDecimal getAreaSqft() { return areaSqft; }
        public void setAreaSqft(java.math.BigDecimal areaSqft) { this.areaSqft = areaSqft; }
    }
    
    /**
     * DTO for property count updates
     */
    public static class PropertyCountUpdate {
        private long propertyCount;
        
        public PropertyCountUpdate(long propertyCount) {
            this.propertyCount = propertyCount;
        }
        
        public long getPropertyCount() { return propertyCount; }
        public void setPropertyCount(long propertyCount) { this.propertyCount = propertyCount; }
    }
}