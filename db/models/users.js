var db = require('../db.js');
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    
  }

  type User {
    id: Int
    username: String
    fullname: String
    email: String
    phoneNumber: String
    location: String
    wins: Int
    losses: Int
    reviews: [String]
    elo: String
  }
`);

var root = {

};

exports.module = {

};