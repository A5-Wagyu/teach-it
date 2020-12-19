const express = require("express");
const router = express.Router();
const util = require("util");
var mysql = require("../../server/db-config");

mysql.pool.query = util.promisify(mysql.pool.query);

router.get("/topics", async (req, res) => {
	const sql = "SELECT * FROM `Topics`";

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getTopicByName", async (req, res) => {
	const name = req.body.name;
	const sql = `SELECT * FROM \`Topics\` WHERE \`name\`='${name}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getTopicById", async (req, res) => {
	const id = req.body.id;
	const sql = `SELECT * FROM \`Topics\` WHERE \`id\`='${id}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getTopicIdByName", async (req, res) => {
	const name = req.body.name;
	const sql = `SELECT \`id\` FROM \`Topics\` WHERE \`name\`='${name}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});
module.exports = router;
