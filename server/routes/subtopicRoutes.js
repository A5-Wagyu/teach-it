const express = require("express");
const router = express.Router();
const util = require("util");
var mysql = require("../../server/db-config");

mysql.pool.query = util.promisify(mysql.pool.query);

router.get("/subtopics", async (req, res) => {
	const sql = "SELECT * FROM `Subtopics`";

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getSubtopicByName", async (req, res) => {
	const name = req.body.name;
	const sql = `SELECT * FROM \`Subtopics\` WHERE \`name\`='${name}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getSubtopicById", async (req, res) => {
	const id = req.body.id;
	const sql = `SELECT * FROM \`Subtopics\` WHERE \`id\`='${id}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getSubtopicByTopicId", async (req, res) => {
	const topicID = req.body.topicID;
	const sql = `SELECT * FROM \`Subtopics\` WHERE \`topicID\`='${topicID}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

module.exports = router;
