import winston from "winston";
import util from "util";

const colorizer = winston.format.colorize({
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "cyan",
  },
});

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  const coloredLevel = colorizer.colorize(level, level.toUpperCase());
  const beautifiedMessage = util.inspect(message, { colors: true });
  return `${timestamp} ${coloredLevel}: ${beautifiedMessage}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
