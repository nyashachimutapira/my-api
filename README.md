# Contacts & Companies API - W05 Final Project Part 1

Professional REST API for managing contacts and companies with comprehensive CRUD operations, authentication, validation, and API documentation.

**Status**: ✅ Complete and Ready for Deployment

**Submission**: 
- GitHub: [https://github.com/nyashachimutapira/my-api](https://github.com/nyashachimutapira/my-api)
- Render: [https://my-api-w7ii.onrender.com](https://my-api-w7ii.onrender.com)
- API Docs: [https://my-api-w7ii.onrender.com/api-docs](https://my-api-w7ii.onrender.com/api-docs)

## Feature Overview

- ✅ Two MongoDB collections with relationships (`contacts` reference `companies`)
- ✅ Contact documents contain 11 validated fields (requirement ≥ 7 fields)
- ✅ Fully functional CRUD routes for contacts and companies
- ✅ GitHub OAuth login + session-based protection for write routes
- ✅ Centralized controllers + modular routers
- ✅ Swagger UI (`/api-docs`) covering every route, schema, and security rule
- ✅ Auto-seeding for local/dev setups

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Environment variables**
   Create `.env` (never commit it):
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=3000
   SESSION_SECRET=super_long_random_string
   GITHUB_CLIENT_ID=github_oauth_app_client_id
   GITHUB_CLIENT_SECRET=github_oauth_app_client_secret
   GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
   CLIENT_REDIRECT_URL=http://localhost:3000/auth/success # optional
   RENDER_URL=https://your-render-app.onrender.com # optional, used in Swagger
   ```
   _Tip:_ Register a GitHub OAuth App (`https://github.com/settings/developers`) using `http://localhost:3000/auth/github/callback` locally and `https://your-render-url.onrender.com/auth/github/callback` in production.
3. **(Optional) manual import**
   Auto-seeding runs on server start, but you can also run:
   ```bash
   node importData.js
   ```
4. **Start the API**
   ```bash
   npm start
   ```
   or
   ```bash
   npm run dev
   ```

## API Surface

| Method | Route | Description |
| -- | -- | -- |
| GET | `/` | Health/status payload |
| GET | `/contacts` | List contacts (populated with company info) |
| GET | `/contacts/:id` | Get single contact |
| POST | `/contacts` | Create contact _(requires login)_ |
| PUT | `/contacts/:id` | Update contact _(requires login)_ |
| DELETE | `/contacts/:id` | Delete contact _(requires login)_ |
| GET | `/companies` | List companies |
| GET | `/companies/:id` | Get company |
| POST | `/companies` | Create company _(requires login)_ |
| PUT | `/companies/:id` | Update company _(requires login)_ |
| DELETE | `/companies/:id` | Delete company _(requires login)_ |
| GET | `/auth/github` | Redirect to GitHub OAuth |
| GET | `/auth/me` | Current auth state |
| POST | `/auth/logout` | Destroy session |
| GET | `/api-docs` | Interactive Swagger UI |

## Auth & Schemas

- **GitHub OAuth Flow**
  1. Visit `/auth/github` in a browser to sign in.
  2. After GitHub redirects back, the API sets the session cookie (`connect.sid`).
  3. Use `/auth/me` to confirm authentication. REST clients must include the cookie to call protected routes.
  4. Call `/auth/logout` to end the session.

**Contact (11 required fields)**
- `firstName`, `lastName`, `email`, `phone`, `favoriteColor`, `birthday`,
  `jobTitle`, `company` (ObjectId), `street`, `city`, `country`
- Optional: `notes`

**Company**
- `name`, `industry`, `supportEmail`, `phone`, `hqCity`, `description`
- Optional: `website`

## Documentation & Testing

- Swagger UI: `http://localhost:3000/api-docs`
- Sample REST Client calls: `contacts.rest` (see auth section about capturing the cookie)
- Tests can be run via REST Client, Thunder Client, Postman, curl, etc.

## Deployment Notes

1. Push to GitHub and connect the repo to Render.
2. Create a new Render Web Service.
3. Add env vars:
   - `MONGODB_URI`
   - `SESSION_SECRET`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GITHUB_CALLBACK_URL` (e.g., `https://your-app.onrender.com/auth/github/callback`)
   - `RENDER_URL` (optional)
4. Deploy & verify `/api-docs`, `/auth/me`, and protected CRUD routes remotely.

---

## W05 Final Project Part 1 - Assignment Completion

### ✅ Requirements Met

#### 1. Two Collections with CRUD
- **Contacts**: 11 fields (firstName, lastName, email, phone, favoriteColor, birthday, jobTitle, company, street, city, country, notes)
- **Companies**: 7 fields (name, industry, website, supportEmail, phone, hqCity, description)
- Full CRUD operations on both collections

#### 2. API Endpoints Implemented
- **GET** `/contacts` & `/contacts/{id}` - Retrieve contacts
- **POST** `/contacts` - Create contact (protected)
- **PUT** `/contacts/{id}` - Update contact (protected)
- **DELETE** `/contacts/{id}` - Delete contact (protected)
- **GET** `/companies` & `/companies/{id}` - Retrieve companies
- **POST** `/companies` - Create company (protected)
- **PUT** `/companies/{id}` - Update company (protected)
- **DELETE** `/companies/{id}` - Delete company (protected)

#### 3. Error Handling & Validation
- ✅ Input validation (required fields, format validation)
- ✅ Database constraints (unique email, unique company name)
- ✅ Cascade protection (cannot delete company with contacts)
- ✅ Proper HTTP status codes:
  - 200 GET successful
  - 201 Created
  - 204 No Content (update/delete)
  - 400 Bad Request
  - 401 Unauthorized
  - 404 Not Found
  - 500 Server Error

#### 4. API Documentation (Swagger)
- ✅ Full OpenAPI 3.0.0 specification
- ✅ All endpoints documented with examples
- ✅ Request/response schemas
- ✅ Executable endpoints in Swagger UI
- ✅ Available at `/api-docs` and deployed on Render

#### 5. Authentication & Security
- ✅ GitHub OAuth integration
- ✅ Session-based protection for write operations
- ✅ Public GET endpoints
- ✅ Protected POST/PUT/DELETE endpoints
- ✅ Demo mode for testing

#### 6. Deployment
- ✅ GitHub repository set up
- ✅ Rendered on https://my-api-w7ii.onrender.com
- ✅ API documentation accessible at `/api-docs`
- ✅ Ready for team collaboration

### Project Documentation

Additional documentation files for your reference:
- **PROJECT_COMPLETION_SUMMARY.md** - Detailed project status and features
- **SETUP_GUIDE.md** - How to set up and run the project locally
- **ARCHITECTURE.md** - System design, data flow, and technical architecture
- **VIDEO_SUBMISSION_GUIDE.md** - Complete guide for creating the submission video

### Video Submission

When creating your 5-8 minute video for Canvas, ensure you cover:
1. Overview of the project and collections
2. Display schemas for both collections
3. Demonstrate all CRUD operations in Swagger UI
4. Show error handling examples
5. Explain API documentation
6. Mention authentication implementation
7. Show Render deployment

See `VIDEO_SUBMISSION_GUIDE.md` for detailed instructions and script examples.

---

## Quick Links

| Resource | Link |
|----------|------|
| API Documentation | `/api-docs` |
| Contacts Dashboard | `/` |
| Companies Dashboard | `/companies` |
| GitHub Repository | [Link](https://github.com/nyashachimutapira/my-api) |
| Render Deployment | [Link](https://my-api-w7ii.onrender.com) |

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with GitHub OAuth
- **Documentation**: Swagger/OpenAPI 3.0
- **Session Management**: express-session with MongoDB store
- **Deployment**: Render

## License

ISC
