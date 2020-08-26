import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import moment from 'moment'
import reducer from '../components/store'
import langData from '../utils/i18n-langs.js'
import App from '../components/app'

// TODO: fill up data structure
const store = createStore(reducer, {
  pickedDate: moment().format('MM-DD-YYYY'),
  tasks: [],
  blogs: [],
  activeForm: {},
  activeStatus: { value: '', _id: '' },
})

const startup = () => {
  return hydrate(
    <App
      Router={BrowserRouter}
      langData={langData}
      initialLang={navigator.language}
      fallbackLang={'en'}
      availableLang={['en', 'zh-TW']}
      store={store}
    />,
    document.getElementById('app-root')
  ) //client and server side rendering
}

startup()

if ((module as any).hot) {
  ;(module as any).hot.accept('../components/app', () => {
    startup()
  })
}
