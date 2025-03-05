'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListMovie = sequelize.define('ListMovie', {
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  ListMovie.associate = function(models) {
    // associations can be defined here
  };
  return ListMovie;
};
