/**
 * Data Import Script for Contacts
 * 
 * This script imports sample contact data into MongoDB.
 * Run this script after setting up your MongoDB connection:
 * node importData.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const sampleContacts = require('./data/sampleContacts');
const sampleCompanies = require('./data/sampleCompanies');
const Contact = require('./models/contact');
const Company = require('./models/company');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI not set in .env');
  process.exit(1);
}

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Contact.deleteMany({});
    await Company.deleteMany({});
    console.log('🗑️  Cleared existing contacts & companies');

    // Insert sample companies first
    const companyDocs = await Company.insertMany(sampleCompanies);
    console.log(`🏢 Inserted ${companyDocs.length} companies`);

    const companyMap = companyDocs.reduce((acc, company) => {
      acc[company.name] = company._id;
      return acc;
    }, {});

    // Insert contacts referencing the new company ids
    const contactPayload = sampleContacts.map(contact => {
      const companyId = companyMap[contact.companyName];
      if (!companyId) {
        throw new Error(`Missing company seed for ${contact.companyName}`);
      }
      const { companyName, ...rest } = contact;
      return { ...rest, company: companyId };
    });

    const result = await Contact.insertMany(contactPayload);
    console.log(`✅ Successfully imported ${result.length} contacts`);

    // Display imported contacts
    console.log('\n📋 Imported Contacts:');
    result.forEach(contact => {
      console.log(`  - ${contact.firstName} ${contact.lastName} (${contact.email})`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Data import completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error importing data:', err);
    process.exit(1);
  }
}

// Run the import
importData();

