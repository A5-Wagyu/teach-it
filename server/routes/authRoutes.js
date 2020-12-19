const express = require("express");
const router = express.Router();
const authController = require('../authController');

router.post('/logout', authController.logout_post);
// router.get('/signup', authController.signup_get);
// router.get('/login', authController.login_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);

module.exports = router;