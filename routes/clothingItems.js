const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Get all clothing items
router.get("/", getItems);

// Create a new clothing item
router.post("/", createItem);

// Like a clothing item
router.put("/:id/likes", likeItem);

// Remove a like (dislike) from a clothing item
router.delete("/:id/likes", dislikeItem);

// Delete a clothing item
router.delete("/:id", deleteItem);

module.exports = router;
