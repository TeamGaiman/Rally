const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    },
    elo: {
      type: DataTypes.INTEGER
    }
  });

  return User;
};

module.exports = user;
