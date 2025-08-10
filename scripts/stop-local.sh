#!/bin/bash

# Stop local development environment
echo "Stopping Hyderabad Infra microservices..."

# Stop all services
docker-compose down

echo "All services stopped!"
echo "To clean up volumes as well, run: docker-compose down -v"