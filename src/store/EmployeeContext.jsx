import React, { useReducer } from 'react'

import employeeService from '../services/employee'
import * as empActions from './employeeActions'
import empReducer from './employeeReducer'

export const employeeContext = React.createContext({})
const EmployeeProvider = employeeContext.Provider

const initState = {
  employees: [],
  filterby: '',
  pageLim: 10,
  pageNum: 0,
  sortBy: '',
  sortOrd: 'asc',
}

export default function EmployeeContext({ children }) {
  const [employeeState, dispatch] = useReducer(empReducer, initState)

  const getEmployees = async () => {
    const response = await employeeService.getEmployees()
    dispatch(empActions.getEmployees(response.data.results))
  }

  const addEmplolyee = async (newEmp) => {
    const { email, firstName, lastName, role, telephone, other } = newEmp
    const newEmployee = {
      email,
      firstName,
      lastName,
      role: role === 'other' ? other : role,
      telephone,
    }
    const response = await employeeService.createEmployee(newEmployee)
    dispatch(empActions.addEmployee(response.data.results))
  }

  return (
    <EmployeeProvider value={{ employeeState, getEmployees, addEmplolyee }}>
      {children}
    </EmployeeProvider>
  )
}
