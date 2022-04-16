import React from 'react'

const LoginForm = ({ username, password, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2> Log-In </h2>
      <form onSubmit={handleSubmit} className="auth-form">
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
        <input
          className="control-strip__control control-strip__control--vertical"
          type="submit"
          value="log-in"
        />
      </form>
    </div>
  )
}

export default LoginForm
