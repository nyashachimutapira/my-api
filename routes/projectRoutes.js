const express = require('express');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { isAuthenticated: requireAuth } = require('../middleware/authentication');

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects
 *     description: Retrieve all projects with populated company and team lead information.
 *     responses:
 *       200:
 *         description: Successfully retrieved all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Server error
 */
router.get('/', getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get project by ID
 *     description: Retrieve a single project by their MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the project
 *     responses:
 *       200:
 *         description: Successfully retrieved project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getProjectById);

/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project
 *     description: Create a new project. Requires authentication.
 *     security:
 *       - githubAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: Project created successfully
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
router.post('/', requireAuth, createProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update a project
 *     description: Update an existing project. Requires authentication.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       204:
 *         description: Project updated successfully
 *       400:
 *         description: Bad request - invalid input or invalid references
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
router.put('/:id', requireAuth, updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete a project
 *     description: Delete an existing project. Requires authentication.
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the project
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, deleteProject);

module.exports = router;
