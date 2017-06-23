const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const validationRoute = require('./routes/validation')
const customersRoute = require('./routes/customers')
const validator = require('express-validator')
const app = express()
const config = require('../config')
const port = process.env.PORT || config.port

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(validator())

app.use(validationRoute.validate)
app.use('/customers', customersRoute)

app.listen(port, () => console.log(`customer-search started on port ${port}!`))
