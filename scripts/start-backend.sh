#!/bin/bash

echo "🔧 Starting Backend Only..."
echo "=========================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_ROOT="/Users/kokila/Desktop/hyderabadinfra"

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v docker >/dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

if ! command -v java >/dev/null 2>&1; then
    echo -e "${RED}❌ Java is not installed${NC}"
    exit 1
fi

if ! command -v mvn >/dev/null 2>&1; then
    echo -e "${RED}❌ Maven is not installed${NC}"
    exit 1
fi

# Navigate to backend directory
cd "$PROJECT_ROOT/backend" 2>/dev/null || {
    echo -e "${YELLOW}Backend directory not found. Creating...${NC}"
    mkdir -p "$PROJECT_ROOT/backend"
    cd "$PROJECT_ROOT/backend"
}

# Start infrastructure
echo -e "${YELLOW}Starting infrastructure services...${NC}"
docker-compose up -d postgres redis 2>/dev/null || {
    docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres123 postgres:15
    docker run -d --name redis -p 6379:6379 redis:7-alpine
}

echo -e "${GREEN}✅ Infrastructure services started${NC}"

# Start microservices if they exist
if [ -d "api-gateway" ]; then
    echo -e "${YELLOW}Starting microservices...${NC}"
    
    # Build services
    mvn clean package -DskipTests
    
    # Start API Gateway
    cd api-gateway && mvn spring-boot:run &
    
    # Start other services
    cd ../user-management && mvn spring-boot:run &
    cd ../property-management && mvn spring-boot:run &
    cd ../search-service && mvn spring-boot:run &
    cd ../notification-service && mvn spring-boot:run &
    cd ../file-upload-service && mvn spring-boot:run &
    
    echo -e "${GREEN}✅ All microservices started${NC}"
else
    echo -e "${YELLOW}⚠️  Microservices not found${NC}"
fi

echo -e "\n${GREEN}Backend services started!${NC}"
echo -e "API Gateway: ${GREEN}http://localhost:8080${NC}"
echo -e "Database: ${GREEN}localhost:5432${NC}"