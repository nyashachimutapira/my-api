require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sampleContacts = require('./data/sampleContacts');
const sampleCompanies = require('./data/sampleCompanies');
const Contact = require('./models/contact');
const Company = require('./models/company');
const contactRoutes = require('./routes/contactRoutes');
const companyRoutes = require('./routes/companyRoutes');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

// ============ CORS (Required for Render) ============
app.use(cors());

// ============ Body Parsers ============
app.use(express.json());
app.set('json spaces', 2);

// ============ MongoDB Connection ============
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ ERROR: MONGODB_URI not set in .env');
  process.exit(1);
}

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

// ============ GitHub OAuth Setup ============
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Sessions for OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallbacksecret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ============ Seed Default Data ============
async function ensureSeedData() {
  try {
    const companyCount = await Company.estimatedDocumentCount();
    if (companyCount === 0) {
      await Company.insertMany(sampleCompanies);
      console.log(`🌱 Seeded ${sampleCompanies.length} companies`);
    }

    const contactCount = await Contact.estimatedDocumentCount();
    if (contactCount === 0) {
      const companies = await Company.find({});
      const companyMap = companies.reduce((acc, c) => {
        acc[c.name] = c._id;
        return acc;
      }, {});

      const contactsWithCompany = sampleContacts.map((contact) => {
        const companyId = companyMap[contact.companyName];
        const { companyName, ...rest } = contact;
        return { ...rest, company: companyId };
      });

      await Contact.insertMany(contactsWithCompany);
      console.log(`🌱 Seeded ${sampleContacts.length} contacts`);
    }
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  }
}

// ============ Swagger ============
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
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
            phone: {
              type: 'string',
              example: '+1234567890',
            },
            favoriteColor: {
              type: 'string',
              example: 'Blue',
            },
            birthday: {
              type: 'string',
              format: 'date',
              example: '1990-01-15',
            },
            jobTitle: {
              type: 'string',
              example: 'Software Engineer',
            },
            company: {
              type: 'object',
              example: { _id: '507f1f77bcf86cd799439012', name: 'Tech Corp' },
            },
            street: {
              type: 'string',
              example: '123 Gweru St',
            },
            city: {
              type: 'string',
              example: 'Gweru',
            },
            country: {
              type: 'string',
              example: 'Zimbabwe',
            },
          },
          required: [
            'firstName',
            'lastName',
            'email',
            'phone',
            'favoriteColor',
            'birthday',
            'jobTitle',
            'company',
            'street',
            'city',
            'country',
          ],
        },
        ContactInput: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              example: 'Tinashe',
            },
            lastName: {
              type: 'string',
              example: 'Chikowore',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'chikowore@gmail.com',
            },
            phone: {
              type: 'string',
              example: '+263 712 345 678',
            },
            favoriteColor: {
              type: 'string',
              example: 'Blue',
            },
            birthday: {
              type: 'string',
              format: 'date',
              example: '1990-01-15',
            },
            jobTitle: {
              type: 'string',
              example: 'Software Engineer',
            },
            company: {
              type: 'string',
              example: '507f1f77bcf86cd799439012',
            },
            street: {
              type: 'string',
              example: '23 Gweru St',
            },
            city: {
              type: 'string',
              example: 'Gweru',
            },
            country: {
              type: 'string',
              example: 'Zimbabwe',
            },
          },
          required: [
            'firstName',
            'lastName',
            'email',
            'phone',
            'favoriteColor',
            'birthday',
            'jobTitle',
            'company',
            'street',
            'city',
            'country',
          ],
        },
        Company: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439012',
            },
            name: {
              type: 'string',
              example: 'Tech Corp',
            },
            website: {
              type: 'string',
              format: 'uri',
              example: 'https://techcorp.com',
            },
            phone: {
              type: 'string',
              example: '+2634567890',
            },
          },
          required: ['name', 'website', 'phone'],
        },
        CompanyInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Tech Corp',
            },
            website: {
              type: 'string',
              format: 'uri',
              example: 'https://techcorp.com',
            },
            phone: {
              type: 'string',
              example: '+2634567890',
            },
          },
          required: ['name', 'website', 'phone'],
        },
      },
    },
  },
  apis: ['./server.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============ Root Route ============
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Contacts & Companies API',
    docs: '/api-docs',
  });
});

// ============ API Routes ============
app.use('/contacts', contactRoutes);
app.use('/companies', companyRoutes);

// ============ Start Server ============
async function startServer() {
  await connectToDatabase();
  await ensureSeedData();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
}

startServer();
