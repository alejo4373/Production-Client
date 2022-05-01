import { ButtonBase } from '@mui/material'
import React from 'react'

const Button = ({ label, ...rest }) => {
  return <ButtonBase {...rest}>{label}</ButtonBase>
}

export default Button
