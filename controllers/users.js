const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch(() => {
      throwError(UNAUTHORIZED_MSG, UNAUTHORIZED_ERROR);
    });
};

// POST /users
/* eslint-disable consistent-return */
const createUser = async (req, res) => {
  const { email, password, name, avatar } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
      name,
      avatar,
    });

    return res.status(SUCCESS).send({
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (err) {
    return handleDbError(err, res);
  }
};
/* eslint-enable consistent-return */

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => handleDbError(err, res));
};

// GET /users/me
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
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

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => throwError(NOT_FOUND_MSG, NOT_FOUND_ERROR))
    .then((user) => res.send(user))
    .catch((err) => handleDbError(err, res));
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
