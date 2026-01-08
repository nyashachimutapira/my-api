# AGENTS.md

## Commands
- `npm run dev` - Start development server with nodemon (hot reload)
- `npm start` - Start production server
- No test framework configured yet

## Architecture
Express.js REST API with MongoDB (Mongoose ODM) for contacts/companies management.
- **server.js** - Entry point: DB connection, middleware, OAuth, Swagger, routes
- **models/** - Mongoose schemas (Contact, Company, User)
- **controllers/** - Business logic (CRUD operations)
- **routes/** - Express route definitions with Swagger JSDoc annotations
- **data/** - Seed data for contacts/companies

## Code Style
- CommonJS modules (`require`/`module.exports`)
- Async/await for all async operations
- Error handling: throw errors with `statusCode` property, catch in controllers
- Mongoose validation in schemas; controller validation for required fields
- Use `trim: true`, `lowercase: true` in schema string fields
- Return 201 with `{ _id }` on create, 204 on update/delete
- Controllers export functions via `exports.functionName`
- Routes use camelCase file naming (e.g., `contactRoutes.js`)
