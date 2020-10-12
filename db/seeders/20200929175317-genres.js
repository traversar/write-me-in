'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Genres', [
        r({genreName: 'Fan Fiction'}),
        r({genreName: 'Mystery'}),
        r({genreName: 'Science Fiction'}),
        r({genreName: 'Author Imitation'}),
        r({genreName: 'Literary'}),
        r({genreName: 'Experimental'}),
        r({genreName: 'Horror'})
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Genres', null, {});
  }
};
