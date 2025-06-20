const router = require("express").Router();

const { createItem } = require("../controllers/clothingItems");

// create
router.post("/", createItem);

module.exports = router;
