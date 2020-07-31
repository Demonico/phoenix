import React, { useContext, useEffect } from 'react'

import { employeeContext } from '../store/EmployeeContext'
import EmployeeTable from '../components/EmployeeTable'

export default function EmployeeDashboard() {
  const { employeeState, getEmployees } = useContext(employeeContext)

  useEffect(() => {
    getEmployees()
  }, [])

  // useEffect(() => {
  //   console.log(employeeState)
  // }, [employeeState])

  return <EmployeeTable employeeData={employeeState.employees} />
}
