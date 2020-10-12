'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      r({userId: 1, genreId: 1, title: 'GOT: Alt Ending', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 3}),
      r({userId: 3, genreId: 7, title: 'A Tale of Some Cities', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 4}),
      r({userId: 4, genreId: 7, title: 'Bobenstein', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 10}),
      r({userId: 2, genreId: 7, title: 'Plant People', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 5}),
      r({userId: 6, genreId: 7, title: 'Alien Musk', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1}),
      r({userId: 5, genreId: 7, title: 'Once But Unremembered', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1}),
      r({userId: 2, genreId: 7, title: 'Redemption, Among Other Chores', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1}),
      r({userId: 4, genreId: 7, title: 'Fatal', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1}),
      r({userId: 3, genreId: 7, title: 'Yeah-Yes!', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1}),
      r({userId: 1, genreId: 7, title: 'Silent Room, Thunderous Night', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1}),
      r({userId: 2, genreId: 7, title: 'Long but Longingly', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1}),
      r({userId: 5, genreId: 7, title: 'Attending the Ceremony', synopsis: 'There once was a story but it was only a test...', rating: 0, read: false, confirmedPostLength: 1})
    ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Stories', null, {});
  }
};
