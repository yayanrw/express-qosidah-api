import { NextFunction, Request, Response } from "express";
import { wrapResponse } from "../core/utils/wrapResponse";
import { handleError } from "../core/utils/handleError";
import { getCache } from "../core/utils/redis.helper";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cachedData = await getCache(req.originalUrl);

    if (cachedData !== null) {
      wrapResponse({
        res,
        data: cachedData,
      });
      return;
    }

    next();
  } catch (error) {
    handleError(res, error);
  }
};
