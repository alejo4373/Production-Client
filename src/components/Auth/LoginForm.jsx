import React from 'react'

const LoginForm = ({ username, password, handleChange }) => {
  return (
    <>
      <h2> Log-In </h2>
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
    </>
  )
}

export default LoginForm
