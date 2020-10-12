'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tags', [
        r({title: 'GOT'}),
        r({title: 'Scary'}),
        r({title: 'Politics'}),
        r({title: 'Throwback'}),
        r({title: 'Experimental'}),
        r({title: 'SciFi'}),
        r({title: 'Tech'}),
        r({title: 'Conspiracy'}),
        r({title: 'Realism'}),
        r({title: 'Twist'}),
        r({title: 'Unexpected'}),
        r({title: 'Romance'}),
        r({title: 'Victorian'}),
        r({title: 'Gothic'}),
        r({title: 'History'}),
        r({title: 'Pop'}),
        r({title: 'Absurd'}),
        r({title: 'Nihilism'}),
        r({title: 'Sentimental'}),
        r({title: 'Hope'}),
        r({title: 'Sad'}),

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tags', null, {});
  }
};
