const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../db/resolvers.js');

const typeDefs = `
  type User {
    id: ID!
    name: String!
    fullName: String!
    email: String!
    phoneNumber: String!
    wins: Int!
    losses: Int!
    elo: Int!
  }
  type Query {
    getUser(username: String): [User]
    getAllUsers: [User]
  }
  input UserInput {
    name: String
    fullName: String
    email: String
    phoneNumber: String
    wins: Int
    losses: Int
    elo: Int
  }
  type Mutation {
    createUser(input: UserInput) : User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
