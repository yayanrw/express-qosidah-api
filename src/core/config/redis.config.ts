import { createClient } from 'redis';
import logger from './logger.config';

const REDIS_HOST = process.env.REDIS_HOST || 'redis://localhost:6379';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 18991;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'password';
const REDIS_EXPIRE_TIMEOUT = Number(process.env.REDIS_EXPIRE_TIMEOUT) || 86400;

const redisClient = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('error', (err: Error) => {
  logger.error(`Redis client error: ${err}`);
});

const redisConnect = async () => {
  await redisClient.connect();
};

export { redisClient, redisConnect, REDIS_EXPIRE_TIMEOUT };
