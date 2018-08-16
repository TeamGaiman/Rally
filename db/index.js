const Sequelize = require('sequelize');

const sequelize = new Sequelize('gaiman', 'postgres', 'postgres', {
  dialect: 'postgres',
  logging: false
});

const models = {
  User: sequelize.import('./models/user'),
  Match: sequelize.import('./models/match')
};

Object.keys(models).forEach(key => {
  ('associate' in models[key])
    ? models[key].associate(models) : null;
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
