const express = require("express");
const router = express.Router();
const util = require("util");
const mysql = require("../db-config");
require("dotenv").config({ path: "../../.env" });
mysql.pool.query = util.promisify(mysql.pool.query);
// for authentication
const session = require("express-session");
const flash = require("express-flash");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
// const initializePassport = require("./passport-config");
const passport = require("passport");
const initializePassport = require("../passport-config");

//// need to change in production
const session_key = "This is my very ultra secret key";

router.post("/getHostByWebinarID", async (req, res) => {
	const id = req.body.id;
	// const sql = `SELECT \`name\` FROM \`Users\` WHERE \`id\`=(SELECT \`userID\` FROM \`UserRoleWebinarAssociations\` WHERE \`webinarID\`='${webinarID}')`;
	const sql = `SELECT * FROM \`Users\` WHERE \`id\`=(SELECT \`userID\` FROM \`UserRoleWebinarAssociations\`
							WHERE \`webinarID\`='${id}' AND \`roleID\`=(SELECT \`id\` 
							FROM \`Roles\` WHERE \`name\`='host'))`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

// initializePassport(passport, async email => {
//   const getEmailQuery = `SELECT * FROM Users WHERE email = '${email}'`;
//   let userInfo;
//   try {
//     userInfo = await mysql.pool.query(getEmailQuery);
//   } catch (err) { throw err; }
//   return userInfo;
// })

// router.use(express.json());
// // create a cookie session
// router.use(cookieParser());
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(flash());
// router.use(session({
//   key: "userID",
//   secret: session_key,
//   resave: false,
//   saveUninitialized: false,
//   // cookie: {
//   //   expires: 60 * 60 * 24, // expires in 24 hours
//   // }
// }))
// route.use(passport.initialize());
// route.use(passport.session());

// // function to verify JWT token
// const verifyJWT = (req, res, next) => {
//   const token = req.headers["x-access-token"];
//   if (!token) res.send("Token not available");
//   else {
//     jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         res.ejson({
//           auth: false,
//           message: "User failed to authenticate"
//         })
//       } else {
//         req.userID = decoded.id;
//       }
//     })
//   }
// }

// // serve POST sign up page
// router.post('/signup', async (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//   const query = `INSERT INTO Users (name, email, password) VALUES ` +
//     `('${name}', '${email}', '${hashedPassword}')`;
//   try {
//     // insert user to db
//     const result = await mysql.pool.query(query);
//     console.log(result);
//   } catch (err) {
//     throw err;
//   }
//   res.status(201).send("Insert done");
// })

// // serve GET log in page
// router.get('/login', async (req, res) => {
//   if (req.session.user) {
//     res.send({
//       loggedIn: true,
//       user: req.session.user
//     })
//   } else {
//     res.send({
//       loggedIn: false
//     })
//   }

// })

// // serve POST log in page
// router.post('/login', async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const getEmailQuery = `SELECT * FROM Users WHERE email = '${email}'`;
//   let userInfo;
//   try {
//     userInfo = await mysql.pool.query(getEmailQuery);
//   } catch (err) { throw err; }
//   // if email is not correct
//   if (userInfo.length == 0) {
//     res.json({
//       auth: false,
//       message: "email or password is incorrect"
//     })
//   }
//   // if found email, check password
//   try {
//     const passwordMatch = await bcrypt.compare(password, userInfo[0].password);
//     if (passwordMatch) {

//       // if found password, log user in
//       const id = userInfo[0].id;
//       const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
//         expiresIn: 1800, // expires in 30 min
//       })

//       req.session.user = userInfo[0];
//       res.json({
//         auth: true,
//         token: token,
//         result: userInfo[0]
//       })
//     } else {
//       // if password not correct
//       res.json({
//         auth: false,
//         message: "email or password is incorrect"
//       })
//     }
//   } catch (err) {
//     throw err;
//   }
// })

module.exports = router;
