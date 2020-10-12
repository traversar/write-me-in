'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    genreName: DataTypes.STRING
  }, {});
  Genre.associate = function(models) {
    Genre.hasMany(models.Story, {foreignKey: 'genreId', as: 'stories'})
  };
  return Genre;
};
