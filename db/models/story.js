'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    userId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    synopsis: {
      type: DataTypes.TEXT,
      len: [0, 500]
    },
    rating: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN,
    confirmedPostLength: DataTypes.INTEGER
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Story.belongsTo(models.Genre, {foreignKey: 'genreId', as: 'genre'});

    Story.hasMany(models.Post, {foreignKey: 'storyId', as: 'posts'});
    Story.hasMany(models.Rating, {foreignKey: 'storyId', as: 'ratings'});
    Story.hasMany(models.StoryContributor, {foreignKey: 'storyId', as: 'contributors'});

    Story.belongsToMany(models.Tag, {through: models.StoryTag, foreignKey: 'storyId', otherKey: 'tagId', as: 'tags'})
  };
  return Story;
};
