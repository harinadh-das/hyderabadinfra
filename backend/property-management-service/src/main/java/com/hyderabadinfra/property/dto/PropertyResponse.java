package com.hyderabadinfra.property.dto;

import com.hyderabadinfra.property.entity.Property;
import com.hyderabadinfra.property.entity.PropertyImage;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PropertyResponse {
    
    private String id;
    private String title;
    private String description;
    private BigDecimal price;
    private String location;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String propertyType;
    private String listingType;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer areaSqft;
    private Integer parkingSpaces;
    private Integer floorNumber;
    private Integer totalFloors;
    private Integer ageOfProperty;
    private String facing;
    private String furnishedStatus;
    private String amenities;
    private String nearbyFacilities;
    private List<PropertyImageResponse> images;
    private String ownerId;
    private String contactName;
    private String contactPhone;
    private String contactEmail;
    private Boolean isFeatured;
    private Boolean isVerified;
    private String status;
    private Long viewsCount;
    private Long favoritesCount;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor
    public PropertyResponse() {}
    
    public PropertyResponse(Property property) {
        this.id = property.getId();
        this.title = property.getTitle();
        this.description = property.getDescription();
        this.price = property.getPrice();
        this.location = property.getLocation();
        this.address = property.getAddress();
        this.city = property.getCity();
        this.state = property.getState();
        this.pincode = property.getPincode();
        this.propertyType = property.getPropertyType().name();
        this.listingType = property.getListingType().name();
        this.bedrooms = property.getBedrooms();
        this.bathrooms = property.getBathrooms();
        this.areaSqft = property.getAreaSqft();
        this.parkingSpaces = property.getParkingSpaces();
        this.floorNumber = property.getFloorNumber();
        this.totalFloors = property.getTotalFloors();
        this.ageOfProperty = property.getAgeOfProperty();
        this.facing = property.getFacing();
        this.furnishedStatus = property.getFurnishedStatus() != null ? property.getFurnishedStatus().name() : null;
        this.amenities = property.getAmenities();
        this.nearbyFacilities = property.getNearbyFacilities();
        this.images = property.getImages().stream()
                .map(PropertyImageResponse::new)
                .collect(Collectors.toList());
        this.ownerId = property.getOwnerId();
        this.contactName = property.getContactName();
        this.contactPhone = property.getContactPhone();
        this.contactEmail = property.getContactEmail();
        this.isFeatured = property.getIsFeatured();
        this.isVerified = property.getIsVerified();
        this.status = property.getStatus().name();
        this.viewsCount = property.getViewsCount();
        this.favoritesCount = property.getFavoritesCount();
        this.latitude = property.getLatitude();
        this.longitude = property.getLongitude();
        this.createdAt = property.getCreatedAt();
        this.updatedAt = property.getUpdatedAt();
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
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
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public String getState() {
        return state;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public String getPincode() {
        return pincode;
    }
    
    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
    
    public String getPropertyType() {
        return propertyType;
    }
    
    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }
    
    public String getListingType() {
        return listingType;
    }
    
    public void setListingType(String listingType) {
        this.listingType = listingType;
    }
    
    public Integer getBedrooms() {
        return bedrooms;
    }
    
    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }
    
    public Integer getBathrooms() {
        return bathrooms;
    }
    
    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }
    
    public Integer getAreaSqft() {
        return areaSqft;
    }
    
    public void setAreaSqft(Integer areaSqft) {
        this.areaSqft = areaSqft;
    }
    
    public Integer getParkingSpaces() {
        return parkingSpaces;
    }
    
    public void setParkingSpaces(Integer parkingSpaces) {
        this.parkingSpaces = parkingSpaces;
    }
    
    public Integer getFloorNumber() {
        return floorNumber;
    }
    
    public void setFloorNumber(Integer floorNumber) {
        this.floorNumber = floorNumber;
    }
    
    public Integer getTotalFloors() {
        return totalFloors;
    }
    
    public void setTotalFloors(Integer totalFloors) {
        this.totalFloors = totalFloors;
    }
    
    public Integer getAgeOfProperty() {
        return ageOfProperty;
    }
    
    public void setAgeOfProperty(Integer ageOfProperty) {
        this.ageOfProperty = ageOfProperty;
    }
    
    public String getFacing() {
        return facing;
    }
    
    public void setFacing(String facing) {
        this.facing = facing;
    }
    
    public String getFurnishedStatus() {
        return furnishedStatus;
    }
    
    public void setFurnishedStatus(String furnishedStatus) {
        this.furnishedStatus = furnishedStatus;
    }
    
    public String getAmenities() {
        return amenities;
    }
    
    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }
    
    public String getNearbyFacilities() {
        return nearbyFacilities;
    }
    
    public void setNearbyFacilities(String nearbyFacilities) {
        this.nearbyFacilities = nearbyFacilities;
    }
    
    public List<PropertyImageResponse> getImages() {
        return images;
    }
    
    public void setImages(List<PropertyImageResponse> images) {
        this.images = images;
    }
    
    public String getOwnerId() {
        return ownerId;
    }
    
    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
    
    public String getContactName() {
        return contactName;
    }
    
    public void setContactName(String contactName) {
        this.contactName = contactName;
    }
    
    public String getContactPhone() {
        return contactPhone;
    }
    
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }
    
    public String getContactEmail() {
        return contactEmail;
    }
    
    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
    
    public Boolean getIsFeatured() {
        return isFeatured;
    }
    
    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }
    
    public Boolean getIsVerified() {
        return isVerified;
    }
    
    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public Long getViewsCount() {
        return viewsCount;
    }
    
    public void setViewsCount(Long viewsCount) {
        this.viewsCount = viewsCount;
    }
    
    public Long getFavoritesCount() {
        return favoritesCount;
    }
    
    public void setFavoritesCount(Long favoritesCount) {
        this.favoritesCount = favoritesCount;
    }
    
    public Double getLatitude() {
        return latitude;
    }
    
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    
    public Double getLongitude() {
        return longitude;
    }
    
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    // Inner class for property images
    public static class PropertyImageResponse {
        private String id;
        private String imageUrl;
        private String imageName;
        private Boolean isPrimary;
        private Integer displayOrder;
        
        public PropertyImageResponse() {}
        
        public PropertyImageResponse(PropertyImage image) {
            this.id = image.getId();
            this.imageUrl = image.getImageUrl();
            this.imageName = image.getImageName();
            this.isPrimary = image.getIsPrimary();
            this.displayOrder = image.getDisplayOrder();
        }
        
        // Getters and setters
        public String getId() {
            return id;
        }
        
        public void setId(String id) {
            this.id = id;
        }
        
        public String getImageUrl() {
            return imageUrl;
        }
        
        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
        
        public String getImageName() {
            return imageName;
        }
        
        public void setImageName(String imageName) {
            this.imageName = imageName;
        }
        
        public Boolean getIsPrimary() {
            return isPrimary;
        }
        
        public void setIsPrimary(Boolean isPrimary) {
            this.isPrimary = isPrimary;
        }
        
        public Integer getDisplayOrder() {
            return displayOrder;
        }
        
        public void setDisplayOrder(Integer displayOrder) {
            this.displayOrder = displayOrder;
        }
    }
}