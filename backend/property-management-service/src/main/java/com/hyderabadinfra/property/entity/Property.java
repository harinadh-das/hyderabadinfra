package com.hyderabadinfra.property.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "properties")
public class Property {
    
    @Id
    @Column(name = "id")
    private String id;
    
    @NotBlank
    @Size(min = 5, max = 200)
    @Column(name = "title", nullable = false)
    private String title;
    
    @NotBlank
    @Size(min = 10, max = 5000)
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "price", nullable = false, precision = 15, scale = 2)
    private BigDecimal price;
    
    @NotBlank
    @Column(name = "location", nullable = false)
    private String location;
    
    @NotBlank
    @Column(name = "address", nullable = false)
    private String address;
    
    @NotBlank
    @Column(name = "city", nullable = false)
    private String city;
    
    @NotBlank
    @Column(name = "state", nullable = false)
    private String state;
    
    @Column(name = "pincode")
    private String pincode;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", nullable = false)
    private PropertyType propertyType;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "listing_type", nullable = false)
    private ListingType listingType;
    
    @Column(name = "bedrooms")
    private Integer bedrooms;
    
    @Column(name = "bathrooms")
    private Integer bathrooms;
    
    @Column(name = "area_sqft")
    private Integer areaSqft;
    
    @Column(name = "parking_spaces")
    private Integer parkingSpaces;
    
    @Column(name = "floor_number")
    private Integer floorNumber;
    
    @Column(name = "total_floors")
    private Integer totalFloors;
    
    @Column(name = "age_of_property")
    private Integer ageOfProperty;
    
    @Column(name = "facing")
    private String facing;
    
    @Column(name = "furnished_status")
    @Enumerated(EnumType.STRING)
    private FurnishedStatus furnishedStatus;
    
    @Column(name = "amenities", columnDefinition = "TEXT")
    private String amenities;
    
    @Column(name = "nearby_facilities", columnDefinition = "TEXT")
    private String nearbyFacilities;
    
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PropertyImage> images = new ArrayList<>();
    
    @Column(name = "owner_id", nullable = false)
    private String ownerId;
    
    @Column(name = "contact_name")
    private String contactName;
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;
    
    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified = false;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PropertyStatus status = PropertyStatus.ACTIVE;
    
    @Column(name = "views_count", nullable = false)
    private Long viewsCount = 0L;
    
    @Column(name = "favorites_count", nullable = false)
    private Long favoritesCount = 0L;
    
    @Column(name = "latitude")
    private Double latitude;
    
    @Column(name = "longitude")
    private Double longitude;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    private void generateId() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
    }
    
    // Constructors
    public Property() {}
    
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
    
    public PropertyType getPropertyType() {
        return propertyType;
    }
    
    public void setPropertyType(PropertyType propertyType) {
        this.propertyType = propertyType;
    }
    
    public ListingType getListingType() {
        return listingType;
    }
    
    public void setListingType(ListingType listingType) {
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
    
    public FurnishedStatus getFurnishedStatus() {
        return furnishedStatus;
    }
    
    public void setFurnishedStatus(FurnishedStatus furnishedStatus) {
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
    
    public List<PropertyImage> getImages() {
        return images;
    }
    
    public void setImages(List<PropertyImage> images) {
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
    
    public PropertyStatus getStatus() {
        return status;
    }
    
    public void setStatus(PropertyStatus status) {
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
    
    // Enums
    public enum PropertyType {
        APARTMENT,
        HOUSE,
        VILLA,
        PLOT,
        COMMERCIAL,
        OFFICE,
        SHOP,
        WAREHOUSE,
        FARMHOUSE,
        STUDIO
    }
    
    public enum ListingType {
        SALE,
        RENT,
        PG
    }
    
    public enum FurnishedStatus {
        FURNISHED,
        SEMI_FURNISHED,
        UNFURNISHED
    }
    
    public enum PropertyStatus {
        ACTIVE,
        INACTIVE,
        SOLD,
        RENTED,
        PENDING
    }
}