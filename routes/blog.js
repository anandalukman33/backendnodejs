const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Pastikan jalur ini sesuai dengan lokasi model Blog
const authenticateToken = require('../middleware/auth'); // Pastikan jalur ini sesuai dengan lokasi middleware

// Mendapatkan semua blog
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menambahkan blog baru
router.post('/', authenticateToken, async (req, res) => {
  const { title, content, metadata } = req.body;
  try {
    const blog = await Blog.create({ title, content, metadata });
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Memperbarui blog
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content, metadata } = req.body;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.metadata = metadata || blog.metadata;

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menghapus blog
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully', blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
