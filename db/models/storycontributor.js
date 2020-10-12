'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoryContributor = sequelize.define('StoryContributor', {
    storyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    readStatus: DataTypes.BOOLEAN
  }, {});
  StoryContributor.associate = function(models) {
    StoryContributor.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    StoryContributor.belongsTo(models.Story, {foreignKey: 'storyId', as: 'story'});
  };
  return StoryContributor;
};
