const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/user', userRoute)

app.listen(port, () => console.log(`App listening on port ${port}!`))
