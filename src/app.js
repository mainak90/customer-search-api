const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const customersRoute = require('./routes/customers')
const validator = require('express-validator')
const config = require('../config')
const port = process.env.PORT || config.port
const logger = require('./logger')
const morgan = require('morgan')
const validation = require('./middlewares/validation')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(validator())
app.use(morgan('combined', {stream: logger.stream}))

const appRouter = express.Router()
app.use('/customer-search', appRouter)
appRouter.use('/customers', customersRoute(validation))

app.listen(port, () => logger.info(`customer-search app started on port ${port}!`))
