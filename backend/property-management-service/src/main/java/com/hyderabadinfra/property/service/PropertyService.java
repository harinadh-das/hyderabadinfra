package com.hyderabadinfra.property.service;

import com.hyderabadinfra.common.events.PropertyEvent;
import com.hyderabadinfra.property.dto.PropertyRequest;
import com.hyderabadinfra.property.dto.PropertyResponse;
import com.hyderabadinfra.property.entity.Property;
import com.hyderabadinfra.property.entity.PropertyImage;
import com.hyderabadinfra.property.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyService {
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public PropertyResponse createProperty(PropertyRequest request, String ownerId) {
        Property property = new Property();
        mapRequestToEntity(request, property);
        property.setOwnerId(ownerId);
        property.setStatus(Property.PropertyStatus.ACTIVE);
        property.setViewsCount(0L);
        property.setFavoritesCount(0L);
        
        // Add images if provided
        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()) {
            List<PropertyImage> images = request.getImageUrls().stream()
                    .map(url -> new PropertyImage(url, extractImageName(url), property))
                    .collect(Collectors.toList());
            
            // Set first image as primary
            if (!images.isEmpty()) {
                images.get(0).setIsPrimary(true);
            }
            
            property.setImages(images);
        }
        
        Property savedProperty = propertyRepository.save(property);
        
        // Publish property created event
        PropertyEvent propertyEvent = new PropertyEvent(
            savedProperty.getId(),
            savedProperty.getTitle(),
            savedProperty.getOwnerId(),
            PropertyEvent.EventType.PROPERTY_CREATED,
            "Property created successfully"
        );
        propertyEvent.setPrice(savedProperty.getPrice());
        propertyEvent.setLocation(savedProperty.getLocation());
        propertyEvent.setPropertyType(savedProperty.getPropertyType().name());
        kafkaTemplate.send("property-events", propertyEvent);
        
        return new PropertyResponse(savedProperty);
    }
    
    public PropertyResponse updateProperty(String propertyId, PropertyRequest request, String ownerId) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        // Check if user is owner or admin
        if (!property.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You can only update your own properties");
        }
        
        mapRequestToEntity(request, property);
        
        Property updatedProperty = propertyRepository.save(property);
        
        // Publish property updated event
        PropertyEvent propertyEvent = new PropertyEvent(
            updatedProperty.getId(),
            updatedProperty.getTitle(),
            updatedProperty.getOwnerId(),
            PropertyEvent.EventType.PROPERTY_UPDATED,
            "Property updated successfully"
        );
        propertyEvent.setPrice(updatedProperty.getPrice());
        propertyEvent.setLocation(updatedProperty.getLocation());
        propertyEvent.setPropertyType(updatedProperty.getPropertyType().name());
        kafkaTemplate.send("property-events", propertyEvent);
        
        return new PropertyResponse(updatedProperty);
    }
    
    public void deleteProperty(String propertyId, String ownerId) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        // Check if user is owner or admin
        if (!property.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You can only delete your own properties");
        }
        
        propertyRepository.delete(property);
        
        // Publish property deleted event
        PropertyEvent propertyEvent = new PropertyEvent(
            property.getId(),
            property.getTitle(),
            property.getOwnerId(),
            PropertyEvent.EventType.PROPERTY_DELETED,
            "Property deleted successfully"
        );
        kafkaTemplate.send("property-events", propertyEvent);
    }
    
    public PropertyResponse getPropertyById(String propertyId) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        // Increment view count
        property.setViewsCount(property.getViewsCount() + 1);
        propertyRepository.save(property);
        
        // Publish property viewed event
        PropertyEvent propertyEvent = new PropertyEvent(
            property.getId(),
            property.getTitle(),
            property.getOwnerId(),
            PropertyEvent.EventType.PROPERTY_VIEWED,
            "Property viewed"
        );
        kafkaTemplate.send("property-events", propertyEvent);
        
        return new PropertyResponse(property);
    }
    
    public Page<PropertyResponse> getAllProperties(int page, int size, String sortBy, String sortDir) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        return propertyRepository.findByStatus(Property.PropertyStatus.ACTIVE, pageable)
            .map(PropertyResponse::new);
    }
    
    public Page<PropertyResponse> getPropertiesByOwner(String ownerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return propertyRepository.findByOwnerId(ownerId, pageable)
            .map(PropertyResponse::new);
    }
    
    public Page<PropertyResponse> searchProperties(String searchTerm, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return propertyRepository.searchProperties(searchTerm, pageable)
            .map(PropertyResponse::new);
    }
    
    public Page<PropertyResponse> getPropertiesWithFilters(
            String city, String propertyType, String listingType,
            BigDecimal minPrice, BigDecimal maxPrice, Integer bedrooms,
            Integer minArea, Integer maxArea, int page, int size, String sortBy) {
        
        Property.PropertyType propType = null;
        if (propertyType != null && !propertyType.isEmpty()) {
            try {
                propType = Property.PropertyType.valueOf(propertyType.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid property type: " + propertyType);
            }
        }
        
        Property.ListingType listType = null;
        if (listingType != null && !listingType.isEmpty()) {
            try {
                listType = Property.ListingType.valueOf(listingType.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid listing type: " + listingType);
            }
        }
        
        Sort sort = Sort.by(Sort.Direction.DESC, sortBy != null ? sortBy : "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);
        
        return propertyRepository.findPropertiesWithFilters(
            city, propType, listType, minPrice, maxPrice, bedrooms, minArea, maxArea, pageable
        ).map(PropertyResponse::new);
    }
    
    public Page<PropertyResponse> getFeaturedProperties(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return propertyRepository.findFeaturedProperties(pageable)
            .map(PropertyResponse::new);
    }
    
    public List<PropertyResponse> getSimilarProperties(String propertyId, int limit) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        Pageable pageable = PageRequest.of(0, limit);
        return propertyRepository.findSimilarProperties(
            property.getCity(), property.getPropertyType(), propertyId, pageable
        ).stream().map(PropertyResponse::new).collect(Collectors.toList());
    }
    
    public void toggleFavorite(String propertyId, String userId) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        // In a real implementation, you would have a UserFavorites table
        // For now, just increment the favorites count
        property.setFavoritesCount(property.getFavoritesCount() + 1);
        propertyRepository.save(property);
        
        // Publish property favorited event
        PropertyEvent propertyEvent = new PropertyEvent(
            property.getId(),
            property.getTitle(),
            property.getOwnerId(),
            PropertyEvent.EventType.PROPERTY_FAVORITED,
            "Property favorited by user: " + userId
        );
        kafkaTemplate.send("property-events", propertyEvent);
    }
    
    public void updatePropertyStatus(String propertyId, String status, String ownerId) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property not found"));
        
        // Check if user is owner
        if (!property.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You can only update your own properties");
        }
        
        try {
            property.setStatus(Property.PropertyStatus.valueOf(status.toUpperCase()));
            propertyRepository.save(property);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }
    
    private void mapRequestToEntity(PropertyRequest request, Property property) {
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setLocation(request.getLocation());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPincode(request.getPincode());
        
        if (request.getPropertyType() != null) {
            try {
                property.setPropertyType(Property.PropertyType.valueOf(request.getPropertyType().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid property type: " + request.getPropertyType());
            }
        }
        
        if (request.getListingType() != null) {
            try {
                property.setListingType(Property.ListingType.valueOf(request.getListingType().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid listing type: " + request.getListingType());
            }
        }
        
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setAreaSqft(request.getAreaSqft());
        property.setParkingSpaces(request.getParkingSpaces());
        property.setFloorNumber(request.getFloorNumber());
        property.setTotalFloors(request.getTotalFloors());
        property.setAgeOfProperty(request.getAgeOfProperty());
        property.setFacing(request.getFacing());
        
        if (request.getFurnishedStatus() != null) {
            try {
                property.setFurnishedStatus(Property.FurnishedStatus.valueOf(request.getFurnishedStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid furnished status: " + request.getFurnishedStatus());
            }
        }
        
        property.setAmenities(request.getAmenities());
        property.setNearbyFacilities(request.getNearbyFacilities());
        property.setContactName(request.getContactName());
        property.setContactPhone(request.getContactPhone());
        property.setContactEmail(request.getContactEmail());
        property.setLatitude(request.getLatitude());
        property.setLongitude(request.getLongitude());
    }
    
    private String extractImageName(String imageUrl) {
        if (imageUrl == null) return null;
        int lastSlash = imageUrl.lastIndexOf('/');
        return lastSlash >= 0 ? imageUrl.substring(lastSlash + 1) : imageUrl;
    }
}