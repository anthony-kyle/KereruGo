import request from 'superagent'
import { registerUrl, signInUrl } from './endpoints'
import { saveAuthToken } from './session'

function verifyEndpoint(endpoint) {
  const ok = [registerUrl, signInUrl].some((ep) => endpoint.includes(ep))
  if (!ok) {
    throw new Error('Endpoint does not match any of the known endpoints')
  }
}

function verifyData(data) {
  if (!data) throw new Error('Data parameter is required')
  if (!data.username) throw new Error('Data parameter must have a username property')
}

function consume(endpoint, headers, data = {}) {
  return request.post(endpoint).set(headers).send(data)
}

function authRequest(endpoint, data) {
  verifyEndpoint(endpoint)
  verifyData(data)
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  return consume(endpoint, headers, data).then((res) =>
    saveAuthToken(res.body?.token)
  ).catch((err) => {
    const authErrorMessage =
      err.response?.body?.errorType
    const errMessage =
      err.response?.body?.error?.title
    throw new Error(authErrorMessage || errMessage || err.message)
  })
}

export function register(newUser, options) {
  const baseUrl = options?.baseUrl || ''
  const url = `${baseUrl}${registerUrl}`
  return authRequest(url, newUser)
}

export function signIn(user, options) {
  const baseUrl = options?.baseUrl || ''
  const url = `${baseUrl}${signInUrl}`
  return authRequest(url, user)
}
