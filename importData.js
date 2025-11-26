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

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI not set in .env');
  process.exit(1);
}

// Define contact schema (same as server.js)
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  favoriteColor: { type: String, required: true, trim: true },
  birthday: { type: Date, required: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing contacts (optional - remove if you want to keep existing data)
    await Contact.deleteMany({});
    console.log('🗑️  Cleared existing contacts');

    // Insert sample contacts
    const result = await Contact.insertMany(sampleContacts);
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

