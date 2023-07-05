import { Request, Response, NextFunction } from "express";
import ApiResponse from "../models/api_response";

declare global {
  namespace Express {
    interface Response {
      apiResponse: ({ error, message, data }: ApiResponse) => void;
    }
  }
}

const apiWrapResponse = (req: Request, res: Response, next: NextFunction) => {
  res.apiResponse = function ({
    error = null,
    message = null,
    data,
  }: ApiResponse): void {
    const response: ApiResponse = {
      error,
      message,
      data,
    };
    res.json(response);
  };
  next();
};

export default apiWrapResponse;
