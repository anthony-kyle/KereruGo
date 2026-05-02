const jwt = require('jsonwebtoken')

function requireJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is required. Add it to your .env file.'
    )
  }
  return secret
}

function createToken(user) {
  requireJwtSecret()
  const payload = { ...user }
  delete payload.hash
  const expire = process.env.JWT_EXPIRE_TIME || '1d'
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: expire,
  })
}

/** Issue JWT after register/sign-in middleware succeeds */
function getIssuer(getUserByName) {
  return function issueToken(req, res, next) {
    try {
      requireJwtSecret()
    } catch (e) {
      return next(e)
    }
    getUserByName(req.body.username)
      .then((user) => {
        if (!user) {
          const err = new Error('User missing after auth')
          err.status = 500
          throw err
        }
        const signed = createToken(user)
        res.json({
          message: 'Authentication successful.',
          token: signed,
        })
      })
      .catch(next)
  }
}

function getTokenDecoder(credentialsRequired = true) {
  return function tokenDecoder(req, res, next) {
    const authHeader = req.headers.authorization || ''
    const prefix = 'Bearer '
    const raw =
      authHeader.startsWith(prefix) ? authHeader.slice(prefix.length).trim() : null

    if (!raw) {
      if (credentialsRequired) {
        const err = new Error('No authorization token')
        err.name = 'UnauthorizedError'
        err.status = 401
        return next(err)
      }
      return next()
    }

    try {
      requireJwtSecret()
      const decoded = jwt.verify(raw, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
      })
      req.user = decoded
      next()
    } catch (err) {
      err.name = 'UnauthorizedError'
      err.status = 401
      next(err)
    }
  }
}

function decodeToken(req, res, next) {
  console.warn(
    'decodeToken is deprecated; use getTokenDecoder instead.'
  )
  return getTokenDecoder(true)(req, res, next)
}

module.exports = {
  createToken,
  getIssuer,
  getTokenDecoder,
  decodeToken,
}
