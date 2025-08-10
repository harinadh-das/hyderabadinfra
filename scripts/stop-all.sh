#!/bin/bash

echo "🛑 Stopping HyderabadInfra Platform..."
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_ROOT="/Users/kokila/Desktop/hyderabadinfra"

# Stop Frontend
echo -e "${YELLOW}Stopping frontend server...${NC}"
pkill -f http-server 2>/dev/null
echo -e "${GREEN}✅ Frontend stopped${NC}"

# Stop Spring Boot services
echo -e "${YELLOW}Stopping Spring Boot services...${NC}"
pkill -f spring-boot 2>/dev/null
pkill -f "java.*spring" 2>/dev/null
echo -e "${GREEN}✅ Spring Boot services stopped${NC}"

# Stop Docker containers
echo -e "${YELLOW}Stopping Docker containers...${NC}"
cd "$PROJECT_ROOT/backend" 2>/dev/null && docker-compose down 2>/dev/null
docker stop postgres redis kafka zookeeper 2>/dev/null
docker rm postgres redis kafka zookeeper 2>/dev/null
echo -e "${GREEN}✅ Docker containers stopped${NC}"

echo -e "\n${GREEN}✅ All services stopped successfully!${NC}"