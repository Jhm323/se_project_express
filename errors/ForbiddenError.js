class ForbiddenError extends Error {
  constructor(
    message = "Forbidden. You do not have permission to perform this action."
  ) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = {
  ForbiddenError,
};
