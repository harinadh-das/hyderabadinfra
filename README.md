# HyderabadInfra - Real Estate Platform

A complete real estate platform with microservices backend and modern frontend for buying, selling, and renting properties in Hyderabad.

## 📁 Project Structure

```
hyderabadinfra/
│
├── frontend/                    # Frontend Application (Current Directory)
│   ├── index.html              # Homepage
│   ├── pages/                  # All HTML pages
│   │   ├── buy.html
│   │   ├── sell.html
│   │   ├── rent.html
│   │   ├── areas/              # Area-specific pages
│   │   └── ...
│   ├── css/                    # Stylesheets
│   │   ├── style.css
│   │   └── ...
│   ├── js/                     # JavaScript files
│   │   ├── script.js
│   │   └── ...
│   └── images/                 # Static images
│
├── backend/                     # Backend Microservices
│   ├── api-gateway/            # API Gateway (Port 8080)
│   ├── user-management/        # User Service (Port 8081)
│   ├── property-management/    # Property Service (Port 8082)
│   ├── search-service/         # Search Service (Port 8083)
│   ├── notification-service/   # Notification Service (Port 8084)
│   ├── file-upload-service/    # File Upload Service (Port 8085)
│   ├── docker-compose.yml      # Docker configuration
│   └── .env.example            # Environment variables template
│
├── scripts/                     # Utility scripts
│   ├── start-all.sh           # Start everything
│   ├── start-backend.sh       # Start backend only
│   ├── start-frontend.sh      # Start frontend only
│   └── stop-all.sh            # Stop everything
│
└── README.md                   # This file
```

## 🚀 Quick Start Guide

### Prerequisites

