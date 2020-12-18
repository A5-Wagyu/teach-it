const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const util = require('util');
const mysql = require("./db-config");
require("dotenv").config({ path: "../.env" });
mysql.pool.query = util.promisify(mysql.pool.query);

function initialize(passport) {

  // authenticate user on log in
  const authenticateUser = async (email, password, done) => {

    const getUserQuery = `SELECT * FROM Users WHERE email = '${email}'`;
    let userInfo;
    try {
      userInfo = await mysql.pool.query(getUserQuery);
    } catch (err) { return done(err); }

    // if can't find the email
    if (userInfo.length == 0) {
      return done(null, false, req.flash('loginMessage', 'Email is not correct'));
    } else {
      // if found email, check password
      if (!bcrypt.compareSync(password, rows[0].password)) {
        return done(null, false, req.flash('loginMessage', 'Password is not correct'));
      }
      // if found email and password, return info
      return done(null, userInfo[0]);
    }


  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      res = await mysql.pool.query('SELECT * FROM Users WHERE id = ?', [id]);
    } catch (err) { return done(err) }
    return done(null, res[0]);

  });
}

module.exports = initialize;