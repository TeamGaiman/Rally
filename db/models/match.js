const match = (sequelize, DataTypes) => {
  const Match = sequelize.define('match', {
    startTime: DataTypes.DATE
  });

  return Match;
};

module.exports = match;
