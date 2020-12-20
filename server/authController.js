require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const mysql = require("./db-config");
const util = require("util");
const cookieParser = require("cookie-parser");
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


module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.body);
  console.log("Verifying token");
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.json({
          error: "user is not logged in",
          isAuthenticated: false
        });
      } else {
        console.log(decodedToken);
        res.json({
          isAuthenticated: true,
          userID: decodedToken.id,
        })
      }
    })
  } else {
    res.json({
      error: "user is not logged in",
      isAuthenticated: false
    })
  }
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
    res.json({ error: "This email is not available" });
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
    res.status(201).send();
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
      // isAuthenticated: false,
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


				res.cookie("jwt", token, {
					httpOnly: true,
					maxAge: maxAge * 1000,
				});


        // req.session.user = userInfo[0];
        // res.status(201).json({
        //   isAuthenticated: true,
        //   token: token,
        //   userID: userInfo[0].id,
        //   userName: userInfo[0].name
        // })
        res.status(201).send({
          jwt: token,
          userID: userInfo[0].id,
          userName: userInfo[0].name,
        });
      } else {
        // if password not correct
        res.json({
          // isAuthenticated: false,
          error: "email or password is incorrect"
        })
      }
    } catch (err) {
      throw err;
    }
  }
}


///////////////////
// POST log out
module.exports.logout_post = (req, res) => {

  console.log("serving log out");
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({
    isAuthenticated: false,
    userID: '',
    userName: ''
  })
}

