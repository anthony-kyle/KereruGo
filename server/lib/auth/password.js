const bcrypt = require('bcryptjs')

const SALT_ROUNDS = 12

function generateHash(password) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

function verifyHash(hash, password) {
  return bcrypt.compare(password, hash)
}

module.exports = { generateHash, verifyHash }
