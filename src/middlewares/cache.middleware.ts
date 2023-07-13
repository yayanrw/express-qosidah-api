import { NextFunction, Request, Response } from "express";
import { redisClient } from "../core/config/redis.config";
import { wrapResponse } from "../core/utils/wrapResponse";
import { handleError } from "../core/utils/handleError";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await redisClient.connect();
    const cachedData = await redisClient.get(id);
    await redisClient.disconnect();

    if (cachedData !== null) {
      wrapResponse({
        res,
        data: JSON.parse(cachedData),
      });
      return;
    }

    next();
  } catch (error) {
    handleError(res, error);
  }
};
