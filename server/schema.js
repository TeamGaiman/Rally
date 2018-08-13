const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../db/resolvers.js');

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String
    elo: Int
    fullname: String
    phoneNumber: String
    location: String
    wins: Int
    losses: Int
    matches: [String]
  }
  type Query {
    getUser(username: String): [User]
    getAllUsers: [User]
  }
  input UserInput {
    id: ID
    name: String
    elo: Int
  }
  type Mutation {
    createUser(input: UserInput) : User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
