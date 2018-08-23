const models = require('./index.js');
let { Op } = models;

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
    },
    getUserChallenges: async (_, { username }) => {
      return await models.Match.findAll({ where: {
        [Op.or]: [
          {participantA: username},
          {participantB: username}
        ],
        accepted: false,
        completed: false
      } });
    },
    getUserUpcomingMatches: async (_, { username }) => {
      return await models.Match.findAll({ where: {
        [Op.or]: [
          {participantA: username},
          {participantB: username}
        ],
        accepted: true,
        completed: false
      } });
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      return await models.User.create( input )
        .catch( error => {
          console.error ( error );
        });

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

    createMatch: async (_, { input }) => {
      return await models.Match.create( input )
        .catch( error => {
          console.error( error );
        });
    },

    updateMatch: async (_, { input, id }) => {
      models.Match.findOne({
        where: { id: id }
      })
        .then(( match ) => {
          match.updateAttributes( input );
        })
        .catch( err => console.log( 'updateMatch resolver error', err ));
      return await input;
    },

    createCourt: async (_, { input }) => {
      return await models.Court.create( input )
        .catch( error => console.log( error ));
    },
    
    updateCourt: async (_, { input, id }) => {
      models.Court.findOne({
        where: { id: id }
      })
        .then( court => {
          court.updateAttributes( input );
        })
        .catch( error => console.log( error ));
      return await input;
    }

    
    // acceptMatch: async ( _, { matches, email }) => {
    //   const user = await models.User.findOne({ where: { name: input.name }});
    //   user.set('matches', input);
    //   console.log('acceptMatch--', user);
    //   return user.save();
    //   models.User.findOne({
    //     where: { email: email }
    //   })
    //     .then(user => {
    //       console.log('acceptMatch', user);
    //       user.updateAttributes(matches);
    //     })
    //     .catch(err => err);
    //   return await matches;
    // },
  }
};

module.exports = resolvers;
