const {buildSchema} = require('graphql');

const schema = buildSchema(`
  type User {
    name: String
  }
  type Query {
    user: User
  }
`);

module.exports = schema;
