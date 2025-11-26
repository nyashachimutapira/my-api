const express = require('express');
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Manage companies
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies
 *       500:
 *         description: Server error
 */
router.get('/', getCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company data
 *       404:
 *         description: Company not found
 */
router.get('/:id', getCompanyById);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       201:
 *         description: Company created
 *       400:
 *         description: Validation error
 */
router.post('/', createCompany);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       204:
 *         description: Company updated
 *       404:
 *         description: Company not found
 */
router.put('/:id', updateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Company deleted
 *       404:
 *         description: Company not found
 */
router.delete('/:id', deleteCompany);

module.exports = router;

