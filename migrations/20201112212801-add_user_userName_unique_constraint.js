'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Users', {
      fields: ['userName'],
      type: 'unique',
      name: 'user_userName_unique_key'
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Users', 'user_userName_unique_key')
  }
};
