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
    accepted: Boolean
    completed: Boolean
    winner: String
    score: String
  }
  type Query {
    getAllUsers: [User]
    getUsersByTier(tier: Int): [User]
    getUser(name: String): User
    checkEmailIsUnique(email: String): Boolean
    getUserByEmail(email: String): User
    getUserChallenges(username: String): [Match]
    getUserUpcomingMatches(username: String): [Match]
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
    accepted: Boolean
    completed: Boolean
    winner: String
    score: String
  }
  type Mutation {
    createUser(input: EmailInput) : User
    updateUser(email: String, input: UserInput) : User
    createMatch(input: MatchInput) : Match
    updateMatch(id: String, input: MatchInput) : Match
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
