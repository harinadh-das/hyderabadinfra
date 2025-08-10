#!/bin/bash

clear
echo "🚀 HYDERABAD INFRA - QUICK START"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/Users/kokila/Desktop/hyderabadinfra"

echo -e "${BLUE}📁 Project Directory: $PROJECT_DIR${NC}"
echo ""

# Step 1: Check if we're in the right place
if [ ! -f "$PROJECT_DIR/frontend/index.html" ]; then
    echo -e "${RED}❌ Frontend files not found!${NC}"
    echo "Make sure you're running this from the project directory"
    exit 1
fi

# Step 2: Check if Node.js is installed
echo -e "${YELLOW}🔍 Checking Node.js...${NC}"
if ! command -v node >/dev/null 2>&1; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Then run this script again"
    exit 1
else
    echo -e "${GREEN}✅ Node.js found${NC}"
fi

# Step 3: Install http-server if needed
echo -e "${YELLOW}🔍 Checking http-server...${NC}"
if ! command -v http-server >/dev/null 2>&1; then
    echo -e "${YELLOW}Installing http-server...${NC}"
    npm install -g http-server
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ http-server installed${NC}"
    else
        echo -e "${RED}❌ Failed to install http-server${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ http-server found${NC}"
fi

# Step 4: Kill any existing server
echo -e "${YELLOW}🛑 Stopping any existing servers...${NC}"
pkill -f http-server 2>/dev/null

# Step 5: Navigate to frontend directory
cd "$PROJECT_DIR/frontend"

# Step 6: Start the server
echo ""
echo -e "${GREEN}🌐 STARTING YOUR WEBSITE...${NC}"
echo ""
echo -e "${BLUE}📂 Serving from: $PROJECT_DIR/frontend${NC}"
echo -e "${BLUE}🌍 URL: http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Open browser after a short delay
(sleep 3 && open http://localhost:3000) &

# Start the server
http-server -p 3000 -c-1 --cors