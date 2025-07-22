const express = require("express");
const auth = require("../middlewares/auth");

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

// Use auth middleware
router.use(auth);

// Create a new clothing item
router.post("/", createItem);

// Like a clothing item
router.put("/:itemId/likes", likeItem);

// Remove a like (dislike) from a clothing item
router.delete("/:itemId/likes", dislikeItem);

// Delete a clothing item
router.delete("/:itemId", deleteItem);

module.exports = router;
