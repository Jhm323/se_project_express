const bcrypt = require("bcryptjs"); // importing bcrypt
const User = require("../models/user");
const {
  SUCCESS,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
} = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: "Invalid credentials" });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
        // adding the hash to the database
      })
    )
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      if (err.name === 11000) {
        return res
          .status(CONFLICT_ERROR)
          .send({ message: "Email Already Exists" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "The parameter is invalid" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });

  const updateProfile = (req, res) => {
    const { name, avatar } = req.body;
    // Get new data from the request body

    // Validate that at least one field is provided
    if (!name && !avatar) {
      return res
        .status(400)
        .send({ message: "Name or avatar must be provided." });
    }
    // Update the user in the database
    User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
        res.send(user);
        // Return the updated user object
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error." });
      });
  };
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
