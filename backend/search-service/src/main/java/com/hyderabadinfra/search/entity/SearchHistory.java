package com.hyderabadinfra.search.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "search_history")
public class SearchHistory {
    
    @Id
    @Column(name = "id")
    private String id;
    
    @Column(name = "user_id")
    private String userId;
    
    @Column(name = "search_query")
    private String searchQuery;
    
    @Column(name = "search_filters", columnDefinition = "TEXT")
    private String searchFilters;
    
    @Column(name = "results_count")
    private Integer resultsCount;
    
    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    private void generateId() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
    }
    
    // Constructors
    public SearchHistory() {}
    
    public SearchHistory(String userId, String searchQuery, String searchFilters, Integer resultsCount) {
        this.userId = userId;
        this.searchQuery = searchQuery;
        this.searchFilters = searchFilters;
        this.resultsCount = resultsCount;
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getSearchQuery() {
        return searchQuery;
    }
    
    public void setSearchQuery(String searchQuery) {
        this.searchQuery = searchQuery;
    }
    
    public String getSearchFilters() {
        return searchFilters;
    }
    
    public void setSearchFilters(String searchFilters) {
        this.searchFilters = searchFilters;
    }
    
    public Integer getResultsCount() {
        return resultsCount;
    }
    
    public void setResultsCount(Integer resultsCount) {
        this.resultsCount = resultsCount;
    }
    
    public String getIpAddress() {
        return ipAddress;
    }
    
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
    
    public String getUserAgent() {
        return userAgent;
    }
    
    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}