import { InputBase, styled } from '@mui/material'

const InputBasic = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 3,
    border: '1px solid #CED4DA',
    fontSize: 16,
    padding: '8px 10px'
  }
}))

export default InputBasic
