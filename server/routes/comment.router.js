const Router = require("express");
const router = new Router();
const CommentController = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:id", authMiddleware, CommentController.create);
router.get("/:id", CommentController.getOne);
router.get("/page/:id", CommentController.getPage);

module.exports = router;
