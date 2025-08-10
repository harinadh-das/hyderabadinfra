#!/bin/bash

echo "🌐 Starting Frontend Only..."
echo "============================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_ROOT="/Users/kokila/Desktop/hyderabadinfra"
cd "$PROJECT_ROOT/frontend"

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo -e "${YELLOW}❌ Node.js is not installed. Please install Node.js first.${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Install http-server if not installed
if ! command -v http-server >/dev/null 2>&1; then
    echo -e "${YELLOW}Installing http-server...${NC}"
    npm install -g http-server
fi

# Kill any existing http-server
pkill -f http-server 2>/dev/null

# Start frontend server
echo -e "${YELLOW}Starting frontend server on port 3000...${NC}"
http-server -p 3000 -c-1 --cors

echo -e "\n${GREEN}✅ Frontend started successfully!${NC}"
echo -e "Access at: ${GREEN}http://localhost:3000${NC}"