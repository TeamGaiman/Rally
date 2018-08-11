// var db = require('../db/db.js');
var { buildSchema } = require('graphql');
var dummyData = require('./dummyData.js');

var schema = buildSchema(`
  type Query {
    user(id: String): User
    addWin(id: String): User
  }

  type User {
    id: String
    username: String
    fullname: String
    email: String
    phoneNumber: String
    location: String
    wins: Int
    losses: Int
    elo: String
    matches: [String]
    reviews: Reviews
    upcoming: [UpcomingMatches]
    complete: [CompleteMatches]
  }

  type Reviews {
    greatConversation: Int
    goodSport: Int
    matchAgain: Int
    punctual: Int
    equipped: Int
    etiquette: Int
    greatServer: Int
  }

  type UpcomingMatches {
    id: String
    user: String
    location: String
    date: String
  }
  
  type CompleteMatches {
    id: String
    user: String
    location: String
    date: String
    result: String
  }

`);

var root = {
  user: ({ id }) => {
    return dummyData[id];
  },
  
  addWin: ({ id }) => {
    dummyData[id].wins += 1;
    return dummyData[id];
  }
};

module.exports = {
  schema,
  root
};