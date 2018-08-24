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
    tier: Int
    joinDate: String
    userNumber: Int
    completedMatches: [Match]
    pendingMatches: [Match]
    challengesSent: [Match]
    challengesReceived: [Match]
  }

  type Match {
    id: ID!
    location: String!
    court: Court
    challenger: String!
    opponent: String!
    startTime: String
    accepted: Boolean
    completed: Boolean
    winner: String
    score: String
  }

  type Court {
    id: ID! 
    location: String!
    name: String
    phone: String
    numberOfCourts: Int
    indoorOutdoor: String
    courtType: String
    latitude: String
    longitude: String
    kingQueen: User
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
    location: String!
    challenger: String
    opponent: String
    startTime: String
    accepted: Boolean
    completed: Boolean
    winner: String
    score: String
  }
  
  input CourtInput {
    location: String!
    name: String
    phone: String
    numberOfCourts: Int
    indoorOutdoor: String
    courtType: String
    latitude: String
    longitude: String
    kingQueen: String
  }
  
  type Query {
    getAllUsers: [User]
    getUsersByTier(tier: Int): [User]

    checkEmailIsUnique(email: String!): Boolean
    getUserByEmail(email: String!): User

    getChallengesByUser(email: String): [Match]
    getUpcomingMatchesByUser(email: String): [Match]
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