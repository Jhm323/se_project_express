const ClothingItem = require("../models/clothingItem");
const {
  SUCCESS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// POST ITEM
const createItem = (req, res) => {
  console.log(req.body);

  const owner = req.user._id;

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner,
  })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from createItem" });
    });
};

// GET ITEM
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from getItems" });
    });
};

// DELETE ITEM
const deleteItem = (req, res) => {
  console.log(req.params.id);
  ClothingItem.findByIdAndDelete(req.params.id)
    //
    .orFail(() => {
      const error = new Error("Card Not Found");
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      if (err.statusCode) {
        return res
          .status(err.statusCode)
          .send({ message: " Document Not Found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// PATCH ITEM
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((items) => res.status(SUCCESS).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Card Not Found" });
      }
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: "Invalid parameter" });
    });
};

// ...DELETE/PUT/OR PATCH?
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((items) => res.status(SUCCESS).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Card Not Found" });
      }

      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid parameter" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from disLikeItem" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
