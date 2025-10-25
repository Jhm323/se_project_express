class InternalServerError extends Error {
  constructor(message = "Internal server error. Please try again later.") {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  InternalServerError,
};
