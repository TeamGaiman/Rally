const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../db/resolvers.js');

const typeDefs = `
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

  type Court {
    id: ID!
    name: String
    location: String
    phone: String
    numberOfCourts: String
    indoorOutdoor: String
    courtType: String
    latitude: String
    longitude: String
    kingQueen: String
  }

  type Query {
    getAllUsers: [User]
    getUsersByTier( tier: Int! ): [User]
    getUser( name: String! ): User
    checkEmailIsUnique( email: String! ): Boolean
    getUserByEmail( email: String! ): User
    getUserChallenges( username: String! ): [Match]
    getUserUpcomingMatches( username: String! ): [Match]
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
    participantA: String
    participantB: String
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
    numberOfCourts: String
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

    createCourt( input: CourtInput ) : Court
    updateCourt( id: String, input: CourtInput ) : Court
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;