# API Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  • HTML Dashboards (/ and /companies)                            │
│  • Swagger UI (/api-docs)                                       │
│  • HTTP Clients (curl, Postman, etc.)                           │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTP/HTTPS
┌──────────────────────▼──────────────────────────────────────────┐
│                    EXPRESS.JS SERVER                             │
├─────────────────────────────────────────────────────────────────┤
│  server.js                                                       │
│  ├─ CORS Middleware                                             │
│  ├─ Body Parser                                                 │
│  ├─ Session Management (MongoDB Store)                          │
│  ├─ Passport Authentication (GitHub OAuth)                      │
│  └─ Route Registration                                          │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                    ROUTES LAYER                                  │
├─────────────────────────────────────────────────────────────────┤
│  routes/index.js                                                 │
│  ├─ /contacts → contactRoutes.js                               │
│  ├─ /companies → companyRoutes.js                              │
│  ├─ /auth → authRoutes.js                                      │
│  ├─ /projects → projectRoutes.js (bonus)                       │
│  └─ /reviews → reviewRoutes.js (bonus)                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│               MIDDLEWARE/CONTROLLERS LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  authentication.js (requireAuth middleware)                      │
│  ├─ contactController.js                                        │
│  │  ├─ getContacts()                                            │
│  │  ├─ getContactById()                                         │
│  │  ├─ createContact() [Protected]                             │
│  │  ├─ updateContact() [Protected]                             │
│  │  └─ deleteContact() [Protected]                             │
│  │                                                               │
│  └─ companyController.js                                        │
│     ├─ getCompanies()                                           │
│     ├─ getCompanyById()                                         │
│     ├─ createCompany() [Protected]                             │
│     ├─ updateCompany() [Protected]                             │
│     └─ deleteCompany() [Protected]                             │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                 MONGOOSE MODELS LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  ├─ Contact                                                      │
│  │  ├─ firstName (string, required, trimmed)                   │
│  │  ├─ lastName (string, required, trimmed)                    │
│  │  ├─ email (string, unique, validated, lowercase)            │
│  │  ├─ phone (string, validated)                              │
│  │  ├─ favoriteColor (string)                                  │
│  │  ├─ birthday (date)                                         │
│  │  ├─ jobTitle (string)                                       │
│  │  ├─ company (ObjectId → Company, required)                 │
│  │  ├─ street, city, country (strings)                         │
│  │  ├─ notes (string, max 500)                                 │
│  │  └─ timestamps (createdAt, updatedAt)                       │
│  │                                                               │
│  └─ Company                                                      │
│     ├─ name (string, unique, trimmed, required)                │
│     ├─ industry (string, required)                             │
│     ├─ website (string, URL format)                            │
│     ├─ supportEmail (string, email format, required)           │
│     ├─ phone (string, validated, required)                     │
│     ├─ hqCity (string, required)                               │
│     ├─ description (string, max 500)                           │
│     └─ timestamps (createdAt, updatedAt)                       │
└──────────────────────┬──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│               MONGODB DATABASE LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  MongoDB Collections:                                            │
│  ├─ contacts (with indexes on email, company)                  │
│  ├─ companies (with unique index on name)                      │
│  ├─ projects (bonus collection)                                │
│  ├─ reviews (bonus collection)                                 │
│  └─ sessions (for session persistence)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request/Response Flow - Example

### Create a Contact (POST /contacts)

```
┌─ CLIENT ────────────────────────────────────────────────────┐
│  POST /contacts                                              │
│  Headers: Content-Type: application/json                    │
│  Body: {                                                     │
│    "firstName": "John",                                     │
│    "lastName": "Doe",                                       │
│    "email": "john.doe@example.com",                         │
│    ...                                                       │
│  }                                                           │
└─────────────────────┬────────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼────────────────────────────────────────┐
│ EXPRESS SERVER (Routes)                                      │
│ POST /contacts → requireAuth → createContact                │
└─────────────────────┬────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────────┐
│ MIDDLEWARE: isAuthenticated                                 │
│ ✓ Checks req.isAuthenticated() or DEMO_MODE               │
│ ✓ Passes control to controller if authenticated             │
└─────────────────────┬────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────────┐
│ CONTROLLER: contactController.createContact                 │
│ 1. validateFields(req.body) - check required fields        │
│ 2. ensureCompany(req.body.company) - verify company exists │
│ 3. new Contact(req.body) - create Mongoose instance        │
│ 4. await contact.save() - save to MongoDB                  │
└─────────────────────┬────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────────┐
│ MODEL VALIDATION (Mongoose)                                 │
│ ✓ Email format validation (regex)                          │
│ ✓ Phone format validation (regex)                          │
│ ✓ Email uniqueness check (unique constraint)                │
│ ✓ Type checking and trimming                               │
└─────────────────────┬────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────────┐
│ MONGODB (Insert Operation)                                  │
│ INSERT INTO contacts { ... }                               │
│ ✓ Returns: { _id, firstName, ..., createdAt, updatedAt }  │
└─────────────────────┬────────────────────────────────────────┘
                      │ Response
┌─────────────────────▼────────────────────────────────────────┐
│ CONTROLLER (Response)                                       │
│ HTTP 201 Created                                            │
│ Content-Type: application/json                              │
│ Body: { _id: "507f1f77bcf86cd799439011" }                 │
└─────────────────────┬────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────────┐
│ CLIENT (Response)                                           │
│ Status: 201 Created                                         │
│ Contact successfully created with ID returned               │
└─────────────────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
┌─ Invalid Input ──────────────────────────────────────────┐
│  Missing required field                                   │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
            ┌─ validateFields() ─┐
            │ Throws Error with  │
            │ statusCode: 400    │
            └─────────┬──────────┘
                      │
                      ▼
         ┌─ Catch Block in Controller ─┐
         │ res.status(400).json({       │
         │   error: "Missing required   │
         │   fields: ..."               │
         │ })                           │
         └────────────────────────────┘

┌─ Duplicate Email ────────────────────────────────────────┐
│  Email already exists in database                         │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
        ┌─ MongoDB Unique Constraint ─┐
        │ Error code: 11000           │
        │ (duplicate key error)        │
        └─────────────────┬────────────┘
                          │
                          ▼
        ┌─ Catch Block in Controller ─┐
        │ res.status(400).json({       │
        │   error: "Email already      │
        │   exists"                    │
        │ })                           │
        └────────────────────────────┘

┌─ Invalid ObjectId ───────────────────────────────────────┐
│  Malformed MongoDB ID in URL                              │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
   ┌─ mongoose.Types.ObjectId.isValid() ─┐
   │ Returns false                         │
   └─────────────────┬─────────────────────┘
                     │
                     ▼
    ┌─ Catch Block in Controller ──┐
    │ res.status(404).json({        │
    │   error: "Contact not found"  │
    │ })                            │
    └───────────────────────────────┘
```

