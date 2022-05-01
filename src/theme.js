import { createTheme } from '@mui/material/styles'

const AllInputsAndButtonsStyles = {
  borderRadius: 3,
  border: '1px solid #CED4DA',
  fontSize: 16,
  padding: '8px 10px'
}

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          ...AllInputsAndButtonsStyles
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          ...AllInputsAndButtonsStyles
        }
      },
      defaultProps: {
        disableRipple: true
      }
    }
  }
})

export default theme
