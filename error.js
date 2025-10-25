const { AppError } = require("./errors/AppError");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({
    message: "Internal server error. Please try again later.",
  });
};

module.exports = errorHandler;
