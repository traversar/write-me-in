'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    vote: DataTypes.BOOLEAN
  }, {});
  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Rating.belongsTo(models.Story, {foreignKey: 'storyId', as: 'story'});
    Rating.belongsTo(models.Post, {foreignKey: 'postId', as: 'posts'});
  };
  return Rating;
};
