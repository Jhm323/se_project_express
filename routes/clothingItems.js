const router = require("express").Router();

const {
  createItem,
  getItems,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// create
router.post("/", createItem);

// read
router.get("/", getItems);

// update
router.put("/:id/likes", likeItem);

// delete item
router.delete("/:id", deleteItem);

// delete
router.delete("/:id/likes", dislikeItem);

module.exports = router;
