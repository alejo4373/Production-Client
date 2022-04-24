import { Link, Route, Switch } from 'react-router-dom'
import AuthContainer from './AuthContainer/AuthContainer'
import Landing from '../components/Landing'
import React from 'react'

const Public = () => {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link> <Link to="/signup">Signup</Link>
      </nav>
      <Switch>
        <Route path="/(login|signup)" component={AuthContainer} />
        <Route path="/" component={Landing} />
      </Switch>
    </>
  )
}

export default Public
