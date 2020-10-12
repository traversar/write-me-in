'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      genreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Genres'}
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.INTEGER
      },
      read: {
        type: Sequelize.BOOLEAN
      },
      confirmedPostLength: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stories');
  }
};
