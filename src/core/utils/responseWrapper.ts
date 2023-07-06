import { Response } from "express";
import ApiResponse from "../interface/api_response";
import HttpStatusCode from "../enum/http-status-code";

export function wrapResponse<T>({
  res,
  error,
  message = "Success",
  data,
  statusCode,
}: {
  res: Response;
  error?: string;
  message: string;
  data: T;
  statusCode?: number;
}): void {
  const responseBody: ApiResponse<T> = {
    error: error !== undefined ? error : null,
    message,
    data,
  };

  res.status(statusCode || HttpStatusCode.OK).json(responseBody);
}
