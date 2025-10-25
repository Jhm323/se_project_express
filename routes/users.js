const express = require("express");

const router = express.Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");

// Get authenticated user's info
router.get("/me", getCurrentUser);

// Update user's profile (name/avatar)
router.patch("/me", validateUserUpdate, updateProfile);

module.exports = router;
