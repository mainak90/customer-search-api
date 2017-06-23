module.exports = {
  log: {
    file: {
      level: 'debug',
      filename: '/app/node-apps/customer-search/logs/customer-search.log',
      handleExceptions: true,
      json: true,
      timestamp: true,
      maxsize: 5242880,
      maxFiles: 5,
      tailable: true,
      colorize: false
    },
    console: {
      level: 'info',
      'handleExceptions': true,
      json: false,
      colorize: true,
      humanReadableUnhandledException: true,
      timestamp: true
    }
  }
}