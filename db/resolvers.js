const models = require('./index.js');
let { Op } = models;

const resolvers = {

  User: {

    /*--- USER TYPE RESOLVERS ---*/
    completedMatches: async ({ email }) => {
      return await models.Match.findAll({
        where: {
          [Op.or]: [
            { challenger: email },
            { opponent: email }
          ],
          completed: true
        }
      });
    },

    pendingMatches: async ({ email }) => {
      return await models.Match.findAll({
        where: {
          [Op.or]: [
            { challenger: email },
            { opponent: email }
          ],
          completed: false,
          accepted: true
        }
      });
    },

    challengesSent: async ({ email }) => {
      return await models.Match.findAll({
        where: {
          challenger: email,
          accepted: false
        }
      });
    },

    challengesReceived: async ({ email }) => {
      return await models.Match.findAll({
        where: {
          opponent: email,
          accepted: false
        }
      });
    }
  },

  Match: {

    /*--- MATCH TYPE RESOLVERS ---*/
    court: async ({ location }) => {
      return await models.Court.findOne({ where: { name: location }});
    }

  },

  Query: {

    /*--- USER QUERIES ---*/
    checkEmailIsUnique: async ( _, { email } ) => {
      let result = await models.User.findOne({ where: { email }});
      if ( !result ) {
        return true;
      } else {
        return false;
      } 
    },

    getAllUsers: async ( ) => {
      return await models.User.findAll({});
    },

    getUsersByTier: async ( _, { tier, email } ) => {
      return await models.User.findAll({
        where: {
          tier,
          [Op.not]: {
            email
          }
        }
      });
    },

    getUserByEmail: async( _, { email } ) => {
      return await models.User.findOne({ where: { email }});
    },
    
    getAllCourts: async ( ) => {
      return await models.Court.findAll({});
    },
  },
    
  Mutation: {

    /*--- USER MUTATIONS ---*/
    createUser: async ( _, { input } ) => {
      try {
        return await models.User.create( input );
      } catch ( error ) {
        console.error( error );
        return false;
      }
    },

    updateUser: async ( _, { input, email } ) => {
      try {
        return await models.User.findOne({
          where: { email }
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
    createMatch: async ( _, { input } ) => {
      try {
        return await models.Match.create( input );
      } catch ( error ) {
        console.error( error );
        return false;
      }
    },

    updateMatch: async ( _, { input, id } ) => {
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

    deleteMatch: async ( _, { id } ) => {
      return await models.Match.destroy({
        where: { id } 
      });
    },

    /*--- COURT MUTATIONS ---*/
    createCourt: async ( _, { input } ) => {
      try {
        return await models.Court.create( input );
      } catch ( error ) {
        console.error( error );
        return false;
      }
    },

    updateCourt: async ( _, { input, location } ) => {
      try {
        return await models.Court.findOne({
          where: { location }
        })
          .then( court => {
            court.updateAttributes( input );
            return true;
          });
      } catch ( error ) {
        console.error( error );
        return false;
      }
    }
  }
};

module.exports = resolvers;
