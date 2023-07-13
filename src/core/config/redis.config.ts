import { createClient } from "redis";
import logger from "./logger.config";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const REDIS_EXPIRE_TIMEOUT = Number(process.env.REDIS_EXPIRE_TIMEOUT) || 86400;

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("connect", () => {
  logger.info("Redis client connected");
});

redisClient.on("error", (err: Error) => {
  logger.error(`Redis client error: ${err}`);
});

const redisConnect = async () => {
  await redisClient.connect();
};

export { redisClient, redisConnect, REDIS_EXPIRE_TIMEOUT };
