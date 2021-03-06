import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './App'
import Theme from './Theme'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
