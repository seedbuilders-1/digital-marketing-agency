const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const testimonialController = require('../controllers/testimonialControllers');
const { authorizeRoles } = require('../middlewares/authenticate');

router.get('/', auth, testimonialController.getAlltestimonials);
router.post('/', auth, testimonialController.createTestimonial);
router.get('/:id', auth, testimonialController.getTestimonialById);
router.put('/:id', auth, testimonialController.updateTestimonial);
router.delete('/:id', auth, authorizeRoles('admin'), testimonialController.deleteTestimonial);

module.exports = router;

