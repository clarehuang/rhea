import React, { SFC } from 'react'
import { Switch, Route, StaticRouterProps, StaticRouter } from 'react-router'
import { Link, BrowserRouterProps, BrowserRouter } from 'react-router-dom'
import Home from './home/home'
import About from './about/about'
import { Layout } from 'antd'
import './main.less'

const { Footer, Sider, Content } = Layout

interface AppProps {
  Router: typeof BrowserRouter
  routerProps?: BrowserRouterProps | StaticRouterProps
}

const App: React.SFC<AppProps> = ({ Router, routerProps }) => {
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
          <Link to="/">PLANNER</Link>
          <Link to="/about">About</Link>
        </Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Router>
  )
}

export default App
