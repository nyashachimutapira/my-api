# Setup Guide

## Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account or local MongoDB instance

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Session Secret
SESSION_SECRET=your-secret-key-here

# Server Port
PORT=3000

# GitHub OAuth (Optional - for authentication)
GITHUB_CLIENT_ID=your_github_app_id
GITHUB_CLIENT_SECRET=your_github_app_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# Demo Mode (Optional - for testing without GitHub OAuth)
DEMO_MODE=true
```

### 3. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 4. Access the Application
- **Home/Contacts**: http://localhost:3000/
- **Companies**: http://localhost:3000/companies
- **API Documentation**: http://localhost:3000/api-docs

---

## MongoDB Setup

### Option A: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Create a database user
5. Get the connection string
6. Add to `.env` as `MONGODB_URI`

### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/my-api`

---

## GitHub OAuth Setup (Optional)

To enable GitHub OAuth authentication:

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: My API
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:3000/auth/github/callback
4. Copy Client ID and Client Secret to `.env`

---

## API Endpoints Summary

### Contacts
- `GET /contacts` - Get all contacts
- `GET /contacts/:id` - Get contact by ID
- `POST /contacts` - Create contact (protected)
- `PUT /contacts/:id` - Update contact (protected)
- `DELETE /contacts/:id` - Delete contact (protected)

### Companies
- `GET /companies` - Get all companies
- `GET /companies/:id` - Get company by ID
- `POST /companies` - Create company (protected)
- `PUT /companies/:id` - Update company (protected)
- `DELETE /companies/:id` - Delete company (protected)

### Authentication
- `GET /auth/github` - Start GitHub OAuth flow
- `GET /auth/github/callback` - GitHub OAuth callback
- `GET /auth/status` - Get authentication status
- `GET /auth/me` - Get current user
- `GET /auth/logout` - Logout

---

## Testing with Demo Mode

To test the API without GitHub OAuth setup:

1. Set `DEMO_MODE=true` in `.env`
2. Restart the server
3. All protected endpoints will work with demo user

---

## Common Issues & Solutions

### MongoDB Connection Error
- Check MONGODB_URI in .env
- Verify MongoDB is running
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for development)

### Port Already in Use
- Change PORT in .env to an available port
- Or kill process using port 3000

### GitHub OAuth Not Working
- Verify GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env
- Check GitHub OAuth app settings
- Ensure callback URL matches exactly

### Contact/Company Not Created
- Use Swagger docs at /api-docs to test with proper format
- Ensure all required fields are provided
- Check that referenced company exists (for contacts)

---

## Production Deployment (Render)

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Connect GitHub repository
4. Create Web Service
5. Set environment variables in Render dashboard
6. Deploy
7. Access at: `https://your-app-name.onrender.com/api-docs`

---

## Troubleshooting

Run the dev server with detailed logging:
```bash
npm run dev
```

Check MongoDB connection:
- Visit http://localhost:3000/contacts
- If no error, connection is working

Test API endpoints using Swagger UI:
- Go to http://localhost:3000/api-docs
- Click "Try it out" on any endpoint

---

For detailed API documentation, visit the Swagger UI at `/api-docs` when the server is running.
