const MysqlPoolBooster = require("mysql-pool-booster");
var mysql = require("mysql");
mysql = MysqlPoolBooster(mysql);
require("dotenv").config({ path: "./../.env" });

var pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	connectionLimit: 10,
	maxIdle: 1,
	multipleStatements: true,
});
module.exports.pool = pool;
