import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import EmployeeContext from './store/EmployeeContext'

// pages
import EmployeeDashboard from './pages/EmployeeDashboard'
import NotFound from './pages/NotFound'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/employee">
        <EmployeeContext>
          <EmployeeDashboard />
        </EmployeeContext>
      </Route>
      <Route exact path="/">
        <Redirect to="/employee" />
      </Route>
      <Route exact path="/customer">
        <div> Comin Soon</div>
      </Route>
      <Route exact path="/orders">
        <div> Comin Soon</div>
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}
