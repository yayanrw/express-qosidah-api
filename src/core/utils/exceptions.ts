import HttpStatusCode from "../enum/http-status-code";

export class NotFoundError extends Error {
  statusCode: number;
  errorType: string;

  constructor(message: string) {
    super(message);
    this.errorType = "NOT_FOUND";
    this.statusCode = HttpStatusCode.NOT_FOUND;
    this.message = message;
  }
}

export class AuthenticationError extends Error {
  statusCode: number;
  errorType: string;

  constructor(message: string) {
    super(message);
    this.errorType = "UNAUTHENTICATED";
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
    this.message = message;
  }
}

export class AuthorizationError extends Error {
  statusCode: number;
  errorType: string;

  constructor(message: string) {
    super(message);
    this.errorType = "UNAUTHORIZED";
    this.statusCode = HttpStatusCode.FORBIDDEN;
    this.message = message;
  }
}

export class ValidationError extends Error {
  statusCode: number;
  errorType: string;

  constructor(message: string) {
    super(message);
    this.errorType = "VALIDATION_ERROR";
    this.statusCode = HttpStatusCode.UNPROCESSABLE;
    this.message = message;
  }
}

export class BadRequestError extends Error {
  statusCode: number;
  errorType: string;

  constructor(message: string) {
    super(message);
    this.errorType = "BAD_REQUEST";
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.message = message;
  }
}

export class ServerError extends Error {
  statusCode: number;
  errorType: string;

  constructor(message: string) {
    super(message);
    this.errorType = "SERVER_ERROR";
    this.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.message = message;
  }
}
