const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../db/schema.js');
const models = require('../db/index.js');
const resolvers = require('../db/resolvers.js');
const port = process.env.PORT || 8080;

const dummies = require('../dummyData/dummies.json');
const fakeUsers = require('../dummyData/dummyData.js').users;
const fakeMatch = require('../dummyData/dummyData.js').match;

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

const root = resolvers;
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

//Page refresh handler
app.get( '/*', ( req, res ) => res.redirect('/') );

models.sequelize.sync({ force: true })
  .then(() => {
    app.listen( port, () => console.log( 'listening on port: ', port ));
    //Temp functions to set dummy data
    // fakeUsers.forEach( user => {
    //   models.User.create( user );
    // });
    dummies.forEach( dummy => {
      models.User.create( dummy );
    });
    models.Match.create( fakeMatch );
  })
  .catch(err => { console.error( err ); });
