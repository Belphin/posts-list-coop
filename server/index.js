import express from "express";

const app = express();
const PORT = 5000;

function start() {
	try {
		app.listen(PORT, () => console.log("SERVER STARTED ON PORT", PORT));
	} catch (e) {
		console.log(e);
	}
}

start();
