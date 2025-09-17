const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');

router.post('/refresh-token', authControllers.refreshToken)
router.post('/login', authControllers.login);
router.post('/register', userControllers.createUser);
router.post('/forgot-password', authControllers.forgot_password);
router.post('/resend-otp', authControllers.resend_otp);
router.post('/reset-password/:token/:id', authControllers.reset_password);
router.post('/verify-email/:id', authControllers.verify_email);
module.exports = router;

