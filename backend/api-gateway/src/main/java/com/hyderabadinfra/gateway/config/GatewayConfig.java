package com.hyderabadinfra.gateway.config;

// import com.hyderabadinfra.gateway.filter.JwtAuthenticationFilter;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class GatewayConfig {
    
    // Temporarily disable JWT authentication to get services running
    // @Autowired
    // private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // User Management Service routes (no auth for now)
                .route("user-service", r -> r.path("/api/auth/**", "/api/users/**")
                        .uri("http://localhost:8081"))
                
                // Property Management Service routes (no auth for now)
                .route("property-service", r -> r.path("/api/properties/**")
                        .uri("http://localhost:8082"))
                
                // Search Service routes (no auth for now)
                .route("search-service", r -> r.path("/api/search/**")
                        .uri("http://localhost:8083"))
                
                // Notification Service routes (no auth for now)
                .route("notification-service", r -> r.path("/api/notifications/**")
                        .uri("http://localhost:8084"))
                
                // File Upload Service routes (no auth for now)
                .route("file-service", r -> r.path("/api/files/**")
                        .uri("http://localhost:8085"))
                
                // Public routes (no authentication)
                .route("public-property-search", r -> r.path("/api/public/properties/**")
                        .uri("http://localhost:8082"))
                
                .route("public-search", r -> r.path("/api/public/search/**")
                        .uri("http://localhost:8083"))
                
                .build();
    }
    
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOriginPatterns(Collections.singletonList("*"));
        corsConfig.setMaxAge(3600L);
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        corsConfig.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        
        return new CorsWebFilter(source);
    }
}