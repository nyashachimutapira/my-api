const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Contact = require('../models/contact');
const Company = require('../models/company');

describe('Contacts API - GET Endpoints', () => {
  let companyId;
  let contactId;

  beforeAll(async () => {
    // Create a test company
    const company = await Company.create({
      name: 'Test Company Contacts',
      industry: 'Tech',
      website: 'https://test.com',
      supportEmail: 'support@test.com',
      phone: '+1234567890',
      hqCity: 'NYC',
    });
    companyId = company._id;

    // Create a test contact
    const contact = await Contact.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      phone: '+1234567890',
      favoriteColor: 'Blue',
      birthday: new Date('1990-01-15'),
      jobTitle: 'Engineer',
      company: companyId,
      street: '123 Main St',
      city: 'NYC',
      country: 'USA',
    });
    contactId = contact._id;
  });

  afterAll(async () => {
    await Contact.deleteMany({});
    await Company.deleteMany({});
    await mongoose.connection.close();
  });

  test('GET /contacts - should return all contacts with 200 status', async () => {
    const response = await request(app).get('/contacts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /contacts/:id - should return a single contact with 200 status', async () => {
    const response = await request(app).get(`/contacts/${contactId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(contactId.toString());
    expect(response.body.firstName).toBe('John');
  });

  test('GET /contacts/:id - should return 404 for non-existent contact', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/contacts/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Contact not found');
  });

  test('GET /contacts/:id - should return 404 for invalid ID format', async () => {
    const response = await request(app).get('/contacts/invalidid');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Contact not found');
  });
});