---

## Database Relationships

### Contacts → Companies (One-to-Many)

```
┌─ Companies Table ─────────────────┐
│ _id: ObjectId (Primary Key)       │
│ name: string (Unique)             │
│ industry: string                  │
│ ...                               │
└──────────┬──────────────────────┘
           │ (Referenced by)
           │ (One Company → Many Contacts)
           │
┌──────────▼──────────────────────┐
│ Contacts Table                   │
│ _id: ObjectId (Primary Key)      │
│ firstName: string                │
│ lastName: string                 │
│ email: string (Unique)           │
│ ...                              │
│ company: ObjectId (Foreign Key)  │
└──────────────────────────────────┘

Cascade Protection:
- Cannot delete company with assigned contacts
- Contacts must reference valid company
```

---

## API Security

### Authentication Flow

```
┌─────────────────────────────────────┐
│     User Visits /                   │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Check /auth/status                 │
│  ├─ DEMO_MODE=true? → Allow         │
│  ├─ req.isAuthenticated()? → Allow  │
│  └─ Else → Show login button        │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Click "Login with GitHub"          │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  /auth/github                       │
│  ↓ Redirect to GitHub OAuth         │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  GitHub Login & Approval            │
│  ↓ Redirect to callback             │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  /auth/github/callback              │
│  ├─ Validate GitHub response        │
│  ├─ Create session                  │
│  └─ Redirect to /                   │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  User Authenticated                 │
│  ├─ Can POST/PUT/DELETE             │
│  ├─ Session stored in MongoDB       │
│  └─ Can access protected endpoints  │
└─────────────────────────────────────┘
```

### Protected Endpoint Flow

```
POST /contacts (with auth required)
       │
       ▼
requireAuth middleware
├─ DEMO_MODE=true? → next()
├─ req.isAuthenticated()? → next()
└─ else → res.status(401).json({error: 'Authentication required'})
       │
       ▼ (if authenticated)
contactController.createContact()
       │
       ▼
Process request, validate, and respond
```

---

## Data Validation Layers

```
┌─ Client (Browser/API Client) ──────────────────┐
│ Sends JSON request                              │
└──────────────┬───────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────┐
│ Server Route Handler                          │
│ ├─ Parse JSON body                            │
│ ├─ Check authentication                       │
│ └─ Pass to controller                         │
└──────────────┬────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────┐
│ Controller Validation                         │
│ ├─ Check required fields (validateFields)    │
│ ├─ Verify referenced entities exist           │
│ ├─ Check for duplicates (email, company name)│
│ └─ Proceed to model                           │
└──────────────┬────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────┐
│ Mongoose Model Validation                     │
│ ├─ Email regex match                          │
│ ├─ Phone regex match                          │
│ ├─ URL format match (website)                 │
│ ├─ String trimming and lowercasing            │
│ ├─ Length constraints                         │
│ └─ Type coercion                              │
└──────────────┬────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────┐
│ MongoDB Constraints                           │
│ ├─ Unique indexes (email, company name)      │
│ ├─ Required field enforcement                 │
│ ├─ Type validation                            │
│ └─ Index operations                           │
└──────────────┬────────────────────────────────┘
               │
        ✓ Valid Data Stored
```

---

## Response Status Codes Summary

| Status | Code | Meaning | Example |
|--------|------|---------|---------|
| Success | 200 | OK | GET request successful |
| Success | 201 | Created | POST request created resource |
| Success | 204 | No Content | PUT/DELETE successful (no body) |
| Client Error | 400 | Bad Request | Invalid input, missing fields |
| Client Error | 401 | Unauthorized | Authentication required |
| Client Error | 404 | Not Found | Resource doesn't exist |
| Server Error | 500 | Server Error | Internal server error |

---

## Technology Stack

```
Frontend:
├─ HTML5 (Dashboard views)
├─ JavaScript (Fetch API)
├─ CSS3 (Styling)
└─ Swagger UI (API documentation)

Backend:
├─ Node.js (Runtime)
├─ Express.js (Framework)
├─ Mongoose (ODM)
├─ Passport.js (Authentication)
└─ Express-Session (Session management)

Database:
└─ MongoDB (NoSQL database)

DevOps:
├─ npm (Package manager)
├─ Nodemon (Development server)
├─ Render (Deployment platform)
└─ GitHub (Version control)
```

---

This architecture supports the assignment requirements:
- ✅ Two collections (Contacts & Companies) with CRUD
- ✅ Comprehensive error handling and validation
- ✅ Authentication and authorization
- ✅ API documentation (Swagger)
- ✅ Proper HTTP methods and status codes
- ✅ Database relationships
