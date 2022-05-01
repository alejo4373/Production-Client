import { FormControl, InputLabel } from '@mui/material'
import InputBasic from '../shared/Inputs/InputBasic'
import React from 'react'
import Spacer from '../../components/shared/Spacer/Spacer'

const LoginForm = ({ username, password, handleChange }) => {
  return (
    <>
      <h2> Log-In </h2>
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
    </>
  )
}

export default LoginForm
