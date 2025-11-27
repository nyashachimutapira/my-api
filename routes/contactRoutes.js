const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const requireAuth = require('../middleware/authentication');

const router = express.Router();

// Public routes
router.get('/', getContacts);
router.get('/:id', getContactById);

// Protected routes (require GitHub login)
router.post('/', requireAuth, createContact);
router.put('/:id', requireAuth, updateContact);
router.delete('/:id', requireAuth, deleteContact);

module.exports = router;
