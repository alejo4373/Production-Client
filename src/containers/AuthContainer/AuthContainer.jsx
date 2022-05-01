import './AuthContainer.css'
import { REQUEST_AUTH_LOGIN, REQUEST_AUTH_SIGNUP } from '../../store/actionTypes/auth'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../../components/Auth/LoginForm'
import ReCAPTCHA from 'react-google-recaptcha'
import React, { Component } from 'react'
import SignupForm from '../../components/Auth/SignupForm'
import Spacer from '../../components/shared/Spacer/Spacer'

export class AuthContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      humanVerified: false,
      recaptchaToken: '',
      message: ''
    }
  }

  handleSubmit = (e, isSignUpRoute) => {
    e.preventDefault()
    if (this.state.humanVerified) {
      if (isSignUpRoute) {
        this.props.signupUser(this.state)
      } else {
        this.props.loginUser(this.state)
      }
    } else {
      this.setState({
        message: 'Please verify that you are not a robot and try again.'
      })
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleCaptcha = token => {
    if (token) {
      this.setState({
        message: 'You can now log',
        humanVerified: true,
        recaptchaToken: token
      })
    } else {
      this.setState({
        humanVerified: false,
        recaptchaToken: '',
        message: 'Human verification expired, please indicate you are not a robot again'
      })
    }
  }

  handleCaptchaError = err => {
    this.setState({
      humanVerified: false,
      recaptchaToken: '',
      message: 'There was an error. Please check your network and try again later'
    })
  }

  componentDidUpdate(prevProps) {
    const { auth, location } = this.props
    if (prevProps.auth !== auth) {
      if (auth.error) {
        this.setState({
          message: auth.error
        })
      }
    }

    // Clear errors when changing routes
    if (prevProps.location.pathname !== location.pathname) {
      this.setState({ message: '' })
    }
  }

  renderLoginForm = () => {
    const { username, password } = this.state
    return (
      <LoginForm
        username={username}
        password={password}
        handleChange={this.handleChange}
      />
    )
  }

  renderSignupForm = () => {
    const { username, password, email } = this.state
    return (
      <SignupForm
        username={username}
        password={password}
        email={email}
        handleChange={this.handleChange}
      />
    )
  }

  render() {
    const { history, location, auth } = this.props
    const { message } = this.state
    const { referrer } = location.state || { referrer: '/profile' }
    const isSignUpRoute = location.pathname === '/signup'
    if (auth.loggedIn) {
      history.replace(referrer)
    }

    return (
      <form onSubmit={e => this.handleSubmit(e, isSignUpRoute)} className="auth-form">
        {location.state && location.state.referrer ? (
          <p> You need to log in to go there </p>
        ) : null}
        <Switch>
          <Route path="/login" render={this.renderLoginForm} />
          <Route path="/signup" render={this.renderSignupForm} />
        </Switch>
        <Spacer variant="horizontal" margin="10px 0px" />
        <div className="recaptcha-wrapper" data-testid="recaptcha-wrapper">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={this.handleCaptcha}
            onErrored={this.handleCaptchaError}
          />
        </div>
        {message && <p>{message}</p>}
        <input
          className="control control--vertical"
          type="submit"
          value={isSignUpRoute ? 'Sign-Up' : 'Log-In'}
        />
      </form>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => {
  return {
    loginUser: credentials =>
      dispatch({
        type: REQUEST_AUTH_LOGIN,
        payload: { credentials: credentials }
      }),
    signupUser: userInfo =>
      dispatch({
        type: REQUEST_AUTH_SIGNUP,
        payload: { userInfo }
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
