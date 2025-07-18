const ClothingItem = require("../models/clothingItem");
const {
  SUCCESS,
  SUCCESS_MSG,
  FORBIDDEN_ERROR,
  FORBIDDEN_MSG,
  NOT_FOUND_ERROR,
  NOT_FOUND_MSG,
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
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MSG });
      }
      // Check if current user owns this item
      if (item.owner.toString() !== currentUserId.toString()) {
        return res.status(FORBIDDEN_ERROR).send({ message: FORBIDDEN_MSG });
      }
      // User owns the itme, proceed with deletion
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.status(SUCCESS).send({ message: SUCCESS_MSG }))
    .catch((err) => handleDbError(err, res));
};

// LIKE ITEM
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      then(() => res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MSG }));
    })
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => handleDbError(err, res));
};

// DISLIKE ITEM
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      then(() => res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MSG }));
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
