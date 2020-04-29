const express = require('express')
const { createElement } = require('react')
const router = express.Router()
const { StaticRouter } = require('react-router')
const { renderToString } = require('react-dom/server')
const { Helmet } = require('react-helmet')
const App = require('../../../dist/server/app').default
const template = require('../template')
const assets = require('../../../dist/server/assets.json')

/* GET home page. */
router.get('/*', (req, res, next) => {
  const context = {
    userAgent: req.headers['user-agent'],
  }
  const appString = renderToString(
    createElement(App, {
      Router: StaticRouter,
      routerProps: {
        location: req.originalUrl,
        context,
      },
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
