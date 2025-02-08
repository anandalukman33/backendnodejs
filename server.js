// server.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const sequelize = require('./config/db');
const authenticateToken = require('./middleware/auth');

app.use(express.json()); // Middleware untuk parsing JSON

// Menggunakan routing
app.use('/api/users', usersRouter);
app.use('/api/blog', authenticateToken, blogRouter); // Lindungi endpoint blog dengan middleware autentikasi

const PORT = 3000;

// Sinkronisasi model dengan database
sequelize.sync({ force: false }) // Gunakan { force: true } jika ingin menghapus dan membuat ulang tabel
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://127.0.0.1:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
