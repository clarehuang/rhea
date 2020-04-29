import React, { SFC } from 'react'
import { Switch, Route } from 'react-router'
// import { Link } from 'react-router-dom'
import Home from './home/home'
import About from './about/about'

interface AppProps {
  Router: any
  routerProps?: any
}

const App: SFC<AppProps> = ({ Router, routerProps }) => (
  <Router {...routerProps}>
    {/* <div>
      Header <Link to="/">Home</Link> <Link to="/about">About</Link>
    </div> */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </Switch>
  </Router>
)

export default App
