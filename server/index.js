const express = require('express');
const parser = require('body-parser');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

let app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));


// GraphQL Schema -- used to describe the complete APIs type system.
// defines how a client can access that data.
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver -- contains the mapping of actions to functions
var root = {
    message: () => 'Hello World!'
};

// Create an express server and a GraphQL endpoint
app.use('/graphql', express_graphql({ //three config properties used for middleware
    schema: schema, 
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
  console.log(`Now browse to localhost:4000/graphql`);
});


let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening on port: ', port));