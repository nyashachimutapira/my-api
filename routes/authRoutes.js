const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
  * @swagger
  * /auth/login:
  *   get:
  *     tags:
  *       - Auth
  *     summary: Redirect to GitHub OAuth login
  *     description: Shortcut route that redirects to GitHub OAuth
  *     responses:
  *       302:
  *         description: Redirect to GitHub
  */
router.get('/login', (req, res) => {
  res.redirect('/auth/github');
});

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
  * /auth/status:
  *   get:
  *     tags:
  *       - Auth
  *     summary: Get authentication status
  *     description: Returns current authentication status and user info
  *     responses:
  *       200:
  *         description: Current authentication status
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 authenticated:
  *                   type: boolean
  *                 user:
  *                   type: object
  *       401:
  *         description: Not authenticated
  */
router.get('/status', (req, res) => {
  if (req.user) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false, user: null });
  }
});

/**
  * @swagger
  * /auth/logout:
  *   get:
  *     tags:
  *       - Auth
  *     summary: Logout
  *     description: Logs out the user and clears the session
  *     responses:
  *       302:
  *         description: Redirect to home page after logout
  */
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('/');
  });
});

module.exports = router;
