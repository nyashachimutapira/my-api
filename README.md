# Contacts API - Week 2 (Complete)

A RESTful API for managing contacts stored in MongoDB. This is the complete two-week project. The API now auto-seeds demo contacts the first time it connects to an empty database so the UI never looks blank.

## Features

- ✅ GET all contacts
- ✅ GET contact by ID
- ✅ POST create new contact (all fields required, returns ID)
- ✅ PUT update contact by ID
- ✅ DELETE contact by ID
- ✅ Swagger API documentation at `/api-docs`
- ✅ MongoDB integration
- ✅ Input validation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=3000
   RENDER_URL=https://your-render-app.onrender.com (optional, for Swagger)
   ```

3. Import sample data into MongoDB (optional – the server now auto-seeds if the collection is empty):
   ```bash
   node importData.js
   ```

4. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /` - Get all contacts
- `GET /contacts` - Get all contacts
- `GET /contacts/:id` - Get a contact by ID
- `POST /contacts` - Create a new contact (returns contact ID)
- `PUT /contacts/:id` - Update a contact by ID
- `DELETE /contacts/:id` - Delete a contact by ID
- `GET /api-docs` - Swagger API documentation

## Contact Schema

All fields are required:
- `firstName` (String)
- `lastName` (String)
- `email` (String, unique, validated)
- `favoriteColor` (String)
- `birthday` (Date)

## API Documentation

Visit `http://localhost:3000/api-docs` (or your Render URL + `/api-docs`) to view the interactive Swagger documentation.

## Testing

Use the `contacts.rest` file with REST Client extension in VS Code, or use Postman/Thunder Client.

## Deployment to Render

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Create a new Web Service
4. Set the following environment variables in Render:
   - `MONGODB_URI` - Your MongoDB connection string
   - `PORT` - Will be set automatically by Render
   - `RENDER_URL` - Your Render app URL (optional, for Swagger)
5. Deploy!

## Project Requirements Checklist

- ✅ Database stores: firstName, lastName, email, favoriteColor, and birthday
- ✅ Node project successfully connects to MongoDB
- ✅ API routes perform GET, POST, PUT, and DELETE requests
- ✅ API Documentation using Swagger is professional and comprehensive
- ✅ API is published to Render and can be called from external sources
