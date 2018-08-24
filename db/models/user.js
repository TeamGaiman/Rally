const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },

    // USERDATA
    name: {
      type: DataTypes.STRING
    },
    fullName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING
    },

    // GAME DATA
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    elo: {
      type: DataTypes.INTEGER,
      defaultValue: 2000
    },
    tier: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

    // METADATA
    joinDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    userNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    }

    // TODO: location, matches
  });
  return User;
};

module.exports = user;
