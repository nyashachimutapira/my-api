const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts & Companies API',
      version: '1.0.0',
      description: 'Week 03 CRUD REST API for managing contacts and companies with MongoDB and Express.js',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' },
      { url: process.env.RENDER_URL || 'https://your-render-app.onrender.com', description: 'Render server' },
    ],
    components: {
      securitySchemes: {
        githubAuth: {
          type: 'oauth2',
          description: 'GitHub OAuth 2.0 authentication',
          flows: {
            implicit: {
              authorizationUrl: 'https://github.com/login/oauth/authorize',
              scopes: {
                'user:email': 'Read user profile',
              },
            },
          },
        },
      },
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            phone: { type: 'string', example: '+263 771 000 111' },
            favoriteColor: { type: 'string', example: 'Blue' },
            birthday: { type: 'string', format: 'date', example: '1990-01-15' },
            jobTitle: { type: 'string', example: 'Software Engineer' },
            company: { type: 'object', example: { _id: '507f1f77bcf86cd799439012', name: 'Tech Corp' } },
            street: { type: 'string', example: '123 Main St' },
            city: { type: 'string', example: 'Harare' },
            country: { type: 'string', example: 'Zimbabwe' },
          },
          required: [
            'firstName','lastName','email','phone','favoriteColor','birthday','jobTitle','company','street','city','country'
          ],
        },
        ContactInput: {
          type: 'object',
          properties: {
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            phone: { type: 'string', example: '+263 771 000 111' },
            favoriteColor: { type: 'string', example: 'Blue' },
            birthday: { type: 'string', format: 'date', example: '1990-01-15' },
            jobTitle: { type: 'string', example: 'Software Engineer' },
            company: { type: 'string', example: '507f1f77bcf86cd799439012' },
            street: { type: 'string', example: '123 Main St' },
            city: { type: 'string', example: 'Harare' },
            country: { type: 'string', example: 'Zimbabwe' },
          },
          required: [
            'firstName','lastName','email','phone','favoriteColor','birthday','jobTitle','company','street','city','country'
          ],
        },
        Company: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            name: { type: 'string', example: 'Tech Corp' },
            website: { type: 'string', format: 'uri', example: 'https://techcorp.com' },
            phone: { type: 'string', example: '+263 242 700 500' },
          },
          required: ['name','website','phone'],
        },
        CompanyInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Tech Corp' },
            website: { type: 'string', format: 'uri', example: 'https://techcorp.com' },
            phone: { type: 'string', example: '+263 242 700 500' },
          },
          required: ['name','website','phone'],
        },
      },
    },
  },
  apis: ['./server.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
