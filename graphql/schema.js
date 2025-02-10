// graphql/schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Metadata {
    tags: [String]
    views: Int
    author: String
    rating: Int
    is_published: Boolean
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    metadata: Metadata
  }

  type Query {
    users: [User]
    blogs: [Blog]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    addBlog(title: String!, content: String!, metadata: MetadataInput): Blog
  }

  input MetadataInput {
    tags: [String]
    views: Int
    author: String
    rating: Int
    is_published: Boolean
  }
`;

module.exports = typeDefs;
