require("dotenv").config({ path: "../.env" });
const jwt = require('jsonwebtoken');
const mysql = require("./db-config");
const util = require("util");
mysql.pool.query = util.promisify(mysql.pool.query);
const bcrypt = require('bcrypt');

/// Utility const
const saltRounds = 10;
const maxAge = 60 * 60 * 24; // 24 hours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
}



module.exports.signup_get = (req, res) => {
  // if (req.session.user) {
  //   res.send({
  //     loggedIn: true,
  //     user: req.session.user
  //   })
  // } else {
  //   res.send({
  //     loggedIn: false
  //   })
  // }
  res.send("Sign up page");
}
module.exports.login_get = (req, res) => {
  res.send('login page');
}

/////////////////////////////////////////
// POST Sign Up

module.exports.signup_post = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  let checkEmailRes;
  try {
    checkEmailRes = await mysql.pool.query(`SELECT email FROM Users WHERE email = ?`, [email]);
  } catch (err) {
    throw err;
  }
  // if email already exists
  if (checkEmailRes.length > 0) {
    res.status(201).json({ error: "This email is not available" });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const query = `INSERT INTO Users (name, email, password) VALUES ` +
      `('${name}', '${email}', '${hashedPassword}')`;
    try {
      // insert user to db
      const result = await mysql.pool.query(query);
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
    res.status(201).send("Insert done");
  }
}

///////////////////////////////////////////
// POST Log In

module.exports.login_post = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const getEmailQuery = `SELECT * FROM Users WHERE email = '${email}'`;
  let userInfo;
  try {
    userInfo = await mysql.pool.query(getEmailQuery);
    console.log(userInfo[0]);
  } catch (err) {
    throw err;
  }
  // if email is not correct
  if (userInfo.length == 0) {
    res.status(201).json({
      auth: false,
      error: "email or password is incorrect"
    })
  } else {

    // if found email, check password
    try {
      const passwordMatch = await bcrypt.compare(password, userInfo[0].password);
      if (passwordMatch) {

        // if found password, log user in
        const id = userInfo[0].id;
        const token = createToken(id);

        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000
        });

        // req.session.user = userInfo[0];
        res.status(201).json({
          // auth: true,
          token: token,
          userID: userInfo[0].id,
          userName: userInfo[0].name
        })
      } else {
        // if password not correct
        res.json({
          auth: false,
          error: "email or password is incorrect"
        })
      }
    } catch (err) {
      throw err;
    }
  }
}

///////////////////
// GET log out
module.exports.logout_get = (req, res) => {
  console.log("serving log out");
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({
    // auth: false,
    userID: '',
    userName: ''
  })
  res.redirect('/');
}