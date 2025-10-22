const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_MSG,
  throwError,
} = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throwError(UNAUTHORIZED_MSG, UNAUTHORIZED_ERROR);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    throwError(UNAUTHORIZED_MSG, UNAUTHORIZED_ERROR);
  }

  next();
};

module.exports = auth;
