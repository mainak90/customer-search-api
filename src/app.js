const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const customersRoute = require('./routes/customers')
const app = express()
const config = require('../config')
const port = process.env.PORT || config.port

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/customers', customersRoute)

app.listen(port, () => console.log(`App listening on port ${port}!`))
