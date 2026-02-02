const swaggerUi = require('swagger-ui-express');

// Dynamically generate Swagger spec
const getSwaggerDocument = () => ({
  openapi: '3.0.0',
  info: {
    title: 'My API',
    description: 'API documentation for My API - Contacts and Companies Management',
    version: '1.0.0',
    contact: {
      name: 'API Support'
    }
  },
  servers: [
    {
      url: 'https://my-api-w7ii.onrender.com',
      description: 'Production server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  components: {
    schemas: {
      Contact: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '507f1f77bcf86cd799439011', description: 'MongoDB ObjectId' },
          firstName: { type: 'string', example: 'John', description: 'Contact\'s first name' },
          lastName: { type: 'string', example: 'Doe', description: 'Contact\'s last name' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com', description: 'Contact\'s email address' },
          phone: { type: 'string', example: '+1 (555) 123-4567', description: 'Contact\'s phone number' },
          favoriteColor: { type: 'string', example: 'Blue', description: 'Contact\'s favorite color' },
          birthday: { type: 'string', format: 'date-time', example: '1990-01-15T00:00:00.000Z', description: 'Contact\'s birthday' },
          jobTitle: { type: 'string', example: 'Software Engineer', description: 'Contact\'s job title' },
          company: { type: 'string', example: '507f1f77bcf86cd799439012', description: 'MongoDB ObjectId of associated company' },
          street: { type: 'string', example: '123 Main St', description: 'Street address' },
          city: { type: 'string', example: 'New York', description: 'City' },
          country: { type: 'string', example: 'USA', description: 'Country' },
          notes: { type: 'string', example: 'Important contact', description: 'Additional notes (max 500 characters)' },
          createdAt: { type: 'string', format: 'date-time', description: 'Contact creation timestamp' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Contact last update timestamp' }
        },
        required: ['_id', 'firstName', 'lastName', 'email', 'phone', 'favoriteColor', 'birthday', 'jobTitle', 'company', 'street', 'city', 'country']
      },
      ContactInput: {
        type: 'object',
        properties: {
          firstName: { type: 'string', example: 'John', description: 'Contact\'s first name' },
          lastName: { type: 'string', example: 'Doe', description: 'Contact\'s last name' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com', description: 'Contact\'s email address (must be unique)' },
          phone: { type: 'string', example: '+1 (555) 123-4567', description: 'Contact\'s phone number' },
          favoriteColor: { type: 'string', example: 'Blue', description: 'Contact\'s favorite color' },
          birthday: { type: 'string', format: 'date-time', example: '1990-01-15T00:00:00.000Z', description: 'Contact\'s birthday' },
          jobTitle: { type: 'string', example: 'Software Engineer', description: 'Contact\'s job title' },
          company: { type: 'string', example: '507f1f77bcf86cd799439012', description: 'MongoDB ObjectId of associated company (must exist)' },
          street: { type: 'string', example: '123 Main St', description: 'Street address' },
          city: { type: 'string', example: 'New York', description: 'City' },
          country: { type: 'string', example: 'USA', description: 'Country' },
          notes: { type: 'string', example: 'Important contact', description: 'Additional notes (max 500 characters)' }
        },
        required: ['firstName', 'lastName', 'email', 'phone', 'favoriteColor', 'birthday', 'jobTitle', 'company', 'street', 'city', 'country']
      },
      Company: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '507f1f77bcf86cd799439012', description: 'MongoDB ObjectId' },
          name: { type: 'string', example: 'Tech Corp', description: 'Company name (unique)' },
          industry: { type: 'string', example: 'Technology', description: 'Industry sector' },
          website: { type: 'string', example: 'https://techcorp.com', description: 'Company website URL' },
          supportEmail: { type: 'string', format: 'email', example: 'support@techcorp.com', description: 'Support email address' },
          phone: { type: 'string', example: '+1 (555) 987-6543', description: 'Company phone number' },
          hqCity: { type: 'string', example: 'San Francisco', description: 'Headquarters city' },
          description: { type: 'string', example: 'A leading technology company', description: 'Company description (max 500 characters)' },
          createdAt: { type: 'string', format: 'date-time', description: 'Company creation timestamp' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Company last update timestamp' }
        },
        required: ['_id', 'name', 'industry', 'website', 'supportEmail', 'phone', 'hqCity']
      },
      CompanyInput: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Tech Corp', description: 'Company name (must be unique)' },
          industry: { type: 'string', example: 'Technology', description: 'Industry sector' },
          website: { type: 'string', example: 'https://techcorp.com', description: 'Company website URL' },
          supportEmail: { type: 'string', format: 'email', example: 'support@techcorp.com', description: 'Support email address' },
          phone: { type: 'string', example: '+1 (555) 987-6543', description: 'Company phone number' },
          hqCity: { type: 'string', example: 'San Francisco', description: 'Headquarters city' },
          description: { type: 'string', example: 'A leading technology company', description: 'Company description (max 500 characters)' }
        },
        required: ['name', 'industry', 'website', 'supportEmail', 'phone', 'hqCity']
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Error message' },
          statusCode: { type: 'integer', description: 'HTTP status code' }
        }
      },
      Project: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '507f1f77bcf86cd799439011', description: 'MongoDB ObjectId' },
          title: { type: 'string', example: 'Website Redesign', description: 'Project title (unique)' },
          description: { type: 'string', example: 'Complete redesign of company website', description: 'Project description' },
          company: { type: 'string', example: '507f1f77bcf86cd799439012', description: 'MongoDB ObjectId of associated company' },
          status: { type: 'string', enum: ['Planning', 'In Progress', 'Completed', 'On Hold'], example: 'In Progress', description: 'Project status' },
          startDate: { type: 'string', format: 'date-time', example: '2024-01-15T00:00:00.000Z', description: 'Project start date' },
          endDate: { type: 'string', format: 'date-time', example: '2024-06-15T00:00:00.000Z', description: 'Project end date' },
          budget: { type: 'number', example: 50000, description: 'Project budget' },
          teamLead: { type: 'string', example: '507f1f77bcf86cd799439010', description: 'MongoDB ObjectId of team lead contact' },
          createdAt: { type: 'string', format: 'date-time', description: 'Project creation timestamp' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Project last update timestamp' }
        },
        required: ['_id', 'title', 'description', 'company', 'startDate', 'budget']
      },
      ProjectInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Website Redesign', description: 'Project title (unique)' },
          description: { type: 'string', example: 'Complete redesign of company website', description: 'Project description' },
          company: { type: 'string', example: '507f1f77bcf86cd799439012', description: 'MongoDB ObjectId of associated company (must exist)' },
          status: { type: 'string', enum: ['Planning', 'In Progress', 'Completed', 'On Hold'], example: 'Planning', description: 'Project status' },
          startDate: { type: 'string', format: 'date-time', example: '2024-01-15T00:00:00.000Z', description: 'Project start date' },
          endDate: { type: 'string', format: 'date-time', example: '2024-06-15T00:00:00.000Z', description: 'Project end date' },
          budget: { type: 'number', example: 50000, description: 'Project budget' },
          teamLead: { type: 'string', example: '507f1f77bcf86cd799439010', description: 'MongoDB ObjectId of team lead contact' }
        },
        required: ['title', 'description', 'company', 'startDate', 'budget']
      },
      Review: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '507f1f77bcf86cd799439011', description: 'MongoDB ObjectId' },
          title: { type: 'string', example: 'Great Company', description: 'Review title' },
          content: { type: 'string', example: 'Excellent service and support', description: 'Review content' },
          rating: { type: 'integer', example: 5, description: 'Rating from 1 to 5' },
          company: { type: 'string', example: '507f1f77bcf86cd799439012', description: 'MongoDB ObjectId of reviewed company' },
          reviewer: { type: 'string', example: '507f1f77bcf86cd799439010', description: 'MongoDB ObjectId of reviewer contact' },
          isPublished: { type: 'boolean', example: true, description: 'Review publication status' },
          createdAt: { type: 'string', format: 'date-time', description: 'Review creation timestamp' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Review last update timestamp' }
        },
        required: ['_id', 'title', 'content', 'rating', 'company', 'reviewer']
      },
      ReviewInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Great Company', description: 'Review title' },
          content: { type: 'string', example: 'Excellent service and support', description: 'Review content' },
          rating: { type: 'integer', example: 5, description: 'Rating from 1 to 5' },
          company: { type: 'string', example: '507f1f77bcf86cd799439012', description: 'MongoDB ObjectId of reviewed company (must exist)' },
          reviewer: { type: 'string', example: '507f1f77bcf86cd799439010', description: 'MongoDB ObjectId of reviewer contact (must exist)' },
          isPublished: { type: 'boolean', example: false, description: 'Review publication status' }
        },
        required: ['title', 'content', 'rating', 'company', 'reviewer']
      }
    },
    securitySchemes: {
      githubAuth: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            scopes: { 'user:email': 'Access user email' }
          }
        }
      }
    }
  },
  paths: {
    '/contacts': {
      get: {
        tags: ['Contacts'],
        summary: 'Get all contacts',
        description: 'Retrieve all contacts with pagination support.',
        parameters: [
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Number of contacts to return' },
          { in: 'query', name: 'skip', schema: { type: 'integer', default: 0 }, description: 'Number of contacts to skip' }
        ],
        responses: {
          200: {
            description: 'Successfully retrieved contacts',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Contact' } } } }
          },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      post: {
        tags: ['Contacts'],
        summary: 'Create a new contact',
        description: 'Create a new contact. Requires GitHub authentication.',
        security: [{ githubAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactInput' } } }
        },
        responses: {
          201: {
            description: 'Contact created successfully',
            content: { 'application/json': { schema: { type: 'object', properties: { _id: { type: 'string', example: '507f1f77bcf86cd799439011' } } } } }
          },
          400: { description: 'Bad request - invalid input or duplicate email', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - GitHub authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/contacts/{id}': {
      get: {
        tags: ['Contacts'],
        summary: 'Get contact by ID',
        description: 'Retrieve a single contact by their MongoDB ObjectId.',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the contact' }],
        responses: {
          200: { description: 'Successfully retrieved contact', content: { 'application/json': { schema: { $ref: '#/components/schemas/Contact' } } } },
          404: { description: 'Contact not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Contacts'],
        summary: 'Update a contact',
        description: 'Update an existing contact. Requires GitHub authentication. Email must remain unique.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the contact' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactInput' } } }
        },
        responses: {
          204: { description: 'Contact updated successfully' },
          400: { description: 'Bad request - invalid input or duplicate email', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - GitHub authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Contact not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Contacts'],
        summary: 'Delete a contact',
        description: 'Delete an existing contact. Requires GitHub authentication.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the contact' }],
        responses: {
          204: { description: 'Contact deleted successfully' },
          401: { description: 'Unauthorized - GitHub authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Contact not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/companies': {
      get: {
        tags: ['Companies'],
        summary: 'Get all companies',
        description: 'Retrieve all companies with pagination support.',
        parameters: [
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Number of companies to return' },
          { in: 'query', name: 'skip', schema: { type: 'integer', default: 0 }, description: 'Number of companies to skip' }
        ],
        responses: {
          200: {
            description: 'Successfully retrieved companies',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Company' } } } }
          },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      post: {
        tags: ['Companies'],
        summary: 'Create a new company',
        description: 'Create a new company. Requires GitHub authentication.',
        security: [{ githubAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CompanyInput' } } }
        },
        responses: {
          201: {
            description: 'Company created successfully',
            content: { 'application/json': { schema: { type: 'object', properties: { _id: { type: 'string', example: '507f1f77bcf86cd799439011' } } } } }
          },
          400: { description: 'Bad request - invalid input or duplicate company name', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - GitHub authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/companies/{id}': {
      get: {
        tags: ['Companies'],
        summary: 'Get company by ID',
        description: 'Retrieve a single company by their MongoDB ObjectId.',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the company' }],
        responses: {
          200: { description: 'Successfully retrieved company', content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } } },
          404: { description: 'Company not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Companies'],
        summary: 'Update a company',
        description: 'Update an existing company. Requires GitHub authentication. Company name must remain unique.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the company' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CompanyInput' } } }
        },
        responses: {
          204: { description: 'Company updated successfully' },
          400: { description: 'Bad request - invalid input or duplicate company name', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - GitHub authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Company not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Companies'],
        summary: 'Delete a company',
        description: 'Delete an existing company. Cannot delete a company that has assigned contacts. Requires GitHub authentication.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the company' }],
        responses: {
          204: { description: 'Company deleted successfully' },
          400: { description: 'Bad request - company has assigned contacts', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - GitHub authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Company not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/projects': {
      get: {
        tags: ['Projects'],
        summary: 'Get all projects',
        description: 'Retrieve all projects with populated company and team lead information.',
        responses: {
          200: { description: 'Successfully retrieved all projects', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Project' } } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      post: {
        tags: ['Projects'],
        summary: 'Create a new project',
        description: 'Create a new project. Requires authentication.',
        security: [{ githubAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProjectInput' } } }
        },
        responses: {
          201: { description: 'Project created successfully', content: { 'application/json': { schema: { type: 'object', properties: { _id: { type: 'string' } } } } } },
          400: { description: 'Bad request - invalid input or references', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/projects/{id}': {
      get: {
        tags: ['Projects'],
        summary: 'Get project by ID',
        description: 'Retrieve a single project by their MongoDB ObjectId.',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the project' }],
        responses: {
          200: { description: 'Successfully retrieved project', content: { 'application/json': { schema: { $ref: '#/components/schemas/Project' } } } },
          404: { description: 'Project not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Projects'],
        summary: 'Update a project',
        description: 'Update an existing project. Requires authentication.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the project' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProjectInput' } } }
        },
        responses: {
          204: { description: 'Project updated successfully' },
          400: { description: 'Bad request - invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Project not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Projects'],
        summary: 'Delete a project',
        description: 'Delete an existing project. Requires authentication.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the project' }],
        responses: {
          204: { description: 'Project deleted successfully' },
          401: { description: 'Unauthorized - authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Project not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/reviews': {
      get: {
        tags: ['Reviews'],
        summary: 'Get all reviews',
        description: 'Retrieve all reviews with populated company and reviewer information.',
        responses: {
          200: { description: 'Successfully retrieved all reviews', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Review' } } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      post: {
        tags: ['Reviews'],
        summary: 'Create a new review',
        description: 'Create a new review. Requires authentication.',
        security: [{ githubAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ReviewInput' } } }
        },
        responses: {
          201: { description: 'Review created successfully', content: { 'application/json': { schema: { type: 'object', properties: { _id: { type: 'string' } } } } } },
          400: { description: 'Bad request - invalid input or references', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/reviews/{id}': {
      get: {
        tags: ['Reviews'],
        summary: 'Get review by ID',
        description: 'Retrieve a single review by their MongoDB ObjectId.',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the review' }],
        responses: {
          200: { description: 'Successfully retrieved review', content: { 'application/json': { schema: { $ref: '#/components/schemas/Review' } } } },
          404: { description: 'Review not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Reviews'],
        summary: 'Update a review',
        description: 'Update an existing review. Requires authentication.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the review' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ReviewInput' } } }
        },
        responses: {
          204: { description: 'Review updated successfully' },
          400: { description: 'Bad request - invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized - authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Review not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Reviews'],
        summary: 'Delete a review',
        description: 'Delete an existing review. Requires authentication.',
        security: [{ githubAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the review' }],
        responses: {
          204: { description: 'Review deleted successfully' },
          401: { description: 'Unauthorized - authentication required', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Review not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    }
  }
});

// Middleware to setup Swagger API docs
const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(getSwaggerDocument(), {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: '.topbar { display: none }',
    customSiteTitle: 'My API Documentation',
  }));
};

module.exports = setupSwaggerDocs;