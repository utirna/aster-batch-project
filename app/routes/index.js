const router = require("express").Router();

const userRouter = require("./UserRouter");
const adminRouter = require("./AdminRouter");
const apiRouter = require("./ApiRouter");

router.use("/", userRouter);
router.use("/admin", adminRouter);
router.use("/api", apiRouter);

module.exports = router;
