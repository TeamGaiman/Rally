const Sequelize = require('sequelize');

const sequelize = new Sequelize('gaiman', 'postgres', 'postgres', {
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
  Match: sequelize.import('./match')
};

Object.keys(models).forEach(key => {
  ('associate' in models[key])
    ? models[key].associate(models) : null;
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
