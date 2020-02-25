import React, { Component } from 'react';
import { connect } from 'react-redux'
import './styles/App.css';
import { Switch, Route } from 'react-router-dom';
import Private from './containers/Private';
import Public from './containers/Public';
import { requestAuthStatus } from './store/actions/auth'

class App extends Component {
  state = {
    fetchingAuthStatus: true
  }

  componentDidMount() {
    this.props.requestAuthStatus();
  }

  componentDidUpdate(prevProps) {
    const { auth } = this.props
    if (prevProps.auth !== auth) {
      this.setState({
        fetchingAuthStatus: auth.loading
      })
    }
  }

  render() {
    const { auth } = this.props
    const { fetchingAuthStatus } = this.state
    return (
      <div className="App">{
        fetchingAuthStatus
          ? <p>Loading...</p>
          : (
            <Switch>
              <Route exact path="/(|login|signup)" component={Public} />
              <Private auth={auth} />
            </Switch>
          )
      }</div>
    );
  }
}

export default connect(({ auth }) => ({ auth }), { requestAuthStatus })(App);
