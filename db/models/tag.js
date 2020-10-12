'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    title: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Story, {as: 'stories', through: models.StoryTag, foreignKey: 'tagId', otherKey: 'storyId'})
  };
  return Tag;
};
