const express = require('express');
const parser = require('body-parser');

let app = express();

app.use(parser.json());
app.use(express.static(__dirname + './dist'));

let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening on port: ', port));