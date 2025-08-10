package com.hyderabadinfra.userhistory.repository;

import com.hyderabadinfra.userhistory.domain.UserActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Repository for User Activity queries (CQRS Query side)
 */
@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, UUID> {
    
    /**
     * Find all activities for a user ordered by timestamp descending
     */
    Page<UserActivity> findByUserIdOrderByTimestampDesc(String userId, Pageable pageable);
    
    /**
     * Find recent activities for a user since a specific timestamp
     */
    Page<UserActivity> findByUserIdAndTimestampAfterOrderByTimestampDesc(
        String userId, Instant timestamp, Pageable pageable);
    
    /**
     * Find activities by user and activity type
     */
    Page<UserActivity> findByUserIdAndActivityTypeOrderByTimestampDesc(
        String userId, String activityType, Pageable pageable);
    
    /**
     * Find activities by user and activity types (for property-related activities)
     */
    Page<UserActivity> findByUserIdAndActivityTypeInOrderByTimestampDesc(
        String userId, List<String> activityTypes, Pageable pageable);
    
    /**
     * Count activities by type for a user since a specific date
     */
    @Query("SELECT ua.activityType, COUNT(ua) FROM UserActivity ua " +
           "WHERE ua.userId = :userId AND ua.timestamp >= :since " +
           "GROUP BY ua.activityType")
    List<Object[]> countActivitiesByTypeForUserSince(@Param("userId") String userId, 
                                                     @Param("since") Instant since);
    
    /**
     * Find the most active day for a user
     */
    @Query("SELECT DATE(ua.timestamp), COUNT(ua) as activity_count FROM UserActivity ua " +
           "WHERE ua.userId = :userId AND ua.timestamp >= :since " +
           "GROUP BY DATE(ua.timestamp) ORDER BY activity_count DESC LIMIT 1")
    String findMostActiveDayForUser(@Param("userId") String userId, @Param("since") Instant since);
    
    /**
     * Find last activity timestamp for a user
     */
    @Query("SELECT MAX(ua.timestamp) FROM UserActivity ua WHERE ua.userId = :userId")
    Instant findLastActivityTimestampForUser(@Param("userId") String userId);
    
    /**
     * Find activities related to a specific entity
     */
    Page<UserActivity> findByUserIdAndRelatedEntityIdOrderByTimestampDesc(
        String userId, String relatedEntityId, Pageable pageable);
    
    /**
     * Find activities by session ID
     */
    List<UserActivity> findBySessionIdOrderByTimestampDesc(String sessionId);
    
    /**
     * Count total activities for a user
     */
    long countByUserId(String userId);
    
    /**
     * Find activities within a date range
     */
    Page<UserActivity> findByUserIdAndTimestampBetweenOrderByTimestampDesc(
        String userId, Instant startTime, Instant endTime, Pageable pageable);
}