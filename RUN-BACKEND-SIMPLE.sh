#!/bin/bash

echo "🔧 Starting HyderabadInfra Backend (Simple Mode)"
echo "=============================================="

# Start database only
echo "Starting PostgreSQL..."
docker run -d --name hyderabadinfra-postgres -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=hyderabadinfra \
  postgres:15 2>/dev/null || docker start hyderabadinfra-postgres 2>/dev/null

echo "✅ Database running on localhost:5432"
echo ""
echo "For now, you can:"
echo "1. Use the frontend: http://localhost:3000"
echo "2. Connect to database: localhost:5432 (postgres/postgres123)"
echo "3. Run individual Spring Boot services in IntelliJ when needed"
echo ""
echo "Frontend is fully functional without backend!"