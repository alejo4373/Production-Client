import { TextField } from '@mui/material'
import React from 'react'
import Spacer from '../../components/shared/Spacer/Spacer'

const LoginForm = ({ username, password, message, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2> Log-In </h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <TextField
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          label="Username:"
        />
        <Spacer variant="horizontal" margin="10px 0px" />
        <TextField
          className="control control--vertical"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password:"
        />
        {message && <p>{message}</p>}
        <input className="control control--vertical" type="submit" value="log-in" />
      </form>
    </div>
  )
}

export default LoginForm
