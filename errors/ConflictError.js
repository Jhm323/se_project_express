class ConflictError extends Error {
  constructor(message = "Conflict. The resource already exists.") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  ConflictError,
};
