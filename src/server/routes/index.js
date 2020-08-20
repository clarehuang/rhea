const express = require('express')
const { createElement } = require('react')
const router = express.Router()
const { StaticRouter } = require('react-router')
const { renderToString } = require('react-dom/server')
const { Helmet } = require('react-helmet')
const { createStore } = require('redux')
const App = require('../../../dist/server/app').default
const template = require('../template')
const assets = require('../../../dist/server/assets.json')

const langData = require('../../utils/i18n-langs')
const fallbackLang = 'en'
const availableLang = ['en', 'zh-TW']

/* GET home page. */
router.get('/*', (req, res, next) => {
  console.log('user', req.user)
  const context = {
    userAgent: req.headers['user-agent'],
  }
  const store = createStore(() => ({ tasks: [] }), { tasks: [] })
  const appString = renderToString(
    createElement(App, {
      Router: StaticRouter,
      routerProps: {
        context,
        location: req.originalUrl,
      },
      langData,
      store,
      initialLang: req.locale.toString(),
      fallbackLang,
      availableLang,
    })
  )
  const helmet = Helmet.renderStatic()

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url)
  }

  res.send(
    template({
      body: appString,
      titleTag: helmet.title.toString(),
      assets,
      isProd: process.env.NODE_ENV === 'production',
    })
  )
})

module.exports = router
