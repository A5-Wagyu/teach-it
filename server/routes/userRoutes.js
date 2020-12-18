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

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email);
  // console.log(password);

  const getEmailQuery = `SELECT * FROM Users WHERE email = '${email}'`;
  let userInfo;
  try {
    userInfo = await mysql.pool.query(getEmailQuery);
  } catch (err) { throw err; }
  // if email is not correct
  if (userInfo.length == 0) {
    res.send({ message: "Incorrect password or username" })
  }
  // if found email, check password
  try {
    const passwordMatch = await bcrypt.compare(password, userInfo[0].password);
    if (passwordMatch) {
      // if found password
      res.send("Logged In");
    } else {
      // if password not correct
      res.send({ message: "Incorrect password or username" });
    }
  } catch (err) {
    throw err;
  }
})

module.exports = router;