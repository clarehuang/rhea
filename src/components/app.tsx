import React from 'react'
import { Switch, Route, StaticRouterProps } from 'react-router'
import { BrowserRouterProps, BrowserRouter } from 'react-router-dom'
import { createI18n, I18nProvider } from 'react-simple-i18n'
import { Provider } from 'react-redux'
import { Layout as AntLayout } from 'antd'
import { I18nType } from '../utils/i18n-langs'
import Todo from './todo/todo'
import Stories from './stories/stories'
import Profile from './profile/profile'
import Register from './users/register'
import { Layout } from './layout/layout'

import './main.less'
import { Store } from 'redux'

const { Content } = AntLayout

interface AppProps {
  availableLang?: string[]
  fallbackLang?: string
  initialLang: string
  langData: I18nType
  Router: typeof BrowserRouter
  routerProps?: BrowserRouterProps | StaticRouterProps
  store?: Store
}

const App: React.SFC<AppProps> = ({
  langData,
  Router,
  routerProps,
  availableLang,
  fallbackLang,
  initialLang,
  store,
}) => {
  initialLang = availableLang.includes(initialLang) ? initialLang : fallbackLang
  return (
    <I18nProvider i18n={createI18n(langData, { lang: initialLang })}>
      <Provider store={store}>
        <Router {...routerProps}>
          <AntLayout>
            <Content className="main-container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={(): JSX.Element => <h1>This is the Home Page</h1>}
                />
                <Route exact path="/todo" component={(): JSX.Element => <Layout Comp={Todo} />} />
                <Route
                  exact
                  path="/stories"
                  component={(): JSX.Element => <Layout Comp={Stories} />}
                />
                <Route
                  exact
                  path="/profile"
                  component={(): JSX.Element => <Layout Comp={Profile} />}
                />
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
