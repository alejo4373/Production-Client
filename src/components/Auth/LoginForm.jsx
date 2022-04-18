import React from 'react'

const LoginForm = ({ username, password, message, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2> Log-In </h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="control control--vertical"
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          className="control control--vertical"
          type="password"
          name="password"
          value={password}
          placeholder="***"
          onChange={handleChange}
        />
        {message && <p>{message}</p>}
        <input className="control control--vertical" type="submit" value="log-in" />
      </form>
    </div>
  )
}

export default LoginForm
