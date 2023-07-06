/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestError, NotFoundError } from "routing-controllers";
import { wrapResponse } from "./responseWrapper";
import HttpStatusCode from "../enum/http-status-code";
import { Response } from "express";

export function handleError(res: Response, error: any) {
  if (error instanceof NotFoundError) {
    return wrapResponse<null>({
      res,
      error: "NOT_FOUND",
      message: error.message,
      data: null,
      statusCode: HttpStatusCode.NOT_FOUND,
    });
  } else if (error instanceof BadRequestError) {
    return wrapResponse<null>({
      res,
      error: "Bad Request Error",
      message: error.message,
      data: null,
      statusCode: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    return wrapResponse<null>({
      res,
      error: "Internal Server Error",
      message: "Internal Server Error",
      data: null,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}
