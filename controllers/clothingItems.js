const ClothingItem = require("../models/clothingItem");
const {
  SUCCESS,
  SUCCESS_MSG,
  FORBIDDEN_ERROR,
  FORBIDDEN_MSG,
  NOT_FOUND_ERROR,
  NOT_FOUND_MSG,
  handleDbError,
  throwError,
} = require("../utils/errors");

// CREATE ITEM
const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => handleDbError(err, res));
};

// GET ALL ITEMS
const getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch((err) => handleDbError(err, res));

// DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id;

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        throw throwError(NOT_FOUND_MSG, NOT_FOUND_ERROR);
      }

      if (item.owner.toString() !== currentUserId.toString()) {
        throw throwError(FORBIDDEN_MSG, FORBIDDEN_ERROR);
      }

      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.status(SUCCESS).send({ message: SUCCESS_MSG }))
    .catch((err) => handleDbError(err, res));
};

// LIKE ITEM
const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // prevents duplicate likes
    { new: true }
  )
    .orFail(() => throwError(NOT_FOUND_MSG, NOT_FOUND_ERROR))
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => handleDbError(err, res));

// DISLIKE ITEM
const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => throwError(NOT_FOUND_MSG, NOT_FOUND_ERROR))
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => handleDbError(err, res));

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
