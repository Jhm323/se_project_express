const ClothingItem = require("../models/clothingItem");
const {
  SUCCESS,
  SUCCESS_MSG,
  CREATED,
  NOT_FOUND_MSG,
  FORBIDDEN_MSG,
} = require("../utils/errors");

const { ForbiddenError, NotFoundError } = require("../errors/CustomErrors");

// CREATE ITEM

const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided when creating item"));
      } else {
        next(err);
      }
    });
};

// GET ALL ITEMS
const getItems = (req, res, next) =>
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch((err) => next(err));

// DELETE ITEM
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        throw new NotFoundError(NOT_FOUND_MSG);
      }

      if (item.owner.toString() !== currentUserId.toString()) {
        throw new ForbiddenError(FORBIDDEN_MSG);
      }

      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.status(SUCCESS).send({ message: SUCCESS_MSG }))
    .catch((err) => next(err));
};

// LIKE ITEM
const likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // prevents duplicate likes
    { new: true }
  )
    .orFail(() => new NotFoundError(NOT_FOUND_MSG))
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => next(err));

// DISLIKE ITEM
const dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError(NOT_FOUND_MSG))
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => next(err));

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
