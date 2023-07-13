/* eslint-disable @typescript-eslint/no-explicit-any */
import { REDIS_EXPIRE_TIMEOUT, redisClient } from "../config/redis.config";

const storeCache = async (key: string, value: any) => {
  await redisClient.setEx(key, REDIS_EXPIRE_TIMEOUT, JSON.stringify(value));
};

const getCache = async (key: string): Promise<any | null> => {
  const result = await redisClient.get(key);

  if (result) {
    return JSON.parse(result);
  }
  return null;
};

export { storeCache, getCache };
