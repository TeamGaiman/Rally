const express = require('express');
const parser = require('body-parser');
const models = require('../db/models');
const port = process.env.PORT || 8080;

const app = express();
app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

models.sequelize.sync({ force: true })
  .then(() => {
    app.listen(port, () => console.log('listening on port: ', port));
  });
