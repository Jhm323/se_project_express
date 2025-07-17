const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");

const auth = (req, res, next) => {
  // const token = req.cookeies.jwt;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: "Authorization Required" });
  }

  const token = authorization.replace("Bearer", JWT_SECRET);
  let payload;

  try {
    payload = isJWT.verify(token, "JWT_SECRET");
  } catch (err) {
    console.error(err);
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: "Authorization Required" });
  }

  req.user = payload;
  // assigning the payload to the request object

  return next();
  // sending the request to the next middleware
};

module.exports = auth;
