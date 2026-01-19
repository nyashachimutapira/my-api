const isAuthenticated = (req, res, next) => {
  // Allow demo mode via environment variable (for development/video demos)
  if (process.env.DEMO_MODE === 'true') {
    // Create a mock user for demo purposes
    req.user = { id: 'demo', username: 'demo-user', displayName: 'Demo User' };
    return next();
  }
  
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};

module.exports = { isAuthenticated };