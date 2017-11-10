if(process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}
const express = require('express')
const bodyParser = require('body-parser')
const busboyBodyParser = require('busboy-body-parser')

const passport = require('passport')
require('./config/passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const expressValidator = require('express-validator')

const app = express()
const port = process.env.PORT
const sessionSecret = process.env.SESSION_SECRET

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

if(process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())
app.use(expressValidator())
app.use(busboyBodyParser({limit: '5mb'}))

app.use(cookieParser())
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(require('./routes'))

app.listen(port)
