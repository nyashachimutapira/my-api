const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * @swagger
 * /auth/github:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Redirect to GitHub for OAuth login
 *     description: Initiates GitHub OAuth flow
 *     responses:
 *       302:
 *         description: Redirect to GitHub login
 */
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     tags:
 *       - Auth
 *     summary: GitHub OAuth callback
 *     description: GitHub redirects here after user approves
 *     responses:
 *       302:
 *         description: Redirect to home page after successful login
 *       401:
 *         description: Authentication failed
 */
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current authenticated user
 *     description: Returns the currently authenticated user info
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 displayName:
 *                   type: string
 *       401:
 *         description: Not authenticated
 */
router.get('/me', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout
 *     description: Clears the session cookie
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Not authenticated
 */
router.post('/logout', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
