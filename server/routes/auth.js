const express = require('express')
const { applyAuthRoutes } = require('../lib/auth/routes')

const { userExists, getUserByUsername, createUser } = require('../db/users')

const router = express.Router()

applyAuthRoutes(router, {
  userExists,
  getUserByName: getUserByUsername,
  createUser
})

module.exports = router
