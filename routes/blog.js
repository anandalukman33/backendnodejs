// routes/blog.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken } = require('../middleware');

// Mendapatkan semua blog (dilindungi)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menambahkan blog (dilindungi)
router.post('/', authenticateToken, async (req, res) => {
  const { title, content, metadata } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO blog (title, content, metadata) VALUES ($1, $2, $3) RETURNING *',
      [title, content, metadata]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Memperbarui blog berdasarkan ID (dilindungi)
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content, metadata } = req.body;

  try {
    const result = await pool.query(
      'UPDATE blog SET title = $1, content = $2, metadata = $3 WHERE id = $4 RETURNING *',
      [title, content, metadata, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menghapus blog berdasarkan ID (dilindungi)
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM blog WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
