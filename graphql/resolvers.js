// graphql/resolvers.js
const pool = require('../db');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    users: async () => {
      const result = await pool.query('SELECT * FROM users');
      return result.rows;
    },
    blogs: async () => {
      const result = await pool.query('SELECT * FROM blog');
      return result.rows.map(blog => ({
        ...blog,
        metadata: blog.metadata ? (typeof blog.metadata === 'string' ? JSON.parse(blog.metadata) : blog.metadata) : null // Pastikan metadata diubah menjadi objek jika disimpan sebagai string
      }));
    },
  },
  Mutation: {
    addUser: async (_, { name, email, password }) => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
      );
      return result.rows[0];
    },
    addBlog: async (_, { title, content, metadata }) => {
      const result = await pool.query(
        'INSERT INTO blog (title, content, metadata) VALUES ($1, $2, $3) RETURNING *',
        [title, content, JSON.stringify(metadata)] // Simpan metadata sebagai string JSON
      );
      return result.rows[0];
    },
  },
};

module.exports = resolvers;
