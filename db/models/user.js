const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: { type: DataTypes.STRING },
    fullName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    wins: { type: DataTypes.INTEGER },
    losses: { type: DataTypes.INTEGER },
    elo: { type: DataTypes.INTEGER }
    // TODO: location, matches
  });
  return User;
};

module.exports = user;
