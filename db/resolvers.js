const models = require('./index.js');

const resolvers = {
  Query: {
    getAllUsers: async (_) => {
      return await models.User.findAll({})
    },
    getUser: async (_, {name}) => {
      return await models.User.findOne({ where: { name }})
    },
    checkEmailIsUnique: async(_, {email}) => {
      return await (models.User.findOne({ where: { email }}))
       ? false : true
    }
  },
  Mutation: {
    createUser: async (_, {input}) => {
      models.User.create(input);
      return await input;
<<<<<<< HEAD
=======
    },
    createMatch: async (_, {input}) => {
      models.Match.create(input);
      return await input;
>>>>>>> f26cf7cbdc0f1e53d0c6a06a6d9ac4f42c3a3833
    }
  }
};

module.exports = resolvers;
