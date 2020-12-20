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
	const webinarID = req.body.webinarID;
	const userID = req.body.userID;
	const title = req.body.title;
	const date = req.body.date;
	const startTime = req.body.startTime;
	const endTime = req.body.endTime;
	const description = req.body.description;
	const learn = req.body.learn;
	const know = req.body.know;
	const need = req.body.need;
	const zoomLink = req.body.zoomLink;
	const zoomPasscode = req.body.zoomPasscode;
	const isComplete = req.body.isComplete;
	const topicID = req.body.topicID;
	const subTopicID = req.body.subTopicID;
	let createWebinarQuery;

	if (subTopicID == "") {
		createWebinarQuery = `INSERT INTO \`Webinars\` (\`title\`, \`date\`, \`startTime\`, 
														\`endTime\`, \`topicID\`, \`subTopicID\`,\`description\`,\`learn\`, 
														\`know\`, \`need\`, \`zoomLink\`,\`zoomPasscode\`, \`isComplete\`) 
														VALUES ('${title}', '${date}',  '${startTime}', '${endTime}', '${topicID}', 
														NULL, '${description}', '${learn}', '${know}', '${need}', 
														'${zoomLink}', '${zoomPasscode}', '${isComplete}') `;
	} else {
		createWebinarQuery = `INSERT INTO \`Webinars\` (\`title\`, \`date\`, \`startTime\`, 
															\`endTime\`, \`topicID\`, \`subTopicID\`,\`description\`,\`learn\`, 
															\`know\`, \`need\`, \`zoomLink\`,\`zoomPasscode\`, \`isComplete\`) 
															VALUES ('${title}', '${date}',  '${startTime}', '${endTime}', '${topicID}', 
															'${subTopicID}', '${description}', '${learn}', '${know}', '${need}', 
															'${zoomLink}', '${zoomPasscode}', '${isComplete}') `;
	}
	let createWebinar;

	// console.log(subTopicID);
	try {
		createWebinar = await mysql.pool.query(createWebinarQuery);
		console.log(createWebinar);
	} catch (err) {
		throw err;
	}

	let associacionQuery = `INSERT INTO \`UserRoleWebinarAssociations\` 
												(\`userID\`, \`roleID\`, \`webinarID\`) 
												VALUES ('${userID}', 1, 
												(SELECT \`id\` FROM \`Webinars\` WHERE \`id\`=LAST_INSERT_ID()))`;
	let association;
	try {
		association = await mysql.pool.query(associacionQuery);
	} catch (err) {
		throw err;
	}
	res.send({ createWebinar: createWebinar, association: association });
});

router.post("/getWebinarsByIsUserID", async (req, res) => {
	const id = req.body.subTopicID;

	const sql = `SELECT * FROM \`Webinars\`INNER JOIN \`UserRoleWebinarAssociations\` ON UserRoleWebinarAssociations.webinarID=Webinars.id
						INNER JOIN \`Roles\` ON Roles.id=UserRoleWebinarAssociations.roleID 
						WHERE Roles.name='host' AND UserRoleWebinarAssociations.userID='${id}'`;

	try {
		let results = await mysql.pool.query(sql);
		res.send(results);
	} catch (err) {
		throw err;
	}
});

module.exports = router;
