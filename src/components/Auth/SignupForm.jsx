import React from 'react'

const SignupForm = ({ username, password, email, handleChange }) => {
  return (
    <>
      <h2> Sign-Up </h2>
      <input
        className="control control--vertical"
        type="email"
        name="email"
        value={email}
        placeholder="user@example.com"
        onChange={handleChange}
      />
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

export default SignupForm
