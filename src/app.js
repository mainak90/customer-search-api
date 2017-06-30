const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const validationRoute = require('./routes/validation')
const customersRoute = require('./routes/customers')
const validator = require('express-validator')
const config = require('../config')
const port = process.env.PORT || config.port
const logger = require('./logger')
const morgan = require('morgan')
const cluster = require('cluster')

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    logger.warn('Worker %d died :(', worker.id)
    cluster.fork()
  })
} else {
  const app = express()

  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(validator())
  app.use(morgan('combined', {stream: logger.stream}))

  // app.use(validationRoute)

  const appRouter = express.Router()
  app.use('/customer-search', appRouter)
  appRouter.use('/customers', customersRoute)

  app.listen(port, () => logger.info(`customer-search app started on port ${port}!`))
}



