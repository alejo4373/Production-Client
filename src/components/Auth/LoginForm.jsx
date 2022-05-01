import { FormControl, InputLabel } from '@mui/material'
import InputBasic from '../shared/Inputs/InputBasic'
import React from 'react'
import Spacer from '../../components/shared/Spacer/Spacer'

const LoginForm = ({ username, password, message, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2> Log-In </h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <FormControl variant="standard" fullWidth={true}>
          <InputLabel shrink htmlFor="username">
            Username
          </InputLabel>
          <InputBasic
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            fullWidth={true}
          />
        </FormControl>
        <Spacer variant="horizontal" margin="10px 0px" />
        <FormControl variant="standard" fullWidth={true}>
          <InputLabel shrink htmlFor="password">
            Password
          </InputLabel>
          <InputBasic
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            fullWidth={true}
          />
        </FormControl>
        {message && <p>{message}</p>}
        <input className="control control--vertical" type="submit" value="log-in" />
      </form>
    </div>
  )
}

export default LoginForm
