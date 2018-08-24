const models = require('./index.js');
let { Op } = models;

const resolvers = {
  Query: {

    /*--- USER QUERIES ---*/
    checkEmailIsUnique: async (_, { email }) => {
      let result = await models.User.findOne({ where: { email }});
      if ( !result ) {
        return true;
      } else {
        return false;
      }
    },

    getUser: async (_, { name }) => {
      return await models.User.findOne({ where: { name }});
    },

    getAllUsers: async (_) => {
      return await models.User.findAll({});
    },

    getUsersByTier: async (_, { tier }) => {
      return await models.User.findAll({ where: { tier }});
    },

    getUserByEmail: async(_, { email }) => {
      return await models.User.findOne({ where: { email }});
    },

    /*--- MATCH QUERIES ---*/
    getChallengesByUser: async (_, { email }) => {
      return await models.Match.findAll({ where: {
        participantB: email,
        accepted: false,
        completed: false
      } });
    },

    getUpcomingMatchesByUser: async (_, { email }) => {
      return await models.Match.findAll({ where: {
        [Op.or]: [
          {participantA: email},
          {participantB: email}
        ],
        accepted: true,
        completed: false
      } });
    }

  },

  Mutation: {

    /*--- USER MUTATIONS ---*/
    createUser: async (_, { input }) => {
      try {
        return await models.User.create( input );
      } catch ( error ) {
        console.error( error );
        return false;
      }
    },

    updateUser: async (_, { input, email }) => {
      try {
        return await models.User.findOne({
          where: { email: email }
        })
          .then(( user ) => {
            return user.updateAttributes( input );
          });
      } catch ( error ) {
        console.error( error );
        return false;
      }
    },

    /*--- MATCH MUTATIONS ---*/
    createMatch: async (_, { input }) => {
      try {
        return await models.Match.create( input );
      } catch ( error ) {
        console.error( error );
        return false;
      }
    },

    updateMatch: async (_, { input, id }) => {
      try {
        return await models.Match.findOne({
          where: { id }
        })
          .then(( match ) => {
            match.updateAttributes( input );
            return true;
          });
      } catch ( error ) {
        console.error( error );
        return false;
      }
    },

    /*--- COURT MUTATIONS ---*/
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
  }
};

module.exports = resolvers;
