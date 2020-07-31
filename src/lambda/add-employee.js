const axios = require('axios')

const ApiUser = process.env.API_USER
const ApiKey = process.env.API_KEY
const baseURL = 'https://leviathan.challenge.growflow.com'
const baseParams = { ApiKey, ApiUser }

async function addEmployees(empData) {
  console.log(empData)
  const serialized = {
    firstName: empData.firstName,
    lastName: empData.lastName,
    email: empData.email,
    telephone: empData.telephone,
    role: empData.role,
    ApiKey,
    ApiUser,
  }
  console.log(serialized)
  return axios.post(`${baseURL}/employee/`, {
    ...JSON.parse(empData),
    ...baseParams,
  })
}

exports.handler = async (event, ctx, cb) => {
  await addEmployees(event.body)
    .then((res) => {
      console.log('15', res)

      cb(null, {
        statusCode: 200,
        body: JSON.stringify({ results: res.data }),
      })
    })
    .catch((err) => {
      // console.log('23', err)
      return {
        statusCode: err.response.status || 500,
        body: JSON.stringify({
          error: err.response.errorMessage,
        }),
      }
    })
}
