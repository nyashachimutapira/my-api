const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Project = require('../models/project');
const Company = require('../models/company');

describe('Projects API - GET Endpoints', () => {
  let projectId;
  let companyId;

  beforeAll(async () => {
    const company = await Company.create({
      name: 'Test Company Projects',
      industry: 'Tech',
      website: 'https://test.com',
      supportEmail: 'support@test.com',
      phone: '+1234567890',
      hqCity: 'NYC',
      description: 'Test company for projects',
    });
    companyId = company._id;

    const project = await Project.create({
      title: 'Website Redesign',
      description: 'Complete redesign of company website',
      company: companyId,
      startDate: new Date('2024-01-15'),
      budget: 50000,
    });
    projectId = project._id;
  });

  afterAll(async () => {
    await Project.deleteMany({});
    await Company.deleteMany({});
    await mongoose.connection.close();
  });

  test('GET /projects - should return all projects with 200 status', async () => {
    const response = await request(app).get('/projects');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /projects/:id - should return a single project with 200 status', async () => {
    const response = await request(app).get(`/projects/${projectId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(projectId.toString());
    expect(response.body.title).toBe('Website Redesign');
  });

  test('GET /projects/:id - should return 404 for non-existent project', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/projects/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Project not found');
  });

  test('GET /projects/:id - should return 404 for invalid ID format', async () => {
    const response = await request(app).get('/projects/invalidid');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Project not found');
  });
});
