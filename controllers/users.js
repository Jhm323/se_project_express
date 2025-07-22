const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  SUCCESS,
  BAD_REQUEST_ERROR,
  BAD_REQUEST_MSG,
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_MSG,
  NOT_FOUND_ERROR,
  NOT_FOUND_MSG,
  handleDbError,
  throwError,
} = require("../utils/errors");

// POST /signin
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleDbError(
      throwError("Email and password are required.", BAD_REQUEST_ERROR),
      res
    );
  }

  if (!validator.isEmail(email)) {
    return handleDbError(
      throwError("Invalid email format.", BAD_REQUEST_ERROR),
      res
    );
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch(() =>
      handleDbError(throwError(UNAUTHORIZED_MSG, UNAUTHORIZED_ERROR), res)
    );
};

// POST /users
const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (!email || !password) {
    return handleDbError(
      throwError("Email and password are required.", BAD_REQUEST_ERROR),
      res
    );
  }

  if (!validator.isEmail(email)) {
    return handleDbError(
      throwError("Invalid email format.", BAD_REQUEST_ERROR),
      res
    );
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
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      })
    )

    .catch((err) => {
      if (err.code === 11000) {
        return handleDbError(throwError("Email already exists.", 409), res);
      }
      return handleDbError(err, res);
    });
};

// GET /users
const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => handleDbError(err, res));

// GET /users/me
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail(() => throwError(NOT_FOUND_MSG, NOT_FOUND_ERROR))
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => handleDbError(err, res));
};

// PATCH /users/me
const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  if (!name && !avatar) {
    return handleDbError(throwError(BAD_REQUEST_MSG, BAD_REQUEST_ERROR), res);
  }

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => throwError(NOT_FOUND_MSG, NOT_FOUND_ERROR))
    .then((user) => res.send(user))
    .catch((err) => handleDbError(err, res));
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
