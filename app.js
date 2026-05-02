/**
 * Vercel detects this file and deploys the Express app as a serverless function.
 * Local development continues to use `node server` → server/index.js (HTTP listener).
 */
module.exports = require('./server/server')
