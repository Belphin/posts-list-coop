const User = require("../models/User");

class UserController {
	async registration(req, res) {
		try {
			const { username, password } = req.body;
			const candidate = await User.findOne({ username });
			if (candidate) {
				return res.satus(400).json({ message: `User already registered` });
			}
			const user = new User({ username, password });
			await user.save();
			res.json({ message: "User was created" });
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) return res.status(400).json({ message: "User not found" });
			if (password !== user.password)
				return res.status(400).json({ message: "Incorrect login or password" });
			return res.json(user);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}
}

module.exports = new UserController();
