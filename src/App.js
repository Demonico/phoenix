import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'
import Layout from './components/Layout'

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </div>
  )
}

export default App
