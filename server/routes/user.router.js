const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const UserController = require("../controllers/user.controller");

router.post(
	"/registration",
	[
		check(
			"username",
			"Username must be more than 4 and shorter than 16 characters"
		).isLength({ min: 4, max: 16 }),
		check(
			"password",
			"Password must be more than 4 and shorter than 16 characters"
		).isLength({ min: 4, max: 16 }),
	],
	UserController.registration
);
router.post("/login", UserController.login);

module.exports = router;
