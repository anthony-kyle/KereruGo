import { register as authRegister, signIn as authLogin } from '../auth/registerSignIn'
import { baseApiUrl as baseUrl } from '../config'

const errorMessages = {
  "USERNAME_UNAVAILABLE": "Sorry, that username is taken.",
  "INVALID_CREDENTIALS": "Sorry, your username or password is incorrect.",
}

function mapAuthError (err) {
  const code = err.response?.body?.errorType || err.message
  const msg = errorMessages[code]
  throw msg || err.message
}

export function register (creds) {
  return authRegister(creds, { baseUrl }).catch(mapAuthError)
}

export function login (creds) {
  return authLogin(creds, { baseUrl }).catch(mapAuthError)
}
