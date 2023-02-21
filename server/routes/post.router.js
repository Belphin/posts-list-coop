const Router = require("express");
const router = new Router();
const PostController = require("../controllers/post.controller");

router.post("/", PostController.create);
router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.put("/", PostController.update);
router.delete("/:id", PostController.delete);

module.exports = router;
