const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_MSG } = require("../utils/errors");
const { UnauthorizedError } = requre("../errors/UnautorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError(UNAUTHORIZED_MSG));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MSG));
  }

  return next();
};

module.exports = auth;
