const SUCCESS = 200;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;
const DUPLICATE_ERROR = 11000;

// Database error handler
const handleDbError = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid data format" });
  }
  if (err.statusCode === NOT_FOUND_ERROR) {
    return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
  }
  if (err.statusCode === FORBIDDEN_ERROR) {
    return res.status(FORBIDDEN_ERROR).send({ message: "Access denied" });
  }
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "Server error occurred" });
};

module.exports = {
  SUCCESS,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  DUPLICATE_ERROR,
  handleDbError,
};
