const ClothingItem = require("../models/clothingItem");
const {
  SUCCESS,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// POST ITEM
const createItem = (req, res) => {
  console.log(req.body);

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
    .catch((e) => {
      if (err.name === "ValidationError") {
        //// send the 400 error
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from createItem" });
    });
};

// GET ITEM
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch((e) => {
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
    .catch((e) => {
      if (err.name === "CastError") {
        // send the 400 error
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from getItems" });
    });
};

// ...DELETE/PUT/ OR PATCH?
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((items) => res.status(SUCCESS).send(items))
    .catch((e) => {
      if (err.name === "CastError") {
        // send the 400 error
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from getItems" });
    });
};

// module.exports.createClothingItem = (req, res) => {
//   console.log(req.user._id); // _id will become accessible
// };

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
