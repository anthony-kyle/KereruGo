import request from 'superagent'

import { getEncodedToken } from 'authenticare/client'

const headers = { 
  Accept: 'application/json' ,
  Authorization: `Bearer ${getEncodedToken()}`
}

const apiUrl = '/api/v1/birds'

// The following two lines need to be set immediately after the request (get/post/patch/delete) to access secure routes
// .set(jsonHeader)
// .set(authHeader)

export function apiGetAllBirds () {
  return request
    .get(apiUrl + '/birdTypes')
    .set(headers)
    .then(res => res.body)
    .catch(errorHandler)
}

// Global error handler for front end api's
function errorHandler (err) {
  console.error(err)
}
