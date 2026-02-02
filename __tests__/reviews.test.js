const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Review = require('../models/review');
const Company = require('../models/company');
const Contact = require('../models/contact');

describe('Reviews API - GET Endpoints', () => {
  let reviewId;
  let companyId;
  let contactId;

  beforeAll(async () => {
    const company = await Company.create({
      name: 'Test Company Reviews',
      industry: 'Tech',
      website: 'https://test.com',
      supportEmail: 'support@test.com',
      phone: '+1234567890',
      hqCity: 'NYC',
      description: 'Test company for reviews',
    });
    companyId = company._id;

    const contact = await Contact.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@test.com',
      phone: '+1234567890',
      favoriteColor: 'Green',
      birthday: new Date('1995-05-20'),
      jobTitle: 'Manager',
      company: companyId,
      street: '456 Oak Ave',
      city: 'LA',
      country: 'USA',
    });
    contactId = contact._id;

    const review = await Review.create({
      title: 'Great Company',
      content: 'Excellent service and support',
      rating: 5,
      company: companyId,
      reviewer: contactId,
    });
    reviewId = review._id;
  });

  afterAll(async () => {
    await Review.deleteMany({});
    await Contact.deleteMany({});
    await Company.deleteMany({});
    await mongoose.connection.close();
  });

  test('GET /reviews - should return all reviews with 200 status', async () => {
    const response = await request(app).get('/reviews');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /reviews/:id - should return a single review with 200 status', async () => {
    const response = await request(app).get(`/reviews/${reviewId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(reviewId.toString());
    expect(response.body.title).toBe('Great Company');
    expect(response.body.rating).toBe(5);
  });

  test('GET /reviews/:id - should return 404 for non-existent review', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/reviews/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Review not found');
  });

  test('GET /reviews/:id - should return 404 for invalid ID format', async () => {
    const response = await request(app).get('/reviews/invalidid');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Review not found');
  });
});
