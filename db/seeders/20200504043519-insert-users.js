'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ username: 'Stephen Queen', email: 'demo@example.com', hashedPassword: createPassword() }),
      r({ username: 'Dave', email: 'dave@example.com', hashedPassword: createPassword() }),
      r({ username: 'Vera', email: 'vera@example.com', hashedPassword: createPassword() }),
      r({ username: 'Yusuke', email: 'yusuke@example.com', hashedPassword: createPassword() }),
      r({ username: 'Peta', email: 'petra@example.com', hashedPassword: createPassword() }),
      r({ username: 'Jess', email: 'jess@example.com', hashedPassword: createPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
