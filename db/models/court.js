const court = (sequelize, DataTypes) => {
  const Court = sequelize.define('court', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },

    // COURT INFO
    name: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    numberOfCourts: { type: DataTypes.STRING },
    indoorOutdoor: { type: DataTypes.STRING },
    courtType: { type: DataTypes.STRING },
    latitude: { type: DataTypes.STRING },
    longitude: { type: DataTypes.STRING }
  });

  return Court;
};

module.exports = court;