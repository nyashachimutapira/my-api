# Quick Reference Guide

## Running the API

```bash
# Install dependencies
npm install

# Start dev server (with auto-reload)
npm run dev

# Start production server
npm start
```

Server runs on `http://localhost:3000`

---

## Key Endpoints

### Contacts (Full CRUD)
```
GET    /contacts              # Get all contacts
GET    /contacts/:id          # Get single contact
POST   /contacts              # Create (requires auth)
PUT    /contacts/:id          # Update (requires auth)
DELETE /contacts/:id          # Delete (requires auth)
```

### Companies (Full CRUD)
```
GET    /companies             # Get all companies
GET    /companies/:id         # Get single company
POST   /companies             # Create (requires auth)
PUT    /companies/:id         # Update (requires auth)
DELETE /companies/:id         # Delete (requires auth)
```

### Authentication
```
GET    /auth/github           # GitHub OAuth login
GET    /auth/github/callback  # OAuth callback
GET    /auth/status           # Check auth status
GET    /auth/me               # Get current user
GET    /auth/logout           # Logout
```

### Documentation
```
GET    /api-docs              # Swagger UI
GET    /                      # Contacts dashboard
GET    /companies             # Companies dashboard
```

---

## Testing with curl

### Get All Contacts
```bash
curl http://localhost:3000/contacts
```

### Get Single Contact
```bash
curl http://localhost:3000/contacts/507f1f77bcf86cd799439011
```

### Create Company
```bash
curl -X POST http://localhost:3000/companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Corp",
    "industry": "Technology",
    "website": "https://techcorp.com",
    "supportEmail": "support@techcorp.com",
    "phone": "+1 (555) 987-6543",
    "hqCity": "San Francisco",
    "description": "Leading tech company"
  }'
```

### Create Contact
```bash
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "favoriteColor": "Blue",
    "birthday": "1990-01-15",
    "jobTitle": "Engineer",
    "company": "507f1f77bcf86cd799439012",
    "street": "123 Main St",
    "city": "NYC",
    "country": "USA"
  }'
```

---

## Contact Schema (11 fields)

```javascript
{
  firstName: String,          // Required, trimmed
  lastName: String,           // Required, trimmed
  email: String,              // Required, unique, email format
  phone: String,              // Required, phone format
  favoriteColor: String,      // Required, trimmed
  birthday: Date,             // Required
  jobTitle: String,           // Required, trimmed
  company: ObjectId,          // Required, references Company
  street: String,             // Required, trimmed
  city: String,               // Required, trimmed
  country: String,            // Required, trimmed
  notes: String,              // Optional, max 500 chars
  createdAt: Date,            // Auto-added
  updatedAt: Date             // Auto-added
}
```

---

## Company Schema (7 fields)

```javascript
{
  name: String,               // Required, unique, trimmed
  industry: String,           // Required, trimmed
  website: String,            // Optional, URL format
  supportEmail: String,       // Required, email format
  phone: String,              // Required, phone format
  hqCity: String,             // Required, trimmed
  description: String,        // Required, max 500 chars
  createdAt: Date,            // Auto-added
  updatedAt: Date             // Auto-added
}
```

---

## HTTP Status Codes Used

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | GET successful |
| 201 | Created | POST successful |
| 204 | No Content | PUT/DELETE successful |
| 400 | Bad Request | Invalid input, validation error |
| 401 | Unauthorized | Authentication required |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal error |

---

## Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

Examples:
```json
{"error": "Missing required fields: firstName, email"}
{"error": "Email already exists"}
{"error": "Contact not found"}
{"error": "Authentication required"}
{"error": "Cannot delete company with assigned contacts"}
```

---

## Success Response Format

