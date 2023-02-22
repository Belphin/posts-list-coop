const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(403).json({ message: "User not authorized" });
		}
		const decodedData = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decodedData;
		next();
	} catch (e) {
		console.log(e);
		return res.status(403).json({ message: "User not authorized" });
	}
};
