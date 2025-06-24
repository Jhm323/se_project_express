const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageURL,
  })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = res.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from deleteItem", e });
    });
};

const deleteItem = (req, res) => {
  console.log(itemId);
  ClothingItem.findByIdAndDelete(ItemId)
    .orFail()
    .then((item) => res.status(204).send({}));
};

// module.exports.likeItem = (req, res) =>
//   ClothingItem.findByIdAndUpdate(
//     req.params.itemId,
//     { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
//     { new: true }
//   );
// //...

// module.exports.dislikeItem = (req, res) =>
//   ClothingItem.findByIdAndUpdate(
//     req.params.itemId,
//     { $pull: { likes: req.user._id } }, // remove _id from the array
//     { new: true }
//   );
// //...

//  example error
// const createUser = (req, res) => {
//   User.create(...)    // arguments omitted
//     .then(...)        // handle successful request
//     .catch((err) => {
//       console.error(err);
//       if (err.name === 'SomeErrorName') {
//         return res.status(SOME_ERROR_CODE).send({ message: "Appropriate error message" })
//       } else {
//         // if no errors match, return a response with status code 500
//       }
//     });
// }

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
