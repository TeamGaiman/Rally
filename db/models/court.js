const court = (sequelize, DataTypes) => {
  const Court = sequelize.define('court', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },

    // COURT INFO
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    numberOfCourts: DataTypes.STRING,
    indoorOutdoor: DataTypes.STRING,
    courtType: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    kingQueen: DataTypes.STRING 
  });

  return Court;
};

module.exports = court;
