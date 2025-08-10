package com.hyderabadinfra.property.repository;

import com.hyderabadinfra.property.domain.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String> {
    
    /**
     * Find properties by user ID
     */
    List<Property> findByUserId(String userId);
    
    /**
     * Count properties by user ID (for CQRS implementation)
     */
    long countByUserId(String userId);
    
    /**
     * Find properties by location containing text (case insensitive)
     */
    @Query("SELECT p FROM Property p WHERE LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<Property> findByLocationContaining(@Param("location") String location);
    
    /**
     * Find properties by property type
     */
    List<Property> findByPropertyType(String propertyType);
    
    /**
     * Find properties within price range
     */
    @Query("SELECT p FROM Property p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Property> findByPriceBetween(@Param("minPrice") BigDecimal minPrice, 
                                     @Param("maxPrice") BigDecimal maxPrice);
    
    /**
     * Find recent properties (used for CQRS queries)
     */
    @Query("SELECT p FROM Property p ORDER BY p.createdAt DESC")
    List<Property> findRecentProperties(Pageable pageable);
}