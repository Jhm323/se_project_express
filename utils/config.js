require("dotenv").config();

const { JWT_SECRET, NODE_ENV = "development" } = process.env;

// Validate that JWT_SECRET exists
if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not defined in .env file. Please add it before starting the server."
  );
}

// Warn if using development in production
if (NODE_ENV === "production" && JWT_SECRET === "super-strong-secret") {
  console.warn(
    "WARNING: Using default JWT_SECRET in production. This is a security risk!"
  );
}

module.exports = {
  JWT_SECRET,
  NODE_ENV,
};
