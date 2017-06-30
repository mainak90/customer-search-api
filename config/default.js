module.exports = {
  port: 5000,
  service: {
    cdbCustomer: {
      url: 'http://el3923.bc:8496/cdb-customer-provider'
    }
  },
  log: {
    file: {
      level: 'debug',
      filename: './logs/default-logs.log',
      handleExceptions: true,
      json: true,
      timestamp: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    },
    console: {
      level: 'debug',
      'handleExceptions': true,
      json: false,
      colorize: true,
      humanReadableUnhandledException: true,
      timestamp: true
    }
  }
}
