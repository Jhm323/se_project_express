class BadRequestError extends Error {
  constructor(message = "Bad request. Please check your input.") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = {
  BadRequestError,
};
