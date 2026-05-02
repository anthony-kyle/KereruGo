import { register as authRegister, signIn as authLogin } from '../auth/registerSignIn'
import { baseApiUrl as baseUrl } from '../config'

const errorMessages = {
  "USERNAME_UNAVAILABLE": "Sorry, that username is taken.",
  "INVALID_CREDENTIALS": "Sorry, your username or password is incorrect.",
}

function mapAuthError (err) {
  const body = err.response?.body
  const code = body?.errorType || err.message
  const detail =
    typeof body?.error === 'string'
      ? body.error
      : body?.error?.title
  const msg = errorMessages[code]
  const fallback = [code, detail].filter(Boolean).join(': ') || err.message
  throw new Error(msg || fallback || 'Request failed')
}

export function register (creds) {
  return authRegister(creds, { baseUrl }).catch(mapAuthError)
}

export function login (creds) {
  return authLogin(creds, { baseUrl }).catch(mapAuthError)
}
