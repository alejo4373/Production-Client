import { Box } from '@mui/material'
import React from 'react'

const Spacer = ({ variant, margin }) => {
  return <Box display={variant === 'horizontal' ? 'flex' : 'block'} margin={margin}></Box>
}

export default Spacer
