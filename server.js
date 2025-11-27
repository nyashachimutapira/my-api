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

// Connect to MongoDB using connection string from .env
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI not set in .env');
  process.exit(1);
}

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.callbackURL_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Seed sample data for first-time setups so the UI never looks empty
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
      const companyMap = companies.reduce((acc, company) => {
        acc[company.name] = company._id;
        return acc;
      }, {});

      const contactsWithCompany = sampleContacts.map(contact => {
        const companyId = companyMap[contact.companyName];
        if (!companyId) {
          throw new Error(`Missing seed company for ${contact.companyName}`);
        }
        const { companyName, ...rest } = contact;
        return { ...rest, company: companyId };
      });

      await Contact.insertMany(contactsWithCompany);
      console.log(`🌱 Seeded ${sampleContacts.length} contacts`);
    }
  } catch (err) {
    console.error('❌ Failed to seed contacts:', err.message);
  }
}

async function startServer() {
  await connectToDatabase();
  await ensureSeedData();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts & Companies API',
      version: '1.0.0',
      description: 'Week 03 CRUD project with contacts + companies collections',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
      {
        url: process.env.RENDER_URL || 'https://your-render-app.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./server.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());
app.set('json spaces', 2);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route: API status
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Contacts & Companies API',
    docs: '/api-docs',
  });
});

app.use('/contacts', contactRoutes);
app.use('/companies', companyRoutes);

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - favoriteColor
 *         - birthday
 *         - jobTitle
 *         - company
 *         - street
 *         - city
 *         - country
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *         jobTitle:
 *           type: string
 *         company:
 *           type: string
 *           description: Company ObjectId
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         country:
 *           type: string
 *         notes:
 *           type: string
 *     Contact:
 *       allOf:
 *         - $ref: '#/components/schemas/ContactInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *     CompanyInput:
 *       type: object
 *       required:
 *         - name
 *         - industry
 *         - supportEmail
 *         - phone
 *         - hqCity
 *         - description
 *       properties:
 *         name:
 *           type: string
 *         industry:
 *           type: string
 *         website:
 *           type: string
 *           format: uri
 *         supportEmail:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         hqCity:
 *           type: string
 *         description:
 *           type: string
 *     Company:
 *       allOf:
 *         - $ref: '#/components/schemas/CompanyInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 */

startServer();
