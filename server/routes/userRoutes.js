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

router.post("/addUserGuest", async (req, res) => {
	const userID = req.body.userID;
	const webinarID = req.body.webinarID;
	const sql = `INSERT INTO \`UserRoleWebinarAssociations\` (\`userID\`, \`webinarID\`, \`roleID\`) VALUES ('${userID}', '${webinarID}', (SELECT \`id\` FROM \`Roles\` WHERE \`name\`='guest'))`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getUserGuest", async (req, res) => {
	const userID = req.body.userID;
	const webinarID = req.body.webinarID;
	const sql = `SELECT \`id\` FROM \`UserRoleWebinarAssociations\` WHERE \`userID\`='${userID}' AND \`webinarID\`='${webinarID}' AND \`roleID\`=(SELECT \`id\` FROM \`Roles\` WHERE \`name\`='guest')`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

module.exports = router;
