// server.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');

app.use(express.json()); // Middleware untuk parsing JSON

// Menggunakan routing
app.use('/api/users', usersRouter);
app.use('/api/blog', blogRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://127.0.0.1:${PORT}/`);
});
