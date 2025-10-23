const express = require("express");
const { celebrate, Joi } = require("celebrate");

const router = express.Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

// Validation schema for updating user info
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string()
      .uri()
      .pattern(/^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/)
      .required(),
  }),
});

// Get authenticated user's info
router.get("/me", getCurrentUser);

// Update user's profile (name/avatar)
router.patch("/me", validateUserUpdate, updateProfile);

module.exports = router;
