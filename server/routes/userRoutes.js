const express = require('express');
const router = express.Router();
const util = require('util');
const mysql = require("../db-config");
mysql.pool.query = util.promisify(mysql.pool.query);
// for authentication
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const query = `INSERT INTO Users (name, email, password) VALUES ` +
    `('${name}', '${email}', '${hashedPassword}')`;
  try {
    // insert user to db
    const result = await mysql.pool.query(query);
    console.log(result);
  } catch (err) {
    throw err;
  }
  res.status(201).send("Insert done");
})

router.post('login', async (req, res) => {
  const getEmailQuery = `SELECT * FROM Users`
})

module.exports = router;