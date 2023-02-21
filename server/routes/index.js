const Router = require("express");
const router = new Router();
const postRouter = require("./post.router");
const commentRouter = require("./comment.router");
const userRouter = require("./user.router");

router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/auth", userRouter);

module.exports = router;
