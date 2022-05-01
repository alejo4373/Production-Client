import { FormControl, InputLabel } from '@mui/material'
import InputBasic from '../shared/Inputs/InputBasic'
import React from 'react'
import Spacer from '../../components/shared/Spacer/Spacer'

const SignupForm = ({ username, password, email, handleChange }) => {
  return (
    <>
      <h2> Sign-Up </h2>
      <FormControl variant="standard" fullWidth={true}>
        <InputLabel shrink htmlFor="email">
          Email
        </InputLabel>
        <InputBasic
          id="email"
          type="email"
          name="email"
          value={email}
          placeholder="user@example.com"
          onChange={handleChange}
        />
      </FormControl>
      <Spacer variant="horizontal" margin="6px 0px" />
      <FormControl variant="standard" fullWidth={true}>
        <InputLabel shrink htmlFor="username">
          Username
        </InputLabel>
        <InputBasic
          id="username"
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        />
      </FormControl>
      <Spacer variant="horizontal" margin="6px 0px" />
      <FormControl variant="standard" fullWidth={true}>
        <InputLabel shrink htmlFor="password">
          Password
        </InputLabel>
        <InputBasic
          id="password"
          type="password"
          name="password"
          value={password}
          placeholder="***"
          onChange={handleChange}
        />
      </FormControl>
    </>
  )
}

export default SignupForm
