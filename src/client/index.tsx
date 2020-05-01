import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import langData from '../utils/i18n-langs.js'
import App from '../components/app'

const startup = () => {
  return hydrate(
    <App Router={BrowserRouter} langData={langData} initialLang={navigator.language} />,
    document.getElementById('app-root')
  ) //client and server side rendering
}

startup()

if ((module as any).hot) {
  ;(module as any).hot.accept('../components/app', () => {
    startup()
  })
}
