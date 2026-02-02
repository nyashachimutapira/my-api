# W05 Final Project Part 1 - Submission Checklist

## Pre-Submission Verification

### ✅ Code Requirements

- [ ] **Two Collections Created**
  - [ ] Contact collection with 11 fields
  - [ ] Company collection with 7 fields
  - [ ] Models: `models/contact.js` and `models/company.js`

- [ ] **CRUD Operations Implemented**
  - [ ] GET all contacts/companies (public)
  - [ ] GET single contact/company by ID (public)
  - [ ] POST create contact/company (protected - requires auth)
  - [ ] PUT update contact/company (protected - requires auth)
  - [ ] DELETE contact/company (protected - requires auth)

- [ ] **Error Handling**
  - [ ] Missing required fields → 400 Bad Request
  - [ ] Invalid email format → validation error
  - [ ] Duplicate email/company name → 400 Bad Request
  - [ ] Invalid MongoDB ID → 404 Not Found
  - [ ] Unauthorized access → 401 Unauthorized
  - [ ] Server errors → 500 Server Error

- [ ] **Validation Implementation**
  - [ ] Controller validation for required fields
  - [ ] Mongoose schema validation
  - [ ] Email regex validation
  - [ ] Phone regex validation
  - [ ] Unique constraints (email, company name)

### ✅ API Documentation

- [ ] **Swagger/OpenAPI Documentation**
  - [ ] Endpoint: `/api-docs`
  - [ ] All CRUD operations documented
  - [ ] Request/response schemas defined
  - [ ] Example values provided
  - [ ] Status codes documented
  - [ ] Authentication requirements shown
  - [ ] Executable in Swagger UI

### ✅ Authentication & Security

- [ ] **GitHub OAuth**
  - [ ] GitHub strategy configured
  - [ ] OAuth flow implemented
  - [ ] Session management working
  - [ ] Protected routes require authentication
  - [ ] Public routes accessible without auth

- [ ] **Demo Mode** (optional, for testing)
  - [ ] `DEMO_MODE=true` enables unauthenticated testing
  - [ ] Falls back to real auth when disabled

### ✅ Project Structure

```
✓ models/
  ✓ contact.js
  ✓ company.js

✓ controllers/
  ✓ contactController.js
  ✓ companyController.js

✓ routes/
  ✓ contactRoutes.js
  ✓ companyRoutes.js
  ✓ authRoutes.js
  ✓ index.js

✓ middleware/
  ✓ authentication.js

✓ server.js
✓ swagger.js
✓ package.json
✓ .env (local only, not committed)
```

### ✅ Deployment

- [ ] **GitHub**
  - [ ] Repository created at https://github.com/nyashachimutapira/my-api
  - [ ] Code pushed and up to date
  - [ ] No sensitive data in repository
  - [ ] `.env` not committed (in `.gitignore`)

- [ ] **Render Deployment**
  - [ ] Web service created on Render
  - [ ] Environment variables configured:
    - [ ] `MONGODB_URI`
    - [ ] `SESSION_SECRET`
    - [ ] `GITHUB_CLIENT_ID`
    - [ ] `GITHUB_CLIENT_SECRET`
    - [ ] `GITHUB_CALLBACK_URL`
  - [ ] Application running at: https://my-api-w7ii.onrender.com
  - [ ] API docs accessible at: `/api-docs`
  - [ ] All endpoints responding correctly

- [ ] **MongoDB**
  - [ ] Database connection working
  - [ ] Collections created (contacts, companies, sessions)
  - [ ] Test data available or seed script working

### ✅ Testing

- [ ] **Functional Testing**
  - [ ] GET /contacts returns all contacts
  - [ ] GET /contacts/:id returns single contact
  - [ ] POST /contacts creates new contact (with auth)
  - [ ] PUT /contacts/:id updates contact (with auth)
  - [ ] DELETE /contacts/:id deletes contact (with auth)
  - [ ] Same tests pass for /companies
  - [ ] GET endpoints work without auth
  - [ ] POST/PUT/DELETE endpoints require auth

- [ ] **Error Testing**
  - [ ] Missing required field → 400 error
  - [ ] Invalid email format → validation error
  - [ ] Duplicate email → 400 error
  - [ ] Invalid ID → 404 error
  - [ ] Unauthorized request → 401 error

- [ ] **Swagger UI Testing**
  - [ ] All endpoints visible in Swagger
  - [ ] Can execute GET requests
  - [ ] Can execute POST requests (if authenticated)
  - [ ] Response examples shown
  - [ ] Error responses documented

### ✅ Code Quality

- [ ] **Follows AGENTS.md Requirements**
  - [ ] CommonJS modules (require/module.exports)
  - [ ] Async/await for async operations
  - [ ] Error handling with statusCode property
  - [ ] Controller validation for required fields
  - [ ] trim: true and lowercase: true in schemas
  - [ ] Returns 201 with { _id } on create
  - [ ] Returns 204 on update/delete
  - [ ] Controllers export functions via exports.functionName
  - [ ] camelCase file naming (contactRoutes.js, etc.)

- [ ] **Code Organization**
  - [ ] Models in models/ directory
  - [ ] Controllers in controllers/ directory
  - [ ] Routes in routes/ directory
  - [ ] Middleware in middleware/ directory
  - [ ] Swagger configuration in swagger.js
  - [ ] Entry point is server.js

- [ ] **Comments & Documentation**
  - [ ] JSDoc comments on complex functions
  - [ ] Swagger comments on routes
  - [ ] README.md is comprehensive
  - [ ] Setup instructions clear

---

