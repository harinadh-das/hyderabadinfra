# ⚡ IntelliJ IDEA Quick Start - 5 Minutes Setup

## 🎯 **EXACT FILES TO RUN (In Order)**

### Step 1: Open Backend in IntelliJ
**File → Open → Select**: `/Users/kokila/Desktop/hyderabadinfra/backend`

### Step 2: Start Database (Terminal in IntelliJ)
```bash
cd /Users/kokila/Desktop/hyderabadinfra/backend
docker-compose up -d postgres redis
```

### Step 3: Run These Java Files (Right-click → Run)

#### 1st: API Gateway (MOST IMPORTANT - RUN FIRST)
📁 `api-gateway/src/main/java/com/hyderabadinfra/gateway/`
🔴 **`ApiGatewayApplication.java`** ← Right-click → Run

Wait until console shows: `Started ApiGatewayApplication`

#### 2nd: User Management
📁 `user-management-service/src/main/java/com/hyderabadinfra/user/`
🔴 **`UserManagementApplication.java`** ← Right-click → Run

#### 3rd: Property Management
📁 `property-management-service/src/main/java/com/hyderabadinfra/property/`
🔴 **`PropertyManagementApplication.java`** ← Right-click → Run

#### 4th: Search Service
📁 `search-service/src/main/java/com/hyderabadinfra/search/`
🔴 **`SearchApplication.java`** ← Right-click → Run

#### 5th: Notification Service
📁 `notification-service/src/main/java/com/hyderabadinfra/notification/`
🔴 **`NotificationApplication.java`** ← Right-click → Run

#### 6th: File Upload Service
📁 `file-upload-service/src/main/java/com/hyderabadinfra/fileupload/`
🔴 **`FileUploadApplication.java`** ← Right-click → Run

## ✅ **Verification**

All services running when you see:
- ✅ http://localhost:8080/actuator/health (API Gateway)
- ✅ http://localhost:8081/actuator/health (User Service)
- ✅ http://localhost:8082/actuator/health (Property Service)

## 🌐 **Start Frontend (Separate Terminal)**
```bash
cd /Users/kokila/Desktop/hyderabadinfra
./RUN-NOW.sh
```

## 🎯 **Final Result**
- **Frontend**: http://localhost:3000 (Your website)
- **Backend**: http://localhost:8080 (API Gateway)
- **Full functionality**: Register users, post properties, search

---

**That's it! Your full real estate platform is running!** 🚀