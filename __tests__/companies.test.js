const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Company = require('../models/company');

describe('Companies API - GET Endpoints', () => {
  let companyId;

  beforeAll(async () => {
    const company = await Company.create({
      name: 'Tech Corp Test',
      industry: 'Technology',
      website: 'https://techcorp.com',
      supportEmail: 'support@techcorp.com',
      phone: '+1(555)123-4567',
      hqCity: 'San Francisco',
      description: 'Test company for company tests',
    });
    companyId = company._id;
  });

  afterAll(async () => {
    await Company.deleteMany({});
    await mongoose.connection.close();
  });

  test('GET /companies - should return all companies with 200 status', async () => {
    const response = await request(app).get('/companies');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /companies/:id - should return a single company with 200 status', async () => {
    const response = await request(app).get(`/companies/${companyId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(companyId.toString());
    expect(response.body.name).toBe('Tech Corp Test');
  });

  test('GET /companies/:id - should return 404 for non-existent company', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/companies/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Company not found');
  });

  test('GET /companies/:id - should return 404 for invalid ID format', async () => {
    const response = await request(app).get('/companies/invalidid');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Company not found');
  });
});
