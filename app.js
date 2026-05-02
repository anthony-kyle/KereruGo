/**
 * Vercel deploys Express only when this entry file imports `express` directly.
 * The actual app lives in ./server/server (see https://vercel.com/docs/frameworks/backend/express).
 * Local dev still uses `npm start` → server/index.js (HTTP/HTTPS listener).
 */
require('express')
module.exports = require('./server/server')
