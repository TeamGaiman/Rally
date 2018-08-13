const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../db/resolvers.js');

const typeDefs = `
  type User {
    id: ID
    name: String
    elo: Int
  }
  type Query {
    user: User
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
