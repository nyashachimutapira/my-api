const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const { isAuthenticated: requireAuth } = require('../middleware/authentication');

const router = express.Router();

// ============ GET ALL CONTACTS ============
/**
 * @swagger
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get all contacts
 *     description: Retrieve all contacts with their associated company information, sorted by last name then first name.
 *     responses:
 *       200:
 *         description: Successfully retrieved all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Server error
 */
router.get('/', getContacts);

// ============ GET CONTACT BY ID ============
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get contact by ID
 *     description: Retrieve a single contact by their MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Successfully retrieved contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getContactById);

// ============ CREATE CONTACT ============
/**
 * @swagger
 * /contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Create a new contact
 *     description: Create a new contact. Requires GitHub authentication. All fields are required.
 *     security:
 *       - githubAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *       400:
 *         description: Bad request - missing required fields or invalid company
 *       401:
 *         description: Unauthorized - GitHub authentication required
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, createContact);

// ============ UPDATE CONTACT ============
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     tags:
 *       - Contacts
 *     summary: Update a contact
 *     description: Update an existing contact. Requires GitHub authentication.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       400:
 *         description: Bad request - missing required fields or invalid company
 *       401:
 *         description: Unauthorized - GitHub authentication required
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.put('/:id', requireAuth, updateContact);

// ============ DELETE CONTACT ============
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete a contact
 *     description: Delete an existing contact. Requires GitHub authentication.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       401:
 *         description: Unauthorized - GitHub authentication required
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, deleteContact);

module.exports = router;
