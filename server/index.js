const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');
const models = require('../db/models');
const port = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

const root = {
  hello: () => { 'Welcome!'; },
  user: () => {
    return {
      name: 'test'
    };
  }
};
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

models.sequelize.sync({ force: true })
  .then(() => {
    app.listen(port, () => console.log('listening on port: ', port));
  });
