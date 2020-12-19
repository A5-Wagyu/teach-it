const express = require("express");
const router = express.Router();
const util = require("util");
var mysql = require("../../server/db-config");

mysql.pool.query = util.promisify(mysql.pool.query);

router.get("/webinars", async (req, res) => {
	const sql = "SELECT * FROM `Webinars`";
	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getWebinarsById", async (req, res) => {
	const id = req.body.id;
	const sql = `SELECT * FROM \`Webinars\` WHERE \`id\`='${id}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getWebinarsByTopicId", async (req, res) => {
	const topicID = req.body.topicID;
	const sql = `SELECT * FROM \`Webinars\` WHERE \`topicID\`='${topicID}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getWebinarsBySubtopicId", async (req, res) => {
	const subTopicID = req.body.subTopicID;
	const sql = `SELECT * FROM \`Webinars\` WHERE \`subTopicID\`='${subTopicID}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getWebinarsByTitle", async (req, res) => {
	const title = req.body.title;
	const sql = `SELECT * FROM \`Webinars\` WHERE \`title\`='${title}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getWebinarsByDate", async (req, res) => {
	const date = req.body.date;
	const sql = `SELECT * FROM \`Webinars\` WHERE \`date\`='${date}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/getWebinarsByIsComplete", async (req, res) => {
	const isComplete = req.body.isComplete;
	const sql = `SELECT * FROM \`Webinars\` WHERE \`isComplete\`='${isComplete}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

router.post("/createWebinar", async (req, res) => {
	const id = req.body.id;
	let sql =
		"INSERT INTO `Webinars` (`title`, `date`, `startTime`, `endTime`, `topicID`, `subTopicID`,`description`,`learn`, `know`, `need`, `zoomLink`,`zoomPasscode`) VALUES  (?);";

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

module.exports = router;
