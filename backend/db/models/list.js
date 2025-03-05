'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(
      models.User, {
        foreignKey: 'userId'
      }
    )

    List.belongsToMany(
      models.Movie, {
        through: models.ListMovie,
        foreignKey: 'listId',
        otherKey: 'movieId'
      }
    )
  };
  return List;
};
