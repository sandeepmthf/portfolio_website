# MongoDB Atlas Setup Guide

## Free Tier MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" or "Try Free"
3. Create account with email or Google

### Step 2: Create a Cluster
1. After login, click "Create a Deployment"
2. Choose "Free" tier
3. Select cloud provider (AWS recommended) and region closest to you
4. Click "Create Cluster"
5. Wait 5-10 minutes for cluster to start

### Step 3: Create Database User
1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Enter username and password (save these!)
4. Click "Add User"

### Step 4: Whitelist IP Address
1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Choose one of:
   - **Development**: Your computer IP (find at whatismyipaddress.com)
   - **Production**: 0.0.0.0/0 (allows all - less secure but needed for Render/Railway)

### Step 5: Get Connection String
1. Go to "Database" → "Clusters"
2. Click "Connect"
3. Choose "Connect to your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your database user credentials
6. Replace `myFirstDatabase` with `portfolio` (or your database name)

### Step 6: Update .env
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Example Connection String
```
mongodb+srv://sandeep:mySecurePassword123@cluster0.qeohfoa.mongodb.net/portfolio?retryWrites=true&w=majority
```

## MongoDB Compass (Optional - for GUI)
1. Download MongoDB Compass from https://www.mongodb.com/products/compass
2. Use your connection string to connect
3. Browse and manage your database visually

## Test Connection
```bash
cd backend
npm run dev
```

Look for: `MongoDB connected` in console

## Free Tier Limitations
- 512 MB storage
- Shared cluster (no dedicated resources)
- Enough for development/testing
- Upgrade anytime for production

## Troubleshooting

### Connection Refused
- Check IP is whitelisted in "Network Access"
- Verify credentials in MONGO_URI
- Ensure cluster is running (not paused)

### Authentication Failed
- Check username/password spelling
- Ensure special characters are URL-encoded
- Try recreating database user

### Cluster Not Starting
- Wait 5-10 minutes, it's loading
- Refresh the page
- Check cluster status in MongoDB Atlas Dashboard

## Free Credit
MongoDB Atlas often gives $200 free credit - enough for months of development!
