import React from 'react'
import { Switch, Route } from 'react-router-dom'

import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeContext from './store/EmployeeContext'

// TODO: scafold out proper paths
// const routes = [
//   {
//     path: '/employee',
//   },
//   {
//     path: '/customer',
//   },
//   {
//     path: '/orders',
//   },
// ]

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/employee">
        <EmployeeContext>
          <EmployeeDashboard />
        </EmployeeContext>
      </Route>
    </Switch>
  )
}
