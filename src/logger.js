const winston = require('winston')
const config = require('../config')
const logger = new winston.Logger()
logger.add(winston.transports.File, config.log.file)
logger.add(winston.transports.Console, config.log.console)
logger.exitOnError = false
logger.emit('ready')

logger.stream = {
  write: message => {
    logger.info(message)
  }
}

module.exports = logger


