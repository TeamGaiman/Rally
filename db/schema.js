const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../db/resolvers.js');

const typeDefs = `
  type User {
    id: ID!
    name: String
    fullName: String
    email: String!
    phoneNumber: String
    wins: Int
    losses: Int
    elo: Int
    tier: Int
    joinDate: String
    userNumber: Int
  }
  type Match {
    id: ID!
    participantA: String!
    participantB: String!
    startTime: String!
    location: String!
    complete: Boolean
    winner: String
    score: String
    matchId: Int!
    upcoming: Boolean
    accepted: Boolean
  }
  type Query {
    getAllUsers: [User]
    getUsersByTier(tier: Int): [User]
    getUser(name: String): User
    checkEmailIsUnique(email: String): Boolean
  }
  input EmailInput {
    email: String
  }
  input UserInput {
    name: String
    fullName: String
    phoneNumber: String
    phoneNumber: String
    wins: Int
    losses: Int
    elo: Int
    tier: Int
  }
  input MatchInput {
    participantA: String
    participantB: String
    startTime: String
    location: String 
  }
  type Mutation {
    createUser(input: EmailInput) : User
    createMatch(input: MatchInput) : Match
    updateUser(email: String, input: UserInput) : User
    acceptMatch(email: String, matches: MatchInput) : User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
