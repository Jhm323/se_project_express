const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND_ERROR } = require("../utils/errors");

// Auth (public) routes
router.post("/signin", login);
router.post("/signup", createUser);

// Protected routes (auth middleware)
router.use("/items", auth, clothingItemsRouter);
router.use("/users", auth, userRouter);

// Fallback route for undefined endpoints
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Route not found" });
});

module.exports = router;
