const express = require("express");

const router = express.Router();

const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Use auth middleware
router.use(auth);

// Get all clothing items
router.get("/", getItems);

// Create a new clothing item
router.post("/", createItem);

// Like a clothing item
router.put("/:itemId/likes", likeItem);

// Remove a like (dislike) from a clothing item
router.delete("/:itemId/likes", dislikeItem);

// Delete a clothing item
router.delete("/:itemId", deleteItem);

module.exports = router;
