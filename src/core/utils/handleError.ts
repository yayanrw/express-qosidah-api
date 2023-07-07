/* eslint-disable @typescript-eslint/no-explicit-any */
import { wrapResponse } from "./responseWrapper";
import HttpStatusCode from "../enum/http-status-code";
import { Response } from "express";
import { BadRequestError, NotFoundError, ValidationError } from "./exceptions";

const errorMappings: { [key: string]: any } = {
  NotFoundError: NotFoundError,
  BadRequestError: BadRequestError,
  ValidationError: ValidationError,
};

export function handleError(res: Response, error: any) {
  let errorType = "ServerError";
  let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

  for (const key in errorMappings) {
    if (error instanceof errorMappings[key]) {
      errorType = key;
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
