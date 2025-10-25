const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    message: "Internal server error. Please try again later.",
  });
};

module.exports = errorHandler;
