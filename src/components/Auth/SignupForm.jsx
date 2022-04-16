import ReCAPTCHA from 'react-google-recaptcha'
import React from 'react'

const SignupForm = ({
  username,
  password,
  email,
  handleChange,
  handleSubmit,
  handleCaptcha,
  handleCaptchaError,
  message
}) => {
  return (
    <div>
      <h2> Sign-Up </h2>
      <form name="signup" onSubmit={handleSubmit} className="auth-form">
        <input
          className="control-strip__control control-strip__control--vertical"
          type="email"
          name="email"
          value={email}
          placeholder="user@example.com"
          onChange={handleChange}
        />
        <input
          className="control-strip__control control-strip__control--vertical"
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          className="control-strip__control control-strip__control--vertical"
          type="password"
          name="password"
          value={password}
          placeholder="***"
          onChange={handleChange}
        />
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleCaptcha}
          onErrored={handleCaptchaError}
        />
        <p>{message}</p>
        <input
          className="control-strip__control control-strip__control--vertical"
          type="submit"
          value="Sign-Up"
        />
      </form>
    </div>
  )
}

export default SignupForm
