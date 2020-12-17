const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const cors = require("cors");
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
var mysql = require("./db-config");

console.log("Testing Connection");
mysql.pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
	if (error) throw Error("Could not connect to DB!");
	if (results[0].solution == 2) {
		console.log("Connection GOOD!");
	} else {
		console.log("Connection BAD!");
	}
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Include routes


// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
	console.error(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.error(
			`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
		);
	});
} else {
	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

	// Answer API requests.
	app.get("/api", function (req, res) {
		res.set("Content-Type", "application/json");
		res.send('{"message":"Hello from the custom server!"}');
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get("*", function (request, response) {
		response.sendFile(
			path.resolve(__dirname, "../react-ui/build", "index.html")
		);
	});

	app.listen(PORT, function () {
		console.error(
			`Node ${
				isDev ? "dev server" : "cluster worker " + process.pid
			}: listening on port ${PORT}`
		);
	});
}
