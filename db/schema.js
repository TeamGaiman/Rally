const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../db/resolvers.js');

const typeDefs =
`
  type User {
    id: ID!
    email: String!
    name: String
    fullName: String
    phoneNumber: String
    wins: Int
    losses: Int
    elo: Int
    tier: Tier
    joinDate: String
    userNumber: Int
    completedMatches: [Match]
    pendingMatches: [Match]
    challengesSent: [Match]
    challengesReceived: [Match]
  }

  type Match {
    id: ID!
    challenger: String!
    opponent: String!
    startTime: String!
    accepted: Boolean
    completed: Boolean
    winner: String
    score: String
    court: Court
  }

  type Court {
    id: ID!
    name: String
    location: String
    phone: String
    numberOfCourts: Int
    indoorOutdoor: String
    courtType: String
    latitude: String
    longitude: String
    kingQueen: User
  }

  enum Tier {
    ONE
    TWO
    THREE
    FOUR
  }

  type Query {
    getAllUsers: [User]
    getUsersByTier(tier: Int): [User]

    checkEmailIsUnique(email: String!): Boolean
    getUserByEmail(email: String): User

    getChallengesByUser(email: String): [Match]
    getUpcomingMatchesByUser(email: String): [Match]
  }

  input UserInput {
    email: String
    name: String
    fullName: String
    phoneNumber: String
    wins: Int
    losses: Int
    elo: Int
    tier: Int
  }

  input MatchInput {
    challenger: String
    opponent: String
    startTime: String
    location: String
    accepted: Boolean
    completed: Boolean
    winner: String
    score: String
  }

  input CourtInput {
    name: String
    location: String
    phone: String
    numberOfCourts: Int
    indoorOutdoor: String
    courtType: String
    latitude: String
    longitude: String
    kingQueen: String
  }

  type Mutation {
    createUser( input: UserInput ) : Boolean!
    updateUser( email: String, input: UserInput ) : Boolean!

    createMatch( input: MatchInput ) : Boolean!
    updateMatch( id: String, input: MatchInput ) : Boolean!

    createCourt( input: CourtInput ) : Boolean!
    updateCourt( location: String, input: CourtInput ) : Boolean!
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;