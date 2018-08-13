const models = require('./index.js');

const resolvers = {
  Query: {
    getAllUsers: async (_) => {
      return await models.User.findAll({})
    }
  },
  Mutation: {
    createUser: async (_, {input}) => {
      models.User.create(input);
      return await input;
    }
  }
};

module.exports = resolvers;
