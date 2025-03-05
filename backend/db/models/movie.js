'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(
      models.List, {
        through: models.ListMovie,
        foreignKey: 'movieId',
        otherKey: 'listId'
       }
    )
  };
  return Movie;
};
