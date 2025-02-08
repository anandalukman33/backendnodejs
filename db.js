const { Pool } = require('pg');

// Konfigurasi koneksi ke PostgreSQL
const pool = new Pool({
  user: 'postgres', // Ganti dengan username PostgreSQL
  host: 'localhost',
  database: 'mydatabase', // Ganti dengan nama database yang telah dibuat
  password: '220798', // Ganti dengan password PostgreSQL
  port: 5432,
});

module.exports = pool;
