require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const { default: mongoose } = require("mongoose");

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

async function start() {
	try {
		await mongoose.connect(DB_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		app.listen(PORT, () => console.log("SERVER STARTED ON PORT", PORT));
	} catch (e) {
		console.log(e);
	}
}

start();
