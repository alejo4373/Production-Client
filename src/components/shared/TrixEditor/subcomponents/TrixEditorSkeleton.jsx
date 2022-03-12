import React from 'react'
import { Box, Skeleton } from '@mui/material'

const TrixEditorSkeleton = ({ inline }) => {
  return (
    <Box>
      <Skeleton variant="rectangular" height="27.59px" width="334px" />
      <Box mb="10px"></Box>
      <Skeleton variant="rectangular" height={inline ? '34px' : '100px'} />
    </Box>
  )
}

export default TrixEditorSkeleton
