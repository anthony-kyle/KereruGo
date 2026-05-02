import { jwtDecode } from 'jwt-decode'
import { saveToken, getToken } from './tokenStorage'

export function saveAuthToken(authToken) {
  saveToken(authToken)
  return jwtDecode(authToken)
}

export function isAuthenticated() {
  const authToken = getToken()
  if (!authToken) return false
  try {
    const payload = jwtDecode(authToken)
    const expiry = payload.exp
    if (expiry < Date.now() / 1000) {
      logOff()
      return false
    }
    return true
  } catch {
    logOff()
    return false
  }
}

export function getDecodedToken() {
  const authToken = getToken()
  if (!authToken) return null
  try {
    return jwtDecode(authToken)
  } catch {
    return null
  }
}

export function getEncodedToken() {
  return getToken()
}

export function logOff() {
  saveToken(null)
}
