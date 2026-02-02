# W05 Final Project Part 1 - Video Submission Guide

## Video Requirements

- **Duration**: 5-8 minutes (MUST be within time limit)
- **Format**: Upload to YouTube
- **Content**: Follow the rubric requirements
- **Submission**: Share YouTube link in Canvas

**⚠️ IMPORTANT**: Videos longer than 8 minutes will receive a ZERO and must be resubmitted.

---

## Video Checklist

Use this checklist to ensure you cover all rubric items:

### Part 1: Project Overview (0:00 - 1:00)
- [ ] Show GitHub repository link
- [ ] Show project structure briefly
- [ ] Mention the two collections: **Contacts** and **Companies**

### Part 2: Collections & Schema (1:00 - 2:00)
- [ ] Display Contact schema (firstName, lastName, email, phone, etc.)
  - Show file: `models/contact.js`
- [ ] Display Company schema (name, industry, website, supportEmail, phone, hqCity, description)
  - Show file: `models/company.js`
- [ ] Explain relationships (Contacts reference Companies)

### Part 3: CRUD Operations Demonstration (2:00 - 4:30)

#### GET Operations (Contacts)
- [ ] Show Swagger UI at `/api-docs`
- [ ] Demo: GET /contacts (Get all contacts)
- [ ] Demo: GET /contacts/{id} (Get single contact)

#### POST Operations (Contacts)
- [ ] Demo: POST /contacts with valid data
- [ ] Show 201 Created response with _id
- [ ] Demonstrate error handling: POST with missing required field (show 400 error)

#### GET Operations (Companies)
- [ ] Demo: GET /companies (Get all companies)
- [ ] Demo: GET /companies/{id} (Get single company)

#### POST Operations (Companies)
- [ ] Demo: POST /companies with valid data
- [ ] Show 201 Created response with _id
- [ ] Demonstrate error: Try duplicate company name (show 400 error)

#### PUT Operations
- [ ] Demo: PUT /contacts/{id} with updated data
- [ ] Show 204 No Content response
- [ ] Demo: PUT /companies/{id}

#### DELETE Operations
- [ ] Demo: DELETE /contacts/{id}
- [ ] Show 204 No Content response
- [ ] Demo: Attempt DELETE company with assigned contacts (show 400 error: "Cannot delete company with assigned contacts")

### Part 4: Error Handling & Validation (4:30 - 5:30)
- [ ] Demonstrate validation errors:
  - Missing required field (400)
  - Invalid email format (validation error)
  - Duplicate email (400)
  - Invalid MongoDB ID (404)
- [ ] Show controller error handling in code: `controllers/contactController.js`
- [ ] Show model validation in code: `models/contact.js`

### Part 5: API Documentation (5:30 - 6:30)
- [ ] Show Swagger UI at `/api-docs`
- [ ] Point out:
  - All endpoints documented
  - Request/response schemas
  - Example values
  - Status codes and error descriptions
  - Authentication requirements
- [ ] Explain: "API is executable directly from Swagger UI"

### Part 6: Authentication (6:30 - 7:00)
- [ ] Show protected endpoints (POST, PUT, DELETE require auth)
- [ ] Show `/auth` routes
- [ ] Briefly explain: "GitHub OAuth integrated for authentication"
- [ ] Mention: "Demo mode available for testing without GitHub"

### Part 7: Render Deployment (7:00 - 8:00)
- [ ] Show Render deployment setup
- [ ] Provide Render site link
- [ ] Show `/api-docs` is accessible on deployed site
- [ ] Note: "Same repository used for team collaboration"

---

## Recording Tips

### Setup
1. **Use Swagger UI** for demonstrations (easiest to follow)
2. **Use small terminal font** for visibility
3. **Slow down your clicks** for viewers to follow
4. **Close extra tabs/windows** to avoid distractions

### Demonstrations Order (for flow)
1. Open Swagger at http://localhost:3000/api-docs
2. Demo GET operations first (no auth needed)
3. Show POST/PUT/DELETE with login (auth required)
4. Show error cases
5. Explain code in IDE
6. Mention deployment

### What to Show in Code
- **Models**: Show schema validation
- **Controllers**: Show error handling logic
- **Routes**: Show Swagger JSDoc comments
- **Swagger.js**: Show endpoint definitions

### Demo Data
You'll need sample data. Either:
- Create via API calls in Swagger before recording
- Import from seed data: `npm run seed` (if available)
- Create via POST requests in the video

---

## Sample Script/Narration

