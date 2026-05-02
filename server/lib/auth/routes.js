const hash = require('./password')
const token = require('./jwt')

const registerUrl = '/auth/register'
const signInUrl = '/auth/signin'

const DATABASE_ERROR = 'DATABASE_ERROR'
const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
const USERNAME_UNAVAILABLE = 'USERNAME_UNAVAILABLE'

function applyAuthRoutes(router, functions) {
  const issueToken = token.getIssuer(functions.getUserByName)

  router.post(registerUrl, register, issueToken)
  router.post(signInUrl, signIn, issueToken)

  function register(req, res, next) {
    functions
      .userExists(req.body.username)
      .then((exists) => {
        if (exists) {
          return res.status(400).json({ errorType: USERNAME_UNAVAILABLE })
        }
        return functions.createUser(req.body).then(() => next())
      })
      .catch((err) => {
        res.status(500).json({
          errorType: DATABASE_ERROR,
          error: err.message,
        })
      })
  }

  function signIn(req, res, next) {
    functions
      .getUserByName(req.body.username)
      .then((user) => {
        if (!user) throw new Error(INVALID_CREDENTIALS)
        return hash.verify(user.hash, req.body.password).then((isValid) => {
          if (!isValid) throw new Error(INVALID_CREDENTIALS)
          next()
        })
      })
      .catch((err) => {
        if (err.message === INVALID_CREDENTIALS) {
          return res.status(400).json({ errorType: INVALID_CREDENTIALS })
        }
        res.status(500).json({
          errorType: DATABASE_ERROR,
          error: err.message,
        })
      })
  }
}

module.exports = { applyAuthRoutes, registerUrl, signInUrl }
