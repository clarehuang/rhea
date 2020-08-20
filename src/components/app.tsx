import React from 'react'
import { Switch, Route, StaticRouterProps } from 'react-router'
import { BrowserRouterProps, BrowserRouter } from 'react-router-dom'
import { createI18n, I18nProvider } from 'react-simple-i18n'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Layout as AntLayout } from 'antd'
import { I18nType } from '../utils/i18n-langs'
import Planner from './planner/planner'
import Journal from './journal/journal'
import Settings from './settings/settings'
import Register from './register/register'
import { Layout } from './_layout/index'
import reducer from './store'
import './main.less'

const { Content } = AntLayout
const store = createStore(reducer)
console.log(store)

interface AppProps {
  availableLang?: string[]
  fallbackLang?: string
  initialLang: string
  langData: I18nType
  Router: typeof BrowserRouter
  routerProps?: BrowserRouterProps | StaticRouterProps
}

const App: React.SFC<AppProps> = ({
  langData,
  Router,
  routerProps,
  availableLang,
  fallbackLang,
  initialLang,
}) => {
  initialLang = availableLang.includes(initialLang) ? initialLang : fallbackLang

  return (
    <I18nProvider i18n={createI18n(langData, { lang: initialLang })}>
      <Provider store={store}>
        <Router {...routerProps}>
          <AntLayout>
            <Content className="main-container">
              <Switch>
                <Route exact path="/" component={() => <h1>This is the Home Page</h1>} />
                <Route exact path="/planner" component={() => <Layout Comp={Planner} />} />
                <Route exact path="/journal" component={() => <Layout Comp={Journal} />} />
                <Route exact path="/settings" component={() => <Layout Comp={Settings} />} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </Content>
          </AntLayout>
        </Router>
      </Provider>
    </I18nProvider>
  )
}

export default App
