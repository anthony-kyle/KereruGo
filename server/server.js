const express = require('express')
const path = require('path')

const authRoutes = require('./routes/auth')
const birdRoutes = require('./routes/birds')

const server = express()

if(process.env.NODE_ENV === 'production') {
  server.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}
server.use(express.json())
const publicRoot = path.join(__dirname, '..', 'public')
server.use(express.static(publicRoot))


server.use('/api/v1', authRoutes)
server.use('/api/v1/birds', birdRoutes)

module.exports = server
