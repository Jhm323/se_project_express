require("dotenv").config();

const { JWT_SECRET = "super-secret-secret", NODE_ENV = "development" } =
  process.env;

// Warn if using default secret in production
if (NODE_ENV === "production" && JWT_SECRET === "super-strong-secret") {
  console.warn(
    "WARNING: Using default JWT_SECRET in production. This is a security risk!"
  );
}

module.exports = {
  JWT_SECRET,
  NODE_ENV,
};
