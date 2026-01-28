const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middleware to setup Swagger API docs
const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      urls: [
        {
          url: `${process.env.API_BASE_URL || 'http://localhost:3000'}`,
          name: 'Local',
        },
      ],
    },
    customCss: '.topbar { display: none }',
    customSiteTitle: 'My API Documentation',
  }));
};

module.exports = setupSwaggerDocs;