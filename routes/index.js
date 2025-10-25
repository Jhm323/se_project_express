const router = require("express").Router();

const auth = require("../middlewares/auth");
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../errors/NotFoundError");
const {
  validateLoginBody,
  validateUserBody,
} = require("../middlewares/validation");

// Auth (public) routes
router.post("/signin", validateLoginBody, login);
router.post("/signup", validateUserBody, createUser);

// Protected routes (auth middleware)
router.use("/items", clothingItemsRouter);
router.use("/users", auth, userRouter);

// Fallback route for undefined endpoints
router.use((_req, _res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
