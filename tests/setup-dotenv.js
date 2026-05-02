require('dotenv').config()
// Jest must not inherit NODE_ENV=production from .env — Express HTTPS redirect breaks supertest.
if (process.env.JEST_WORKER_ID !== undefined) {
  process.env.NODE_ENV = 'test'
}
