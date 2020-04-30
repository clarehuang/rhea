const createError = require('http-errors')
const i18next = require('i18next')
const middleware = require('i18next-http-middleware')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

i18next.use(middleware.LanguageDetector).init({
  preload: ['en'],
})

const indexRouter = require('./routes/index')

const app = express()

//middleware example
app.use((req, res, next) => {
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../dist/client'))) //靜態文件

app.use(
  middleware.handle(i18next, {
    ignoreRoutes: [], // or function(req, res, options, i18next) { /* return true to ignore */ }
  })
)
app.use('/', indexRouter)

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
