const express = require("express");
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const { validateCardBody, validateId } = require("../middlewares/validation");

const router = express.Router();

// Get all clothing items
router.get("/", getItems);

// Use auth middleware
router.use(auth);

// Create a new clothing item
router.post("/", validateCardBody, createItem);

// Like a clothing item
router.put("/:itemId/likes", validateId, likeItem);

// Remove a like (dislike) from a clothing item
router.delete("/:itemId/likes", validateId, dislikeItem);

// Delete a clothing item
router.delete("/:itemId", validateId, deleteItem);

module.exports = router;
