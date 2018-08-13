const User = require('./models/user.js');
const models = require('./index.js');
const _ = require('lodash');

const resolvers = {
  Mutation: {
    createUser: (_, {input}) => {
      let user = {};
      user = input;
      models.User.create(user);
      return { input };
    }
  }
};

module.exports = resolvers;
