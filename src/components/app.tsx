import React from 'react'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './home/home'
import About from './about/about'
import { Layout } from 'antd'
import './main.less'

const { Footer, Sider, Content } = Layout

interface AppProps {
  Router: any
  routerProps?: any
}

const App: React.SFC<AppProps> = ({ Router, routerProps }) => {
  const { t } = useTranslation()
  return (
    <Router {...routerProps}>
      <Layout>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </Content>
        <Sider className="navbar-sider">
          <Link to="/">{t('nav.planner')}</Link>
          <Link to="/about">About</Link>
        </Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Router>
  )
}

export default App
