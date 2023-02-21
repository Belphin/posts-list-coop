const Router = require("express");
const router = new Router();
const UserController = require("../controllers/user.controller");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);

module.exports = router;
