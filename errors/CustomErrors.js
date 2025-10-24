class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
// custom Errors

class BadRequestError extends Error {
  constructor(message = "Bad request. Please check your input.") {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized. Authentication required.") {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(
    message = "Forbidden. You do not have permission to perform this action."
  ) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = "Resource not found.") {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message = "Conflict. The resource already exists.") {
    super(message);
    this.statusCode = 409;
  }
}

class InternalServerError extends Error {
  constructor(message = "Internal server error. Please try again later.") {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
