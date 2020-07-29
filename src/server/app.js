const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const createLocaleMiddleware = require('express-locale')
const logger = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const apiRouter = require('./api/index')
const indexRouter = require('./routes/index')
const app = express()

//middleware example
app.use((req, res, next) => {
  next()
})

app.use(logger('dev'))
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.json())
app.use(createLocaleMiddleware())
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, '../../dist/client'))) //靜態文件

app.use('/api', apiRouter)
app.use('/', indexRouter)

// passport config
const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// mongoose
mongoose.connect('mongodb://localhost:27017/rhea', (err) => {
  if (err) {
    console.log(err)
  }
  console.log('mongo connected')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
