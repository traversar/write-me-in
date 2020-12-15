'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      r({userId: 1, genreId: 1, title: 'GOT: Alt Ending', synopsis: 'There once was a story but it only was a test.', rating: 28, read: false, confirmedPostLength: 17}),
      r({userId: 1, genreId: 5, title: 'A Tale of Some Cities', synopsis: 'There once was a story but it only was a test.', rating: 46, read: false, confirmedPostLength: 9}),
      r({userId: 4, genreId: 7, title: 'Bobenstein', synopsis: 'There once was a story but it only was a test.', rating: 72, read: false, confirmedPostLength: 19}),
      r({userId: 2, genreId: 3, title: 'Plant People', synopsis: 'There once was a story but it only was a test.', rating: -15, read: false, confirmedPostLength: 6}),
      r({userId: 6, genreId: 2, title: 'Alien Musk', synopsis: 'There once was a story but it only was a test.', rating: 26, read: false, confirmedPostLength: 5}),
      r({userId: 5, genreId: 6, title: 'Once and Unremembered', synopsis: 'There once was a story but it only was a test.', rating: 10, read: false, confirmedPostLength: 5}),
      r({userId: 2, genreId: 4, title: 'Redemption and Other Chores', synopsis: 'There once was a story but it only was a test.', rating: -5, read: false, confirmedPostLength: 5}),
      r({userId: 4, genreId: 2, title: 'Fatal', synopsis: 'There once was a story but it only was a test.', rating: 120, read: false, confirmedPostLength: 5}),
      r({userId: 3, genreId: 5, title: 'Yeah-no-Yes!', synopsis: 'There once was a story but it only was a test.', rating: 59, read: false, confirmedPostLength: 5}),
      r({userId: 3, genreId: 7, title: 'Silent Room, Thunderous Night', synopsis: 'There once was a story but it only was a test.', rating: 5, read: false, confirmedPostLength: 5}),
      r({userId: 2, genreId: 7, title: 'The Lodger', synopsis: 'There once was a story but it only was a test.', rating: -12, read: false, confirmedPostLength: 5}),
      r({userId: 5, genreId: 4, title: 'Ceremony Attendance', synopsis: 'There once was a story but it only was a test.', rating: 62, read: false, confirmedPostLength: 5})
    ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Stories', null, {});
  }
};
