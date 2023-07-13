import "dotenv/config";
import dotenv from "dotenv";
import app from "./core/config/app.config";
import logger from "./core/config/logger.config";
import { redisConnect } from "./core/config/redis.config";

dotenv.config();
const port = process.env.PORT || 3000;

redisConnect();

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});
