const express = require('express');
const passport = require('passport');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user._id,
    provider: user.provider,
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    avatarUrl: user.avatarUrl,
    profileUrl: user.profileUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: OAuth login via GitHub
 */

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Redirect to GitHub for OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to GitHub
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback URL
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to success or failure path
 */
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/failure',
    successRedirect: process.env.CLIENT_REDIRECT_URL || '/auth/success',
  }),
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Auth state
 */
router.get('/me', (req, res) => {
  res.json({
    authenticated: Boolean(req.user),
    user: sanitizeUser(req.user),
  });
});

router.get('/success', requireAuth, (req, res) => {
  res.json({
    message: 'Login successful',
    user: sanitizeUser(req.user),
  });
});

router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'GitHub login failed' });
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 *       401:
 *         description: Not authenticated
 */
router.post('/logout', requireAuth, (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to logout' });
    }

    req.session.destroy(sessionErr => {
      if (sessionErr) {
        console.error(sessionErr);
        return res.status(500).json({ error: 'Failed to destroy session' });
      }
      res.clearCookie('connect.sid');
      return res.json({ message: 'Logged out' });
    });
  });
});

module.exports = router;

