const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND_ERROR } = require("../utils/errors");

router.use("/items", clothingItems);
router.use("/users", userRouter);
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found" });
});

module.exports = router;
