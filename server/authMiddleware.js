const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../.env" });
const util = require('util');
const mysql = require("./db-config");
mysql.pool.query = util.promisify(mysql.pool.query);

// verify JWT token
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if token is valid
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      console.log("Verifying token for protected route");
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    })
  } else {
    res.redirect('/login');
  }
}



// check current user 
const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Verifying token for user status");

  let user;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {

        console.log("Verifying error", err.message);
        res.locals.user = null;
        next();
      } else {
        console.log("decodedToken", decodedToken);
        try {
          user = await mysql.pool.query(`SELECT * FROM Users WHERE id = ?`, [decodedToken.id])

        } catch (err) {
          console.log(err.message);
        }
        res.locals.user = user[0];
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkAuth }
