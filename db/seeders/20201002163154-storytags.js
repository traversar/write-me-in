'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('StoryTags', [
        r({storyId: 1, tagId: 1}),
        r({storyId: 1, tagId: 10}),
        r({storyId: 1, tagId: 11}),
        r({storyId: 1, tagId: 12}),
        r({storyId: 2, tagId: 15}),
        r({storyId: 2, tagId: 4}),
        r({storyId: 2, tagId: 3}),
        r({storyId: 2, tagId: 13}),
        r({storyId: 3, tagId: 14}),
        r({storyId: 3, tagId: 2}),
        r({storyId: 3, tagId: 4}),
        r({storyId: 3, tagId: 13}),
        r({storyId: 4, tagId: 6}),
        r({storyId: 4, tagId: 7}),
        r({storyId: 4, tagId: 11}),
        r({storyId: 4, tagId: 17}),
        r({storyId: 5, tagId: 17}),
        r({storyId: 5, tagId: 7}),
        r({storyId: 5, tagId: 6}),
        r({storyId: 5, tagId: 8}),
        r({storyId: 5, tagId: 11}),
        r({storyId: 5, tagId: 16}),
        r({storyId: 5, tagId: 17}),
        r({storyId: 6, tagId: 17}),
        r({storyId: 6, tagId: 10}),
        r({storyId: 6, tagId: 12}),
        r({storyId: 6, tagId: 5}),
        r({storyId: 6, tagId: 20}),
        r({storyId: 6, tagId: 19}),
        r({storyId: 7, tagId: 5}),
        r({storyId: 7, tagId: 18}),
        r({storyId: 7, tagId: 11}),
        r({storyId: 8, tagId: 6}),
        r({storyId: 8, tagId: 2}),
        r({storyId: 8, tagId: 10}),
        r({storyId: 9, tagId: 17}),
        r({storyId: 9, tagId: 18}),
        r({storyId: 9, tagId: 9}),
        r({storyId: 10, tagId: 2}),
        r({storyId: 10, tagId: 10}),
        r({storyId: 10, tagId: 11}),
        r({storyId: 10, tagId: 8}),
        r({storyId: 11, tagId: 12}),
        r({storyId: 11, tagId: 19}),
        r({storyId: 11, tagId: 21}),
        r({storyId: 12, tagId: 19}),
        r({storyId: 12, tagId: 13}),
        r({storyId: 12, tagId: 15}),
        r({storyId: 12, tagId: 21}),
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('StoryTags', null, {});
  }
};
