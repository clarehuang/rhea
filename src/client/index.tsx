import React, { Suspense } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '../components/app'
import { useSSR } from 'react-i18next'
import './i18n'

const startup = () => {
  useSSR(window.initialI18nStore, window.initialLanguage)
  return hydrate(
    <Suspense fallback={<div>Still loading i18n...</div>}>
      <App Router={BrowserRouter} />
    </Suspense>,
    document.getElementById('app-root')
  ) //client and server side rendering
}

startup()

if ((module as any).hot) {
  ;(module as any).hot.accept('../components/app', () => {
    startup()
  })
}
