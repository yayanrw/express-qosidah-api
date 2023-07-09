/* eslint-disable @typescript-eslint/no-explicit-any */
import { wrapResponse } from "./wrapResponse";
import HttpStatusCode from "../enum/http-status-code";
import { Response } from "express";
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "./exceptions";

const errorMappings: { [key: string]: any } = {
  NotFoundError: NotFoundError,
  BadRequestError: BadRequestError,
  ValidationError: ValidationError,
  AuthenticationError: AuthenticationError,
  AuthorizationError: AuthorizationError,
  ConflictError: ConflictError,
};

export function handleError(res: Response, error: any) {
  let errorType = "ServerError";
  let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

  for (const key in errorMappings) {
    if (error instanceof errorMappings[key]) {
      errorType = error.errorType;
      statusCode = error.statusCode;
      break;
    }
  }

  return wrapResponse<null>({
    res,
    error: errorType,
    message: error.message,
    data: null,
    statusCode,
  });
}
