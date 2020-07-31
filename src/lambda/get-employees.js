const axios = require('axios')

const ApiUser = process.env.API_USER
const ApiKey = process.env.API_KEY
const baseURL = 'https://leviathan.challenge.growflow.com'
const baseParams = { ApiUser, ApiKey }

async function getEmployees() {
  return axios.get('/employee/', {
    baseURL,
    params: {
      ...baseParams,
    },
  })
}

exports.handler = async (event, ctx, cb) => {
  await getEmployees()
    .then((res) => {
      // console.log('15', res)

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
          error: err.message,
        }),
      }
    })
}
