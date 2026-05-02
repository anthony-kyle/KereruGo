// Update with your config settings.
const path = require('path')

/**
 * pg v8 warns when `sslmode=require` (etc.) appears in DATABASE_URL; future pg v9
 * will treat those modes differently. Neon/copy-paste URLs often use `require`.
 * Explicit `verify-full` keeps today's strict behaviour without the warning.
 * @see https://www.postgresql.org/docs/current/libpq-ssl.html
 */
function pgProductionConnectionString(raw) {
  if (!raw || typeof raw !== 'string') return raw
  if (process.env.DATABASE_SSL === 'false') return raw.trim()

  try {
    const trimmed = raw.trim().replace(/^postgresql:/i, 'postgres:')
    const u = new URL(trimmed)
    const mode = (u.searchParams.get('sslmode') || '').toLowerCase()
    if (
      mode === '' ||
      mode === 'require' ||
      mode === 'prefer' ||
      mode === 'verify-ca'
    ) {
      u.searchParams.set('sslmode', 'verify-full')
    }
    return u.toString().replace(/^postgres:/i, 'postgresql:')
  } catch {
    return raw.trim()
  }
}

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'dev.sqlite3')
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    },
    useNullAsDefault: true
  },

  test: {
       client: 'sqlite3',
       connection: {
         filename: ':memory:'
       },
       migrations: {
        directory: path.join(__dirname, 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, 'seeds')
      },
       useNullAsDefault: true
     },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
      ? {
          connectionString: pgProductionConnectionString(
            process.env.DATABASE_URL
          ),
          ssl:
            process.env.DATABASE_SSL === 'false'
              ? false
              : { rejectUnauthorized: false },
        }
      : {},
    // Small pools suit serverless-style hosts; raise DB_POOL_MAX if needed.
    pool: {
      min: 0,
      max: Number(process.env.DB_POOL_MAX || 10),
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },

};