1. **Install Required Software:**
   - Docker Desktop: [Download here](https://www.docker.com/products/docker-desktop/)
   - Java 17+: [Download here](https://www.oracle.com/java/technologies/downloads/)
   - Node.js 16+: [Download here](https://nodejs.org/)
   - Maven 3.8+: [Download here](https://maven.apache.org/download.cgi)

2. **Verify Installation:**
   ```bash
   docker --version
   java --version
   node --version
   mvn --version
   ```

## 🏃‍♂️ Running Locally - Step by Step

### Option 1: Run Everything with One Command (Recommended)

```bash
# Clone the repository (if not already done)
cd /Users/kokila/Desktop/hyderabadinfra

# Make scripts executable
chmod +x scripts/*.sh

# Start everything
./scripts/start-all.sh
```

This will:
- Start PostgreSQL database
- Start Redis cache
- Start Kafka message broker
- Start all microservices
- Start frontend server
- Open browser automatically

### Option 2: Run Backend and Frontend Separately

#### Step 1: Start Backend Services

```bash
# Navigate to backend directory
cd /Users/kokila/Desktop/hyderabadinfra/backend

# Copy environment file
cp .env.example .env

# Start infrastructure (PostgreSQL, Kafka, Redis)
docker-compose up -d postgres kafka redis

# Wait 30 seconds for services to initialize
sleep 30

# Build all microservices
mvn clean package -DskipTests

# Start API Gateway
cd api-gateway && mvn spring-boot:run &

# Start User Management Service
cd ../user-management && mvn spring-boot:run &

# Start Property Management Service
cd ../property-management && mvn spring-boot:run &

# Start Search Service
cd ../search-service && mvn spring-boot:run &

# Start Notification Service
cd ../notification-service && mvn spring-boot:run &

# Start File Upload Service
cd ../file-upload-service && mvn spring-boot:run &
```

#### Step 2: Start Frontend

```bash
# Open new terminal
cd /Users/kokila/Desktop/hyderabadinfra

# Install http-server globally (one time only)
npm install -g http-server

# Start frontend server
http-server -p 3000 -c-1 --cors
```

#### Step 3: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html

## 🔧 Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Web UI |
| API Gateway | 8080 | Main API endpoint |
| User Management | 8081 | Authentication & Users |
| Property Management | 8082 | Property CRUD |
| Search Service | 8083 | Search & Recommendations |
| Notification Service | 8084 | Email/SMS |
| File Upload Service | 8085 | Image uploads |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache |
| Kafka | 9092 | Message broker |

## 📝 Testing the Application

### 1. Register a New User
- Open http://localhost:3000
- Click "Sign In / Register"
- Fill registration form
- Check console for registration success

### 2. Login
- Use registered credentials
- You'll receive a JWT token
- Token is stored in localStorage

### 3. Browse Properties
- Click "Buy" to see properties for sale
- Click "Rent" for rental properties
- Use search filters

### 4. Post a Property
- Click "Post Property"
- Login required
- Fill property details
- Upload images

### 5. Search Properties
- Enter location in search bar
- Select property type
- Choose budget range
- Click Search

## 🛠️ Troubleshooting

### Backend Issues

1. **Port already in use:**
   ```bash
   # Find and kill process using port (e.g., 8080)
   lsof -i :8080
   kill -9 <PID>
   ```

2. **Database connection failed:**
   ```bash
   # Restart PostgreSQL
   docker-compose restart postgres
   
   # Check logs
   docker-compose logs postgres
   ```

3. **Kafka not starting:**
   ```bash
   # Restart Kafka and Zookeeper
   docker-compose restart kafka zookeeper
   ```

### Frontend Issues

1. **Page not loading:**
   - Check if backend services are running
   - Open browser console for errors
   - Verify API Gateway is accessible at http://localhost:8080

2. **CORS errors:**
   - Ensure API Gateway CORS is configured
   - Frontend should be on http://localhost:3000

## 🔄 Stopping Services

```bash
# Stop everything
./scripts/stop-all.sh

# Or manually stop services
docker-compose down
pkill -f spring-boot
pkill -f http-server
```

## 📊 Monitoring

### Health Checks
- API Gateway: http://localhost:8080/actuator/health
- User Service: http://localhost:8081/actuator/health
- Property Service: http://localhost:8082/actuator/health

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f postgres
docker-compose logs -f kafka
```

## 🔐 Default Credentials

### Database
- Host: localhost:5432
- Database: hyderabadinfra_*
- Username: postgres
- Password: postgres123

### Test User
- Email: admin@hyderabadinfra.com
- Password: Admin@123

## 📚 API Documentation

Once services are running, access API documentation at:
- http://localhost:8080/swagger-ui.html

### Key API Endpoints

#### Authentication
```bash
# Register
POST http://localhost:8080/api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test@123",
  "phone": "9876543210"
}

# Login
POST http://localhost:8080/api/auth/login
{
  "email": "test@example.com",
  "password": "Test@123"
}
```

#### Properties
```bash
# Get all properties
GET http://localhost:8080/api/public/properties

# Search properties
GET http://localhost:8080/api/public/properties/search?location=Gachibowli&minPrice=5000000

# Post property (requires authentication)
POST http://localhost:8080/api/properties
Authorization: Bearer <your-jwt-token>
{
  "title": "3BHK Apartment in Gachibowli",
  "description": "Spacious apartment near IT hub",
  "price": 8500000,
  "location": "Gachibowli",
  "propertyType": "APARTMENT",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 1450
}
```

## 🌐 Environment Variables

Create `.env` file in backend directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hyderabadinfra
DB_USER=postgres
DB_PASSWORD=postgres123

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000

# Kafka
KAFKA_BOOTSTRAP_SERVERS=localhost:9092

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Email (optional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Services not starting | Check if ports are free, restart Docker |
| Database connection error | Ensure PostgreSQL is running: `docker ps` |
| Kafka connection error | Restart Kafka: `docker-compose restart kafka` |
| Frontend not loading | Check browser console, verify backend is running |
| Authentication failing | Check JWT secret in .env file |
| File upload not working | Check file size limits, ensure upload directory exists |

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review logs: `docker-compose logs`
3. Restart services: `./scripts/stop-all.sh && ./scripts/start-all.sh`

## 🚀 Production Deployment

For production deployment:
1. Update environment variables
2. Configure proper database credentials
3. Setup SSL certificates
4. Configure domain names
5. Setup monitoring and logging
6. Configure backup strategies

---

**Happy Coding! 🎉**

For any issues, check logs in the respective service directories.