const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, model, Types } = mongoose;

const clothingItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minlength: [2, "Name must be at least 2 characters."],
    maxlength: [30, "Name must be no more than 30 characters."],
    trim: true,
  },
  weather: {
    type: String,
    required: [true, "Weather type is required."],
    enum: {
      values: ["hot", "warm", "cold"],
      message: "Weather must be either hot, warm, or cold.",
    },
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required."],
    validate: {
      validator: validator.isURL,
      message: "You must provide a valid URL.",
    },
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Owner reference is required."],
  },
  likes: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

// Instance & Static Methods

// Instance: Check if user liked this item
clothingItemSchema.methods.isLikedByUser = function isLikedByUser(userId) {
  return this.likes.includes(userId);
};

// Static: Get items by weather type
clothingItemSchema.statics.findByWeather = function findByWeather(weather) {
  return this.find({ weather });
};

// Static: Get items liked by a specific user
clothingItemSchema.statics.findLikedByUser = function findLikedByUser(userId) {
  return this.find({ likes: userId });
};

module.exports = model("ClothingItem", clothingItemSchema);
