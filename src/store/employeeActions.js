export function getEmployees(empData) {
  return { type: 'GET_EMPLOYEES', payload: empData }
}

export function addEmployee(newEmp) {
  return { type: 'ADD_EMPLOYEE', payload: newEmp }
}
