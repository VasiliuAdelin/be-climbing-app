class ApiError extends Error {
  constructor(statusCode, message, errors, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (errors) {
      this.errors = errors;
    }
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
