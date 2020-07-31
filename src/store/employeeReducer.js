const initState = {}

export default function employeeReducer(state = initState, action) {
  switch (action.type) {
    case 'GET_EMPLOYEES':
      return { ...state, employees: action.payload }
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] }
    default:
      return state
  }
}
