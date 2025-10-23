require("dotenv").config();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not set. Please add JWT_SECRET to your .env file."
  );
}

module.exports = {
  JWT_SECRET,
};