```
[0:00-0:30]
"Hello, I'm [Name]. This is my W05 Final Project Part 1 submission. 
This is a REST API for managing contacts and companies in a business 
context. The code is available on GitHub at [GITHUB_LINK]."

[0:30-1:30]
"The API has two main collections: Contacts and Companies. 
Contacts have fields like firstName, lastName, email, phone, 
favoriteColor, birthday, jobTitle, and reference a company. 
Companies have name, industry, website, supportEmail, phone, 
headquarters city, and description. There's a one-to-many 
relationship: one company can have multiple contacts."

[1:30-2:30]
"Let me show you the code. Here's the Contact schema 
[show models/contact.js] with validation for email and phone. 
And here's the Company schema [show models/company.js]."

[2:30-3:30]
"Now let me demonstrate the CRUD operations using the Swagger UI 
at /api-docs. First, let's GET all contacts [click Try it out, Execute]. 
Great! We got a 200 response with all contacts. Now let's get a 
specific contact by ID [paste ID, Execute]. Perfect."

[3:30-4:00]
"Now let's create a new contact [scroll to POST /contacts, click Try it out]. 
I'll fill in all required fields... and Execute. We get a 201 Created 
response with the new contact's ID. Perfect."

[4:00-4:30]
"Let me show error handling. If I try to create a contact without 
required fields [clear firstName, Execute], we get a 400 Bad Request 
with a clear error message about the missing field."

[4:30-5:00]
"Here are the UPDATE and DELETE operations [show PUT, DELETE endpoints]. 
PUT returns 204 No Content on success, and DELETE also returns 204. 
If I try to delete a company that has assigned contacts [Execute DELETE], 
we get a 400 error preventing the deletion."

[5:00-5:30]
"Looking at the code, the error handling is comprehensive. 
[Show contactController.js] Each operation validates input, 
checks for duplicates, and handles edge cases. Mongoose models 
enforce additional validation with regex patterns for email and 
phone numbers."

[5:30-6:30]
"The API documentation is generated with Swagger. Every endpoint 
is documented with descriptions, parameters, request/response schemas, 
and status codes [scroll through Swagger UI]. The documentation is 
executable - you can test endpoints directly from here."

[6:30-7:00]
"This API uses GitHub OAuth for authentication on protected endpoints 
[point to POST, PUT, DELETE]. GET endpoints are public. Login information 
is managed with sessions stored in MongoDB."

[7:00-8:00]
"The API is deployed on Render at [RENDER_URL], and the documentation 
is accessible at [RENDER_URL]/api-docs. The team uses this same 
repository for collaboration. All code follows the assignment 
requirements with proper HTTP status codes, validation, and error 
handling throughout."
```

---

## Timestamps for Video Structure

| Timestamp | Section | Duration |
|-----------|---------|----------|
| 0:00-1:00 | Overview & Introduction | 1:00 |
| 1:00-2:00 | Collections & Schema | 1:00 |
| 2:00-4:30 | CRUD Operations Demo | 2:30 |
| 4:30-5:30 | Error Handling & Validation | 1:00 |
| 5:30-6:30 | API Documentation | 1:00 |
| 6:30-7:00 | Authentication | 0:30 |
| 7:00-8:00 | Deployment & Conclusion | 1:00 |
| **TOTAL** | | **8:00** |

---

## Links to Include in Video Description

1. **GitHub Repository**: https://github.com/nyashachimutapira/my-api
2. **Render Deployment**: https://your-app-name.onrender.com
3. **API Documentation**: https://your-app-name.onrender.com/api-docs

---

## Checklist Before Recording

- [ ] Dev server running (`npm run dev`)
- [ ] MongoDB connected and has sample data
- [ ] Swagger UI accessible at `/api-docs`
- [ ] All CRUD operations working
- [ ] Error cases tested and working
- [ ] GitHub repository is up to date
- [ ] Render deployment is working
- [ ] VS Code with good font size
- [ ] Terminal visible (if showing code)
- [ ] Screen recording software ready
- [ ] Timer set for 5-8 minutes

---

## Tips for Success

✅ **Practice first**: Do a dry run before final recording
✅ **Have notes**: Keep rubric points visible while recording
✅ **Be confident**: Speak clearly and explain as you go
✅ **Stay on time**: Aim for 6-7 minutes (leave buffer for 8 min limit)
✅ **Show working**: Always execute endpoints to show they work
✅ **Handle errors**: Show at least one error case per operation type
✅ **Code visibility**: Make sure code is readable on screen
✅ **Conclusion**: End with deployment link and summary

---

## Common Mistakes to Avoid

❌ Recording longer than 8 minutes (automatic ZERO)
❌ Not demonstrating all CRUD operations
❌ Not showing error handling
❌ Not mentioning API documentation (Swagger)
❌ Not showing authentication implementation
❌ Forgetting to mention deployment location
❌ Poor audio quality (background noise)
❌ Rushing through the content
❌ Not showing actual working endpoints
❌ Forgetting to include all team members (if team submission)

---

## YouTube Upload Settings

1. **Title**: "W05 Final Project Part 1 - REST API with Contacts & Companies"
2. **Description**: 
   ```
   W05 Final Project Part 1 Submission
   
   Project Links:
   - GitHub: https://github.com/nyashachimutapira/my-api
   - Render: https://your-app-name.onrender.com
   - API Docs: https://your-app-name.onrender.com/api-docs
   
   This video demonstrates:
   - REST API with two collections (Contacts & Companies)
   - Complete CRUD operations
   - Comprehensive error handling and validation
   - API documentation with Swagger/OpenAPI
   - GitHub OAuth authentication
   - MongoDB integration
   - Render deployment
   ```
3. **Visibility**: Public (so instructor can access)
4. **Thumbnail**: Make it visually appealing
5. **Tags**: REST API, Node.js, Express, MongoDB, Swagger

---

## Submission in Canvas

1. Submit **YouTube video link**
2. Submit **GitHub repository link**
3. Submit **Render deployment link**

All three links must be provided for full credit.

---

Good luck with your video submission! 🎥
