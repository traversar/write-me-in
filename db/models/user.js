'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255],
      }
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        len: [1, 255],
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
    tokenId: {
      type: DataTypes.STRING
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts'});
    User.hasMany(models.Story, { foreignKey: 'userId', as: 'stories'});
    User.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings'});
    User.hasMany(models.StoryContributor, { foreignKey: 'userId', as: 'contributions'});
  };

  User.prototype.toPayload = function () {
    return {
      id: this.id
    }
  }

  User.prototype.toSafeObject = function () {
    let ratingsObj = { stories: {}, posts: {} };
    if(this.ratings) {
      this.ratings.forEach(rating => {
        if(rating.storyId) {
          ratingsObj.stories[rating.storyId] = rating.vote
        } else {
          ratingsObj.posts[rating.postId] = rating.vote
        }
      })
    }

    return {
      email: this.email,
      username: this.username,
      ratings: ratingsObj,
    };
  }

  return User;
};
