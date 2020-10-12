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

  User.prototype.toSafeObject = function () {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      username: this.name,
      updatedAt: this.updatedAt,
    };
  }

  return User;
};
