const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Helper Regex Patterns

const urlRegex = /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/[^\s]*)?$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hex24Regex = /^[a-fA-F0-9]{24}$/;

// 1. Validate Clothing Item

function validateClothingItem(body) {
  const errors = [];

  if (!body.name || typeof body.name !== "string") {
    errors.push("Item name is required and must be a string.");
  } else if (body.name.length < 2 || body.name.length > 30) {
    errors.push("Item name must be between 2 and 30 characters.");
  }

  if (!body.imageUrl || typeof body.imageUrl !== "string") {
    errors.push("Image URL is required and must be a string.");
  } else if (!urlRegex.test(body.imageUrl)) {
    errors.push("Image URL must be a valid URL.");
  }

  return errors;
}

// 2. Validate New User Info

function validateNewUser(body) {
  const errors = [];

  if (body.name && (body.name.length < 2 || body.name.length > 30)) {
    errors.push("User name must be between 2 and 30 characters if provided.");
  }

  if (!body.avatar || typeof body.avatar !== "string") {
    errors.push("Avatar is required and must be a string.");
  } else if (!urlRegex.test(body.avatar)) {
    errors.push("Avatar must be a valid URL.");
  }

  if (!body.email || typeof body.email !== "string") {
    errors.push("Email is required and must be a string.");
  } else if (!emailRegex.test(body.email)) {
    errors.push("Email must be a valid format.");
  }

  if (!body.password || typeof body.password !== "string") {
    errors.push("Password is required and must be a string.");
  }

  return errors;
}

// 3. Validate Login

function validateLogin(body) {
  const errors = [];

  if (!body.email || typeof body.email !== "string") {
    errors.push("Email is required and must be a string.");
  } else if (!emailRegex.test(body.email)) {
    errors.push("Email must be a valid format.");
  }

  if (!body.password || typeof body.password !== "string") {
    errors.push("Password is required and must be a string.");
  }

  return errors;
}

// 4. Validate MongoDB-style ID

function validateId(id) {
  if (!id || typeof id !== "string") {
    return ["ID is required and must be a string."];
  }
  if (!hex24Regex.test(id)) {
    return ["ID must be a 24-character hexadecimal string."];
  }
  return [];
}
