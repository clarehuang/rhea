import React, { Suspense } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '../components/app'

const BaseApp = () => {
  return (
    <Suspense fallback={<div>Still loading i18n...</div>}>
      <BrowserRouter>
        <App Router={BrowserRouter} />
      </BrowserRouter>
    </Suspense>
  )
}

const startup = () => {
  return hydrate(<BaseApp />, document.getElementById('app-root')) //client and server side rendering
}

startup()

if ((module as any).hot) {
  ;(module as any).hot.accept('../components/app', () => {
    startup()
  })
}
