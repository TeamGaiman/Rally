const express = require('express');
const parser = require('body-parser');
var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
var { schema, root } = require('./schema.js');

let app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.use('/graphql', graphqlHTTP({ // config properties used for middleware
  schema: schema, 
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => console.log(`Now browse to localhost:4000/graphql`));


let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening on port: ', port));