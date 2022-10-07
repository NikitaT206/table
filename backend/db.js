const { Pool, Client } = require('pg')

const client = new Client()

const pool = new Pool({
  user: 'nikitat.',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'node_postgres'
})

module.exports = { pool, client }