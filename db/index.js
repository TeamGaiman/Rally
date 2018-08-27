const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('gaiman', 'postgres', 'postgres', {
  // host: 'parker-dbs.czgifzcncxtz.us-east-2.rds.amazonaws.com',
  // port: 5432,
  // logging: false,
  // maxConcurrentQueries: 100,
  dialect: 'postgres',
  // dialectOptions: {
  //   ssl: 'Amazon RDS'
  // },
  // pool: { maxConnections: 5, maxIdleTime: 30 },
  // language: 'en'
});

const models = {
  User: sequelize.import('./models/user'),
  Match: sequelize.import('./models/match'),
  Court: sequelize.import('./models/court')
};

Object.keys(models).forEach(key => {
  ('associate' in models[key])
    ? models[key].associate(models) : null;
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
models.Op = Op;
module.exports = models;
