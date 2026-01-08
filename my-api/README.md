# Contacts & Companies API (Week 03)

Week 03 deliverable for the new CRUD project. The API now manages two MongoDB collections (`contacts` and `companies`), exposes fully documented CRUD routes, validates incoming data, and seeds demo data so the UI/tests never start empty.

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
