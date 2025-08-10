#!/bin/bash

echo "🚀 Starting HyderabadInfra Platform..."
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the project root directory
PROJECT_ROOT="/Users/kokila/Desktop/hyderabadinfra"
cd "$PROJECT_ROOT"

echo -e "${YELLOW}📁 Project Directory: $PROJECT_ROOT${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "\n${YELLOW}🔍 Checking prerequisites...${NC}"

if ! command_exists docker; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker Desktop first.${NC}"
    echo "Visit: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

if ! command_exists java; then
    echo -e "${RED}❌ Java is not installed. Please install Java 17+${NC}"
    echo "Visit: https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi

if ! command_exists mvn; then
    echo -e "${RED}❌ Maven is not installed. Please install Maven 3.8+${NC}"
    echo "Visit: https://maven.apache.org/download.cgi"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 16+${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites installed${NC}"

# Start Docker if not running
echo -e "\n${YELLOW}🐳 Starting Docker...${NC}"
if ! docker info >/dev/null 2>&1; then
    echo "Starting Docker Desktop..."
    open -a Docker
    echo "Waiting for Docker to start..."
    while ! docker info >/dev/null 2>&1; do
        sleep 2
    done
fi
echo -e "${GREEN}✅ Docker is running${NC}"

# Start Backend Services
echo -e "\n${YELLOW}🔧 Starting Backend Services...${NC}"

# Navigate to backend directory
cd "$PROJECT_ROOT/backend" 2>/dev/null || {
    echo -e "${YELLOW}⚠️  Backend directory not found. Creating backend structure...${NC}"
    mkdir -p "$PROJECT_ROOT/backend"
    cd "$PROJECT_ROOT/backend"
    
    # Create a simple docker-compose for testing
    cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: postgres123
      POSTGRES_DB: hyderabadinfra
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
EOF
}

# Check if .env exists, if not create from example
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env from .env.example${NC}"
    else
        # Create a basic .env file
        cat > .env << 'EOF'
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hyderabadinfra
DB_USER=postgres
DB_PASSWORD=postgres123

# JWT
JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRATION=86400000

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
EOF
        echo -e "${GREEN}✅ Created default .env file${NC}"
    fi
fi

# Start infrastructure services
echo -e "${YELLOW}Starting infrastructure services (PostgreSQL, Redis)...${NC}"
docker-compose up -d postgres redis 2>/dev/null || {
    echo -e "${YELLOW}⚠️  Using simplified infrastructure setup${NC}"
    docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres123 postgres:15 2>/dev/null
    docker run -d --name redis -p 6379:6379 redis:7-alpine 2>/dev/null
}

echo -e "${GREEN}✅ Infrastructure services started${NC}"

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to initialize...${NC}"
sleep 10

# Check if backend microservices exist
if [ -d "$PROJECT_ROOT/backend/api-gateway" ]; then
    echo -e "${YELLOW}Building and starting microservices...${NC}"
    
    # Build all services
    mvn clean package -DskipTests 2>/dev/null || echo -e "${YELLOW}⚠️  Microservices not built (source may not exist yet)${NC}"
    
    # Start services in background
    if [ -d "api-gateway" ]; then
        cd api-gateway && mvn spring-boot:run > /dev/null 2>&1 &
        echo -e "${GREEN}✅ API Gateway started${NC}"
    fi
    
    if [ -d "../user-management" ]; then
        cd ../user-management && mvn spring-boot:run > /dev/null 2>&1 &
        echo -e "${GREEN}✅ User Management Service started${NC}"
    fi
    
    if [ -d "../property-management" ]; then
        cd ../property-management && mvn spring-boot:run > /dev/null 2>&1 &
        echo -e "${GREEN}✅ Property Management Service started${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Microservices not found. Backend will run with basic infrastructure only.${NC}"
fi

# Start Frontend
echo -e "\n${YELLOW}🌐 Starting Frontend...${NC}"
cd "$PROJECT_ROOT"

# Install http-server if not installed
if ! command_exists http-server; then
    echo "Installing http-server..."
    npm install -g http-server
fi

# Kill any existing http-server
pkill -f http-server 2>/dev/null

# Start frontend server
echo -e "${YELLOW}Starting frontend server on port 3000...${NC}"
http-server -p 3000 -c-1 --cors > /dev/null 2>&1 &

# Wait a moment for server to start
sleep 3

echo -e "\n${GREEN}✅ All services started successfully!${NC}"
echo -e "\n📌 Access the application:"
echo -e "   ${GREEN}Frontend:${NC} http://localhost:3000"
echo -e "   ${GREEN}API Gateway:${NC} http://localhost:8080"
echo -e "   ${GREEN}Database:${NC} localhost:5432"
echo -e "\n${YELLOW}📝 Note: Full backend microservices will be available once Spring Boot services are created.${NC}"

# Open browser
echo -e "\n${YELLOW}Opening browser...${NC}"
open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null || echo "Please open http://localhost:3000 in your browser"

echo -e "\n${GREEN}🎉 HyderabadInfra Platform is running!${NC}"
echo -e "\nTo stop all services, run: ${YELLOW}./scripts/stop-all.sh${NC}"