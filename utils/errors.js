// Error Codes
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;
const DUPLICATE_ERROR = 11000;

// Status Code Messages
const SUCCESS_MSG = "Request completed successfully.";
const CREATED_MSG = "Resource created successfully.";
const BAD_REQUEST_MSG = "Bad request. Please check your input.";
const UNAUTHORIZED_MSG = "Unauthorized. Authentication required.";
const FORBIDDEN_MSG =
  "Forbidden. You do not have permission to perform this action.";
const NOT_FOUND_MSG = "Resource not found.";
const CONFLICT_MSG = "Conflict. The resource already exists.";
const INTERNAL_SERVER_ERROR_MSG =
  "Internal server error. Please try again later.";
const DUPLICATE_ERROR_MSG = "Duplicate key error. This item already exists.";

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

const throwError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

module.exports = {
  SUCCESS,
  SUCCESS_MSG,
  CREATED,
  CREATED_MSG,
  BAD_REQUEST_ERROR,
  BAD_REQUEST_MSG,
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_MSG,
  FORBIDDEN_ERROR,
  FORBIDDEN_MSG,
  NOT_FOUND_ERROR,
  NOT_FOUND_MSG,
  CONFLICT_ERROR,
  CONFLICT_MSG,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MSG,
  DUPLICATE_ERROR,
  DUPLICATE_ERROR_MSG,
  throwError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
