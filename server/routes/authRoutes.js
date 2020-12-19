const express = require("express");
const router = express.Router();
const authController = require('../authController');
// require("dotenv").config({ path: "../../.env" });
// const mysql = require("../db-config");
// const util = require("util");
// mysql.pool.query = util.promisify(mysql.pool.query);


router.get('/signup', authController.signup_get);
router.get('/login', authController.login_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);


module.exports = router;