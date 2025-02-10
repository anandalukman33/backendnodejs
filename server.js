// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');

const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

// Buat server Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Fungsi untuk memulai server
const startServer = async () => {
  await server.start(); // Tunggu server Apollo untuk siap
  server.applyMiddleware({ app }); // Hubungkan Apollo dengan Express

  // Menggunakan routing untuk REST API
  app.use('/api/users', usersRouter);
  app.use('/api/blog', blogRouter);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://127.0.0.1:${PORT}${server.graphqlPath}`);
  });
};

// Jalankan fungsi untuk memulai server
startServer();
