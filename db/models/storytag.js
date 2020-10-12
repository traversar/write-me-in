'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoryTag = sequelize.define('StoryTag', {
    storyId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  StoryTag.associate = function(models) {
    StoryTag.belongsTo(models.Story, { foreignKey: 'storyId', as: 'story' });
    StoryTag.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
  };
  return StoryTag;
};
