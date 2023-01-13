const { createLogger, transports, format } = require("winston");
// const ts=Date.now()
let today = new Date().toISOString().slice(0, 10)
const logger = createLogger({
  transports: [
    new transports.File({
      filename: `var/log/${today}/info.log`,
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});


module.exports = logger;
