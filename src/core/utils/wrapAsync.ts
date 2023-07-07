import { Request, Response } from "express";
import { handleError } from "./handleError";

export const wrapAsync = (
  fn: (req: Request, res: Response) => Promise<void>
) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      handleError(res, error);
    }
  };
};
