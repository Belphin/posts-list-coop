const UserService = require("../services/user.service");
const { validationResult } = require("express-validator");

class UserController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: "Registration error", errors });
			}
			const { username, password, role } = req.body;
			const token = await UserService.registration(username, password, role);
			res.json({ username, token });
		} catch (e) {
			console.log(e);
			res.status(400).send({ message: e.message });
		}
	}

	async login(req, res) {
		try {
			const { username, password, role } = req.body;
			const token = await UserService.login(username, password, role);
			return res.json({ username, token });
		} catch (e) {
			console.log(e);
			res.status(400).send({ message: e.message });
		}
	}
}

module.exports = new UserController();
