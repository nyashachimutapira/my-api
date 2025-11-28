const express = require('express');
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const { isAuthenticated: requireAuth } = require('../middleware/authentication');

const router = express.Router();

// ============ GET ALL COMPANIES ============
/**
 * @swagger
 * /companies:
 *   get:
 *     tags:
 *       - Companies
 *     summary: Get all companies
 *     description: Retrieve all companies, sorted alphabetically by name.
 *     responses:
 *       200:
 *         description: Successfully retrieved all companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       500:
 *         description: Server error
 */
router.get('/', getCompanies);

// ============ GET COMPANY BY ID ============
/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     tags:
 *       - Companies
 *     summary: Get company by ID
 *     description: Retrieve a single company by their MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the company
 *     responses:
 *       200:
 *         description: Successfully retrieved company
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getCompanyById);

// ============ CREATE COMPANY ============
/**
 * @swagger
 * /companies:
 *   post:
 *     tags:
 *       - Companies
 *     summary: Create a new company
 *     description: Create a new company. Requires GitHub authentication. Company name must be unique.
 *     security:
 *       - githubAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *       400:
 *         description: Bad request - invalid input or duplicate company name
 *       401:
 *         description: Unauthorized - GitHub authentication required
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, createCompany);

// ============ UPDATE COMPANY ============
/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     tags:
 *       - Companies
 *     summary: Update a company
 *     description: Update an existing company. Requires GitHub authentication. Company name must remain unique.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       204:
 *         description: Company updated successfully
 *       400:
 *         description: Bad request - invalid input or duplicate company name
 *       401:
 *         description: Unauthorized - GitHub authentication required
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.put('/:id', requireAuth, updateCompany);

// ============ DELETE COMPANY ============
/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     tags:
 *       - Companies
 *     summary: Delete a company
 *     description: Delete an existing company. Cannot delete a company that has assigned contacts. Requires GitHub authentication.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the company
 *     responses:
 *       204:
 *         description: Company deleted successfully
 *       400:
 *         description: Bad request - company has assigned contacts
 *       401:
 *         description: Unauthorized - GitHub authentication required
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, deleteCompany);

module.exports = router;
