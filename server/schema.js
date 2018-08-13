const {buildSchema} = require('graphql');

const schema = buildSchema(`
  type User {
    name: String
    elo: Int
  }
  type Query {
    user: User
  }
`);

module.exports = schema;
