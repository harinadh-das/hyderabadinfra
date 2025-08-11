# 🏗️ Hyderabad Infra - Complete CQRS Microservices Architecture

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [CQRS Pattern Implementation](#cqrs-pattern-implementation)
3. [Microservices Architecture](#microservices-architecture)
4. [Event Sourcing & Kafka](#event-sourcing--kafka)
5. [Database Design](#database-design)
6. [API Gateway & Routing](#api-gateway--routing)
7. [Frontend Integration](#frontend-integration)
8. [Deployment Architecture](#deployment-architecture)
9. [Security & Authentication](#security--authentication)
10. [Monitoring & Logging](#monitoring--logging)

---

## 🎯 System Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    HYDERABAD INFRA                          │
│              Real Estate Platform (CQRS)                   │
└─────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
            ┌───────▼──────┐       ┌───────▼──────┐
            │   FRONTEND   │       │   BACKEND    │
            │   (React/JS) │       │ (Spring Boot)│
            └──────────────┘       └──────────────┘
```

### 🌟 Key Features
- **CQRS Pattern**: Command Query Responsibility Segregation
- **Event Sourcing**: Complete audit trail of user activities
- **Microservices**: 7 independent services
- **Async Messaging**: Kafka for event-driven communication
- **Real-time Updates**: User history tracking
- **Scalable Design**: Independent service scaling

---

## 🏛️ CQRS Pattern Implementation

### Command Query Separation
```
┌─────────────────────────────────────────────────────────────┐
│                      CQRS PATTERN                          │
├─────────────────────┬───────────────────────────────────────┤
│    COMMAND SIDE     │           QUERY SIDE                  │
│   (Write Model)     │          (Read Model)                 │
├─────────────────────┼───────────────────────────────────────┤
│ • Property Create   │ • User History Queries               │
│ • Property Update   │ • Property Search                     │
│ • User Registration │ • Activity Reports                    │
│ • Property View     │ • Analytics                           │
├─────────────────────┼───────────────────────────────────────┤
│ Commands → Events   │ Events → Read Models                  │
│                     │                                       │
│ ┌─────────────────┐ │ ┌─────────────────────────────────────┐ │
│ │ Command Handler │ │ │ Query Handler                       │ │
│ └─────────────────┘ │ └─────────────────────────────────────┘ │
└─────────────────────┴───────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │    EVENT SOURCING     │
                    │  Kafka Event Stream   │
                    └───────────────────────┘
```

### 📊 Event Flow
1. **User Action** → **Command** → **Command Handler**
2. **Command Handler** → **Domain Event** → **Kafka Topic**
3. **Kafka Consumer** → **Read Model Update** → **Query Optimization**
4. **Frontend Query** → **Optimized Response** → **User Interface**

---

## 🔧 Microservices Architecture

### Service Map
```
                    ┌─────────────────────────┐
                    │      API GATEWAY        │
                    │      (Port: 8080)       │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼──────┐    ┌───────────▼──────┐    ┌───────────▼──────┐
│ USER SERVICE │    │ PROPERTY SERVICE │    │ SEARCH SERVICE   │
│ (Port: 8081) │    │  (Port: 8082)    │    │ (Port: 8083)     │
└──────────────┘    └──────────────────┘    └──────────────────┘
        │                       │                       │
        │           ┌───────────▼──────┐    ┌───────────▼──────┐
        │           │ NOTIFICATION     │    │ USER HISTORY     │
        │           │ SERVICE          │    │ SERVICE          │
        │           │ (Port: 8085)     │    │ (Port: 8084)     │
        │           └──────────────────┘    └──────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    ┌───────────▼──────┐
                    │ FILE UPLOAD      │
                    │ SERVICE          │
                    │ (Port: 8086)     │
                    └──────────────────┘
```

### 🎯 Service Details

#### 1. **API Gateway** (Port: 8080)
- **Technology**: Spring Cloud Gateway
- **Purpose**: Single entry point, routing, load balancing
- **Features**: CORS, JWT validation, rate limiting
- **Routes**:
  - `/api/users/**` → User Service
  - `/api/properties/**` → Property Service
  - `/api/search/**` → Search Service
  - `/api/user-history/**` → User History Service
  - `/api/notifications/**` → Notification Service
  - `/api/files/**` → File Upload Service

#### 2. **User Management Service** (Port: 8081)
- **Technology**: Spring Boot + JPA + PostgreSQL
- **CQRS Role**: Command & Query
- **Features**:
  - User registration/authentication
  - Profile management
  - Property count tracking (via RestTemplate)
- **Database**: `user_management_db`

#### 3. **Property Management Service** (Port: 8082)
- **Technology**: Spring Boot + JPA + PostgreSQL
- **CQRS Role**: Command Side (Write Model)
- **Features**:
  - Property CRUD operations
  - **PropertyCommandHandler** for CQRS
  - Event publishing to Kafka
  - RestTemplate calls to User Service
- **Database**: `property_management_db`
- **Events Published**:
  - `PropertyCreatedEvent`
  - `PropertyViewedEvent`
  - `UserActivityEvent`

#### 4. **Search Service** (Port: 8083)
- **Technology**: Spring Boot + Elasticsearch/PostgreSQL
- **CQRS Role**: Query Side (Read Model)
- **Features**:
  - Advanced property search
  - Filters (location, price, type)
  - Search history tracking
- **Database**: `search_db`

#### 5. **User History Service** (Port: 8084) ⭐ **CQRS Core**
- **Technology**: Spring Boot + JPA + Redis + Kafka Consumer
- **CQRS Role**: Query Side (Read Model)
- **Features**:
  - **Event Store** for complete audit trail
  - **UserActivity** read models
  - **UserHistoryQueryHandler** with Redis caching
  - Kafka event consumption
- **Database**: `user_history_db`
- **Cache**: Redis for fast queries

#### 6. **Notification Service** (Port: 8085)
- **Technology**: Spring Boot + Kafka Consumer
- **CQRS Role**: Event Consumer
- **Features**:
  - Email notifications
  - SMS notifications
  - Event-driven notifications
- **Integrations**: SendGrid, Twilio

#### 7. **File Upload Service** (Port: 8086)
- **Technology**: Spring Boot + AWS S3/Local Storage
- **Purpose**: Property images, documents
- **Features**: 
  - Multi-part file upload
  - Image optimization
  - CDN integration

---

## ⚡ Event Sourcing & Kafka

### Event Sourcing Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                   EVENT SOURCING FLOW                      │
├─────────────────────────────────────────────────────────────┤
│ 1. User Action (Create Property)                           │
│         ↓                                                   │
│ 2. PropertyCommandHandler.handleCreateProperty()           │
│         ↓                                                   │
│ 3. Save Property to Database                               │
│         ↓                                                   │
│ 4. Create Domain Events:                                    │
│    • PropertyCreatedEvent                                   │
│    • UserActivityEvent                                      │
│         ↓                                                   │
│ 5. Publish to Kafka Topics:                               │
│    • property-events                                       │
│    • user-activity                                         │
│         ↓                                                   │
│ 6. UserHistoryService Consumes Events                     │
│         ↓                                                   │
│ 7. Update Read Models:                                      │
│    • EventStore (complete audit)                          │
│    • UserActivity (optimized queries)                     │
│         ↓                                                   │
│ 8. Cache in Redis for Fast Access                         │
└─────────────────────────────────────────────────────────────┘
```

### 📨 Kafka Topics & Events

#### **property-events** Topic
```json
{
  "eventId": "uuid",
  "aggregateId": "property-123",
  "userId": "user-456", 
  "eventType": "PROPERTY_CREATED",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": 1,
  "data": {
    "propertyId": "property-123",
    "title": "3BHK Apartment in Gachibowli",
    "location": "Gachibowli, Hyderabad",
    "price": 85000000,
    "propertyType": "APARTMENT"
  }
}
```

#### **user-activity** Topic  
```json
{
  "eventId": "uuid",
  "userId": "user-456",
  "activityType": "PROPERTY_CREATED", 
  "description": "User created property: 3BHK Apartment in Gachibowli",
  "timestamp": "2024-01-15T10:30:00Z",
  "activityData": {
    "propertyId": "property-123",
    "location": "Gachibowli"
  }
}
```

---

## 💾 Database Design

### Database Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐ │
│ │ user_management │  │property_mgmt_db │  │   search_db   │ │
│ │      _db        │  │                 │  │               │ │
│ │                 │  │                 │  │               │ │
│ │ • users         │  │ • properties    │  │ • search_hist │ │
│ │ • user_profiles │  │ • property_imgs │  │ • filters     │ │
│ └─────────────────┘  └─────────────────┘  └───────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │            user_history_db (CQRS Core)                 │ │
│ │                                                         │ │
│ │ • event_store (Complete Event Sourcing)                │ │
│ │   - event_id, aggregate_id, user_id, event_type        │ │
│ │   - event_data, timestamp, version                     │ │
│ │                                                         │ │
│ │ • user_activity (Optimized Read Model)                 │ │
│ │   - id, user_id, activity_type, description            │ │
│ │   - activity_data, timestamp                           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────┐     ┌──────────────────────────────────┐ │
│ │     Redis       │     │        Infrastructure           │ │
│ │   (Caching)     │     │                                  │ │
│ │                 │     │ • PostgreSQL (Main Database)    │ │
│ │ • User history  │     │ • Apache Kafka (Event Stream)   │ │
│ │ • Search cache  │     │ • Redis (Caching Layer)         │ │
│ │ • Session data  │     │ • Docker Compose               │ │
│ └─────────────────┘     └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 🗃️ Key Tables

#### **event_store** (Event Sourcing Core)
```sql
CREATE TABLE event_store (
    id BIGSERIAL PRIMARY KEY,
    event_id UUID UNIQUE NOT NULL,
    aggregate_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    event_data JSONB NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version BIGINT NOT NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_aggregate_id (aggregate_id),
    INDEX idx_event_type (event_type)
);
```

#### **user_activity** (Read Model)
```sql
CREATE TABLE user_activity (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT,
    activity_data JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    INDEX idx_user_timestamp (user_id, timestamp DESC),
    INDEX idx_activity_type (activity_type)
);
```

---

## 🌐 API Gateway & Routing

### Gateway Configuration
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: http://localhost:8081
          predicates:
            - Path=/api/users/**, /api/auth/**
        
        - id: property-service  
          uri: http://localhost:8082
          predicates:
            - Path=/api/properties/**
            
        - id: user-history-service
          uri: http://localhost:8084
          predicates:
            - Path=/api/user-history/**
      
      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOriginPatterns: "*"
            allowedMethods: "*"
            allowedHeaders: "*"
```

### 🚦 Request Flow
1. **Frontend Request** → API Gateway (8080)
2. **JWT Validation** → JwtAuthenticationFilter  
3. **Route Resolution** → Target Microservice
4. **Service Processing** → Business Logic
5. **Response** → Frontend

---

## 🖥️ Frontend Integration

### CQRS Frontend Architecture  
```javascript
// CQRS Integration Layer
class CQRSHyderabadAPI {
    // Command Operations (Write Side)
    async createProperty(propertyData) {
        // 1. Send command to Property Service
        // 2. Service publishes events to Kafka
        // 3. User History Service consumes events
        // 4. Frontend automatically fetches updated history
    }
    
    // Query Operations (Read Side)  
    async getUserHistory(userId) {
        // Optimized read from User History Service
        // Uses Redis caching for fast response
        // Returns complete user activity timeline
    }
    
    // Auto-initialization on Login
    async initializeUserSession(userId) {
        this.setCurrentUser(userId);
        await this.fetchUserHistory(); // Auto-display history
    }
}
```

### 🎯 Key Frontend Features
- **Automatic History Retrieval**: Users see their complete activity history on login
- **Real-time Notifications**: Activity tracking with popup display
- **Session Management**: User context maintained across pages
- **CQRS Integration**: Commands and queries properly separated
- **Event Tracking**: All user actions tracked for history

---

## 🐳 Deployment Architecture

### Docker Compose Infrastructure
```yaml
version: '3.8'
services:
  # Infrastructure Services
  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.4.0 
    ports:
      - "9092:9092"
    depends_on: [zookeeper]
    
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
      
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: hyderabadinfra
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
```

### 🚀 Deployment Strategy
1. **Infrastructure First**: PostgreSQL, Redis, Kafka, Zookeeper
2. **Core Services**: API Gateway, User Service
3. **Domain Services**: Property, Search, User History
4. **Support Services**: Notification, File Upload
5. **Frontend**: Static files served via HTTP server

---

## 🔐 Security & Authentication

### Security Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                         │
├─────────────────────────────────────────────────────────────┤
│ 1. API Gateway (JWT Validation)                            │
│    • JwtAuthenticationFilter                               │
│    • CORS Configuration                                    │
│    • Rate Limiting                                         │
├─────────────────────────────────────────────────────────────┤
│ 2. Service Level Security                                   │
│    • Spring Security                                       │
│    • Method-level authorization                            │  
│    • Input validation                                      │
├─────────────────────────────────────────────────────────────┤
│ 3. Database Security                                        │
│    • Connection pooling                                    │
│    • Prepared statements                                   │
│    • Access control                                        │
├─────────────────────────────────────────────────────────────┤
│ 4. Event Security                                          │
│    • Kafka ACLs                                           │
│    • Message encryption                                    │
│    • Event validation                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Monitoring & Logging

### Observability Stack
```
┌─────────────────────────────────────────────────────────────┐
│                   MONITORING STACK                          │
├─────────────────────────────────────────────────────────────┤
│ • Spring Boot Actuator (Health checks, Metrics)            │
│ • Logback/SLF4J (Structured logging)                       │
│ • Micrometer (Application metrics)                         │
│ • Custom event tracking for CQRS operations               │
└─────────────────────────────────────────────────────────────┘
```

### 📈 Key Metrics Tracked
- **Command Processing Time**: How long commands take to process
- **Event Processing Lag**: Kafka consumer lag monitoring
- **Query Response Time**: Read model query performance
- **User Activity Patterns**: Most common user actions
- **System Health**: Service availability and performance

---

## 🎯 CQRS Benefits Achieved

### ✅ **Performance**
- **Read Optimization**: Dedicated read models for fast queries
- **Write Optimization**: Commands processed efficiently
- **Caching Strategy**: Redis caching for frequently accessed data
- **Async Processing**: Kafka enables non-blocking operations

### ✅ **Scalability**
- **Independent Scaling**: Each service scales independently  
- **Read/Write Separation**: Scale read and write operations separately
- **Event-Driven**: Loose coupling between services
- **Microservices**: Horizontal scaling capability

### ✅ **User Experience**
- **Complete History**: Users get their full activity timeline on login
- **Real-time Updates**: Immediate feedback on all actions
- **Consistent State**: Event sourcing ensures data consistency
- **Fast Queries**: Optimized read models for quick responses

### ✅ **Developer Experience**  
- **Clear Separation**: Commands and queries clearly separated
- **Event Audit Trail**: Complete history of all system events
- **Testability**: Each component easily testable
- **Maintainability**: Clean architecture and separation of concerns

---

## 🚀 Next Steps & Enhancements

### **Phase 1: Current Implementation**
- ✅ CQRS Pattern with Event Sourcing
- ✅ 7 Microservices Architecture  
- ✅ Kafka Event Streaming
- ✅ User History Tracking
- ✅ Frontend Integration

### **Phase 2: Advanced Features**
- 🔄 Event Replay Capabilities
- 📊 Advanced Analytics Dashboard
- 🔍 Elasticsearch Integration
- 📱 Mobile App with CQRS
- ⚡ Real-time WebSocket Updates

### **Phase 3: Enterprise Features**
- 🌍 Multi-tenant Support
- 🔐 Advanced Security (OAuth2, SAML)
- 📈 Machine Learning Integration
- 🏗️ Kubernetes Deployment
- 🌐 Global CDN Integration

---

## 📞 Support & Maintenance

### **Development Team**
- **Architecture**: CQRS + Event Sourcing Pattern
- **Backend**: Spring Boot Microservices
- **Frontend**: React/JavaScript with CQRS Integration
- **Infrastructure**: Docker, Kafka, PostgreSQL, Redis
- **CI/CD**: GitHub Actions (ready for setup)

### **Documentation**
- ✅ Complete Architecture Documentation
- ✅ API Documentation (Spring Boot Actuator)
- ✅ Setup Instructions (README.md)
- ✅ Development Guidelines
- ✅ Troubleshooting Guide

---

**🏗️ Built with Claude Code - Complete CQRS Implementation for Hyderabad Infra Real Estate Platform**

*Generated on: $(date)*
*Repository: https://github.com/harinadh-das/hyderabadinfra*