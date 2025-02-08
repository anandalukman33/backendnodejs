// models/Blog.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Pastikan jalur ini benar

class Blog extends Model {}

Blog.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Blog',
  tableName: 'blog', // Pastikan nama tabel sesuai
});

module.exports = Blog;
