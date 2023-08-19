import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import App from './App'
import React from 'react'
import store from './store'
import theme from './theme'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
