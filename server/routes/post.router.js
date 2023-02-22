const Router = require("express");
const router = new Router();
const PostController = require("../controllers/post.controller");
const authMiddleware = require("../middleware/authMiddleware");
const authorMiddleware = require("../middleware/authorMiddleware");

router.post("/", authMiddleware, PostController.create);
router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.put("/", authorMiddleware, PostController.update);
router.delete("/:id", authorMiddleware, PostController.delete);

module.exports = router;
