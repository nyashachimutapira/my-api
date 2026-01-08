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
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
}

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
const setupSwagger = require('./swagger');
setupSwagger(app);

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
