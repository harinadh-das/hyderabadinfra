#!/bin/bash

# Start local development environment
echo "Starting Hyderabad Infra microservices..."

# Start infrastructure services first
echo "Starting infrastructure services..."
docker-compose up -d postgres redis zookeeper kafka

echo "Waiting for infrastructure services to be ready..."
sleep 30

# Build all services
echo "Building all services..."
mvn clean package -DskipTests

# Start all application services
echo "Starting application services..."
docker-compose up -d

echo "Waiting for services to start..."
sleep 20

# Check service health
echo "Checking service health..."
echo "API Gateway: $(curl -s http://localhost:8080/actuator/health | grep -o '"status":"[^"]*"')"
echo "User Service: $(curl -s http://localhost:8081/actuator/health | grep -o '"status":"[^"]*"')"
echo "Property Service: $(curl -s http://localhost:8082/actuator/health | grep -o '"status":"[^"]*"')"
echo "Search Service: $(curl -s http://localhost:8083/actuator/health | grep -o '"status":"[^"]*"')"
echo "Notification Service: $(curl -s http://localhost:8084/actuator/health | grep -o '"status":"[^"]*"')"
echo "File Service: $(curl -s http://localhost:8085/actuator/health | grep -o '"status":"[^"]*"')"

echo "All services started! Access the API Gateway at http://localhost:8080"
echo "Check docker-compose ps for service status"