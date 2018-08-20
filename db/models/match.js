const match = (sequelize, DataTypes) => {
  const Match = sequelize.define('match', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },

    //PARTICIPANTS
    participantA: DataTypes.STRING,
    participantB: DataTypes.STRING,

    //MATCH INFO
    startTime: DataTypes.DATE,
    location: DataTypes.STRING,
    accepted: { type: DataTypes.BOOLEAN, defaultValue: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    winner: { type: DataTypes.STRING, defaultValue: null },
    score: { type: DataTypes.STRING, defaultValue: null },
  });

  return Match;
};

module.exports = match;
