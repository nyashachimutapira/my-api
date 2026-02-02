const express = require('express');
const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const { isAuthenticated: requireAuth } = require('../middleware/authentication');

const router = express.Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews
 *     description: Retrieve all reviews with populated company and reviewer information.
 *     responses:
 *       200:
 *         description: Successfully retrieved all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Server error
 */
router.get('/', getReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get review by ID
 *     description: Retrieve a single review by their MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the review
 *     responses:
 *       200:
 *         description: Successfully retrieved review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getReviewById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create a new review
 *     description: Create a new review. Requires authentication.
 *     security:
 *       - githubAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *       400:
 *         description: Bad request - missing required fields or invalid references
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     tags:
 *       - Reviews
 *     summary: Update a review
 *     description: Update an existing review. Requires authentication.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       204:
 *         description: Review updated successfully
 *       400:
 *         description: Bad request - invalid input or invalid references
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.put('/:id', requireAuth, updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete a review
 *     description: Delete an existing review. Requires authentication.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the review
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, deleteReview);

module.exports = router;
