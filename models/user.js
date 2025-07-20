const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minlength: [2, "Name must be at least 2 characters."],
    maxlength: [30, "Name cannot exceed 30 characters."],
    trim: true,
  },
  avatar: {
    type: String,
    required: [true, "Avatar URL is required."],
    validate: {
      validator: validator.isURL,
      message: "You must enter a valid URL.",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "You must enter a valid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password must be at least 8 characters."],
    select: false,
  },
});

// Static method to authenticate user
userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
