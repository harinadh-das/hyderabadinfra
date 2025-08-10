# 🚀 IntelliJ IDEA Setup Guide for HyderabadInfra

## 📁 Project Structure in IntelliJ

Your backend is in: `/Users/kokila/Desktop/hyderabadinfra/backend/`

```
backend/
├── api-gateway/                    # Main entry point (Run FIRST)
├── user-management-service/        # Authentication service
├── property-management-service/    # Property CRUD operations
├── search-service/                # Search functionality
├── notification-service/          # Email/SMS notifications
├── file-upload-service/           # File uploads
├── docker-compose.yml             # Database setup
└── pom.xml                        # Parent Maven config
```

## 🎯 **STEP-BY-STEP: What to Run First**

### Step 1: Open Project in IntelliJ
1. **Open IntelliJ IDEA**
2. **File → Open**
3. **Navigate to**: `/Users/kokila/Desktop/hyderabadinfra/backend`
4. **Select the `backend` folder** and click Open
5. **Import as Maven project** when prompted

### Step 2: Start Infrastructure (Database)
**Before running any Spring Boot apps, start the database:**

```bash
# Open terminal in IntelliJ (View → Tool Windows → Terminal)
cd /Users/kokila/Desktop/hyderabadinfra/backend
docker-compose up -d postgres redis
```

### Step 3: Run Services in IntelliJ (IN ORDER)

#### 1️⃣ FIRST: API Gateway (Port 8080)
**File to run**: `api-gateway/src/main/java/com/hyderabadinfra/gateway/ApiGatewayApplication.java`

**How to run:**
1. Navigate to: `api-gateway` → `src` → `main` → `java` → `com.hyderabadinfra.gateway`
2. **Right-click** on `ApiGatewayApplication.java`
3. **Select**: "Run 'ApiGatewayApplication'"

**Wait for**: Console shows "Started ApiGatewayApplication"

#### 2️⃣ SECOND: User Management (Port 8081)
**File to run**: `user-management-service/src/main/java/com/hyderabadinfra/user/UserManagementApplication.java`

**How to run:**
1. Navigate to: `user-management-service` → `src` → `main` → `java` → `com.hyderabadinfra.user`
2. **Right-click** on `UserManagementApplication.java`
3. **Select**: "Run 'UserManagementApplication'"

#### 3️⃣ THIRD: Property Management (Port 8082)
**File to run**: `property-management-service/src/main/java/com/hyderabadinfra/property/PropertyManagementApplication.java`

#### 4️⃣ FOURTH: Search Service (Port 8083)
**File to run**: `search-service/src/main/java/com/hyderabadinfra/search/SearchApplication.java`

#### 5️⃣ FIFTH: Notification Service (Port 8084)
**File to run**: `notification-service/src/main/java/com/hyderabadinfra/notification/NotificationApplication.java`

#### 6️⃣ SIXTH: File Upload Service (Port 8085)
**File to run**: `file-upload-service/src/main/java/com/hyderabadinfra/fileupload/FileUploadApplication.java`

## 🔧 **IntelliJ Configuration**

### Maven Settings
1. **File → Settings** (Ctrl+Alt+S)
2. **Build, Execution, Deployment → Build Tools → Maven**
3. **Maven home directory**: Use bundled (default)
4. **User settings file**: Default
5. **Click Apply**

### Java SDK Settings
1. **File → Project Structure** (Ctrl+Alt+Shift+S)
2. **Project Settings → Project**
3. **Project SDK**: Java 17 or higher
4. **Project language level**: 17
5. **Click Apply**

### Run Configuration
For each service, IntelliJ will create run configurations automatically. You can see them in:
**Run → Edit Configurations**

## 📊 **Verify Services are Running**

### Check in IntelliJ Console
Each service should show:
```
Started [ServiceName]Application in X.XXX seconds
```

### Check in Browser
- **API Gateway**: http://localhost:8080/actuator/health
- **User Service**: http://localhost:8081/actuator/health
- **Property Service**: http://localhost:8082/actuator/health

## 🌐 **Start Frontend Separately**

While backend runs in IntelliJ, start frontend in terminal:

```bash
# Open new terminal
cd /Users/kokila/Desktop/hyderabadinfra
./RUN-NOW.sh
```

**Result**: Frontend at http://localhost:3000, Backend at http://localhost:8080

## 🎯 **Complete Flow**

1. **IntelliJ**: Run backend services (database + 6 Spring Boot apps)
2. **Terminal**: Run frontend (`./RUN-NOW.sh`)
3. **Browser**: Open http://localhost:3000
4. **Test**: Register user, browse properties, search

## 📝 **Quick Run Checklist**

### ✅ Before Running:
- [ ] IntelliJ has backend folder open
- [ ] Docker is running
- [ ] PostgreSQL started: `docker-compose up -d postgres redis`
- [ ] Java 17+ configured in IntelliJ

### ✅ Running Order:
1. [ ] API Gateway (8080) - **RUN FIRST**
2. [ ] User Management (8081)
3. [ ] Property Management (8082)  
4. [ ] Search Service (8083)
5. [ ] Notification Service (8084)
6. [ ] File Upload Service (8085)
7. [ ] Frontend (`./RUN-NOW.sh`)

### ✅ Verify Working:
- [ ] All services show "Started" in console
- [ ] http://localhost:8080/actuator/health returns UP
- [ ] http://localhost:3000 shows website
- [ ] Can register/login through website

## 🐛 **Troubleshooting in IntelliJ**

### Service Won't Start
1. **Check Console** for error messages
2. **Check Port**: Make sure port isn't already in use
3. **Check Database**: Ensure PostgreSQL is running
4. **Check Dependencies**: Let IntelliJ download Maven dependencies

### Port Already in Use
```bash
# Find what's using the port (e.g., 8080)
lsof -i :8080
# Kill the process
kill -9 <PID>
```

### Maven Dependencies Issues
1. **Right-click** on `pom.xml`
2. **Maven → Reload Project**
3. **Wait** for dependencies to download

### Database Connection Error
```bash
# Restart PostgreSQL
docker-compose restart postgres
```

## 🎉 **Success Indicators**

### All Good When You See:
1. **IntelliJ Console**: 6 services all show "Started"
2. **Browser**: Website loads at localhost:3000
3. **API**: http://localhost:8080/api/public/properties returns JSON
4. **Database**: Can register users and they persist

---

**🚀 Your full-stack real estate platform will be running with IntelliJ backend + frontend!**