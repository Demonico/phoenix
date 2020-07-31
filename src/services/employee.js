import axios from 'axios'

const baseURL = '/.netlify/functions'

export default {
  getEmployees: function () {
    return axios.get('/get-employees', { baseURL })
  },
  createEmployee: function (newEmp) {
    return axios.post('/add-employee', newEmp, { baseURL })
  },
}
