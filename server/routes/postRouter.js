const Router = require("express");
const PostController = require("../controllers/PostController");
const router = new Router();

router.post("/", PostController.create);
router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.put("/", PostController.update);
router.delete("/:id", PostController.delete);

module.exports = router;
