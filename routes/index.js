const router = require('express').Router();

// API routes
router.use('/contacts', require('./contactRoutes'));
router.use('/companies', require('./companyRoutes'));
router.use('/auth', require('./authRoutes'));

module.exports = router;
