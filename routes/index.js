const router = required("express").Router();

const userRouter = require("./users");

router.use("/users", userRouter);

module.exports = router;
