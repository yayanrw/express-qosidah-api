/* eslint-disable @typescript-eslint/no-explicit-any */
import { wrapResponse } from "./responseWrapper";
import HttpStatusCode from "../enum/http-status-code";
import { Response } from "express";
import { BadRequestError, NotFoundError } from "./exceptions";

export function handleError(res: Response, error: any) {
  if (error instanceof NotFoundError) {
    return wrapResponse<null>({
      res,
      error: error.errorType,
      message: error.message,
      data: null,
      statusCode: error.statusCode,
    });
  } else if (error instanceof BadRequestError) {
    return wrapResponse<null>({
      res,
      error: "BAD_REQUEST",
      message: error.message,
      data: null,
      statusCode: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    return wrapResponse<null>({
      res,
      error: "SERVER_ERROR",
      message: "Internal Server Error",
      data: null,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}
