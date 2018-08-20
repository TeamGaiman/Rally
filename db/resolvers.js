const models = require('./index.js');

const resolvers = {
  Query: {
    getAllUsers: async (_) => {
      return await models.User.findAll({});
    },
    getUsersByTier: async (_, { tier }) => {
      return await models.User.findAll({ where: { tier }});
    },
    getUser: async (_, { name }) => {
      return await models.User.findOne({ where: { name }});
    },
    checkEmailIsUnique: async (_, { email }) => {
      let result = await models.User.findOne({ where: { email }});
      if ( !result ) {
        return true;
      } else {
        return false;
      }
    },
    getUserByEmail: async(_, { email }) => {
      return await models.User.findOne({where: { email }});
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        return await models.User.create( input );
      } catch ( error ) {
        console.error( error );
      }
    },

    createMatch: async (_, { input }) => {
      models.Match.create( input );
      return await input;
    },

    updateUser: async (_, { input, email }) => {
      models.User.findOne({
        where: { email: email }
      })
        .then(( user ) => {
          user.updateAttributes( input );
        })
        .catch( err => console.log( 'updateUser resolver error', err ));
      return await input;
    },

    acceptMatch: async ( _, { matches, email }) => {
      // const user = await models.User.findOne({ where: { name: input.name }});
      // user.set('matches', input);
      // console.log('acceptMatch--', user);
      // return user.save();
      models.User.findOne({
        where: { email: email }
      })
        .then(user => {
          console.log('acceptMatch', user);
          user.updateAttributes(matches);
        })
        .catch(err => err);
      return await matches;
    },
  }
};

module.exports = resolvers;