## Video Submission Checklist

### ✅ Video Content (5-8 minutes)

- [ ] **0:00-1:00: Overview**
  - [ ] Introduce project
  - [ ] Show GitHub repo
  - [ ] Mention two collections: Contacts and Companies

- [ ] **1:00-2:00: Collections & Schema**
  - [ ] Display Contact schema (show models/contact.js)
  - [ ] Display Company schema (show models/company.js)
  - [ ] Explain field requirements
  - [ ] Show relationship (Contacts → Companies)

- [ ] **2:00-4:30: CRUD Operations**
  - [ ] Open Swagger at /api-docs
  - [ ] Demo: GET /contacts
  - [ ] Demo: GET /contacts/{id}
  - [ ] Demo: POST /contacts (with auth)
  - [ ] Demo: PUT /contacts/{id} (with auth)
  - [ ] Demo: DELETE /contacts/{id} (with auth)
  - [ ] Repeat for companies
  - [ ] Show success and error responses

- [ ] **4:30-5:30: Error Handling**
  - [ ] Show validation error (missing field)
  - [ ] Show duplicate email error
  - [ ] Show invalid ID error
  - [ ] Show cascade protection error
  - [ ] Explain controller error handling code

- [ ] **5:30-6:30: API Documentation**
  - [ ] Show Swagger UI
  - [ ] Point out schema definitions
  - [ ] Show example values
  - [ ] Explain status codes
  - [ ] Show authentication requirements

- [ ] **6:30-7:00: Authentication**
  - [ ] Explain GitHub OAuth flow
  - [ ] Show protected endpoints
  - [ ] Mention session management

- [ ] **7:00-8:00: Deployment & Conclusion**
  - [ ] Show Render URL
  - [ ] Show /api-docs on production
  - [ ] Verify endpoints work on Render
  - [ ] Summary of features

### ✅ Video Quality

- [ ] Video between 5-8 minutes (⚠️ NO longer than 8 minutes)
- [ ] Audio is clear and audible
- [ ] Screen is visible (good font size)
- [ ] No excessive background noise
- [ ] Smooth transitions between sections
- [ ] Professional presentation

### ✅ Video Upload

- [ ] **YouTube**
  - [ ] Upload as Public video
  - [ ] Title: "W05 Final Project Part 1 - Contacts & Companies API"
  - [ ] Description includes:
    - [ ] GitHub link
    - [ ] Render link
    - [ ] Brief project description
  - [ ] Add relevant tags
  - [ ] Create custom thumbnail

- [ ] **Test Video**
  - [ ] Play through and verify it works
  - [ ] Check audio quality
  - [ ] Confirm you can access it with the link

### ✅ Canvas Submission

- [ ] **Submit Three Links**
  - [ ] **GitHub Repository**: https://github.com/nyashachimutapira/my-api
  - [ ] **Render Deployment**: https://my-api-w7ii.onrender.com
  - [ ] **YouTube Video**: [your YouTube link]

- [ ] **Assignment Text (if required)**
  - [ ] Describe individual contributions
  - [ ] Explain any challenges faced
  - [ ] Note any additional features

- [ ] **Deadline**
  - [ ] Submit before Canvas deadline
  - [ ] Double-check all links work before submitting

---

## Individual Contribution Documentation

### Team Member: [Your Name]

**Contribution 1: [Feature/Component]**
- Description: [What you did]
- Files: [List files modified/created]
- Time spent: [Approximate hours]
- Challenges: [Any issues you faced]

**Contribution 2: [Feature/Component]**
- Description: [What you did]
- Files: [List files modified/created]
- Time spent: [Approximate hours]
- Challenges: [Any issues you faced]

_Example:_

**Contribution 1: Contact CRUD Operations & Validation**
- Description: Implemented all CRUD operations for the Contact collection with comprehensive validation including email format, phone format, required field checking, and duplicate email prevention.
- Files: models/contact.js, controllers/contactController.js, routes/contactRoutes.js
- Time spent: 4 hours
- Challenges: Ensuring email uniqueness while allowing updates, cascading deletion from company references

**Contribution 2: Swagger API Documentation**
- Description: Created complete OpenAPI 3.0 specification with all endpoint definitions, request/response schemas, example values, and security schemes. Made all endpoints executable in Swagger UI.
- Files: swagger.js
- Time spent: 3 hours
- Challenges: Defining complex nested schemas, ensuring examples matched actual data structure

---

## Final Checks Before Submission

- [ ] All endpoints tested and working
- [ ] Error handling verified with test cases
- [ ] Documentation is complete and accurate
- [ ] Video is between 5-8 minutes
- [ ] GitHub repo is up to date
- [ ] Render deployment is live and responsive
- [ ] All three submission links are ready
- [ ] No sensitive data exposed (no .env in repo)
- [ ] Code follows AGENTS.md guidelines
- [ ] README is comprehensive

---

## Submission Summary

**Project Name**: W05 Final Project Part 1 - Contacts & Companies API

**Collections**: 
1. Contacts (11 fields)
2. Companies (7 fields)

**Endpoints**: 
- 2 GET endpoints per collection (all public)
- 1 POST endpoint per collection (protected)
- 1 PUT endpoint per collection (protected)
- 1 DELETE endpoint per collection (protected)
- Total: 12 CRUD endpoints

**Documentation**: OpenAPI 3.0 Swagger UI at `/api-docs`

**Status**: ✅ Ready for Submission

---

**Date Submitted**: [Fill this in when submitting]
**Submission Links**:
- GitHub: 
- Render: 
- YouTube: 

Good luck with your submission! 🎓
