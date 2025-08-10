package com.hyderabadinfra.search.dto;

import java.math.BigDecimal;

public class SearchRequest {
    
    private String query;
    private String city;
    private String state;
    private String propertyType;
    private String listingType;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer minArea;
    private Integer maxArea;
    private String furnishedStatus;
    private Double latitude;
    private Double longitude;
    private Double radiusKm;
    private String sortBy = "createdAt";
    private String sortOrder = "desc";
    private int page = 0;
    private int size = 10;
    
    // Constructors
    public SearchRequest() {}
    
    // Getters and setters
    public String getQuery() {
        return query;
    }
    
    public void setQuery(String query) {
        this.query = query;
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
    
    public BigDecimal getMinPrice() {
        return minPrice;
    }
    
    public void setMinPrice(BigDecimal minPrice) {
        this.minPrice = minPrice;
    }
    
    public BigDecimal getMaxPrice() {
        return maxPrice;
    }
    
    public void setMaxPrice(BigDecimal maxPrice) {
        this.maxPrice = maxPrice;
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
    
    public Integer getMinArea() {
        return minArea;
    }
    
    public void setMinArea(Integer minArea) {
        this.minArea = minArea;
    }
    
    public Integer getMaxArea() {
        return maxArea;
    }
    
    public void setMaxArea(Integer maxArea) {
        this.maxArea = maxArea;
    }
    
    public String getFurnishedStatus() {
        return furnishedStatus;
    }
    
    public void setFurnishedStatus(String furnishedStatus) {
        this.furnishedStatus = furnishedStatus;
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
    
    public Double getRadiusKm() {
        return radiusKm;
    }
    
    public void setRadiusKm(Double radiusKm) {
        this.radiusKm = radiusKm;
    }
    
    public String getSortBy() {
        return sortBy;
    }
    
    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }
    
    public String getSortOrder() {
        return sortOrder;
    }
    
    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }
    
    public int getPage() {
        return page;
    }
    
    public void setPage(int page) {
        this.page = page;
    }
    
    public int getSize() {
        return size;
    }
    
    public void setSize(int size) {
        this.size = size;
    }
}