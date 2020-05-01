const createError = require('http-errors')
const i18next = require('i18next')
const { initReactI18next } = require('react-i18next')
const i18nextMiddleware = require('i18next-http-middleware')
const Backend = require('i18next-fs-backend')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const en = require('../utils/locales/en/translation.json')
const zhTW = require('../utils/locales/zhTW/translation.json')

const resources = {
  en: {
    translation: en,
  },
  'zh-TW': {
    translation: zhTW,
  },
}

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // debug: true,
    backend: {
      // eslint-disable-next-line no-path-concat
      loadPath: __dirname + '../utils/locales/{{lng}}/{{ns}}.json',
      // eslint-disable-next-line no-path-concat
      addPath: __dirname + '../utils/locales/{{lng}}/{{ns}}.missing.json',
    },
    fallbackLng: 'en',
    keySeparator: false,
    preload: ['en', 'zh-TW'],
    saveMissing: true,
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

app.use(i18nextMiddleware.handle(i18next))
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
