const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "desafio3",
  password: "jancoweb",
  port: 5432
})

const query = (text, param) => {
  return pool.query(text,param);
}

module.exports = { query }