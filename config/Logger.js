const { createLogger, transports, format } = require("winston");
// const ts=Date.now()
const logger = createLogger({
  transports: [
    new transports.File({
      filename: `var/log/info.log`,
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
