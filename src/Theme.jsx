import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f2666',
    },
    secondary: {
      main: '#82d173',
    },
    pop: {
      main: '#ffc32b',
    },
  },
})

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
