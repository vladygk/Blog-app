const winston = require('winston');

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, service }) => {
        return `[${timestamp}] [${service}] [${level.toUpperCase()}] ${message}`;
      })
    ),
    defaultMeta: { service: 'blog-app-api' },
    transports: [
      new winston.transports.Console(),
    ],
  });

module.exports = logger;