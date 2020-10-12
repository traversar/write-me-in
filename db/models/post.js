'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    confirmationStatus: DataTypes.BOOLEAN
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Post.belongsTo(models.Story, {foreignKey: 'storyId', as: 'story'});
    Post.hasMany(models.Rating, {foreignKey: 'postId', as: 'ratings'});
  };
  return Post;
};
