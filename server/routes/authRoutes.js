const express = require("express");
const router = express.Router();
const authController = require('../authController');

router.post('/logout', authController.logout_post);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/verifyToken', authController.verifyToken);
router.post('/verifyToken', authController.verifyToken);
module.exports = router;