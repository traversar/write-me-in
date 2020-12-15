'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Ratings', [
        r({userId: 1, storyId: 2, vote: true}),
        r({userId: 1, storyId: 3, vote: false}),
        r({userId: 1, storyId: 4, vote: true}),
        r({userId: 1, storyId: 5, vote: false}),
        r({userId: 1, storyId: 6, vote: false}),
        r({userId: 1, storyId: 7, vote: true}),
        r({userId: 1, storyId: 8, vote: false}),
        r({userId: 1, storyId: 9, vote: true}),
        r({userId: 2, postId: 1, vote: true}),
        r({userId: 2, postId: 3, vote: false}),
        r({userId: 2, postId: 5, vote: true}),
        r({userId: 2, postId: 7, vote: false}),
        r({userId: 2, postId: 9, vote: false}),
        r({userId: 2, postId: 11, vote: true}),
        r({userId: 2, postId: 13, vote: false}),
        r({userId: 2, postId: 15, vote: true})
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Ratings', null, {});
  }
};
