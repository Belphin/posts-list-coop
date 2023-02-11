const Router = require("express");
const CommentController = require("../controllers/CommentController");
const router = new Router();

router.post("/:id", CommentController.create);
router.get("/:id", CommentController.getOne);
router.get("/list/:id", CommentController.getList);
router.get("/page/:id", CommentController.getPage);

module.exports = router;
