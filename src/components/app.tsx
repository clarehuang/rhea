import React, { SFC } from 'react'
import { Switch, Route, StaticRouterProps } from 'react-router'
import { BrowserRouterProps, BrowserRouter } from 'react-router-dom'
import { createI18n, I18nProvider } from 'react-simple-i18n'
import { Layout } from 'antd'
import Home from './home/home'
import About from './about/about'
import { SiderMenu } from './modules/siderMenu/sider'
import './main.less'

const { Footer, Content } = Layout

interface AppProps {
  initialLang: string
  langData: any
  Router: typeof BrowserRouter
  routerProps?: BrowserRouterProps | StaticRouterProps
}

const App: React.SFC<AppProps> = ({ langData, Router, routerProps, initialLang }) => {
  return (
    <I18nProvider i18n={createI18n(langData, { lang: initialLang })}>
      <Router {...routerProps}>
        <Layout>
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </Content>
          <SiderMenu />
        </Layout>
        <Footer>Footer</Footer>
      </Router>
    </I18nProvider>
  )
}

export default App
