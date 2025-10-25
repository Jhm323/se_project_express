class UnauthorizedError extends Error {
  constructor(message = "Unauthorized. Authentication required.") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = {
  UnauthorizedError,
};
