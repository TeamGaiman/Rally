const models = require('./index.js');

const resolvers = {
  Query: {
    getAllUsers: async ( _ ) => {
      return await models.User.findAll({});
    },
    getUsersByTier: async ( _, { tier } ) => {
      return await models.User.findAll({ where: { tier }});
    },
    getUser: async ( _, { name } ) => {
      return await models.User.findOne({ where: { name }});
    },
    checkEmailIsUnique: async ( _, { email } ) => {
      let result = await models.User.findOne({ where: { email }});
      if ( ! result ) {
        return true;
      } else {
        return false;
      }
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      models.User.create(input);
      return await input;
    },
    createMatch: async (_, { input }) => {
      models.Match.create(input);
      return await input;
    },
    updateUser: async (_, { input, email }) => {
      models.User.findOne({
        where: { email: email }
      })
        .then((user) => {
          console.log('User returned from find one ', user.values);
          user.updateAttributes(input);
        })
        .catch( err => console.log('updateUser resolver error', err));
      return await input;
    }
  }
};

module.exports = resolvers;
