const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { SUCCESS, CREATED, NOT_FOUND_MSG } = require("../utils/errors");

const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../errors/CustomErrors");

// POST /signin
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required."));
  }

  if (!validator.isEmail(email)) {
    return next(new BadRequestError("Invalid email format."));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError("Invalid email or password.")));
};

// POST /users
const createUser = (req, res, next) => {
  const { email, password, name, avatar } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required."));
  }

  if (!validator.isEmail(email)) {
    return next(new BadRequestError("Invalid email format."));
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        avatar,
      })
    )
    .then((user) =>
      res.status(CREATED).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      })
    )

    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists."));
      }
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Invalid data provided when creating user.")
        );
      }
      return next(err);
    });
};

// GET /users
const getUsers = (req, res, next) =>
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => next(err));

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail(() => new NotFoundError(NOT_FOUND_MSG))
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => next(err));
};

// PATCH /users/me
const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  if (!name && !avatar) {
    return next(
      new BadRequestError(
        "At least one field (name or avatar) must be provided."
      )
    );
  }

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError(NOT_FOUND_MSG))
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Invalid data provided when updating profile.")
        );
      }
      return next(err);
    });
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
