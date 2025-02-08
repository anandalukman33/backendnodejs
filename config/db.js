const { Sequelize } = require('sequelize');

// Konfigurasi koneksi ke PostgreSQL menggunakan Sequelize
const sequelize = new Sequelize('mydatabase', 'postgres', '220798', {
  host: 'localhost',
  dialect: 'postgres',
});

// Cek koneksi
sequelize.authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil!');
  })
  .catch(err => {
    console.error('Tidak dapat terhubung ke database:', err);
  });

module.exports = sequelize;
