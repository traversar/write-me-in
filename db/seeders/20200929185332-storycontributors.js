'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('StoryContributors', [
        r({storyId: 1, userId: 1, readStatus: true}),
        r({storyId: 1, userId: 2, readStatus: true}),
        r({storyId: 1, userId: 4, readStatus: true}),

        r({storyId: 2, userId: 3, readStatus: true}),
        r({storyId: 2, userId: 4, readStatus: true}),
        r({storyId: 2, userId: 1, readStatus: true}),

        r({storyId: 3, userId: 1, readStatus: true}),
        r({storyId: 3, userId: 2, readStatus: true}),
        r({storyId: 3, userId: 3, readStatus: true}),
        r({storyId: 3, userId: 4, readStatus: true}),
        r({storyId: 3, userId: 5, readStatus: true}),
        r({storyId: 3, userId: 6, readStatus: true}),

        r({storyId: 4, userId: 1, readStatus: true}),
        r({storyId: 4, userId: 2, readStatus: true}),
        r({storyId: 4, userId: 3, readStatus: true}),
        r({storyId: 4, userId: 4, readStatus: true}),
        r({storyId: 4, userId: 6, readStatus: true}),
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('StoryContributors', null, {});
  }
};
