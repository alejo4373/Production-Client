import { InputBase, styled } from '@mui/material'

const InputBasic = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  }
}))

export default InputBasic
