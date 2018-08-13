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
    tier: Int!
    joinDate: String!
    userNumber: Int!
  }
  type Query {
    getUser(name: String): User
    getAllUsers: [User]
    checkEmailIsUnique(email: String): Boolean
  }
  input UserInput {
    name: String
    fullName: String
    email: String
    phoneNumber: String
  }
  type Mutation {
    createUser(input: UserInput) : User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
