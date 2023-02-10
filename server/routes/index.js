const Router = require("express");
const router = new Router();
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");
const userRouter = require("./userRouter");

router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/auth", userRouter);

module.exports = router;
