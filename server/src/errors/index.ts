import { ValidationError } from 'express-validator';

/**
 * The base structure for every custom error in the app
 */
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

/**
 * Error caused by any invalid request body or params
 */
export class RequestValidationError extends CustomError {
  readonly statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super('Invalid request body or params');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}

/**
 * Generic error caused by any type of error from the user
 * in the requests
 */
export class BadRequestError extends CustomError {
  readonly statusCode = 400;

  constructor(private error: string) {
    super(`Bad request error: ${error}`);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.error }];
  }
}

/**
 * Error caused by a user trying to access resources
 * he should not access
 */
export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(
    private status: 401 | 403 = 401,
    private error: string = 'No tienes permisos para este recurso'
  ) {
    super('Not authorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);

    this.statusCode = status;
  }

  serializeErrors() {
    return [{ message: this.error }];
  }
}

/**
 * Error caused when a resource doesn't exist
 */
export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(private error: string) {
    super(error);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.error }];
  }
}
