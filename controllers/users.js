const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  SUCCESS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  handleDbError,
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
      res.status(401).send({ message: "Invalid credentials" });
    });
};

// POST /users
const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash, // store the hashed password
        name,
        avatar,
      })
    )
    .then(({ email, password, name, avatar }) => {
      res.status(SUCCESS).send({ email, password, name, avatar }); // omit password from response
    })
    .catch((err) => handleDbError(err, res));
};

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
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => handleDbError(err, res));
};

// PATCH /users/me
const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  if (!name && !avatar) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Name or avatar must be provided." });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found." });
      }
      res.send(user);
    })
    .catch((err) => handleDbError(err, res));
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
