const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const customersRoute = require('./routes/customers')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/customers', customersRoute)

app.listen(port, () => console.log(`App listening on port ${port}!`))
