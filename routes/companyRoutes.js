const express = require('express');
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const requireAuth = require('../middleware/authentication');

const router = express.Router();

// Public routes
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

// Protected routes (login required)
router.post('/', requireAuth, createCompany);
router.put('/:id', requireAuth, updateCompany);
router.delete('/:id', requireAuth, deleteCompany);

module.exports = router;
