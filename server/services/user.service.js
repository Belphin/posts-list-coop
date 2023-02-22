const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");

const generateAcessToken = (username, role) => {
	const payload = {
		username,
		role,
	};
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserService {
	async registration(username, password, userRole = "USER") {
		const candidate = await User.findOne({ username });
		if (candidate) {
			throw new Error("User already registered");
		}
		const hashPassword = bcrypt.hashSync(password, 7);
		const role = await Role.findOne({ value: userRole });
		if (!role) {
			throw new Error("Registration error");
		}
		const user = await User.create({
			username,
			password: hashPassword,
			role: role.value,
		});
		const token = generateAcessToken(user.username, role.value);
		return token;
	}

	async login(username, password) {
		const user = await User.findOne({ username });
		if (!user) {
			throw new Error("Incorrect login or password");
		}
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			throw new Error("Incorrect login or password");
		}
		const token = generateAcessToken(user.username, user.role);
		return token;
	}
}

module.exports = new UserService();
