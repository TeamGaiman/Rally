// const models = require('./index.js');

// const resolvers = {
//   Query: {
//     getAllUsers: async (_) => {
//       return await models.User.findAll({})
//     },
//     getUser: async (_, {name}) => {
//       return await models.User.findOne({ where: { name }})
//     },
//     checkEmailIsUnique: async(_, {email}) => {
//       return await (models.User.findOne({ where: { email }}))
//        ? false : true
//     }
//   },
//   Mutation: {
//     createUser: async (_, {input}) => {
//       models.User.create(input);
//       return await input;
//     }
//   }
// };

// module.exports = resolvers;
