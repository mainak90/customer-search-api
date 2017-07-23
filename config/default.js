module.exports = {
  port: 5000,
  service: {
    cdbCustomer: {
      url: 'http://el4168.ebc.local:8496/cdb-customer-provider'
    },
    installbase: {
      // url: 'http://jboss10021.bc:22081/installbase'
      // added temp UAT since ITT doesn't work
      url: 'http://jboss25021.ebc.local:22141/installbase'
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
