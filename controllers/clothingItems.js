const ClothingItem = require("../models/clothingItem");
const {
  SUCCESS,
  NOT_FOUND_ERROR,
  FORBIDDEN_ERROR,
  handleDbError,
} = require("../utils/errors");

// CREATE ITEM
const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => handleDbError(err, res));
};

// GET ALL ITEMS
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch((err) => handleDbError(err, res));
};

// DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== currentUserId.toString()) {
        const error = new Error("Access denied");
        error.statusCode = FORBIDDEN_ERROR;
        throw error;
      }
      return item.deleteOne();
    })
    .then(() =>
      res.status(SUCCESS).send({ message: "Item deleted successfully" })
    )
    .catch((err) => handleDbError(err, res));
};

// LIKE ITEM
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => handleDbError(err, res));
};

// DISLIKE ITEM
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => handleDbError(err, res));
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
