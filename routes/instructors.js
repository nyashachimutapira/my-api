const router = require('express').Router();

const getInstructorsController = require('../controllers/instructors');
//const auth = require('../middleware/authenticate.js');
const { isAuthenticated } = require('../middleware/authentication');

router.get('/', getInstructorsController.getInstructors);
router.get('/:id', getInstructorsController.getInstructor);
router.post('/', auth.isAuthenticated, validate.newInstructor, getInstructorsController.postInstructor);
router.put('/:id', auth.isAuthenticated, validate.newInstructor, getInstructorsController.putInstructor);
router.delete('/:id', getInstructorsController.deleteInstructor);

module.exports = router;