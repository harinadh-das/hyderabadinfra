# 🚀 HOW TO RUN HYDERABADINFRA WEBSITE

## ✅ Current Status
Your project is now **PROPERLY ORGANIZED**:

```
hyderabadinfra/
├── frontend/           # ← Your Website (HTML, CSS, JS)
│   ├── index.html     # Homepage
│   ├── pages/         # All pages
│   ├── css/           # Stylesheets
│   └── js/            # JavaScript
├── backend/           # ← Spring Boot Services
└── RUN-NOW.sh        # ← CLICK THIS TO START
```

## 🏃‍♂️ FASTEST WAY TO RUN (30 seconds)

### Option 1: Double-click method
1. Find the file `RUN-NOW.sh` in your project folder
2. Double-click it
3. Your website opens at http://localhost:3000

### Option 2: Terminal method
```bash
cd /Users/kokila/Desktop/hyderabadinfra
./RUN-NOW.sh
```

## 📋 What You Need First Time Only

### Install Node.js (if not installed)
1. Go to https://nodejs.org/
2. Download and install Node.js
3. Then run the RUN-NOW.sh script

### Check if Node.js is installed
```bash
node --version
```
Should show something like: `v18.17.0` or higher

## 🌟 What You Get

### ✅ Frontend Website (WORKING NOW)
- **Homepage**: Property search, featured areas
- **Buy Page**: Properties for sale
- **Sell Page**: Sell your property
- **Rent Page**: Rental properties  
- **Area Pages**: 9 specific locations (Gachibowli, Jubilee Hills, etc.)
- **User Pages**: Login, registration
- **Responsive Design**: Works on mobile, tablet, desktop

### 🔧 Backend Services (Available but needs setup)
- User authentication
- Property database
- File uploads
- Email notifications
- Search & recommendations

## 🎯 Quick Test

After running `./RUN-NOW.sh`:

1. **Homepage Test**: You should see the HyderabadInfra homepage
2. **Navigation Test**: Click Buy/Sell/Rent - all should work
3. **Area Test**: Click on area cards (Gachibowli, etc.)
4. **Search Test**: Try searching for properties
5. **Form Test**: Try the login/registration forms

## 🛑 How to Stop

Press `Ctrl + C` in the terminal where the server is running

Or kill it manually:
```bash
pkill -f http-server
```

## 🐛 Troubleshooting

### Problem: "Command not found"
- **Solution**: Install Node.js from nodejs.org

### Problem: "Port 3000 is busy"
- **Solution**: Run `pkill -f http-server` then try again

### Problem: "Permission denied"
- **Solution**: Run `chmod +x RUN-NOW.sh`

### Problem: Website not loading
- **Solution**: Check terminal for errors, make sure you're in the right directory

## 📞 Quick Help

### Check if server is running:
```bash
curl http://localhost:3000
```
Should return HTML content

### View what's using port 3000:
```bash
lsof -i :3000
```

### Kill everything on port 3000:
```bash
lsof -ti:3000 | xargs kill
```

---

## 🎉 Success!

If you see your website at **http://localhost:3000**, congratulations! 

Your real estate platform is running with:
- ✅ Modern responsive design
- ✅ Property browsing (Buy/Sell/Rent)
- ✅ Area-specific pages
- ✅ Search functionality
- ✅ User interface ready

The backend services are ready to be activated when needed for full database functionality.