### GET Requests
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    ...
  }
]
```

### POST Requests
```json
{
  "_id": "507f1f77bcf86cd799439011"
}
```

### PUT/DELETE Requests
```
HTTP/1.1 204 No Content
```
(No body)

---

## Validation Rules

### Email
- Must match: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Automatically lowercased
- Must be unique in database

### Phone
- Must match: `/^\+?[0-9()\s-]{7,}$/`
- Examples: "+1 (555) 123-4567", "+1 555 123 4567", "5551234567"

### Website (Companies)
- Must match: `/^https?:\/\/.+/i`
- Examples: "https://example.com", "http://example.com"

### Required Fields (Contact)
- firstName, lastName, email, phone, favoriteColor, birthday, jobTitle, company, street, city, country

### Required Fields (Company)
- name, industry, supportEmail, phone, hqCity

---

## Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Server
PORT=3000
SESSION_SECRET=long-random-string

# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# Optional
DEMO_MODE=true              # Skip GitHub auth
RENDER_URL=https://app.onrender.com  # For Swagger docs
```

---

## Project Files Structure

```
my-api/
├── models/
│   ├── contact.js           # Contact schema
│   └── company.js           # Company schema
├── controllers/
│   ├── contactController.js # Contact CRUD logic
│   └── companyController.js # Company CRUD logic
├── routes/
│   ├── contactRoutes.js     # Contact endpoints
│   ├── companyRoutes.js     # Company endpoints
│   ├── authRoutes.js        # Auth endpoints
│   └── index.js             # Route aggregation
├── middleware/
│   └── authentication.js    # Auth middleware
├── data/
│   └── database.js          # MongoDB connection
├── server.js                # Express app & setup
├── swagger.js               # Swagger/OpenAPI config
├── package.json             # Dependencies
└── .env                     # Environment variables (not committed)
```

---

## Useful Commands

```bash
# Development
npm run dev                  # Start with auto-reload

# Production
npm start                    # Start server

# Testing
npm test                     # Run tests (if configured)

# Database
node importData.js          # Seed database

# Git
git status                  # Check changes
git add .                   # Stage all changes
git commit -m "message"     # Commit changes
git push                    # Push to GitHub
```

---

## Common API Workflows

### Create Company, Then Contacts

1. **Create Company**
   ```bash
   POST /companies
   # Get back _id: "507f..."
   ```

2. **Create Contact(s)**
   ```bash
   POST /contacts
   # Use company _id in "company" field
   ```

3. **View All Data**
   ```bash
   GET /companies           # See all companies
   GET /contacts            # See all contacts with populated company info
   ```

### Update Operations

```bash
# Update company
PUT /companies/507f...
# Send complete updated data

# Update contact
PUT /contacts/507f...
# Send complete updated data
```

### Delete Operations

```bash
# Delete contact (always works)
DELETE /contacts/507f...

# Delete company (only if no contacts assigned)
DELETE /companies/507f...
# If contacts exist: 400 error
```

---

## Debugging Tips

### Check Server Status
```bash
GET http://localhost:3000/auth/status
```

### Test Database Connection
```bash
GET http://localhost:3000/contacts
# If it works, database is connected
```

### View All Swagger Endpoints
```
http://localhost:3000/api-docs
```

### Check Environment Variables
```javascript
console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);
```

---

## Deployment Checklist

- [ ] Push all changes to GitHub
- [ ] Set environment variables in Render
- [ ] Build and deploy on Render
- [ ] Test `/api-docs` on production URL
- [ ] Test a GET endpoint (public)
- [ ] Share links in Canvas:
  - [ ] GitHub repo URL
  - [ ] Render app URL
  - [ ] YouTube video URL

---

## Quick Facts

- **Collections**: 2 (Contacts, Companies)
- **CRUD Endpoints**: 12 (6 per collection)
- **Authentication**: GitHub OAuth
- **Public Endpoints**: 4 (all GETs)
- **Protected Endpoints**: 8 (all POST/PUT/DELETE)
- **Status Codes**: 7 different codes used
- **Documentation**: OpenAPI 3.0 Swagger UI
- **Database**: MongoDB with Mongoose
- **Deployment**: Render

---

**All information is current as of 2026-02-02**
