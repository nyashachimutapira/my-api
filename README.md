# Contacts & Companies API (Week 03)

Week 03 deliverable for the new CRUD project. The API now manages two MongoDB collections (`contacts` and `companies`), exposes fully documented CRUD routes, validates incoming data, and seeds demo data so the UI/tests never start empty.

## Feature Overview

- ✅ Two MongoDB collections with relationships (`contacts` reference `companies`)
- ✅ Contact documents contain 11 validated fields (requirement ≥ 7 fields)
- ✅ Fully functional CRUD routes for contacts and companies
- ✅ Centralized controllers + modular routers
- ✅ Swagger UI (`/api-docs`) covering every route & schema
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
   RENDER_URL=https://your-render-app.onrender.com # optional, used in Swagger
   ```
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
| POST | `/contacts` | Create contact (all fields validated) |
| PUT | `/contacts/:id` | Update contact |
| DELETE | `/contacts/:id` | Delete contact |
| GET | `/companies` | List companies |
| GET | `/companies/:id` | Get company |
| POST | `/companies` | Create company |
| PUT | `/companies/:id` | Update company |
| DELETE | `/companies/:id` | Delete company |
| GET | `/api-docs` | Interactive Swagger UI |

## Schemas

**Contact (11 required fields)**
- `firstName`, `lastName`, `email`, `phone`, `favoriteColor`, `birthday`,
  `jobTitle`, `company` (ObjectId), `street`, `city`, `country`
- Optional: `notes`

**Company**
- `name`, `industry`, `supportEmail`, `phone`, `hqCity`, `description`
- Optional: `website`

## Documentation & Testing

- Swagger UI: `http://localhost:3000/api-docs`
- Sample REST Client calls: `contacts.rest`
- Tests can be run via REST Client, Thunder Client, Postman, curl, etc.

## Deployment Notes

1. Push to GitHub and connect the repo to Render.
2. Create a new Render Web Service.
3. Add env vars (`MONGODB_URI`, `RENDER_URL` if desired). Render will set `PORT`.
4. Deploy & verify `/api-docs` plus CRUD routes remotely.

## Week 04 Preview

- Add OAuth-based authentication/authorization
- Harden security headers/middleware
- Record walkthrough video (5–8 min) covering rubric items
