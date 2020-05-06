import React, { SFC, useEffect } from 'react'
import { Switch, Route, StaticRouterProps } from 'react-router'
import { BrowserRouterProps, BrowserRouter, useLocation } from 'react-router-dom'
import { createI18n, I18nProvider } from 'react-simple-i18n'
import { Layout } from 'antd'
import { I18nType } from '../utils/i18n-langs'
import Planner from './planner/planner'
import Journal from './journal/journal'
import Settings from './settings/settings'
import Register from './register/register'
import { SiderMenu, Calendar } from './layout'
import './main.less'

const { Footer, Content } = Layout

interface AppProps {
  availableLang?: string[]
  fallbackLang?: string
  initialLang: string
  langData: I18nType
  Router: typeof BrowserRouter
  routerProps?: BrowserRouterProps | StaticRouterProps
  staticContext?: any
  location?: string
}
const App: React.SFC<AppProps> = ({
  langData,
  Router,
  routerProps,
  availableLang,
  fallbackLang,
  initialLang,
  staticContext,
  location,
}) => {
  console.log('click')
  initialLang = availableLang.includes(initialLang) ? initialLang : fallbackLang
  if (location) {
    console.log(location)
  } else {
    console.log(window.location.pathname)
  }
  const L = ({ comp }) => (
    <div>
      <SiderMenu />
      <Calendar />
      <comp />
    </div>
  )

  return (
    <I18nProvider i18n={createI18n(langData, { lang: initialLang })}>
      <Router {...routerProps}>
        <Layout>
          <Content className="main-container">
            <Switch>
              <Route exact path="/planner" render={() => <L comp={Planner} />} />
              <Route exact path="/journal" component={Journal} />
              <Route exact path="/settings" component={Settings} />
            </Switch>
          </Content>
          <Route exact path="/register" component={Register} />
        </Layout>
        <Footer className="main-footer">Footer</Footer>
      </Router>
    </I18nProvider>
  )
}

export default App
