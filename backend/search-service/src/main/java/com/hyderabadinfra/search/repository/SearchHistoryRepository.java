package com.hyderabadinfra.search.repository;

import com.hyderabadinfra.search.entity.SearchHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, String> {
    
    List<SearchHistory> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);
    
    @Query("SELECT sh.searchQuery FROM SearchHistory sh WHERE sh.searchQuery IS NOT NULL AND sh.searchQuery != '' " +
           "GROUP BY sh.searchQuery ORDER BY COUNT(sh) DESC")
    List<String> findPopularSearchTerms(Pageable pageable);
    
    @Query("SELECT COUNT(sh) FROM SearchHistory sh WHERE sh.userId = :userId")
    Long countSearchesByUser(@Param("userId") String userId);
    
    @Query("SELECT sh FROM SearchHistory sh WHERE sh.userId = :userId AND sh.searchQuery LIKE %:query%")
    List<SearchHistory> findUserSearchHistory(@Param("userId") String userId, @Param("query") String query, Pageable pageable);
}